import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database"
import { getStorage } from 'firebase/storage'



const firebaseConfig = {
    apiKey: "AIzaSyDXWqjjwiUH-68kD67KihaycLddHIgdgM4",
    authDomain: "myinfo-59d5d.firebaseapp.com",
    databaseURL: "https://myinfo-59d5d-default-rtdb.firebaseio.com",
    projectId: "myinfo-59d5d",
    storageBucket: "myinfo-59d5d.appspot.com",
    messagingSenderId: "912278680128",
    appId: "1:912278680128:web:9718e5de7b35b52ceda5a5",
    measurementId: "G-67MP7PGWN2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app)

