let wordDatabase = {
  "skool": { correct: "school", category: "school", difficulty: "easy" },
  "appel": { correct: "apple", category: "food", difficulty: "easy" },
  "ticher": { correct: "teacher", category: "school", difficulty: "easy" },
  "beutiful": { correct: "beautiful", category: "adjective", difficulty: "medium" },
  "frend": { correct: "friend", category: "people", difficulty: "easy" }
};

let isFirebaseReady = false;

// Initialize Firebase database listener
function initializeFirebase() {
  try {
    const wordsRef = firebase.database().ref('words');
    
    // Listen for real-time updates
    wordsRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        wordDatabase = snapshot.val();
        console.log('✅ Database loaded from Firebase');
      } else {
        // First time - upload default data
        console.log('📝 Initializing Firebase with default data...');
        wordsRef.set(wordDatabase).then(() => {
          console.log('✅ Default data uploaded to Firebase');
        });
      }
      isFirebaseReady = true;
    });
  } catch (error) {
    console.error('Firebase initialization error:', error);
    isFirebaseReady = true;
  }
}

// Load database from localStorage (fallback)
function loadDatabase() {
  const saved = localStorage.getItem('wordDatabase');
  if (saved) {
    wordDatabase = JSON.parse(saved);
  }
}

// Save database to localStorage (backup)
function saveDatabase() {
  localStorage.setItem('wordDatabase', JSON.stringify(wordDatabase));
}

// Initialize on page load
loadDatabase();
document.addEventListener('DOMContentLoaded', function() {
  initializeFirebase();
});

function checkAnswer() {
  const wrongWord = document.getElementById("wrongWord").value.trim().toLowerCase();
  const studentAnswer = document.getElementById("studentAnswer").value.trim().toLowerCase();

  const correctWordText = document.getElementById("correctWord");
  const statusText = document.getElementById("status");
  const commentText = document.getElementById("comment");

  if (wrongWord === "") {
    correctWordText.textContent = "-";
    statusText.textContent = "Please enter wrong word";
    statusText.className = "warning";
    commentText.textContent = "Start by entering the word from paper 📚";
    return;
  }

  const entry = wordDatabase[wrongWord];

  if (!entry) {
    correctWordText.textContent = "Word not found";
    statusText.textContent = "⚠ Not in database";
    statusText.className = "warning";
    commentText.textContent = "Please add this word into database 📚";
    return;
  }

  const correctWord = entry.correct;
  correctWordText.textContent = correctWord;

  if (studentAnswer === correctWord.toLowerCase()) {
    statusText.textContent = "✅ Correct";
    statusText.className = "correct";
    commentText.textContent = "Amazing job! 🌟👏";
  } else {
    statusText.textContent = "❌ Wrong";
    statusText.className = "wrong";
    commentText.textContent = "Oops! Try again 💪😊";
  }
}