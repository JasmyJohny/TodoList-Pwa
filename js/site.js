if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service_worker.js", { scope: "/" })
      .then((registration) => {
        console.log("Success. Scope:", registration.scope);
      })
      .catch((error) => {
        console.log("Failed. Error:", error);
      });
  } else {
    console.log("Service worker is not supported");
  }
  if ('fullscreenElement' in document && 'exitFullscreen' in document && document.fullscreenEnabled) {
  
   
      if (!document.fullscreenElement) {
  
       
        document.documentElement.requestFullscreen()
          .then(() => {
            //message.innerText = 'You are on fullscreen mode now.'
          });
      }
      else {
  
       
        document.exitFullscreen()
          .then(() => {
           // message.innerText = 'You left the fullscreen mode.'
          });
      }
  
  }
  else {
    //output.innerText = 'Fullscreen not available or enabled on this device.';
  }
  