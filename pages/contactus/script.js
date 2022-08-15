if ("Notification" in window && "serviceWorker" in navigator) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("emails").value;
    const comment = document.getElementById("comment").value;
    const submitBtn = document.getElementById("submitBtn");
    const mandatoryField = document.getElementById("mandatoryField");
    mandatoryField.style.visibility = "none";
    console.log("true");
    console.log(submitBtn);
    var el = document.getElementById("add-task-btn");
  
    if (el) {
      console.log(el);
      el.addEventListener("click", loadNotification, false);
    }
    function loadNotification() {
      console.log("entered");
      if (name === " " || email === " ") {
        mandatoryField.style.visibility = "block";
      } else {
          mandatoryField.style.visibility = 'none'
        const permission = Notification.permission;
        console.log("permission", permission);
        switch (permission) {
          case "granted":
            var title = " Thank you for contacting us";
            var body = " We will get back to you as soon as possible";
            showNotification(title, body);
  
            break;
  
          case "denied":
            notificationBtn.disabled = true;
            break;
  
          case "default":
            requestUserPermission();
            break;
        }
      }
    }
  }
  
  function showNotification(title, body) {
    console.log("show notification");
  
    const options = {
      //: body ? body : "Thanks for subscribing",
      body: body,
      icon: "/Hotel-App/images.todo.jpg",
      image: "/Hotel-App/images/TodoappHome.jpg",
      data: {
        userId: 123,
        userName: "John",
      },
      actions: [
        {
          action: "confirm",
          title: "OK",
          icon: "/Hotel-App/images/tick.png",
        },
      ],
    };
  
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, options);
    });
  }
  
  function requestUserPermission() {
    Notification.requestPermission()
      .then((permission) => {
        console.log("user choice", permission);
        if (permission === "granted") {
          var title = " Thank you for contacting us";
          var body = " We will get back to you as soon as possible";
          showNotification(title, body);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  