import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCyOrsddMPOAjAMYY1rtT3jvkCtfCjjdI4",
  authDomain: "prohealth-f019e.firebaseapp.com",
  projectId: "prohealth-f019e",
  storageBucket: "prohealth-f019e.appspot.com",
  messagingSenderId: "92523356128",
  appId: "1:92523356128:web:e93966b557602bae5e9585",
  measurementId: "G-BF8BRFC1V8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app);
const provider =new GoogleAuthProvider();
export {auth,provider};