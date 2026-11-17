// Service worker mínimo: hace que el celular ofrezca "Instalar" y que la página
// abra rápido aunque haya poca señal. Siempre intenta traer lo nuevo primero.
const CACHE = 'tienda-v1'
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()))
self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok && !req.headers.has('range')) caches.open(CACHE).then((c) => c.put(req, res.clone()))
        return res
      })
      .catch(() => caches.match(req).then((r) => r || caches.match('./'))),
  )
})
