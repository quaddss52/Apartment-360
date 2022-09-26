import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyAd3Pkjk6aizt0bGGS3J_cOvgnY2OelaJw",
  authDomain: "apartment-360-4b513.firebaseapp.com",
  projectId: "apartment-360-4b513",
  storageBucket: "apartment-360-4b513.appspot.com",
  messagingSenderId: "360443999465",
  appId: "1:360443999465:web:914a206bd8fa9c33d32c78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()