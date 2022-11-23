import firebaseConfig from "./config/firebaseConfig";
import { getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app'; 
import {getFirestore} from "firebase/firestore"


const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db }; 