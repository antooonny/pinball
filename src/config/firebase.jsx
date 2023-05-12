import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBchy-H_c0fFgRQNShyRnHFL4XjSmyEkqA",
  authDomain: "pinball-52154.firebaseapp.com",
  projectId: "pinball-52154",
  storageBucket: "pinball-52154.appspot.com",
  messagingSenderId: "447508345572",
  appId: "1:447508345572:web:c097f78ebd79d1e09332f1",
  measurementId: "G-5L8L8GY1JD",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
