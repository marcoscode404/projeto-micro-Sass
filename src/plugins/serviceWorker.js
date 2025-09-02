const registerServiceWorker = () => {
    console.log('Registrando Service worker');
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker
          .register('/sw.js')
          .then(function (registration) {
            // Registration was successful
          })
          .catch(function (err) {
            // registration failed :(
            console.log(err + 'error')
          })
      })
    }
}

// const registerServiceWorker = () => {};

registerServiceWorker()

export default registerServiceWorker;