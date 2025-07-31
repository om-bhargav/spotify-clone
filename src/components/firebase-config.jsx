import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "firebase_api_key",
  authDomain: "auth_domain",
  projectId: "project_id",
  storageBucket: "firebase_storage_bucket",
  messagingSenderId: "messaging_id",
  appId: "app_id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;