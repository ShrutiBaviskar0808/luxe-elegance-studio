const axios = require('axios');
const config = require('../config');

const http = axios.create({
  timeout: config.scrape.timeoutMs,
  headers: {
    'User-Agent': config.scrape.userAgent,
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
  },
  maxRedirects: 5,
  validateStatus: (s) => s >= 200 && s < 400,
});

module.exports = http;
