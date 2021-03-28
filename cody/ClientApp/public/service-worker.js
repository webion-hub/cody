
const cacheName = 'cody-cache-v1';
const urlsToCache = [
  '/images/forest.webp',
];


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache => cache.addAll(urlsToCache))
  );
  console.log(`sw - cached ${urlsToCache}`);
});

self.addEventListener('activate', _ => {
  console.log('sw activated');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        return response
          ? response
          : fetch(event.request);
      }
    )
  );
});