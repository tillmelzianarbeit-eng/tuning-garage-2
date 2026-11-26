// Pixel Tuning Garage – Service Worker (installierbare App + offline spielbar)
// Strategie "Netz zuerst": Online kommt immer die neueste Version vom Server,
// der Cache wird nur benutzt, wenn kein Netz da ist. Ein Versionssprung ist
// deshalb nur nötig, wenn sich die Liste FILES ändert.
const CACHE = 'ptg-v1';
const FILES = ['./', 'index.html', 'drift.html', 'impressum.html', 'datenschutz.html', 'legal.css', 'manifest.webmanifest',
  'fonts/PressStart2P-Regular.woff2', 'fonts/VT323-Regular.woff2',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png', 'icons/apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); } return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true })));
});
