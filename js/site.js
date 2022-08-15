if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/TodoList-Pwa/service_worker.js", { scope: "/TodoList-Pwa/" })
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
    console.log("full screen enabled")
    
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
   
     
  }
  else {
    //output.innerText = 'Fullscreen not available or enabled on this device.';
  }
  