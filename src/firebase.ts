import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
console.log("Firebase Initialized with Project:", firebaseConfig.projectId);
// Use default database to ensure rules are correctly applied via deploy_firebase
export const db = getFirestore(app);
console.log("Firestore Initialized with (default) database");
export const auth = getAuth(app);
