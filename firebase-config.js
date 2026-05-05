// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4U1r1ikipuDQa8HjhRBYy9AzOFnamJBQ",
  authDomain: "spelltracesofea.firebaseapp.com",
  projectId: "spelltracesofea",
  storageBucket: "spelltracesofea.firebasestorage.app",
  messagingSenderId: "1066394300900",
  appId: "1:1066394300900:web:4ee9e0d2a03fb04c10d7f1"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Get Realtime Database reference
const database = firebase.database();
const wordsRef = database.ref('words');

console.log('✅ Firebase initialized successfully!');
