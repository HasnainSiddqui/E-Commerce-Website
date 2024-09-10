import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
// import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore,doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
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
// const auth = getAuth();
const db = getFirestore();

const id = localStorage.getItem("id")

const main = document.getElementById("main")
// console.log(id);

window.getData = async() =>{

const docRef = doc(db, "userProduct", `${id}`);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
let data = docSnap.data();

main.innerHTML = `<img class="w-full h-64 object-cover" src="${data.url}" alt="Product Image">
        <div class="p-4">
            <h1 class="text-gray-900 font-bold text-2xl">${data.title}</h1>
            <p class="mt-2 text-gray-600 text-sm">${data.description}</p>
            <div class="flex item-center mt-2">
                <svg class="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
                    <path
                        d="M12 .587l3.668 7.568L24 9.75l-6 5.905 1.42 8.345L12 18.413l-7.42 4.587L6 15.655 0 9.75l8.332-1.595z" />
                </svg>
                <svg class="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
                    <path
                        d="M12 .587l3.668 7.568L24 9.75l-6 5.905 1.42 8.345L12 18.413l-7.42 4.587L6 15.655 0 9.75l8.332-1.595z" />
                </svg>
                <svg class="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
                    <path
                        d="M12 .587l3.668 7.568L24 9.75l-6 5.905 1.42 8.345L12 18.413l-7.42 4.587L6 15.655 0 9.75l8.332-1.595z" />
                </svg>
                <svg class="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
                    <path
                        d="M12 .587l3.668 7.568L24 9.75l-6 5.905 1.42 8.345L12 18.413l-7.42 4.587L6 15.655 0 9.75l8.332-1.595z" />
                </svg>
                <svg class="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
                    <path
                        d="M12 .587l3.668 7.568L24 9.75l-6 5.905 1.42 8.345L12 18.413l-7.42 4.587L6 15.655 0 9.75l8.332-1.595z" />
                </svg>
            </div>
            <div class="flex item-center justify-between mt-3">
                <h1 class="text-gray-700 font-bold text-xl">$${data.price}</h1>
                <button class="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">Add to
                    Cart</button>
            </div>`



} else {
  
  alert("No such document!");
}
}
getData()