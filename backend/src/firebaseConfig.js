// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQNrpunAUfCrVd6xgqyZaF6cahmgcJpug",
  authDomain: "du-hacks-72373.firebaseapp.com",
  projectId: "du-hacks-72373",
  storageBucket: "du-hacks-72373.firebasestorage.app",
  messagingSenderId: "879628673869",
  appId: "1:879628673869:web:d82618cd67a9fb7c5d0d04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };