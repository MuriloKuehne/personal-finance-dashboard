// Service Worker for Personal Finance Dashboard PWA
// Version: 1.0.0

const CACHE_NAME = 'finance-dashboard-v1';
const RUNTIME_CACHE = 'finance-dashboard-runtime-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((error) => {
        console.log('Cache install failed:', error);
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return (
              cacheName.startsWith('finance-dashboard-') &&
              cacheName !== CACHE_NAME &&
              cacheName !== RUNTIME_CACHE
            );
          })
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - network first strategy for API, cache first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Handle static assets with cache-first strategy
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.webp')
  ) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  // Handle HTML pages with network-first strategy
  if (
    request.headers.get('accept')?.includes('text/html') ||
    url.pathname === '/' ||
    url.pathname.startsWith('/transactions') ||
    url.pathname.startsWith('/categories') ||
    url.pathname.startsWith('/settings') ||
    url.pathname.startsWith('/login') ||
    url.pathname.startsWith('/signup')
  ) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Default: network first
  event.respondWith(networkFirstStrategy(request));
});

// Network-first strategy: try network, fallback to cache
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // If it's a navigation request and we're offline, return offline page
    if (request.mode === 'navigate') {
      return new Response(
        `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Offline - Personal Finance Dashboard</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                background: #0f0f0f;
                color: #f5f5f5;
                text-align: center;
                padding: 20px;
              }
              .container {
                max-width: 400px;
              }
              h1 { font-size: 24px; margin-bottom: 16px; }
              p { color: #a3a3a3; line-height: 1.6; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>You're Offline</h1>
              <p>Please check your internet connection and try again.</p>
            </div>
          </body>
        </html>
        `,
        {
          headers: { 'Content-Type': 'text/html' },
        }
      );
    }

    throw error;
  }
}

// Cache-first strategy: try cache, fallback to network
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    throw error;
  }
}

// Handle service worker updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

