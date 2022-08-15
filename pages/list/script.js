import todoListDB from "../../js/todo-db.js";

const todoListDb = new todoListDB();

var count = 1;



const output = document.getElementById("output");
const clearAllBtn = document.getElementById("clearAllBtn")
console.log("hi")
document.getElementById("listitemBtn").addEventListener("click", listSongs);
var list = document.getElementById("listitemBtn")

function listSongs() {
  output.innerHTML = "";

  todoListDb
    .getAll()
    .then((results) => {
      console.log("results", results);
      results.forEach((result) => {
        appendSong(result);
      });
    })
    .catch((errorMessage) => {
      console.log("catch", errorMessage);
    });
}
function appendSong(song) {
  console.log(song);

  const status = count + "Likes";
  const elemSong = document.createElement("div");
  
  elemSong.className = "game-item";
  output.append(elemSong);
//   elemSong.innerHTML = `<span>${song.task}</span>
// <h3>${song.date}</h3>
// <div>
//  Likes:
//  <b>${song.currentlocation}</b>
// </div>
// `;
// `
elemSong.innerHTML = `



   <p id="heading">Task : <span id="taskname">
    ${song.task}
    </span></p>
   
    <p id="subheading">Date and Time: <span id="date">
    ${song.date}
    </span></p>
    <p id="subheading">Location: <span id="date">
    ${song.currentlocation}
    </span></p>
   
   
`
// const deletBtn = document.getElementById("delete")
// deletBtn.addEventListener("click",()=>{
//   todoListDb
//   .delete(song)
//   .then((song) => {
//     console.log(" sucess");
//    // elemSong.remove();
//   })
//   .catch((errorMessage) => {
//     console.log("error", errorMessage);
//   });
// })
  const elemRemove = document.createElement("button");
  elemRemove.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true" style="font-size:35px;color:blue; margin-top: -880px;margin-bottom:880px; " ></i>';
   elemRemove.style.backgroundColor = "transparent";
  // elemRemove.style.color = "white";
  elemRemove.style.borderColor = "transparent";
  elemSong.append(elemRemove);
  
  elemRemove.addEventListener("click", () => {
    todoListDb
      .delete(song)
      .then((song) => {
        console.log(" sucess");
        elemSong.remove();
      })
      .catch((errorMessage) => {
        console.log("error", errorMessage);
      });
  });
//   const elemStatus = document.createElement("button");
//   elemStatus.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true" style="font-size:35px;color:blue;" ></i>';
//   elemStatus.style.backgroundColor = "transparent";
//   // elemRemove.style.color = "white";
//   elemStatus.style.borderColor = "transparent";
 
//   elemSong.append(elemStatus);
//   //elemStatus.innerText = "+1 Like";
//   elemStatus.addEventListener("click", () => {
//     console.log("count", song.count + 1);
//     song.count = song.count + 1;
//     todoListDb
//       .update(song, song.count)
//       .then((song) => {
//         console.log("enter");

//         elemSong.innerHTML = `<span>${song.title}</span>
//  <h3>${song.gamgenre}</h3>
//  <div>
//   Likes:
//   <b>${song.count}</b>
//  </div>
//  `;

//         listSongs();
//       })
//       .catch((errorMessage) => {
//         console.log("error", errorMessage);
//       });
//   });
 
}
