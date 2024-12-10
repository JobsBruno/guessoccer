import { initializeApp } from "firebase/app"; 
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Importar getAuth

const firebaseConfig = {
  apiKey: "AIzaSyAzD2dYLtETcfob6I4d4a6z-sc1CsX4Afw",
  authDomain: "guesssoccer-c6d3b.firebaseapp.com",
  projectId: "guesssoccer-c6d3b",
  storageBucket: "guesssoccer-c6d3b.firebasestorage.app",
  messagingSenderId: "701306875874",
  appId: "1:701306875874:web:ea38f2e862bb952c9153bb"
  };

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app); // Exportar autha