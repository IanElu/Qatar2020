const appVersion = "1.0.8";
const styleLog = {
  base: [
    "color: #fff",
    "background-color: #444",
    "padding: 2px 4px",
    "border-radius: 2px"
  ],
  warning: [
    "color: #eee",
    "background-color: red"
  ],
  success: [
    "background-color: green"
  ]
};
let cacheName = () => `Q2022-${appVersion}`;
let precacheFilesManifest = [
                             { url: "css/reset.css"},
                             { url: "css/styles.css"},
                             { url: "css/flag-icons.css"},
                             { url: "images/android-icon-144x144.png"},
                             { url: "images/android-icon-192x192.png"},
                             { url: "images/android-icon-36x36.png"},
                             { url: "images/android-icon-48x48.png"},
                             { url: "images/android-icon-72x72.png"},
                             { url: "images/android-icon-96x96.png"},
                             { url: "images/apple-icon.png"},
                             { url: "images/apple-icon-114x114.png"},
                             { url: "images/apple-icon-120x120.png"},
                             { url: "images/apple-icon-144x144.png"},
                             { url: "images/apple-icon-152x152.png"},
                             { url: "images/apple-icon-180x180.png"},
                             { url: "images/apple-icon-57x57.png"},
                             { url: "images/apple-icon-60x60.png"},
                             { url: "images/apple-icon-72x72.png"},
                             { url: "images/apple-icon-76x76.png"},
                             { url: "images/apple-icon-precomposed.png"},
                             { url: "images/favicon-16x16.png"},
                             { url: "images/favicon-32x32.png"},
                             { url: "images/favicon-96x96.png"},
                             { url: "images/grupos.jpg"},
                             { url: "images/img_avatar.png"},
                             { url: "images/ms-icon-144x144.png"},
                             { url: "images/ms-icon-150x150.png"},
                             { url: "images/ms-icon-310x310.png"},
                             { url: "images/ms-icon-70x70.png"},
                             { url: "images/flags/4x3/qa.svg"},
                             { url: "images/flags/4x3/ec.svg"},
                             { url: "images/flags/4x3/sn.svg"},
                             { url: "images/flags/4x3/nl.svg"},
                             { url: "images/flags/4x3/gb-eng.svg"},
                             { url: "images/flags/4x3/ir.svg"},
                             { url: "images/flags/4x3/us.svg"},
                             { url: "images/flags/4x3/xx.svg"},
                             { url: "images/flags/4x3/ar.svg"},
                             { url: "images/flags/4x3/sa.svg"},
                             { url: "images/flags/4x3/mx.svg"},
                             { url: "images/flags/4x3/pl.svg"},
                             { url: "images/flags/4x3/fr.svg"},
                             { url: "images/flags/4x3/dk.svg"},
                             { url: "images/flags/4x3/tn.svg"},
                             { url: "images/flags/4x3/es.svg"},
                             { url: "images/flags/4x3/de.svg"},
                             { url: "images/flags/4x3/jp.svg"},
                             { url: "images/flags/4x3/be.svg"},
                             { url: "images/flags/4x3/ca.svg"},
                             { url: "images/flags/4x3/ma.svg"},
                             { url: "images/flags/4x3/hr.svg"},
                             { url: "images/flags/4x3/br.svg"},
                             { url: "images/flags/4x3/rs.svg"},
                             { url: "images/flags/4x3/ch.svg"},
                             { url: "images/flags/4x3/cm.svg"},
                             { url: "images/flags/4x3/pt.svg"},
                             { url: "images/flags/4x3/gh.svg"},
                             { url: "images/flags/4x3/uy.svg"},
                             { url: "images/flags/4x3/kr.svg"},                             
                             { url: "js/vue.js"},
                             { url: "js/app.js"},
                             { url: "favicon.ico"},
                             { url: "index.html"},
                             { url: "manifest.json"}
                            ];
const logger = (text, extra = []) => {
  let style = styleLog.base.join(';') + ';';
  style += extra.join(';');
  console.log(`%c${text}`, style);
};
self.addEventListener("install", evt => {   
  evt.waitUntil(
    caches.open(cacheName()).then(cache => {             
      cache.addAll(precacheFilesManifest.map(m => m.url));         
    }).catch((e) => {
      logger([e, evt.request.url], styleLog.warning);
    })
  );
  self.skipWaiting();
});
self.addEventListener("activate", evt => {    
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key != cacheName()).map(key => caches.delete(key))
      )
    }).catch((e) => {
      logger([e, evt.request.url], styleLog.warning);
    })
  )
});
self.addEventListener('fetch', (event) => {
  event.respondWith((async() => {
    const cache = await caches.open(cacheName);
    try {
        const cachedResponse = await cache.match(event.request);
        if(cachedResponse) {
            console.log('cachedResponse: ', event.request.url);
            return cachedResponse;
        }
        const fetchResponse = await fetch(event.request);
        if(fetchResponse) {
            console.log('fetchResponse: ', event.request.url);
            await cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
        }
    }   catch (error) {
        console.log('Fetch failed: ', error);
        const cachedResponse = await cache.match('/en/offline.html');
        return cachedResponse;
    }
  })());
});