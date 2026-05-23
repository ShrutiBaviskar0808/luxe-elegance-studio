/**
 * Unified storage layer. Supports two drivers:
 *   - "json": writes to ./data/*.json (zero infra)
 *   - "mongo": persists in MongoDB via mongoose
 */
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../utils/logger');

const DATA_DIR = path.resolve(__dirname, '../../data');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');

const ensureDir = () => {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
};

const readJson = (file, fallback) => {
  ensureDir();
  if (!fs.existsSync(file)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    logger.warn(`Failed to parse ${file}: ${e.message}`);
    return fallback;
  }
};

const writeJson = (file, data) => {
  ensureDir();
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// ---- Mongo models ----
const CategorySchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, index: true },
    name: String,
    url: String,
    productCount: Number,
  },
  { timestamps: true }
);

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, index: true },
    name: String,
    description: String,
    price: Number,
    currency: { type: String, default: 'INR' },
    images: [String],
    localImages: [String],
    category: String,
    categorySlug: String,
    url: String,
  },
  { timestamps: true }
);

let CategoryModel;
let ProductModel;
let mongoReady = false;

async function connectMongo() {
  if (mongoReady) return;
  await mongoose.connect(config.mongoUri);
  CategoryModel = mongoose.models.Category || mongoose.model('Category', CategorySchema);
  ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);
  mongoReady = true;
  logger.info('Connected to MongoDB');
}

async function init() {
  if (config.storageDriver === 'mongo') {
    await connectMongo();
  } else {
    ensureDir();
    if (!fs.existsSync(CATEGORIES_FILE)) writeJson(CATEGORIES_FILE, []);
    if (!fs.existsSync(PRODUCTS_FILE)) writeJson(PRODUCTS_FILE, []);
  }
}

// ---- Public API (driver-agnostic) ----

async function upsertCategories(categories) {
  if (config.storageDriver === 'mongo') {
    await connectMongo();
    const ops = categories.map((c) => ({
      updateOne: { filter: { slug: c.slug }, update: { $set: c }, upsert: true },
    }));
    if (ops.length) await CategoryModel.bulkWrite(ops);
    return;
  }
  const existing = readJson(CATEGORIES_FILE, []);
  const map = new Map(existing.map((c) => [c.slug, c]));
  for (const c of categories) map.set(c.slug, { ...map.get(c.slug), ...c });
  writeJson(CATEGORIES_FILE, [...map.values()]);
}

async function upsertProducts(products) {
  if (config.storageDriver === 'mongo') {
    await connectMongo();
    const ops = products.map((p) => ({
      updateOne: { filter: { id: p.id }, update: { $set: p }, upsert: true },
    }));
    if (ops.length) await ProductModel.bulkWrite(ops);
    return;
  }
  const existing = readJson(PRODUCTS_FILE, []);
  const map = new Map(existing.map((p) => [p.id, p]));
  for (const p of products) map.set(p.id, { ...map.get(p.id), ...p });
  writeJson(PRODUCTS_FILE, [...map.values()]);
}

async function getCategories() {
  if (config.storageDriver === 'mongo') {
    await connectMongo();
    return CategoryModel.find({}).lean();
  }
  return readJson(CATEGORIES_FILE, []);
}

async function getProducts({ category, q, page = 1, limit = 20 } = {}) {
  page = Math.max(1, parseInt(page, 10) || 1);
  limit = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
  const skip = (page - 1) * limit;

  if (config.storageDriver === 'mongo') {
    await connectMongo();
    const filter = {};
    if (category) filter.categorySlug = category;
    if (q) filter.name = { $regex: q, $options: 'i' };
    const [items, total] = await Promise.all([
      ProductModel.find(filter).skip(skip).limit(limit).lean(),
      ProductModel.countDocuments(filter),
    ]);
    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  let items = readJson(PRODUCTS_FILE, []);
  if (category) items = items.filter((p) => p.categorySlug === category);
  if (q) {
    const needle = q.toLowerCase();
    items = items.filter((p) => (p.name || '').toLowerCase().includes(needle));
  }
  const total = items.length;
  return {
    items: items.slice(skip, skip + limit),
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
  };
}

async function getProductById(id) {
  if (config.storageDriver === 'mongo') {
    await connectMongo();
    return ProductModel.findOne({ id }).lean();
  }
  const items = readJson(PRODUCTS_FILE, []);
  return items.find((p) => p.id === id) || null;
}

module.exports = {
  init,
  upsertCategories,
  upsertProducts,
  getCategories,
  getProducts,
  getProductById,
};
