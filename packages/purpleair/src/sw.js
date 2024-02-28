addEventListener('fetch', function (event) {
  if (event.request.url.startsWith(globalThis.registration.scope)) {
    event.respondWith(
      fetch(event.request).then(async response => {
        if (response.ok) {
          console.debug(`caching ${event.request.url}`);
          const cache = await caches.open('v1');
          cache.put(event.request, response.clone());
        }
        return response;
      }).catch(error => {
        console.error(`failed to fetch ${event.request.url}: ${error}`);
        return caches.match(event.request)
      })
    );
  }
});