import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCh0XR8xt4ddyiO_gtzDiwXa_pmvHUoV6E",
  authDomain: "ai-studio-applet-webapp-3c969.firebaseapp.com",
  projectId: "ai-studio-applet-webapp-3c969",
  storageBucket: "ai-studio-applet-webapp-3c969.appspot.com",
  messagingSenderId: "688744499241",
  appId: "1:688744499241:web:c7c51ac1b53c8f13b7f438"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
