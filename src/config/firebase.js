// firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBzFa2ZvZf7BhPGwOQH7miUQMnHw1mtnWY",
  authDomain: "eventease-57207.firebaseapp.com",
  projectId: "eventease-57207",
  storageBucket: "eventease-57207.appspot.com",
  messagingSenderId: "274009757083",
  appId: "1:274009757083:web:c052a73076cb775b4cbd3e"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth with persistence BEFORE getAuth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const firestore = getFirestore(app);

export { app, auth, firestore };
