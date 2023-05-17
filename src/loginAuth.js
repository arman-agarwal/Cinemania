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
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

export class loginAuth {
  // user authentication code
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBwJ6TJKefFoPEU0IZ4zc0kHz57vVnX2Ws",
      authDomain: "cinemania-89b4f.firebaseapp.com",
      projectId: "cinemania-89b4f",
      storageBucket: "cinemania-89b4f.appspot.com",
      messagingSenderId: "754757248247",
      appId: "1:754757248247:web:fb860fc0dca3e09108dff2",
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

  async signupUser(firstname, lastname, email, password) {
    try{
      let res = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log("created user");
      await this.addData(firstname+" "+lastname,email,res.user.uid);
      return 1;
    }catch(e){
      console.log(e);
      return -1;
    }
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
    let res = await signInWithPopup(this.auth, provider);
    console.log(res.user.uid);
    this.addData(res.user.displayName, res.user.email, res.user.uid);
    return res;
  }

  async resetPass(email) {
    let res = await sendPasswordResetEmail(this.auth, email).catch((e) => -1);
    if (res == undefined) return 1;
    return res;
  }

  async getUserData(uid) {
    console.log(uid);
    try {
      let userData = await getDocs(
        query(collection(this.db, "users"),where("uid","==",uid))
      );
      if (userData.size === 0) alert("user with given uid does not exist");
      return userData.docs[0].data();
    } catch (e) {
      console.log(e);
      return -1;
    }
  }

  async addData(inName, inEmail, inUid) {
    try {
        const ref = await setDoc(doc(this.db, "users", "" + inUid), {
          name: inName,
          email: inEmail,
          uid: inUid,
        });
        console.log(`written ${inName}`);
    } catch (e) {
      alert(`error writing data${e}`);
    }
  }
}
export default new loginAuth();
