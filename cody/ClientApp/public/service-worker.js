const codyCache = 'cody-cache-v1';
const urlsToCache = [
  '/images/forest.webp',
  '/icons/cody-lg.webp',
  '/icons/cody-sm.png',
  '/offline.html',
  '/offline.css',
  '/index.css',
  '/index.js',
];


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(codyCache)
      .then(cache => cache.addAll(urlsToCache))
  );
});


self.addEventListener('fetch', (event) => {
  const {request} = event;
  event.respondWith(
    getResponse(request)
  );
});


/**
 * @param {RequestInfo} request 
 * @returns {Promise<Response>}
 */
async function getResponse(request) {
  return caches
    .match(request)
    .then(response => {
      if (response)
        return response;

      return fetch(request)
        .then(response => {
          maybeCacheResponse(request.url, response.clone());
          return response;
        })
        .catch(_ => getOfflinePage())
    });
}


/**
 * @param {string} requestUrl
 * @param {Response} response
 * @returns {Promise<void>}
 */
 async function maybeCacheResponse(requestUrl, response) {
  if (!isCacheable(requestUrl))
    return Promise.resolve();

  return caches
    .open(codyCache)
    .then(cache => cache.put(requestUrl, response));
}

/**
 * @param {string} requestUrl 
 */
function isCacheable(requestUrl) {
  const cacheableUrls = [
    /https:\/\/.+\/static\//,
  ];

  return cacheableUrls.some(regex => {
    return regex.test(requestUrl);
  });
} 


/**
 * @returns {Promise<Response>}
 */
async function getOfflinePage() {
  return caches
    .open(codyCache)
    .then(cache => cache.match('/offline.html'));
}