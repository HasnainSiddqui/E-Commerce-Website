
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
  import { getFirestore , doc , setDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
  import { getAuth , createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyClC0xc9KAVmt_MdYFPkNVV2Ns5p7NKbq4",
    authDomain: "e-commerce-web-f9024.firebaseapp.com",
    projectId: "e-commerce-web-f9024",
    storageBucket: "e-commerce-web-f9024.appspot.com",
    messagingSenderId: "7423757710",
    appId: "1:7423757710:web:4df3bbedfa2ef64240e8df",
    measurementId: "G-YVPX0QN22Z"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();


let username = document.getElementById("username")
let email = document.getElementById("email")
let password = document.getElementById("password")

window.sbmit = () =>{
  
let obj = {
  username : username.value,
  email : email.value,
  password : password.value
}

createUserWithEmailAndPassword(auth , obj.email , obj.password)
.then((mesg) =>{
  obj.id = mesg.user.uid;
  obj.userType = "user";
  
  let reference = doc(db , "userEnter" , obj.id);
  setDoc(reference , obj)
  .then(()=>{
    let userObj = JSON.stringify(obj);
    localStorage.setItem("users" , userObj)
    window.location.replace("../mainweb/mainweb.html")

  })
  .catch((err)=>{
console.log(err.message);
  })
  // alert(mesg)
}).catch((err)=>{
alert(err.message)
})
}



  