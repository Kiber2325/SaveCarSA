import {initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'


const firebaseConfig = {
  apiKey: "AIzaSyBvHCMm_pp3sggVAt2FlZGyKN5g7K1rouk",
  authDomain: "bd-alterno.firebaseapp.com",
  databaseURL: "https://bd-alterno-default-rtdb.firebaseio.com",
  projectId: "bd-alterno",
  storageBucket: "bd-alterno.appspot.com",
  messagingSenderId: "747007744269",
  appId: "1:747007744269:web:1952e7f7ce8d452eb1f844"
};


  // Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };

