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
  
  // worker.addEventListener('message', getServiceWorkerMessage)

  // console.log(result)
  
//   serviceWorker.startMessages();
//   serviceWorker.addEventListener("message", getServiceWorkerMessage);  
//   serviceWorker.controller.addEventListener('statechange', (event) => {
//     console.log('SWController state:', event)
//   })
  
//   console.log("SW:", serviceWorker);
//   console.log("SW:Controller:", serviceWorker.controller);
  
//   serviceWorker
//     .getRegistrations()
//     .then((result) => console.log("Registrations:", result))
//     .catch((error) => console.log(error));


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