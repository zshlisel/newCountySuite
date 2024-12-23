import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
//import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyBsxZ-R3p6wQ-lO8Tdl1nEhTUqzlDyr6Lw",
  authDomain: "yankyeidles.firebaseapp.com",
  projectId: "yankyeidles",
  storageBucket: "yankyeidles.firebasestorage.app",
  messagingSenderId: "164877232267",
  appId: "1:164877232267:web:1815889b56e5238c688c8e",
  measurementId: "G-KN0LMRVY26"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app);