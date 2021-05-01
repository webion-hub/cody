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

  '/illustrations/offline.svg',
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
 * @param {Request} request 
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


/**
 * @param {Request} request 
 * @returns {Promise<Response>}
 */
async function fetchNonCachedRequest(request) {
  return fetch(request)
    .then(async response => {
      return await handleResponse(request, response);
    })
    .catch(_ => getOfflinePage());
}

/**
 * @param {Request} request 
 * @param {Response} response 
 * @returns {Promise<Response>}
 */
async function handleResponse(request, response) {
  const error = await maybeGetErrorPage(response.status);
  if (error)
    return error;

  maybeCacheResponse(request.url, response.clone());
  return response;
}

/**
 * @param {number} status 
 * @returns {Promise<Response?>}
 */
async function maybeGetErrorPage(status) {
  const errorPages = {
    502: getServerNotAvailablePage,
  };

  return errorPages[status]?.();
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
 * @returns {boolean}
 */
function isCacheable(requestUrl) {
  const cacheableUrls = [
    /https:\/\/.+\/static\//,
    /https:\/\/.+\/illustrations\//,
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
 * @param {RequestInfo} url
 * @returns {Promise<Response>}
 */
async function getCachedPage(url) {
  return caches
    .open(codyCache)
    .then(cache => cache.match(url));
}