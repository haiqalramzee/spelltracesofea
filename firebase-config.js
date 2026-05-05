// Firebase REST API Configuration (No SDK needed!)
const firebaseConfig = {
  projectId: "spelltracesofea",
  databaseURL: "https://spelltracesofea-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Firebase REST API helpers
const FIREBASE_DB_URL = firebaseConfig.databaseURL;

// Read from Firebase
async function firebaseRead(path) {
  try {
    const response = await fetch(`${FIREBASE_DB_URL}/${path}.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`❌ Firebase read error (${path}):`, error.message);
    return null;
  }
}

// Write to Firebase
async function firebaseWrite(path, data) {
  try {
    const response = await fetch(`${FIREBASE_DB_URL}/${path}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    console.log(`✅ Saved to Firebase: ${path}`);
    return true;
  } catch (error) {
    console.error(`❌ Firebase write error (${path}):`, error.message);
    return false;
  }
}

// Delete from Firebase
async function firebaseDelete(path) {
  try {
    const response = await fetch(`${FIREBASE_DB_URL}/${path}.json`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    console.log(`✅ Deleted from Firebase: ${path}`);
    return true;
  } catch (error) {
    console.error(`❌ Firebase delete error (${path}):`, error.message);
    return false;
  }
}

console.log('✅ Firebase REST API initialized!');
