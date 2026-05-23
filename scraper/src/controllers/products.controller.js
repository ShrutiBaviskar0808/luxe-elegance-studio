const store = require('../models/store');

exports.list = async (req, res, next) => {
  try {
    const { category, q, page, limit } = req.query;
    const result = await store.getProducts({ category, q, page, limit });
    res.json({
      success: true,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        pages: result.pages,
      },
      count: result.items.length,
      data: result.items,
    });
  } catch (e) {
    next(e);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const product = await store.getProductById(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (e) {
    next(e);
  }
};
