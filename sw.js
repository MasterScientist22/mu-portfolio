// Service Worker for Portfolio - Basic caching strategy
const CACHE_NAME = 'portfolio-cache-v3';
const urlsToCache = [
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

// Install event - cache essential files
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function(cache) {
				return cache.addAll(urlsToCache.map(url => new Request(url, {cache: 'reload'})));
			})
			.catch(function() {
				// Cache failed, that's okay - site still works
			})
	);
	self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName) {
					if (cacheName !== CACHE_NAME) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
	return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', function(event) {
	// Skip cross-origin requests
	if (!event.request.url.startsWith(self.location.origin)) {
		return;
	}

	event.respondWith(
		caches.match(event.request)
			.then(function(response) {
				// Cache hit - return response
				if (response) {
					return response;
				}

				// Clone the request
				var fetchRequest = event.request.clone();

				return fetch(fetchRequest).then(
					function(response) {
						// Check if valid response
						if (!response || response.status !== 200 || response.type !== 'basic') {
							return response;
						}

						// Clone the response
						var responseToCache = response.clone();

						// Cache images and assets
						if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg|webp|css|js|woff|woff2)$/)) {
							caches.open(CACHE_NAME)
								.then(function(cache) {
									cache.put(event.request, responseToCache);
								});
						}

						return response;
					}
				);
			})
			.catch(function() {
				// Network failed and not in cache
				return new Response('Offline - please check your connection', {
					status: 503,
					statusText: 'Service Unavailable',
					headers: new Headers({
						'Content-Type': 'text/plain'
					})
				});
			})
	);
});
