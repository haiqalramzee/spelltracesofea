let wordDatabase = {
  "skool": { correct: "school", category: "school", difficulty: "easy" },
  "appel": { correct: "apple", category: "food", difficulty: "easy" },
  "ticher": { correct: "teacher", category: "school", difficulty: "easy" },
  "beutiful": { correct: "beautiful", category: "adjective", difficulty: "medium" },
  "frend": { correct: "friend", category: "people", difficulty: "easy" }
};

let isFirebaseReady = false;

// Initialize Firebase data on page load
async function initializeFirebase() {
  console.log('📡 Loading data from Firebase...');
  const data = await firebaseRead('words');
  
  if (data) {
    wordDatabase = data;
    console.log('✅ Data loaded from Firebase');
  } else {
    console.log('📝 No data found, uploading default data...');
    await firebaseWrite('words', wordDatabase);
  }
  
  isFirebaseReady = true;
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