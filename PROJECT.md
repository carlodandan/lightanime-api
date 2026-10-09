# Anivexa API - Project Specification & Codebase Reference

## 1. Project Directory & File Inventory

```text
lightanime-api/
├── .env.example              # Template environment variables
├── .gitignore                # Git exclusions
├── package.json              # NPM package manifest (ES module: "type": "module")
├── server.js                 # Node.js HTTP server wrapper for local development
├── index.js                  # Cloudflare Worker fetch handler & central router
├── api/                      # Vercel serverless / edge function adapters
│   ├── handler.js            # Vercel Edge Runtime adapter
│   └── index.js              # Vercel Node Serverless adapter
├── core/                     # Common utilities, catalog resolvers & caching
│   ├── anilist.js            # AniList GraphQL client with in-memory memoization
│   ├── episode-cache.js      # Smart episode cache manager with background revalidation
│   ├── episode-strategy.js   # Provider aggregation, concurrency deduplication & alias mapping
│   ├── mapper.js             # Cross-platform anime ID mapper (ARM + AniList relations)
│   ├── new-provider-utils.js # Fuzzy matching, tokenization, entity decoding, prequel offsets
│   ├── smartcache.js         # Multi-tier cache (memory + disk + Upstash Redis)
│   └── wreq.js               # TLS/fingerprint client abstraction (wreq-js wrapper)
├── extractors/               # Video stream extractors & decryptors
│   ├── byse.js               # Byse extractor (ECDH, WebCrypto, custom block hashing)
│   ├── datasv.js             # DataSv extractor for play.echovideo.ru
│   ├── flixcloud.js          # FlixCloud extractor (WASM LEB128 parsing, XOR decryptor)
│   ├── index.js              # Video extractor registry & matcher
│   ├── megaplay.js           # MegaPlay extractor (AES-CBC, script string parsing, HMAC)
│   ├── nova.js               # Nova extractor (AES-128-CBC)
│   ├── vidmoly.js            # Vidmoly regex m3u8 extractor
│   └── vidplay.js            # VidPlay extractor for play.echovideo.ru
├── providers/                # Streaming source scrapers (12 providers)
│   ├── anikoto.js            # AniKoto provider
│   ├── animedunya.js         # AnimeDunya provider (MAL-backed)
│   ├── animegg.js            # AnimeGG provider
│   ├── animenosub.js         # AnimeNoSub provider
│   ├── animeonsen.js         # AnimeOnsen provider (DASH/HLS)
│   ├── anipm.js              # Ani.pm provider (Settlar embed)
│   ├── aniwaves.js           # AniWaves provider
│   ├── anizone.js            # AniZone provider
│   ├── kickassanime.js       # KickAssAnime provider
│   ├── mkissa.js             # MKissa provider (AES crypto, captcha handling)
│   ├── reanime.js            # ReAnime provider (FlixCloud streams)
│   └── senshi.js             # Senshi provider (VidCloud streams)
└── docs/                     # Static documentation & landing page assets
    ├── index.html            # API documentation UI
    ├── landing.html          # Project landing page
    ├── logo.svg              # Project logo
    └── style.css             # Stylesheet for docs and landing page
```

---

## 2. Component Breakdown

### 2.1 Entry Points
- **`index.js`**: Core Worker entry point. Implements `fetch(request, env, ctx)` handler:
  - CORS preflight (`OPTIONS` -> 204).
  - Routes: `/`, `/docs`, `/map/:anilistId`, `/episodes/:anilistId`, `/episodes/:providers.../:anilistId`, `/watch/:provider/:id/:audio/:ep`, `/stream/reanime/...`, `/captcha/mkissa`.
  - Background caching & in-flight promise deduplication.
- **`server.js`**: Local development server using Node.js `node:http`. Transforms incoming Node `http.IncomingMessage` into a standard web standard `Request` object and invokes `index.js#fetch`.

### 2.2 Core Modules
- **`core/anilist.js`**:
  - Resolves AniList media by ID using AniList GraphQL API (`https://graphql.anilist.co`).
  - Fallback to AniList Web scraping (`https://anilist.co/graphql` with CSRF token extraction) if the public API fails.
  - In-flight request deduplication and memory caching.
- **`core/mapper.js`**:
  - Fetches ID mappings from ARM API v2 (`https://arm.haglund.dev/api/v2/ids`).
  - Fetches recursive AniList franchise relations (prequels, sequels, spin-offs, side stories).
  - Computes deterministic franchise anchor and ID.
- **`core/smartcache.js`**:
  - L1: In-memory Map (max 800 keys with LRU/FIFO eviction).
  - L2: Filesystem JSON storage (local Node only).
  - L3: Upstash Redis REST API over HTTPS `fetch`.
  - Dynamic TTLs based on anime release status.
