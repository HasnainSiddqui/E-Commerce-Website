
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
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


// Navbar get ids/

let home = document.getElementById("home")
let uploadProduct = document.getElementById("uploadProduct")
let login = document.getElementById("login")
let signup = document.getElementById("signup")
let logOut = document.getElementById("logOut")


window.init = () => {
    let data = JSON.parse(localStorage.getItem("users"));
   
    if (data) {
        login.style.display = "none"
        signup.style.display = "none"
        logOut.className ="inline-block";

        if(data.userType === "user"){
        uploadProduct.style.display = "none"
        }
        
    }
   
}

init()


window.logout = () =>{
   signOut(auth)
    .then(()=>{
        localStorage.removeItem("users")
        init()
    })
    .catch((err)=>{
alert(err.message)
    })
}

// get id
let renderProduct = document.getElementById("renderProduct_Div")

let product=[];

window.getProduct = async() =>{

    const querySnapshot = await getDocs(collection(db, "userProduct"));
    renderProduct.innerHTML = "";
 querySnapshot.forEach((doc) => {
    let obj = {
        ...doc.data(),
         id : doc.id
    }
   product.push(obj)

   renderProduct.innerHTML = "";
   product.forEach((data)=> {
   
    // console.log(data)


    renderProduct.innerHTML += ` <div class="bg-white shadow-md rounded-lg overflow-hidden">
    <img src="${data.url}" alt="Product 1" class="w-full h-56 object-cover">
    <div class="p-4">
        <h3 class="text-lg font-bold text-gray-800">${data.title}</h3>
        <p class="text-gray-600 font-medium mt-2">${data.price}</p>
        
        <a href="#" class="mt-4 inline-block font-semibold py-2 px-4  rounded-full hover:bg-gray-700 hover:bg-blue-500 hover:text-white">Add
            to Cart</a>
       <a href="#" class="mt-4   inline-block font-semibold py-2 px-4  rounded-full hover:bg-gray-700 hover:bg-blue-500 hover:text-white"><button onclick="nextPage('${data.id}')" class="font-semibold">View Product</button></a>
    </div>
</div>`

})
    });
}
getProduct()



window.nextPage = (id) =>{

    localStorage.setItem("id" , id)
    window.location.assign("../nextpage/nextpage.html")
}