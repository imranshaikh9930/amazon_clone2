import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyAbXC6WmKjUVfVqC4ExbhnSkpAOgFUmHVw",
  authDomain: "clone1-bf5a5.firebaseapp.com",
  projectId: "clone1-bf5a5",
  storageBucket: "clone1-bf5a5.appspot.com",
  messagingSenderId: "1000957444505",
  appId: "1:1000957444505:web:dd8962e19427f3c0e9d308",
  measurementId: "G-F10DQKVFN2"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app