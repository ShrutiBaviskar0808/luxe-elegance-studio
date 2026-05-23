/* CLI entry: `npm run scrape` */
const { runSync } = require('./sync');
const logger = require('../utils/logger');

(async () => {
  try {
    await runSync();
    process.exit(0);
  } catch (e) {
    logger.error(e.message);
    process.exit(1);
  }
})();
