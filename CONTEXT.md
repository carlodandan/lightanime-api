# Anivexa API - Context & System Architecture

## 1. System Overview
**Anivexa API** is an anime streaming aggregator and metadata proxy. It provides a unified RESTful interface over 12 anime streaming sources and metadata catalogs.

The primary identifier across the system is the **AniList ID**. All anime lookups, episode listings, and streaming links are anchored to AniList media entries, complemented by:
- **ARM (Anime Relations Mapper v2)**: Cross-platform ID mapping (`malId`, `tvdbId`, `tmdbId`, `kitsuId`, `anidbId`, etc.)
- **AniZip**: Episode-level metadata (episode titles, thumbnails, air dates, runtimes, fillers)
- **AniList GraphQL**: Primary metadata, release status (`FINISHED`, `RELEASING`, `HIATUS`, `NOT_YET_RELEASED`), sequels/prequels for episode offset calculation

---

## 2. API Surface & Endpoints

### 2.1 Metadata & Discovery
- `GET /`: Returns API status, active version, cache status, registered provider list, and available routes. When requested with `Accept: text/html` in web browsers, serves the landing page.
- `GET /docs`: Interactive API documentation and explorer.
- `GET /style.css`, `GET /logo.svg`: Assets for docs and landing pages.
- `GET /map/:anilistId`: Returns comprehensive ID mappings and franchise relationship links across AniList, MyAnimeList, TheTVDB, TheMovieDB, Kitsu, AniDB, Simkl, and Anime-Planet.

### 2.2 Episode Lists
- `GET /episodes/:anilistId`: Aggregates all 12 providers concurrently for the specified anime, returning metadata, cross-platform mappings, and sub/dub episode arrays per provider.
- `GET /episodes/:provider[/:provider...]/:anilistId?map=true|false`: Filtered episode lookup for one or more specific providers (e.g., `/episodes/kaa/anikoto/21`). Supports optional `?map=false` query parameter to omit heavy mapping objects.

### 2.3 Video Streams
- `GET /watch/:provider/:anilistId/(sub|dub)/:provider-:ep`: Extracts direct stream sources (HLS `.m3u8`, MP4, DASH), quality variants, audio language, subtitles (`.vtt`), and HTTP playback headers for a specific episode.
  - Providers: `mkissa`, `reanime`, `anikoto`, `animegg`, `animenosub`, `anizone`, `aniwaves`, `senshi`, `kaa`, `animedunya`, `animeonsen`, `anipm`.
- `GET /stream/reanime/:id/(sub|dub)/:ep`: Direct HTTP 302 redirect to the upstream HLS manifest.
- `GET /captcha/mkissa`: Captcha solving challenge pass-through for MKissa.

---

## 3. Provider Architecture

| Provider | Key Identifier | Upstream Base | Protocols / Features | Primary Fallback / Matching |
|---|---|---|---|---|
| **mkissa** | Custom slug / ID | `https://kisskisa.com` | HLS, AES cipher/decipher, captcha handling | Title search, season/part markers |
| **reanime** | `anime_id` | `https://reanime.to` | HLS, Flixcloud extractor, XOR manifests | AniList cover image regex, title search |
| **anikoto** | Custom slug | `https://anikototv.to` | MegaPlay extractor (AES-CBC, HMAC signing) | Nekostream mapper, AniZip, fuzzy title |
| **animegg** | Custom slug | `https://www.animegg.org` | HLS, MP4 | Title search, Dice coefficient |
| **animenosub** | Custom slug | `https://animenosub.to` | Vidmoly, Byse, DataSv, Nova, Vidplay | Title search, token matching |
| **anizone** | Custom slug | `https://anizone.to` | HLS, subtitles | Title search, episode counting |
| **aniwaves** | Custom slug | `https://aniwaves.to` | MegaPlay, Vidplay, DataSv | Title search, alias resolution |
| **senshi** | `malId` | `https://senshi.to` | VidCloud (`s.vidcloud.se`), signed streams | Direct MyAnimeList ID |
| **kaa** (KickAssAnime)| Custom slug | `https://kaa.lt` | HLS (`hls.krussdomi.com`) | Title search, fuzzy scoring |
| **animedunya** | `malId` | `https://anime-dunya.com` | HLS, internal video embeds | Direct MyAnimeList ID |
| **animeonsen** | Custom slug | `https://www.animeonsen.xyz` | DASH, HLS, session cookies | Meta token extraction, AniList ID |
| **anipm** | `malId` / `aid` | `https://ani.pm` | Settlar embed (`embed.settlar.io`) | AniList ID, MAL ID |

---

## 4. Extractors & Cryptographic Decoders

The system includes multiple custom video extractors located in `extractors/`:
1. **byse.js**:
   - Custom permutation and hash algorithm with block rotations (`mix`, `hash`).
   - WebCrypto ECDH / AES key derivation.
2. **datasv.js**:
   - Extracts MP4 streams from `play.echovideo.ru/embed-20/`.
3. **flixcloud.js**:
   - Decodes FlixCloud manifests.
   - Parses WebAssembly sections directly via LEB128 integer decoding to obtain the XOR playlist key.
   - Unwraps image-steganography wrapped segments (`.png` / `.webp`).
4. **megaplay.js**:
   - Extracts from `megaplay.*`.
   - AES-256-CBC decryption with script strings extraction.
   - HMAC SHA-256 token signing.
5. **nova.js**:
   - AES-128-CBC decryption (`6b69...` key, `3132...` IV).
6. **vidmoly.js**:
   - Regex extraction of HLS master manifests from embed HTML.
7. **vidplay.js**:
   - Extracts HLS sources from `play.echovideo.ru/embed-[01]/`.

---

## 5. Caching & Background Invalidation

The caching system (`core/smartcache.js` + `core/episode-cache.js`) implements a multi-tier caching strategy:
- **L1 In-Memory**: FIFO/LRU memory Map with max 800 items.
- **L2 Storage**:
  - Local Node: Disk cache in `.cache/*.json`.
  - Edge / Distributed: Upstash Redis REST API (`SET`, `GET`, `DEL`, `KEYS` via HTTP fetch).
  - Cloudflare Workers: Direct Cloudflare KV binding (`CACHE_KV`).
- **Dynamic TTL Strategy**:
  - `FINISHED` anime: 7-day episode TTL, 30-day map TTL.
  - `RELEASING` anime: 2-hour TTL with 15-minute background refresh.
  - Airing window: 5-minute probe interval when close to `nextAiringEpisode.airingAt`.
  - Watch streams: 3-hour TTL (or 60 seconds for signed streams).
- **Background Stale-While-Revalidate**:
  - Uses `ctx.waitUntil` (Cloudflare Workers) or floating Promises (Node) to update caches without blocking user requests.
  - Concurrency deduplication with in-flight Promise tracking maps (`watchInflight`, `inflight`).

---

## 6. Target Deployment Runtime: Cloudflare Workers
Cloudflare Workers is an edge compute platform executing on the V8 isolate-based runtime (`workerd`).
Key operational constraints for Cloudflare Workers:
1. **No Node.js Native Addons**: `.node` binaries (such as `wreq-js`'s napi Rust bindings) cannot be loaded.
2. **No Local Filesystem**: `node:fs` calls (`readFileSync`, `writeFile`) fail at runtime.
3. **No Process Spawning**: `node:child_process` does not exist (`execSync` cannot run).
4. **No Code Generation / VM Sandboxing**: `node:vm` is a non-functional stub and `eval()` is restricted.
5. **Environment Context**: Variables are accessed via the `env` object passed to `fetch(request, env, ctx)`, not solely `process.env`.
6. **Execution Lifetime**: Non-blocking background tasks must be scheduled via `ctx.waitUntil(promise)`.
