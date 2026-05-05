let editingWord = null;

// Load and display database on page load
document.addEventListener('DOMContentLoaded', function() {
  loadDatabase();
  displayTable();
});

// Display all words in table
function displayTable() {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';
  
  let rowNumber = 1;
  for (const [wrong, data] of Object.entries(wordDatabase)) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${rowNumber}</td>
      <td>${wrong}</td>
      <td>${data.correct}</td>
      <td>${data.category}</td>
      <td><span class="difficulty-badge difficulty-${data.difficulty}">${data.difficulty}</span></td>
      <td>
        <button onclick="editWord('${wrong}')" class="btn-small btn-edit">✏️ Edit</button>
        <button onclick="deleteWord('${wrong}')" class="btn-small btn-delete">🗑️ Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
    rowNumber++;
  }
  
  if (Object.keys(wordDatabase).length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = '<td colspan="6" style="text-align: center; color: #999;">No words yet. Add one to get started!</td>';
    tableBody.appendChild(row);
  }
}

// Add new word to Firebase
// Add new word to Firebase REST API
async function addNewWord() {
  const wrong = document.getElementById('wrongSpelling').value.trim().toLowerCase();
  const correct = document.getElementById('correctSpelling').value.trim();
  const category = document.getElementById('category').value.trim();
  const difficulty = document.getElementById('difficulty').value;
  
  // Validation
  if (!wrong || !correct) {
    alert('❌ Please enter both wrong and correct spelling');
    return;
  }
  
  if (wordDatabase[wrong]) {
    alert('⚠️ This word already exists! Use Edit to modify it.');
    return;
  }
  
  // Add to database
  wordDatabase[wrong] = {
    correct: correct,
    category: category || 'general',
    difficulty: difficulty
  };
  
  // Save to Firebase
  const success = await firebaseWrite('words', wordDatabase);
  if (success) {
    // Clear form
    document.getElementById('wrongSpelling').value = '';
    document.getElementById('correctSpelling').value = '';
    document.getElementById('category').value = '';
    document.getElementById('difficulty').value = 'easy';
    
    displayTable();
    alert('✅ Word added successfully!');
  } else {
    alert('❌ Error saving to Firebase');
    delete wordDatabase[wrong]; // Revert on error
  }
}

// Edit word
function editWord(wrong) {
  editingWord = wrong;
  const data = wordDatabase[wrong];
  
  document.getElementById('editWrongSpelling').value = wrong;
  document.getElementById('editCorrectSpelling').value = data.correct;
  document.getElementById('editCategory').value = data.category;
  document.getElementById('editDifficulty').value = data.difficulty;
  
  document.getElementById('editModal').style.display = 'block';
}

// Save edited word to Firebase REST API
async function saveEditedWord() {
  if (!editingWord) return;
  
  const newCorrect = document.getElementById('editCorrectSpelling').value.trim();
  const newCategory = document.getElementById('editCategory').value.trim();
  const newDifficulty = document.getElementById('editDifficulty').value;
  
  if (!newCorrect) {
    alert('❌ Correct spelling cannot be empty');
    return;
  }
  
  // Update in database
  wordDatabase[editingWord] = {
    correct: newCorrect,
    category: newCategory || 'general',
    difficulty: newDifficulty
  };
  
  // Save to Firebase
  const success = await firebaseWrite('words', wordDatabase);
  if (success) {
    closeEditModal();
    displayTable();
    alert('✅ Word updated successfully!');
  } else {
    alert('❌ Error updating word');
  }
}

// Close edit modal
function closeEditModal() {
  document.getElementById('editModal').style.display = 'none';
  editingWord = null;
}

// Delete word from Firebase REST API
async function deleteWord(wrong) {
  if (confirm(`⚠️ Are you sure you want to delete "${wrong}"?`)) {
    delete wordDatabase[wrong];
    const success = await firebaseWrite('words', wordDatabase);
    if (success) {
      displayTable();
      alert('✅ Word deleted successfully!');
    } else {
      alert('❌ Error deleting word');
    }
  }
}

// Export database as JSON
function exportDatabase() {
  const dataStr = JSON.stringify(wordDatabase, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'spelltrace-database.json';
  link.click();
  alert('📥 Database exported as JSON file!');
}

// Clear all database (with confirmation) in Firebase REST API
async function clearDatabase() {
  if (confirm('🚨 WARNING: This will delete ALL words! Are you absolutely sure?')) {
    if (confirm('⚠️ Last chance! Click OK to permanently clear the database.')) {
      wordDatabase = {};
      const success = await firebaseWrite('words', wordDatabase);
      if (success) {
        displayTable();
        alert('✅ Database cleared!');
      } else {
        alert('❌ Error clearing database');
      }
    }
  }
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('editModal');
  if (event.target === modal) {
    closeEditModal();
  }
}
