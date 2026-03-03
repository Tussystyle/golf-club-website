// ============================================================
//  Firebase Configuration
//  Fill in YOUR values from the Firebase Console.
//  See README.md for step-by-step instructions.
// ============================================================

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyD_WzRA8lQMpiTi6Vj1QWQ6_NNqxrlVkJ8",
  authDomain:        "captrandy.firebaseapp.com",
  projectId:         "captrandy",
  storageBucket:     "captrandy.firebasestorage.app",
  messagingSenderId: "381963146572",
  appId:             "1:381963146572:web:0675090da198c4f0572be9",
  measurementId:     "G-HFM1VM54SS"
};

// ---- DO NOT EDIT BELOW THIS LINE ----

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);

const auth    = firebase.auth();
const db      = firebase.firestore();
let storage;
try { storage = firebase.storage(); } catch(e) { console.log('Storage not available'); }

// List of admin email addresses.
// Add your own admin email(s) here.
const ADMIN_EMAILS = [
  "chadtusa3@gmail.com"
];

function isAdmin(email) {
  return ADMIN_EMAILS.includes((email || "").toLowerCase());
}
