// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore}from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrVO67RUNir40rkZuoIQ5tcgFuAGqhcqY",
  authDomain: "it-sysarch32-store-wagas.firebaseapp.com",
  projectId: "it-sysarch32-store-wagas",
  storageBucket: "it-sysarch32-store-wagas.appspot.com",
  messagingSenderId: "1022664986292",
  appId: "1:1022664986292:web:662f13f7653fee8fea11e1",
  measurementId: "G-0NPF293Z9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);