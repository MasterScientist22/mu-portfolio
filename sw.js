// Service Worker for Portfolio
// CACHE_VERSION is replaced with a timestamp at deploy time via portfolio.js self-update trick.
// To bust the cache on every deploy, just update the date string below.
const CACHE_VERSION = '20260610-001'; // ← update this string each deploy (or automate it)
const CACHE_NAME = 'portfolio-cache-' + CACHE_VERSION;

const PRECACHE_URLS = [
	'./',
	'index.html',
	'assets/css/main.css',
	'assets/js/jquery.min.js',
	'assets/js/browser.min.js',
	'assets/js/breakpoints.min.js',
	'assets/js/portfolio.js',
	'images/profile.jpg',
	'images/bg.jpg'
];

// ── Message: respond to SKIP_WAITING from the page ────────────────────────────
self.addEventListener('message', function(event) {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});

// ── Install: pre-cache core assets ──────────────────────────────────────────
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function(cache) {
				return cache.addAll(PRECACHE_URLS.map(url => new Request(url, { cache: 'reload' })));
			})
			.catch(function() {
				// Pre-cache failed — site still works via network
			})
	);
	// Take over immediately, don't wait for old SW to die
	self.skipWaiting();
});

// ── Activate: delete ALL old caches ─────────────────────────────────────────
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames
					.filter(function(name) { return name !== CACHE_NAME; })
					.map(function(name) { return caches.delete(name); })
			);
		}).then(function() {
			// Tell all open tabs to use the new SW immediately
			return self.clients.claim();
		})
	);
});

// ── Fetch: network-first for HTML, cache-first for assets ───────────────────
self.addEventListener('fetch', function(event) {
	// Skip cross-origin requests
	if (!event.request.url.startsWith(self.location.origin)) return;

	const url = new URL(event.request.url);
	const isHTML = event.request.headers.get('Accept') &&
	               event.request.headers.get('Accept').includes('text/html');
	const isAsset = /\.(css|js|woff|woff2|eot|ttf|svg)$/.test(url.pathname);
	const isImage = /\.(jpg|jpeg|png|gif|webp|ico)$/.test(url.pathname);

	if (isHTML) {
		// HTML: network-first → on failure serve stale cache
		event.respondWith(
			fetch(event.request)
				.then(function(response) {
					// Cache the fresh HTML for offline fallback
					var clone = response.clone();
					caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
					return response;
				})
				.catch(function() {
					return caches.match(event.request);
				})
		);
		return;
	}

	if (isAsset) {
		// portfolio.js holds live data — always fetch fresh from network
		if (url.pathname.endsWith('portfolio.js')) {
			event.respondWith(
				fetch(event.request).then(function(response) {
					var clone = response.clone();
					caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
					return response;
				}).catch(function() {
					return caches.match(event.request);
				})
			);
			return;
		}
		// Other CSS/JS/fonts: cache-first (they're versioned by SW cache name)
		event.respondWith(
			caches.match(event.request).then(function(cached) {
				return cached || fetch(event.request).then(function(response) {
					var clone = response.clone();
					caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
					return response;
				});
			})
		);
		return;
	}

	if (isImage) {
		// Images: cache-first with network fallback (images rarely change mid-deploy)
		event.respondWith(
			caches.match(event.request).then(function(cached) {
				return cached || fetch(event.request).then(function(response) {
					if (response && response.status === 200) {
						var clone = response.clone();
						caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
					}
					return response;
				});
			}).catch(function() {
				return new Response('', { status: 404 });
			})
		);
		return;
	}

	// Everything else: network with cache fallback
	event.respondWith(
		fetch(event.request).catch(function() {
			return caches.match(event.request);
		})
	);
});
