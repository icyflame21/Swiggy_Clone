import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAqlZDRhrDUGEhr36YgnTAkbm50XL5yZ8E",
  authDomain: "swiggy-b87f6.firebaseapp.com",
  projectId: "swiggy-b87f6",
  storageBucket: "swiggy-b87f6.appspot.com",
  messagingSenderId: "502614518036",
  appId: "1:502614518036:web:8afeacda6f1584b52ffa01"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase