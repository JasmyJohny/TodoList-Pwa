
import todoListDB from "../../js/todo-db.js";
const todoListDb = new todoListDB();
console.log("new dbbb",todoListDb)
const mandatoryField = document.getElementById("mandatoryField");
mandatoryField.style.display = 'none';
var el = document.getElementById("add-task-btn");

if (el) {
  console.log(el)
  el.addEventListener("click", addSong, false);
}
var locationBtn = document.getElementById("locationbtn")
if(locationBtn)
{
  locationBtn.addEventListener("click",getcurrentLocation,false)
}
function getcurrentLocation()
{
  if ('geolocation' in navigator) {

    console.log('Geolocation:', navigator.geolocation);
    navigator.geolocation.getCurrentPosition(

      // On Success callback
      (position) => {
        console.log('Current Position:', position);
        position.coords.latitude + position.coords.longitude
        const joined=  `(${position.coords.latitude} , ${position.coords.longitude})`;
        console.log(joined)
    
        document.getElementById("location").value = joined
      
      },

      // On Error callback
      (error) => {
        console.log('Current Position Error:', error);
        //message.innerText = 'Geolocation failed to get the current position.';
      }

    );
  }

}

function addSong() {
  console.log("entered")
  const title = document.getElementById("task").value;
  const gamgenre = document.getElementById("datetime").value;
  var date = new Date(gamgenre);
  var datetime ;
 

  var time = date.toTimeString(); 
  var datee= date.toDateString();
  console.log(date.toDateString())
 datetime= ` ${date}  ${time} `
 
 const location = document.getElementById("location").value
 if(location === "")
 {
  location = " No location added"
 }
  if (title === "" || gamgenre === "") {
    mandatoryField.style.display = "block";
  } else {
    mandatoryField.style.display = "none";
console.log(location)
    todoListDb
      .add(title, datetime,location)
      .then((event) => {
        console.log("add sucess");
        document.getElementById("game-add-success").style.display = "block";
      })
      .catch((errorMessage) => {
        document.getElementById(" game-add-failed").style.display = "block";

        console.log("catch", errorMessage);
      });
  }
}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.ready
  .then((registration)=>{
    console.log('Ready',registration)
    const controller = registration.active;
    controller.postMessage('Greetings from the Add page')

    if(registration.sync)
    {
      console.log('Bg sync available');
      registration.sync.register('my-tag-name')
      .then(()=>{
        console.log('Tag registered')
      })
     
      registration.sync.getTags().then((tags)=>{
        console.log('Tag:', tags)
      })
    }
  })
}
