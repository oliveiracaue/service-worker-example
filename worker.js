/**
 * Constantes para parametrização do Worker
 */
const
   VERSION = '1.0.0'
  ,CACHE_NAME = `sw-${VERSION}`
  ,URLS = ['/'];

/* Primeiro evento escutado */
self.addEventListener('install', async (event) => {
  console.log('Install:', event)
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(URLS);
      })
      .catch(error => {
        console.log(error)
      })
  )
});

/* Segundo evento escutado */
self.addEventListener("activate", function activator(event) {
  console.log('Activate:', event)
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter(key => {
              return key.indexOf(CACHE_NAME) !== 0
            })
            .map(key => {
              console.log(key)
              return caches.delete(key)
            })
        )
      })
  );

  console.log("Service Worker has successful activated");
});

/*
  Evento escutado para tratar todas as requisições que estão em cache
  Caso seja executado uma requisição e for a mesma que esteja em cache, retorna o que já está armazenado
*/
self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        return response || fetch(event.request)
      })
  )
})

/*
  Evento escutando quando o Service Worker recebe uma mensagem do contexto global
*/
self.addEventListener('message', event => {
  console.log('Received a message From main', JSON.parse(event.data))
})