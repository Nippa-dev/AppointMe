import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA67zmMPm6C-aOpuqPcLk8s0bn3IV2me_Y",
    authDomain: "appointme-48dcd.firebaseapp.com",
    projectId: "appointme-48dcd",
    storageBucket: "appointme-48dcd.appspot.com",
    messagingSenderId: "758837567049",
    appId: "1:758837567049:web:1ce93892d6414882f4e998"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);