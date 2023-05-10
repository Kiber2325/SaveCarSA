import {initializeApp} from "firebase/app";
import {getDatabase} from 'firebase/database'


const firebaseConfig = {
  apiKey: "AIzaSyD-8-JSVSkn37x73oui95SlGDRmgEzHENo",
  authDomain: "savecar-base-de-datos.firebaseapp.com",
  databaseURL: "https://savecar-base-de-datos-default-rtdb.firebaseio.com",
  projectId: "savecar-base-de-datos",
  storageBucket: "savecar-base-de-datos.appspot.com",
  messagingSenderId: "604773338395",
  appId: "1:604773338395:web:41c49e308301d97c3d97be"
};


  // Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };

