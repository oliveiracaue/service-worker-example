/** @param {MessageEvent} messageEvent */
function getServiceWorkerMessage(messageEvent) {
  console.log("Received Message From Worker:", messageEvent.data);
}

const workerPath = "./worker.js";

const { serviceWorker } = window.navigator;


serviceWorker.register(workerPath, {})
.then(result => {
  
  const worker = result.active;

  worker.postMessage('{"name": "worker"}');

  // Uma requisição aleatória para demonstração do cache do Service Worker
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => console.log(json))

})
.catch(error => console.log(error));


serviceWorker
  .getRegistrations()
  .then(registrations => {
    console.log('registrations:', registrations)
    registrations.forEach(registration => {
      registration.unregister()
    })
  })