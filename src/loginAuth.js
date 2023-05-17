import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc,setDoc,doc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js' 

export class loginAuth {
  // user authentication code
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBwJ6TJKefFoPEU0IZ4zc0kHz57vVnX2Ws",
      authDomain: "cinemania-89b4f.firebaseapp.com",
      projectId: "cinemania-89b4f",
      storageBucket: "cinemania-89b4f.appspot.com",
      messagingSenderId: "754757248247",
      appId: "1:754757248247:web:fb860fc0dca3e09108dff2"
    };

    this.firebaseApp = initializeApp(firebaseConfig);
    this.auth = getAuth(this.firebaseApp);
    this.db = getFirestore(this.firebaseApp);
    onAuthStateChanged(this.auth, (user) => {
      if (user != null) {
        console.log("logged in");
      } else {
        console.log("no user");
      }
    });
  }

  signupUser(firstname, lastname, email, password) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((cred) => {
        console.log("created user");
        this.addData(firstname,lastname,email,cred.user.uid);
        return 1;
      })
      .catch((e) => {
        console.log(e);
        return -1;
      });
  }

  async loginUser(email, password) {
    return await signInWithEmailAndPassword(this.auth, email, password)
      .then((cred) => {
        console.log("signed in");
        return 1;
      })
      .catch((e) => {
        console.log(e);
        return -1;
      });
  }

  async signoutUser() {
    await signOut(this.auth)
      .then(() => {
        console.log("signed out user");
        return 1;
      })
      .catch((e) => -1);
  }

  async google() {
    const provider = await new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  async resetPass(email) {
    let res = await sendPasswordResetEmail(this.auth, email).catch((e) => -1);
    if (res == undefined) return 1;
    return res;
  }

  getUserData(uid) {

  }

  async addData(firstname, lastname, inEmail, inUid){
    try{
    const ref = await setDoc(doc(this.db, "users",(""+inUid)),{
      first:firstname,
      last:lastname,
      email:inEmail,
      uid:inUid,
    });
    console.log(`written ${firstname}`);
  }catch(e){
    alert(`error writing data${e}`);
  }
    
  }
}
export default new loginAuth();
