import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

export  class todoListDB_firebase {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyCMj6gcSqiuAZaEEYTH6H1dW856r8t4OuM",
    authDomain: "pwaapp-37973.firebaseapp.com",
    projectId: "pwaapp-37973",
    storageBucket: "pwaapp-37973.appspot.com",
    messagingSenderId: "902763037720",
    appId: "1:902763037720:web:308cd6c3df7017692daf6d"
    };

    const app = initializeApp(firebaseConfig);
    console.log("appp", app);
    this.db = getFirestore(app);
    console.log("db", this.db);
  }

  add(task,date, currentlocation) {
    const dbCollection = collection(this.db, "todoList");
    return addDoc(dbCollection, {
      task: task,
      date :date,
      currentlocation: currentlocation,
      
      count: 0,
    });
  }
  getAll() {
    return new Promise((resolve, reject) => {
      getDocs(collection(this.db, "todoList"))
        .then((querySnapshot) => {
          const results = [];
          console.log(querySnapshot);
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log(doc.id, data);
            results.push({
              id: doc.id,
              task: data.task,
              currentlocation: data.currentlocation,
              date: data.date,
            });
          });
          resolve(results);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  update(task, countIncreased) {
    return new Promise((resolve, reject) => {
      const dobDoc = doc(this.db, "todoList", song.id);
      console.log("entered");
      updateDoc(dobDoc, { count: countIncreased })
        .then(() => {
          task.count = countIncreased;
          resolve(task);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  delete(task) {
    const dbDoc = doc(this.db, "todoList", task.id);
    return deleteDoc(dbDoc);
  }
 
}

export  class todoIndexedDb {
    constructor() {
  
      const request = window.indexedDB.open("SongDB", 1);
      request.onerror = (event) => {
        console.log("pen errir", event.target.target.error.message);
      };
      request.onsuccess = (event) => {
        console.log("open sucess", event);
        this.db = event.target.result;
      };
      request.onupgradeneeded = (event) => {
        // Save the IDBDatabase interface
        const db = event.target.result;
  
        // Create an objectStore for this database
        const objectStore = db.createObjectStore("todoList", { keyPath: "id" });
        objectStore.createIndex("title", "title", { unique: true });
      };
    }
    add(task,date, currentlocation) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction(["todoList"], "readwrite");
        const Store = transaction.objectStore("todoList");
        const request = Store.add({
          id: Date.now(),
          task: task,
          date: date,
          currentlocation: currentlocation,
        });
        request.onerror = (event) => {
          reject(event.target.error.message);
        };
        request.onsuccess = (event) => {
          resolve(event);
          //this.db = event.target.result;
        };
      });
    }
  
    getAll() {
      console.log("get alll genre");
      return new Promise((resolve, reject) => {
        const request = this.db
          .transaction(["todoList"], "readwrite")
          .objectStore("todoList")
          .getAll();
        request.onerror = (event) => {
          console.log("get all errir", event.target.error.message);
          reject(event.target.error.message);
        };
        request.onsuccess = (event) => {
          console.log("get all sucess", event);
          resolve(event.target.result);
          // this.db = event.target.result;
        };
      });
    }
    get(genre) {
      console.log("get genre", genre);
    }
    update(song, updateHasFinished) {
      song.hasfinishedgame = updateHasFinished
      console.log("update");
      return new Promise((resolve, reject) => {
        const request = this.db
        .transaction(["todoList"], "readwrite")
        .objectStore("todoList")
        .put(song);
        request.onerror = (event) => {
          console.log("update eror", event.target.error.message);
          reject(event.target.error.message);
        };
        request.onsuccess = (event) => {
          console.log("updatesucess", event);
          resolve(song);
          // this.db = event.target.result;
        };
      });
  
    }
    delete(task){
      console.log("delete");
      return new Promise((resolve, reject) => {
        const request = this.db
        .transaction(["todoList"], "readwrite")
        .objectStore("todoList")
        .delete(task.id);
        request.onerror = (event) => {
          console.log("update eror", event.target.error.message);
          reject(event.target.error.message);
        };
        request.onsuccess = (event) => {
          console.log("updatesucess", event);
          resolve();
          // this.db = event.target.result;
        };
      });
  
    }
  }

  export default class todoListDB
  {
    constructor()
    {
      console.log("new db")
      this.dbOnline = new todoListDB_firebase()
      this.dbOffline = new todoIndexedDb()

      this.hasSync = false;
      this.swController = null;
      this.swRegistration =null;

      console.log("form out ",this)
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready
        .then((registration)=>{

        
        
          console.log("from inside ",this)
          if(registration.active && registration.sync)
         
         {
           this.hasSync = true
           this.swController = registration.active
           this.swRegistration = registration
         }
        });
      
      }

      
    }
    add(task,date, currentlocation) {
      console.log("new add")
      console.log('is online', navigator.onLine)
      if(navigator.onLine)
      {
        return this.dbOnline.add(task,date,currentlocation)
      }
      else
      {
        return this.dbOffline.add(task,date,currentlocation)

      }
    }
  }

  // function(){

  // }
  // ()=>{

  // }
