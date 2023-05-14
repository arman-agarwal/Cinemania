import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// user authentication code
const firebaseConfig = {
    apiKey: "AIzaSyBwJ6TJKefFoPEU0IZ4zc0kHz57vVnX2Ws",
    authDomain: "cinemania-89b4f.firebaseapp.com",
    projectId: "cinemania-89b4f",
    storageBucket: "cinemania-89b4f.appspot.com",
    messagingSenderId: "754757248247",
    appId: "1:754757248247:web:fb860fc0dca3e09108dff2"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("logged in");
    console.log(user.uid);
  } else {
    console.log("no user");
  }
});

function signupUser(email, password){
    createUserWithEmailAndPassword(auth,email,password).then(cred=>{
        console.log('created user');
        console.log('signed in');
        // console.log(cred.user);
    })
    .catch((e) => {
      console.log(e);
    });
}

function loginUser(email,password){
    signInWithEmailAndPassword(auth,email,password).then(cred=>{
        console.log("signed in");
        // console.log(cred.user);
    }).catch(e=>console.log(e));
}
// setTimeout(() => {
//     document.getElementById("submit").addEventListener("click",()=>{
//         loginUser("abcd@gmail.com","123456");
//     });
// }, 1000);
// setTimeout(() => {
//     signupUser("abcd@gmail.com","123456");
// }, 100);