const cacheAssets = "version1";
self.addEventListener("install", function (event) {
  console.log("Service worker installed:", event);
  self.skipWaiting();

  //console.log("caches", caches);
  event.waitUntil(
    caches.open(cacheAssets).then(function (cache) {
      console.log("entered ")
      cache.addAll([
        "/TodoList-Pwa/",
        "/TodoList-Pwa/index.html",
        "/TodoList-Pwa/images/todo.jpg",
        "/TodoList-Pwa/images/TodoappHome.jpg",
        "/TodoList-Pwa/css/style.css",
        "/TodoList-Pwa/js/site.js",
        "/TodoList-Pwa/todo-db.js",
        "/TodoList-Pwa/pages/add/index.html",
        "/TodoList-Pwa/pages/add/script.js",
        "/TodoList-Pwa/pages/add/style.css",
        "/TodoList-Pwa/pages/list/index.html",
        "/TodoList-Pwa/pages/list/script.js",
        "/TodoList-Pwa/pages/list/style.css",
        "/TodoList-Pwa/pages/contactus/index.html",
        "/TodoList-Pwa/pages/contactus/style.css",
        "/TodoList-Pwa/pages/contactus/script.js",
      ]);
    })
  );
});

self.addEventListener("activate", function (event) {
  console.log("Service worker activated:", event);
  event.waitUntil(clients.claim());
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      console.log(cacheNames);
      for (const cacheName of cacheNames) {
        if (cacheName !== cacheAssets) {
          caches.delete(cacheName);
        }
      }
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.open(cacheAssets).then(function (cache) {
      return cache.match(event.request).then(function (cachedResponse) {
        const fetchedResponse = fetch(event.request).then(function (
          networkResponse
        ) {
          if(event.request.method === 'GET')
          {
          
          
          cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        
        });
        return cachedResponse || fetchedResponse;
      });
    })
  );
  // event.respondWith(
  //   caches.match(event.request).then(function (response) {
  //     if(event.request.method === 'GET')
  //     return response || fetch(event.request);
  //   })
  // );
});

self.addEventListener("notificationclick", (event) => {
  console.log("notification", event.notification);
  console.log("action", event.action);

  switch (event.action) {
    case "confirm":
      self.clients
        .matchAll()
        .then((all) => all.map((client) => client.postMessage(event.action)));
      break;
    case "cancel":
      self.clients
        .matchAll()
        .then((all) => all.map((client) => client.postMessage(event.action)));
      break;
  }
});

self.addEventListener("push", (event) => {
  console.log("Push event", event);
  const data = event.data.json();
  console.log("Push data", data);
  event.waitUntil(self.registration.showNotification(data.title));
});

self.addEventListener("sync", (event) => {
  console.log("[sw] bg sync:", event.tag);
  if (event.tag === "my-tag-name") {
    console.log("do what?");
  }
});
