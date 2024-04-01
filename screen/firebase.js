import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Import for authentication

const firebaseConfig = {
  // ... Your Firebase project configuration details here
};

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
