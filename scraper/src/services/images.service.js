const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const pLimit = require('p-limit');
const http = require('../utils/http');
const logger = require('../utils/logger');
const { retry } = require('../utils/retry');
const config = require('../config');

const IMAGES_DIR = path.resolve(__dirname, '../../public/images');
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

function localFilename(url) {
  const hash = crypto.createHash('sha1').update(url).digest('hex').slice(0, 16);
  const ext = (path.extname(new URL(url).pathname).split('?')[0] || '.jpg').slice(0, 6);
  return `${hash}${ext}`;
}

async function downloadOne(url) {
  const filename = localFilename(url);
  const filepath = path.join(IMAGES_DIR, filename);
  if (fs.existsSync(filepath)) {
    return `${config.publicBaseUrl}/images/${filename}`;
  }
  await retry(
    async () => {
      const res = await http.get(url, { responseType: 'arraybuffer' });
      fs.writeFileSync(filepath, res.data);
    },
    { retries: 2, label: `image ${url}` }
  );
  return `${config.publicBaseUrl}/images/${filename}`;
}

async function downloadProductImages(products) {
  const limit = pLimit(6);
  const tasks = products.map((p) =>
    limit(async () => {
      const local = [];
      for (const img of p.images || []) {
        try {
          const url = await downloadOne(img);
          local.push(url);
        } catch (err) {
          logger.warn(`Image failed ${img}: ${err.message}`);
        }
      }
      return { ...p, localImages: local };
    })
  );
  return Promise.all(tasks);
}

module.exports = { downloadProductImages, downloadOne };
