import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { GoogleAuthProvider}  from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyAXJVTTVuGNo-a6CO3KBfmErLD2og5g3IE",
  authDomain: "devrev-8b3a6.firebaseapp.com",
  projectId: "devrev-8b3a6",
  storageBucket: "devrev-8b3a6.appspot.com",
  messagingSenderId: "88624987762",
  appId: "1:88624987762:web:69727c59b6b1b302098ceb"
}


// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const provider = new GoogleAuthProvider();


export {auth,provider}