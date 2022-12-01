
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEY0wi3NLRJPhesMbdzST2GjvO5s7qMiE",
  authDomain: "cryptowatchman-3f66e.firebaseapp.com",
  projectId: "cryptowatchman-3f66e",
  storageBucket: "cryptowatchman-3f66e.appspot.com",
  messagingSenderId: "1045511870334",
  appId: "1:1045511870334:web:a5e33286e1bbeb1010052f"
}


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
