
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
//   import { getAuth , createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
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

const db = getFirestore();
const storage = getStorage();


// get ids
let url = document.getElementById("url")
let title = document.getElementById("title")
let description = document.getElementById("description")
let price = document.getElementById("price")


// images upload storage ......

window.uploades = () => {


    let file = url.files[0]

    let random = Math.random().toString().slice(2)
    // console.log(random);
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, `images/${random}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);

          let link = "";

          link = downloadURL

          let obj = {
            url: link,
            title: title.value,
            description: description.value,
            price: price.value
          }
    
    
          addDoc(collection(db, "userProduct"), obj)
            .then(() => {
    
              window.location.assign("../mainweb/mainweb.html")
            })
            .catch((err) => {
              alert(err.message)
            })

        });
      }
    );



  }

// image upload END ...........


