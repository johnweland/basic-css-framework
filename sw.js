const version = "v1";
const cacheAssets = [];

/**
 * Install service worker
 * @param {event} event
 * 
 * @return {void}
 */
self.addEventListener("install", (event) => {});

/**
 * When service worker registers, clean out cache files form older cache
 * @param {event} event
 * 
 * @return {array} caches
 */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((versions) => {
      return Promise.all(
        versions.map((cache) => {
          if (cache != version) {
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
});

/**
 * Cache static files from request/response
 * @param {event} event
 * 
 * @return {object} response
 */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches
          .open(version)
          .then((cache) => {
            cache.put(event.request, clone);
          });
        return response;
      })
      .catch(() => caches.match(event.request).then((response) => response)),
  );
});
