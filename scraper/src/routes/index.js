const router = require('express').Router();
const categories = require('../controllers/categories.controller');
const products = require('../controllers/products.controller');
const sync = require('../controllers/sync.controller');

router.get('/health', (req, res) => res.json({ success: true, status: 'ok', time: new Date().toISOString() }));

router.get('/categories', categories.list);
router.get('/products', products.list);
router.get('/products/:id', products.getById);

router.post('/sync', sync.trigger);
router.get('/sync/status', sync.status);

module.exports = router;
