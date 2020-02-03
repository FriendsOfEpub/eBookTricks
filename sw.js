/* https://gist.github.com/kosamari/7c5d1e8449b2fbc97d372675f16b566e */

var APP_PREFIX = "blitzTricks_"
var VERSION = "v1_0_1"
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [
  "/eBookTricks/",
  "/eBookTricks/index.html",
  "/eBookTricks/assets/logo.svg",
  "/eBookTricks/assets/favicon.ico",
  "/eBookTricks/css/styles.css",
  "/eBookTricks/css/print.css",
  "/eBookTricks/js/script.js"
]

// Respond with cached resources
self.addEventListener("fetch", function (e) {
  console.log("fetch request: " + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      return request || fetch(e.request)
    })
  )
})

// Cache resources
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("installing cache: " + CACHE_NAME)
      return cache.addAll(URLS)
    })
  )
})

// Delete outdated caches
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log("deleting cache: " + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})