- **`core/episode-cache.js`**:
  - Orchestrates provider aggregation with stale-while-revalidate background refresh.
  - Checks if new episodes have aired based on AniList `nextAiringEpisode` or AniZip data.
  - Utilizes `ctx.waitUntil` for asynchronous background updates.
- **`core/new-provider-utils.js`**:
  - Text normalization, Dice coefficient score, Unicode bigram similarity, title marker conflict detection (seasons, parts, cours, movies, specials, roman numerals).
  - Prequel episode offset calculation to map continuous provider episode numbering to seasonal AniList IDs.
- **`core/wreq.js`**:
  - Wraps `wreq-js` to establish TLS-impersonated browser sessions.
  - *Migration Note*: In Cloudflare Workers, `wreq-js` native bindings cannot load; must gracefully fall back to web-standard `fetch` with header preservation and cookie management.

---

## 3. Data Models & Response Schemas

### 3.1 Metadata Mapping (`GET /map/:id`)
```json
{
  "mappings": {
    "id": 21,
    "title": "ONE PIECE",
    "type": "tv",
    "format": "TV",
    "episodes": null,
    "malId": 21,
    "aniId": 21,
    "anidbId": 69,
    "animePlanetId": "one-piece",
    "kitsuId": 12,
    "imdbId": "tt0388629",
    "themoviedbId": 37854,
    "thetvdbId": 81797,
    "synonyms": [...],
    "franchise": [...]
  }
}
```

### 3.2 Episode Aggregation (`GET /episodes/:id`)
```json
{
  "page": 1,
  "type": "all",
  "mappings": { ... },
  "mkissa": { "meta": { ... }, "episodes": { "sub": [...], "dub": [...] } },
  "reanime": { "meta": { ... }, "episodes": { "sub": [...], "dub": [...] } },
  "kaa": { "meta": { ... }, "episodes": { "sub": [...], "dub": [...] } },
  ...
}
```

### 3.3 Stream Links (`GET /watch/:provider/:id/:audio/:provider-:ep`)
```json
{
  "anilistId": 21,
  "episode": 1,
  "audio": "sub",
  "streams": [
    {
      "url": "https://...",
      "type": "hls",
      "server": "...",
      "quality": "1080p",
      "headers": { "Referer": "..." },
      "subtitles": [
        { "url": "https://...", "label": "English", "srclang": "en" }
      ]
    }
  ]
}
```

---

## 4. Configuration & Environment Variables

| Variable | Type | Default | Description |
|---|---|---|---|
| `CACHE_ENABLED` | Boolean | `false` | Enables cache lookups and storage. |
| `DEFAULT_REDIS_TTL` | Number | `900` | Fallback Redis expiry in seconds. |
| `UPSTASH_REDIS_REST_URL` | String | `""` | Upstash Redis REST endpoint. |
| `UPSTASH_REDIS_REST_TOKEN` | String | `""` | Upstash Redis REST bearer token. |
| `PORT` | Number | `4000` | Port for local dev server (`server.js`). |
| `MKISSA_WREQ_REQUIRED` | String | `"0"` | If `"1"`, enforce `wreq-js` on MKissa requests. |
| `SENSHI_WREQ_BROWSER` | String | `"chrome_149"` | Browser profile for Senshi TLS spoofing. |
| `ANIPM_WREQ_BROWSER` | String | `"chrome_149"` | Browser profile for Ani.pm TLS spoofing. |

---

## 5. Cloudflare Workers Migration Plan Checklist
- [ ] Create `wrangler.jsonc` / `wrangler.toml` with `nodejs_compat` compatibility flag.
- [ ] Safe-guard `core/wreq.js`: catch `wreq-js` native binding load failures and supply web-standard `fetch` session fallback.
- [ ] Eliminate `node:child_process` in `providers/animedunya.js`: use async `fetchHtml` with browser headers.
- [ ] Guard `node:vm` in `extractors/megaplay.js` so it doesn't fail under Cloudflare Workers' VM stub.
- [ ] Adapt `core/smartcache.js`: safely handle `env` bindings in addition to `process.env`; avoid static top-level filesystem access.
- [ ] Support static assets (`/`, `/docs`, `/style.css`, `/logo.svg`) directly inside Cloudflare Workers.
- [ ] Update `package.json` scripts and devDependencies for Cloudflare Workers / Wrangler.
- [ ] Create `MIGRATE.md` documenting the full migration architecture, operational changes, and deployment guide.
- [ ] Test all endpoints across providers and extractors to verify zero functional regression.
