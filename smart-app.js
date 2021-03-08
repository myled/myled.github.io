
var newCacheStorageKey = 'spV5_030805';

var cacheList=[
    'index.html',
    'favicon.png',
    'images/main_bg.png',
    'images/n_icon_kzq.png',
    'logo.png',
    'css/smart.css',
    'js/smart1.min.js',
    'locales/strings.properties',
    'locales/strings_zh.properties',
    'locales/strings_en.properties',
    'locales/strings_ko.properties',
    'locales/strings_ru.properties',
    'locales/strings_de.properties',
    'locales/strings_fr.properties',
    'locales/strings_es.properties',
    'locales/strings_pt.properties',
    'locales/strings_ja.properties',
    'locales/strings_ar.properties',
    'tmpls/start.html'
];


self.addEventListener('fetch', function(e) {
    console.log("FETCH:" + e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});



self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(newCacheStorageKey).then(function(cache) {
            console.log("addCacheList");
            return cache.addAll(cacheList);
        }).then(
            function() {
                console.log("skipWating");
                self.skipWaiting();
            }
        )
    );
});


self.addEventListener('activate', function (event) {
    console.log("in activate");
    event.waitUntil(
        Promise.all([
            // 更新客户端
            self.clients.claim(),
            // 清理旧版本
            caches.keys().then(function (cacheList) {
                return Promise.all(
                    cacheList.map(function (cacheName) {
                        if (cacheName !== newCacheStorageKey) {
                            console.log("CLEAR:" + cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});
