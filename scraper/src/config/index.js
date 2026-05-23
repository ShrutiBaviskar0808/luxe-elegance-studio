require('dotenv').config();

const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  env: process.env.NODE_ENV || 'development',
  storageDriver: process.env.STORAGE_DRIVER || 'json',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/pipa_scraper',
  baseUrl: process.env.SCRAPE_BASE_URL || 'https://pipajewellery.dm2buy.com',
  publicBaseUrl: process.env.PUBLIC_BASE_URL || 'http://localhost:4000',
  scrape: {
    concurrency: parseInt(process.env.SCRAPE_CONCURRENCY || '4', 10),
    retries: parseInt(process.env.SCRAPE_RETRIES || '3', 10),
    timeoutMs: parseInt(process.env.SCRAPE_TIMEOUT_MS || '30000', 10),
    delayMs: parseInt(process.env.SCRAPE_DELAY_MS || '400', 10),
    userAgent:
      process.env.USER_AGENT ||
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  },
  cron: {
    schedule: process.env.CRON_SCHEDULE || '0 3 * * *',
    enabled: (process.env.CRON_ENABLED || 'true') === 'true',
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX || '120', 10),
  },
};

module.exports = config;
