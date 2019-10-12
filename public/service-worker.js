const CACHE_GROUPS = [
  {
    name: 'app-cache-v1',
    urls: [
      '/',
      '/global.css',
      '/bundle.css',
      '/bundle.js',
      '/manifest.json'
    ],
  },

  {
    name: 'font-cache-v1',
    urls: [
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
  }
]

self.addEventListener('install', event => {
  async function cacheUrls(cacheGroup) {
    const cache = await caches.open(cacheGroup.name)
    return cache.addAll(cacheGroup.urls)
  }

  const allCached = Promise.all(CACHE_GROUPS.map(cacheUrls))

  event.waitUntil(allCached)
})

self.addEventListener('fetch', event => {
  async function matchCache() {
    const response = await caches.match(event.request)
    return response ? response : fetch(event.request)
  }

  event.respondWith(matchCache())
})