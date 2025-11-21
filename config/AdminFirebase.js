// config/AdminFirebase.js
const admin = require("firebase-admin");

// Load service account credentials
let serviceAccount;

// Try to load from environment variable first (for production/Render)
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (error) {
    console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT:", error.message);
    process.exit(1);
  }
} else {
  // Fall back to file (for local development)
  try {
    serviceAccount = require("./serviceAccountKey.json");
  } catch (error) {
    console.error("serviceAccountKey.json not found and FIREBASE_SERVICE_ACCOUNT not set");
    process.exit(1);
  }
}

// Initialize app if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// ✅ Get Firestore instance
const db = admin.firestore();

// ✅ Correct way to export in CommonJS
module.exports = { admin, db };
