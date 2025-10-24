// src/utils/firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgQS9XIwwgkIbRWRia9sufx4F5t83zDrk",
  authDomain: "realestateapp-21278.firebaseapp.com",
  projectId: "realestateapp-21278",
  storageBucket: "realestateapp-21278.firebasestorage.app",
  messagingSenderId: "657440036898",
  appId: "1:657440036898:web:7907e3f710e68d3ace527b"
};

// Initialize Firebase app and services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export only what you're using
export { auth, googleProvider };
