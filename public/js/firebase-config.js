// ============================================================
//  Firebase Configuration
//  Fill in YOUR values from the Firebase Console.
//  See README.md for step-by-step instructions.
// ============================================================

const FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

// ---- DO NOT EDIT BELOW THIS LINE ----

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);

const auth    = firebase.auth();
const db      = firebase.firestore();
const storage = firebase.storage();

// List of admin email addresses.
// Add your own admin email(s) here.
const ADMIN_EMAILS = [
  "admin@example.com"   // ← replace with your email
];

function isAdmin(email) {
  return ADMIN_EMAILS.includes((email || "").toLowerCase());
}
