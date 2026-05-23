const logger = require('./logger');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function retry(fn, { retries = 3, baseDelay = 500, label = 'task' } = {}) {
  let lastErr;
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      return await fn(attempt);
    } catch (err) {
      lastErr = err;
      const delay = baseDelay * 2 ** (attempt - 1);
      logger.warn(`${label} failed (attempt ${attempt}/${retries}): ${err.message}. Retrying in ${delay}ms`);
      await sleep(delay);
    }
  }
  throw lastErr;
}

module.exports = { retry, sleep };
