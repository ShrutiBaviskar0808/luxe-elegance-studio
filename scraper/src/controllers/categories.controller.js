const store = require('../models/store');

exports.list = async (req, res, next) => {
  try {
    const categories = await store.getCategories();
    res.json({ success: true, count: categories.length, data: categories });
  } catch (e) {
    next(e);
  }
};
