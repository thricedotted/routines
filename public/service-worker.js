const CACHE_NAME = 'routines-cache-v1'
const urlsToCache = [
  '/',
  '/global.css',
  '/bundle.css',
  '/bundle.js',
  '/fonts/MaterialIcons-Regular.woff',
  '/fonts/MaterialIcons-Regular.woff2',
  '/fonts/work-sans-v5-latin-300.woff',
  '/fonts/work-sans-v5-latin-regular.woff',
  '/fonts/work-sans-v5-latin-500.woff',
  '/fonts/work-sans-v5-latin-600.woff',
  '/fonts/work-sans-v5-latin-700.woff',
  '/fonts/work-sans-v5-latin-300.woff2',
  '/fonts/work-sans-v5-latin-regular.woff2',
  '/fonts/work-sans-v5-latin-500.woff2',
  '/fonts/work-sans-v5-latin-600.woff2',
  '/fonts/work-sans-v5-latin-700.woff2'
]

self.addEventListener('install', function(event) {
  // Perform install steps
  async function cacheUrls() {
    const cache = await caches.open(CACHE_NAME)
    console.log('yay cached')
    return cache.addAll(urlsToCache)
  }

  event.waitUntil(cacheUrls())
})

self.addEventListener('fetch', function(event) {
  async function matchCache() {
    const response = await caches.match(event.request)
    return response ? response : event.request
  }

  event.respondWith(matchCache())
})