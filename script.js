
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
 import { getAuth , signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
 import { getFirestore , doc , getDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
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

let email = document.getElementById("email")
let password = document.getElementById("password")

window.login = () =>{

  let obj = {
    email : email.value,
    password : password.value
  }

signInWithEmailAndPassword(auth , obj.email , obj.password)
.then(async(res)=>{
  let id = res.user.uid;
 let reference = doc(db , "userEnter" , id);
 let snap = await getDoc(reference)

 console.log(snap.data());

 if(snap.exists()){
  let stringObj = JSON.stringify(snap.data())
  localStorage.setItem("users" , stringObj)
  window.location.assign("mainweb/mainweb.html")
 }
})
.catch((err)=>{
  alert(err.message);
})
}