const wordDatabase = {
  "skool": "school",
  "appel": "apple",
  "ticher": "teacher",
  "beutiful": "beautiful",
  "frend": "friend"
};

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

  const correctWord = wordDatabase[wrongWord];

  if (!correctWord) {
    correctWordText.textContent = "Word not found";
    statusText.textContent = "⚠ Not in database";
    statusText.className = "warning";
    commentText.textContent = "Please add this word into database 📚";
    return;
  }

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