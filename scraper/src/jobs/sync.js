const { scrapeAll } = require('../services/scraper.service');
const { downloadProductImages } = require('../services/images.service');
const store = require('../models/store');
const logger = require('../utils/logger');

const state = {
  running: false,
  lastStartedAt: null,
  lastFinishedAt: null,
  lastError: null,
  lastStats: null,
};

async function runSync() {
  if (state.running) {
    logger.warn('Sync already running — skipped');
    return state;
  }
  state.running = true;
  state.lastStartedAt = new Date().toISOString();
  state.lastError = null;

  try {
    await store.init();
    const { categories, products } = await scrapeAll();
    const withLocalImages = await downloadProductImages(products);

    await store.upsertCategories(categories);
    await store.upsertProducts(withLocalImages);

    state.lastStats = {
      categories: categories.length,
      products: withLocalImages.length,
    };
    logger.info(`Sync stored: ${state.lastStats.categories} categories, ${state.lastStats.products} products`);
  } catch (err) {
    state.lastError = err.message;
    logger.error(`Sync failed: ${err.stack || err.message}`);
  } finally {
    state.running = false;
    state.lastFinishedAt = new Date().toISOString();
  }
  return state;
}

function getSyncState() {
  return { ...state };
}

module.exports = { runSync, getSyncState };
