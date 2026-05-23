const cron = require('node-cron');
const config = require('../config');
const logger = require('../utils/logger');
const { runSync } = require('./sync');

function startCron() {
  if (!config.cron.enabled) {
    logger.info('Cron disabled (CRON_ENABLED=false)');
    return;
  }
  if (!cron.validate(config.cron.schedule)) {
    logger.warn(`Invalid CRON_SCHEDULE "${config.cron.schedule}" — cron not started`);
    return;
  }
  cron.schedule(config.cron.schedule, () => {
    logger.info(`Cron tick — running sync (${config.cron.schedule})`);
    runSync().catch((e) => logger.error(`Cron sync error: ${e.message}`));
  });
  logger.info(`Cron scheduled: ${config.cron.schedule}`);
}

module.exports = { startCron };
