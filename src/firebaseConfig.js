import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCTjdQAqvC6bWaMzHu12jdfPMRx4DNpI6Y",
    authDomain: "speed-typing-dcb86.firebaseapp.com",
    projectId: "speed-typing-dcb86",
    storageBucket: "speed-typing-dcb86.appspot.com",
    messagingSenderId: "165838346834",
    appId: "1:165838346834:web:e26c96e530b904c1645d8b",
    measurementId: "G-T5DNG24M3X"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore();

export {auth, db};