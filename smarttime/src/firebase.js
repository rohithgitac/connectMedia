// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcdLeq2pWRBIn9Uz3pxSjCKsYRjB3n2jQ",
  authDomain: "connect-project-4ee99.firebaseapp.com",
  projectId: "connect-project-4ee99",
  storageBucket: "connect-project-4ee99.appspot.com",
  messagingSenderId: "272744526196",
  appId: "1:272744526196:web:9dfdfff1a71b55abc83c21",
  measurementId: "G-EHV390JY0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app