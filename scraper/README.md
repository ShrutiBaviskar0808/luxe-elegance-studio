# Pipa Scraper API

Node.js + Express + Playwright service that scrapes
`https://pipajewellery.dm2buy.com`, stores products & categories in
JSON files **or** MongoDB, downloads images locally, and exposes a clean
REST API for use from your website or Flutter app.

> ⚠️ **Legal note:** Only scrape content you own or have permission to use.
> Rehosting third-party images/descriptions may violate copyright or the
> source site's Terms of Service.

---

## 1. Folder Structure

```
scraper/
├── data/                       # JSON storage (categories.json, products.json)
├── public/images/              # Downloaded product images (served at /images/*)
├── src/
│   ├── config/                 # Env config loader
│   ├── controllers/            # Express request handlers
│   │   ├── categories.controller.js
│   │   ├── products.controller.js
│   │   └── sync.controller.js
│   ├── jobs/                   # Background work
│   │   ├── cron.js             # Daily cron scheduler
│   │   ├── runScrape.js        # CLI entry: `npm run scrape`
│   │   └── sync.js             # End-to-end sync pipeline
│   ├── models/
│   │   └── store.js            # Unified JSON + MongoDB storage layer
│   ├── routes/
│   │   └── index.js            # /api router
│   ├── services/
│   │   ├── scraper.service.js  # Playwright scraping (categories + products)
│   │   └── images.service.js   # Image download + dedupe by hash
│   ├── utils/
│   │   ├── http.js             # axios instance with UA + timeouts
│   │   ├── logger.js           # winston logger
│   │   └── retry.js            # exponential backoff retry
│   └── server.js               # Express bootstrap
├── .env.example
├── package.json
└── README.md
```

---

## 2. Setup

```bash
cd scraper
cp .env.example .env
npm install
npx playwright install chromium     # one-time browser download
```

### Environment variables (`.env`)

| Var | Default | Purpose |
|---|---|---|
| `PORT` | `4000` | HTTP port |
| `STORAGE_DRIVER` | `json` | `json` (file) or `mongo` |
| `MONGO_URI` | `mongodb://localhost:27017/pipa_scraper` | Only when driver=mongo |
| `SCRAPE_BASE_URL` | `https://pipajewellery.dm2buy.com` | Target site |
| `SCRAPE_CONCURRENCY` | `4` | Parallel product detail fetches |
| `SCRAPE_RETRIES` | `3` | Retries per failed request |
| `SCRAPE_DELAY_MS` | `400` | Politeness delay between requests |
| `PUBLIC_BASE_URL` | `http://localhost:4000` | Used to build local image URLs |
| `CRON_SCHEDULE` | `0 3 * * *` | Daily 3 AM sync (any cron expression) |
| `CRON_ENABLED` | `true` | Toggle cron without redeploy |
| `RATE_LIMIT_MAX` | `120` | Requests per minute per IP |

---

## 3. Run

```bash
# Start API + cron
npm start

# Run a one-off scrape from the CLI
npm run scrape

# Trigger scrape via HTTP (returns 202 immediately)
curl -X POST http://localhost:4000/api/sync
curl http://localhost:4000/api/sync/status
```

---

## 4. REST API

All endpoints return JSON and include permissive CORS (`Access-Control-Allow-Origin: *`).

### `GET /api/health`
```json
{ "success": true, "status": "ok", "time": "2026-05-23T10:00:00.000Z" }
```

### `GET /api/categories`
```json
{
  "success": true,
  "count": 6,
  "data": [
    { "slug": "earrings", "name": "Earrings", "url": "https://pipajewellery.dm2buy.com/collection/earrings", "productCount": 24 }
  ]
}
```

### `GET /api/products?category=earrings&q=hoop&page=1&limit=20`
```json
{
  "success": true,
  "pagination": { "page": 1, "limit": 20, "total": 24, "pages": 2 },
  "count": 20,
  "data": [
    {
      "id": "lumiere-hoop-earrings",
      "name": "Lumière Hoop Earrings",
      "description": "Hand-finished gold hoops…",
      "price": 6700,
      "currency": "INR",
      "category": "Earrings",
      "categorySlug": "earrings",
      "url": "https://pipajewellery.dm2buy.com/product/lumiere-hoop-earrings",
      "images": ["https://cdn.dm2buy.com/…/1.jpg"],
      "localImages": ["http://localhost:4000/images/ab12cd34ef.jpg"]
    }
  ]
}
```

### `GET /api/products/:id`
Returns a single product object (404 if missing).

### `POST /api/sync`
Triggers a background scrape. Responds `202 Accepted` immediately.

### `GET /api/sync/status`
```json
{
  "success": true,
  "state": {
    "running": false,
    "lastStartedAt": "2026-05-23T03:00:00.000Z",
    "lastFinishedAt": "2026-05-23T03:04:12.000Z",
    "lastError": null,
    "lastStats": { "categories": 6, "products": 142 }
  }
}
```

---

## 5. Use From Your Frontend / Flutter

**Web (TanStack / React):**
```ts
const res = await fetch('http://localhost:4000/api/products?category=earrings');
const json = await res.json();
```

**Flutter:**
```dart
final res = await http.get(Uri.parse('http://10.0.2.2:4000/api/products?page=1'));
final data = jsonDecode(res.body);
```

---

## 6. Anti-Block & Performance Notes

- Realistic `User-Agent` + `Accept-Language` headers
- Headless Chromium with `--disable-blink-features=AutomationControlled`
- Auto-scroll to trigger lazy image loaders
- Exponential-backoff retries (`SCRAPE_RETRIES`)
- Concurrent product detail fetches via `p-limit` (`SCRAPE_CONCURRENCY`)
- Per-request politeness delay (`SCRAPE_DELAY_MS`)
- De-duplication by product URL + slugified `id`
- Image dedupe by SHA-1 of source URL (re-runs skip already-downloaded files)
- Express rate limiter on the public API (`RATE_LIMIT_MAX`/min per IP)
- `helmet` + `compression` for production hardening

If the target site blocks you, increase `SCRAPE_DELAY_MS`, lower
`SCRAPE_CONCURRENCY`, or rotate `USER_AGENT` / use a proxy.

---

## 7. Switching to MongoDB

```env
STORAGE_DRIVER=mongo
MONGO_URI=mongodb://localhost:27017/pipa_scraper
```

Restart — the same API endpoints work; data is persisted via Mongoose with
unique indexes on `categories.slug` and `products.id`.
