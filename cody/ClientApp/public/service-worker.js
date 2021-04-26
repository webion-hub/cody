const codyCache = 'cody-cache-v1';
const urlsToCache = [
  '/images/forest.webp',
  '/images/offline.svg',
  '/images/server_not_available.svg',
  '/icons/cody-lg.webp',
  '/icons/cody-sm.png',

  '/error/offline.html',
  '/error/server_not_available.html',
  '/error/error.css',
  
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

      return fetchNonCachedRequest(request);
    });
}

async function fetchNonCachedRequest(request) {
  return fetch(request)
    .then(async response => {
      return await handleResponse(request, response)
    })
    .catch(_ => getOfflinePage());
}

async function handleResponse(request, response) {
  const error = await maybeGetErrorPage(response.status);
  if (error)
    return error;

  maybeCacheResponse(request.url, response.clone());
  return response;
}

async function maybeGetErrorPage(status) {
  switch (status) {
    case 502: return getServerNotAvailablePage();
    default: return null;
  }
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


async function getServerNotAvailablePage() {
  return getCachedPage('/error/server_not_available.html');
}

async function getOfflinePage() {
  return getCachedPage('/error/offline.html');
}

/**
 * @returns {Promise<Response>}
 */
async function getCachedPage(url) {
  return caches
    .open(codyCache)
    .then(cache => cache.match(url));
}