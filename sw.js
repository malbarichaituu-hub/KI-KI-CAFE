var V="kiki-v1",SHELL=["./","index.html","manifest.json","icon-192.png","icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(SHELL)}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
self.addEventListener("fetch",function(e){var r=e.request;
 if(r.method!=="GET"||r.destination==="video"||r.headers.has("range"))return;
 e.respondWith(fetch(r).then(function(res){if(res&&res.ok){var cp=res.clone();caches.open(V).then(function(c){c.put(r,cp)})}return res})
  .catch(function(){return caches.match(r).then(function(m){return m||caches.match("index.html")})}))});
