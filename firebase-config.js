// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4U1r1ikipuDQa8HjhRBYy9AzOFnamJBQ",
  authDomain: "spelltracesofea.firebaseapp.com",
  projectId: "spelltracesofea",
  storageBucket: "spelltracesofea.firebasestorage.app",
  messagingSenderId: "1066394300900",
  appId: "1:1066394300900:web:4ee9e0d2a03fb04c10d7f1"
};

// Wait for Firebase SDK to load
function initializeFirebaseSDK() {
  if (typeof firebase === 'undefined') {
    console.log('⏳ Waiting for Firebase SDK...');
    setTimeout(initializeFirebaseSDK, 500);
    return;
  }
  
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase initialized successfully!');
  }
}

// Start initialization
initializeFirebaseSDK();
