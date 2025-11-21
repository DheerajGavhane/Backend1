// config/AdminFirebase.js
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// Load service account credentials
let serviceAccount;

// Debug: Log environment variable status
console.log("🔍 Checking for FIREBASE_SERVICE_ACCOUNT env var...");
console.log("FIREBASE_SERVICE_ACCOUNT exists:", !!process.env.FIREBASE_SERVICE_ACCOUNT);
console.log("All ENV keys:", Object.keys(process.env).filter(k => k.includes('FIREBASE') || k.includes('SERVICE')));

// Try to load from environment variable first (for production/Render)
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.log("✅ Loading credentials from FIREBASE_SERVICE_ACCOUNT env var");
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    console.log("✅ Successfully parsed FIREBASE_SERVICE_ACCOUNT");
  } catch (error) {
    console.error("❌ Failed to parse FIREBASE_SERVICE_ACCOUNT:", error.message);
    process.exit(1);
  }
} else {
  // Fall back to file (for local development)
  console.log("⚠️  FIREBASE_SERVICE_ACCOUNT not set, attempting to load from file...");
  
  // Try multiple possible paths
  const possiblePaths = [
    "./config/serviceAccountKey.json",
    path.join(__dirname, "serviceAccountKey.json"),
    path.join(__dirname, "../config/serviceAccountKey.json"),
    "/etc/secrets/serviceAccountKey.json" // Render secret file mount point
  ];
  
  let loaded = false;
  for (const filePath of possiblePaths) {
    try {
      if (fs.existsSync(filePath)) {
        console.log(`✅ Found credentials at: ${filePath}`);
        serviceAccount = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        console.log("✅ Successfully loaded credentials from file");
        loaded = true;
        break;
      }
    } catch (error) {
      console.log(`⚠️  Could not load from ${filePath}: ${error.message}`);
    }
  }
  
  if (!loaded) {
    console.error("❌ Could not find Firebase credentials");
    console.error("   Tried paths:", possiblePaths);
    console.error("   Please add FIREBASE_SERVICE_ACCOUNT to Render environment variables");
    console.error("   OR upload serviceAccountKey.json as a secret file");
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
