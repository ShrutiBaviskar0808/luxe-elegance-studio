const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const config = require('./config');
const logger = require('./utils/logger');
const routes = require('./routes');
const store = require('./models/store');
const { startCron } = require('./jobs/cron');

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: '*' }));
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('tiny'));

app.use(
  rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Serve downloaded product images
app.use('/images', express.static(path.resolve(__dirname, '../public/images'), { maxAge: '7d' }));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({
    name: 'Pipa Scraper API',
    endpoints: ['/api/health', '/api/categories', '/api/products', '/api/products/:id', '/api/sync (POST)', '/api/sync/status'],
  });
});

// 404
app.use((req, res) => res.status(404).json({ success: false, error: 'Not found' }));

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error(err.stack || err.message);
  res.status(500).json({ success: false, error: err.message || 'Internal server error' });
});

(async () => {
  try {
    await store.init();
    app.listen(config.port, () => {
      logger.info(`API listening on http://localhost:${config.port}`);
      startCron();
    });
  } catch (e) {
    logger.error(`Startup failed: ${e.message}`);
    process.exit(1);
  }
})();
