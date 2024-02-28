import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcpcPjX7NYliC1vP5qtLAG12KTdqFb1n0",
  authDomain: "fir-c97af.firebaseapp.com",
  projectId: "fir-c97af",
  storageBucket: "fir-c97af.appspot.com",
  messagingSenderId: "957506840956",
  appId: "1:957506840956:web:bd8144802d6ddc1119dcf9",
  measurementId: "G-BL1KPKD5ZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

export {auth, db, storage }