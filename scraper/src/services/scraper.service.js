/**
 * Scraper service using Playwright (chromium).
 *
 * Strategy:
 *   1. Open the storefront, wait for network idle so the SPA hydrates.
 *   2. Discover category links (any anchor whose href contains "/collection" or
 *      a known category pattern). Falls back to scraping the homepage product
 *      grid as a single "All" category.
 *   3. For each category page, auto-scroll to trigger lazy loading, then
 *      extract product cards. We then visit each product detail page to grab
 *      description + full gallery.
 *
 * NOTE: The site is SPA-driven and may change DOM structure. Selectors are
 * defensive — they look at common e-commerce patterns (data attributes,
 * Open Graph tags, JSON-LD) rather than brittle class names.
 */
const { chromium } = require('playwright');
const cheerio = require('cheerio');
const pLimit = require('p-limit');
const slugify = require('slugify');
const config = require('../config');
const logger = require('../utils/logger');
const { retry, sleep } = require('../utils/retry');

const slug = (s) => slugify(String(s || ''), { lower: true, strict: true });

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 600;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight + 2000) {
          clearInterval(timer);
          resolve();
        }
      }, 250);
    });
  });
  await page.waitForTimeout(800);
}

async function launchBrowser() {
  return chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'],
  });
}

async function newContext(browser) {
  return browser.newContext({
    userAgent: config.scrape.userAgent,
    viewport: { width: 1366, height: 900 },
    locale: 'en-IN',
  });
}

async function discoverCategories(page) {
  await page.goto(config.baseUrl, { waitUntil: 'networkidle', timeout: config.scrape.timeoutMs });
  await autoScroll(page);

  const html = await page.content();
  const $ = cheerio.load(html);
  const found = new Map();

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') || '';
    const text = $(el).text().trim();
    if (!text) return;
    const url = new URL(href, config.baseUrl).toString();
    if (!url.startsWith(config.baseUrl)) return;
    // Heuristics: category/collection style URLs
    if (/\/(collection|category|categories|c|shop)\//i.test(url) || /\?(category|collection)=/i.test(url)) {
      const key = url.split('#')[0];
      if (!found.has(key)) {
        found.set(key, { name: text, url: key, slug: slug(text) || slug(key) });
      }
    }
  });

  if (found.size === 0) {
    logger.warn('No category links found via heuristics — treating homepage as a single category.');
    found.set(config.baseUrl, { name: 'All Products', slug: 'all', url: config.baseUrl });
  }
  return [...found.values()];
}

function extractProductCards($, baseUrl) {
  const products = new Map();

  // Generic: any <a> that links to a product detail page
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') || '';
    if (!/\/(product|products|p)\//i.test(href)) return;
    let url;
    try {
      url = new URL(href, baseUrl).toString().split('#')[0];
    } catch {
      return;
    }
    const $a = $(el);
    const img = $a.find('img').first();
    const imgSrc =
      img.attr('src') ||
      img.attr('data-src') ||
      img.attr('data-lazy') ||
      img.attr('data-original') ||
      '';
    const name = ($a.attr('title') || $a.text() || img.attr('alt') || '').trim().replace(/\s+/g, ' ');
    if (!products.has(url)) {
      products.set(url, {
        url,
        name: name || null,
        thumbnail: imgSrc || null,
      });
    }
  });

  return [...products.values()];
}

async function scrapeCategoryProducts(page, category) {
  return retry(
    async () => {
      await page.goto(category.url, { waitUntil: 'networkidle', timeout: config.scrape.timeoutMs });
      await autoScroll(page);
      const html = await page.content();
      const $ = cheerio.load(html);
      return extractProductCards($, category.url);
    },
    { retries: config.scrape.retries, label: `category ${category.slug}` }
  );
}

function parsePrice(text) {
  if (!text) return null;
  const m = String(text).replace(/,/g, '').match(/(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : null;
}

function extractProductDetail(html, url, fallback = {}) {
  const $ = cheerio.load(html);

  // JSON-LD first (most reliable when present)
  let ld = null;
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const parsed = JSON.parse($(el).contents().text());
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of arr) {
        if (item && (item['@type'] === 'Product' || (Array.isArray(item['@type']) && item['@type'].includes('Product')))) {
          ld = item;
          break;
        }
      }
    } catch {
      /* ignore */
    }
  });

  const ogImage = $('meta[property="og:image"]').attr('content');
  const ogTitle = $('meta[property="og:title"]').attr('content');
  const ogDesc = $('meta[property="og:description"]').attr('content');

  const name = (ld?.name || ogTitle || $('h1').first().text() || fallback.name || '').trim();
  const description = (
    ld?.description ||
    ogDesc ||
    $('[class*="description" i], [class*="product-desc" i]').first().text() ||
    ''
  ).trim();

  let price = null;
  if (ld?.offers) {
    const offers = Array.isArray(ld.offers) ? ld.offers[0] : ld.offers;
    price = parseFloat(offers?.price || offers?.lowPrice || 'NaN');
    if (Number.isNaN(price)) price = null;
  }
  if (price == null) {
    const priceText =
      $('[class*="price" i]').filter((_, el) => $(el).text().match(/\d/)).first().text() ||
      $('meta[property="product:price:amount"]').attr('content');
    price = parsePrice(priceText);
  }

  const images = new Set();
  if (ld?.image) {
    (Array.isArray(ld.image) ? ld.image : [ld.image]).forEach((u) => images.add(u));
  }
  if (ogImage) images.add(ogImage);
  $('img').each((_, el) => {
    const src =
      $(el).attr('src') ||
      $(el).attr('data-src') ||
      $(el).attr('data-lazy') ||
      $(el).attr('data-original');
    if (!src) return;
    if (/logo|sprite|icon/i.test(src)) return;
    try {
      images.add(new URL(src, url).toString());
    } catch {
      /* ignore */
    }
  });

  const id = slug(name) || slug(url.split('/').filter(Boolean).pop() || url);

  return {
    id,
    name,
    description,
    price,
    currency: ld?.offers?.priceCurrency || 'INR',
    images: [...images].slice(0, 12),
    url,
  };
}

async function scrapeProductDetail(context, url, fallback) {
  return retry(
    async () => {
      const page = await context.newPage();
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: config.scrape.timeoutMs });
        await autoScroll(page);
        const html = await page.content();
        return extractProductDetail(html, url, fallback);
      } finally {
        await page.close();
      }
    },
    { retries: config.scrape.retries, label: `product ${url}` }
  );
}

async function scrapeAll() {
  logger.info(`Starting scrape of ${config.baseUrl}`);
  const browser = await launchBrowser();
  const context = await newContext(browser);
  const page = await context.newPage();

  const result = { categories: [], products: [] };

  try {
    const categories = await discoverCategories(page);
    logger.info(`Discovered ${categories.length} categories`);

    const allProducts = new Map();

    for (const category of categories) {
      try {
        const cards = await scrapeCategoryProducts(page, category);
        logger.info(`Category "${category.name}" → ${cards.length} product cards`);
        category.productCount = cards.length;

        for (const card of cards) {
          if (!allProducts.has(card.url)) {
            allProducts.set(card.url, { ...card, category: category.name, categorySlug: category.slug });
          }
        }
        await sleep(config.scrape.delayMs);
      } catch (err) {
        logger.error(`Failed category ${category.url}: ${err.message}`);
      }
    }
    result.categories = categories;

    // Concurrent detail scraping
    const limit = pLimit(config.scrape.concurrency);
    const tasks = [...allProducts.values()].map((card) =>
      limit(async () => {
        try {
          const detail = await scrapeProductDetail(context, card.url, card);
          await sleep(config.scrape.delayMs);
          return {
            ...detail,
            category: card.category,
            categorySlug: card.categorySlug,
          };
        } catch (err) {
          logger.error(`Failed product ${card.url}: ${err.message}`);
          return null;
        }
      })
    );
    const detailed = (await Promise.all(tasks)).filter(Boolean);

    // De-dupe by id
    const byId = new Map();
    for (const p of detailed) byId.set(p.id, p);
    result.products = [...byId.values()];

    logger.info(`Scrape complete: ${result.categories.length} categories, ${result.products.length} products`);
    return result;
  } finally {
    await context.close();
    await browser.close();
  }
}

module.exports = { scrapeAll };
