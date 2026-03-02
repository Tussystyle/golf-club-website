# Captain Randy and His Merry Fellows — Website  Setup Guide

A private members-only club website built with plain HTML/CSS/JS and Firebase.

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [Step 1 — Create a Firebase Project](#2-step-1--create-a-firebase-project)
3. [Step 2 — Enable Firebase Services](#3-step-2--enable-firebase-services)
4. [Step 3 — Add Your Firebase Config Keys](#4-step-3--add-your-firebase-config-keys)
5. [Step 4 — Set Up Admin Access](#5-step-4--set-up-admin-access)
6. [Step 5 — Deploy with Firebase Hosting](#6-step-5--deploy-with-firebase-hosting)
7. [Step 6 — Connect Your GoDaddy Domain](#7-step-6--connect-your-godaddy-domain)
8. [Step 7 — Add Your Google Calendar](#8-step-7--add-your-google-calendar)
9. [Day-to-Day Admin Tasks](#9-day-to-day-admin-tasks)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Project Structure

```
captain-randy/
├── public/                  ← All website files (deployed to Firebase Hosting)
│   ├── index.html           ← Login page (homepage)
│   ├── signup.html          ← New member registration
│   ├── dashboard.html       ← Members dashboard (after login)
│   ├── blog.html            ← Club blog
│   ├── calendar.html        ← Google Calendar embed
│   ├── gallery.html         ← Photo gallery
│   ├── admin.html           ← Admin panel (approve members, manage content)
│   ├── css/
│   │   └── styles.css       ← All styles (nautical theme)
│   └── js/
│       ├── firebase-config.js  ← ⭐ YOUR FIREBASE KEYS GO HERE
│       └── auth-guard.js    ← Authentication helper
├── firebase.json            ← Firebase Hosting config
├── .firebaserc              ← Your Firebase project ID
├── firestore.rules          ← Database security rules
├── firestore.indexes.json   ← Database query indexes
├── storage.rules            ← File storage security rules
└── README.md                ← This file
```

---

## 2. Step 1 — Create a Firebase Project

1. Open your browser and go to **https://console.firebase.google.com**
2. Click **"Add project"**
3. Enter a project name — e.g., `captain-randy-club`
4. Choose whether to enable Google Analytics (optional — you can say No)
5. Click **"Create project"** and wait for it to finish
6. Click **"Continue"** to open your new project dashboard

---

## 3. Step 2 — Enable Firebase Services

You need to turn on three services:

### A. Firebase Authentication
1. In the left sidebar click **"Build" → "Authentication"**
2. Click **"Get started"**
3. Click **"Email/Password"** under "Sign-in providers"
4. Toggle **"Email/Password"** to **Enabled**
5. Click **Save**

### B. Cloud Firestore (Database)
1. In the left sidebar click **"Build" → "Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in production mode"** (the security rules file handles permissions)
4. Select a region close to your members (e.g., `us-east1`)
5. Click **"Enable"**

### C. Firebase Storage (Photos)
1. In the left sidebar click **"Build" → "Storage"**
2. Click **"Get started"**
3. Choose **"Start in production mode"**
4. Keep the default bucket location and click **"Done"**

---

## 4. Step 3 — Add Your Firebase Config Keys

1. In the Firebase Console, click the **gear icon ⚙️** (top left) → **"Project settings"**
2. Scroll down to **"Your apps"**
3. If you haven't added a web app yet, click **"</>"** (Add web app)
   - Give it a nickname, e.g., `Club Website`
   - Check **"Also set up Firebase Hosting"**
   - Click **"Register app"**
4. You will see a code block like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

5. Open the file **`public/js/firebase-config.js`** in a text editor
6. Replace each `"YOUR_..."` placeholder with the values from Firebase:

```javascript
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSy...",          // ← paste your apiKey here
  authDomain:        "your-project.firebaseapp.com",
  projectId:         "your-project-id",
  storageBucket:     "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abc123"
};
```

7. Also open **`.firebaserc`** and replace `YOUR_PROJECT_ID` with your actual project ID:

```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

---

## 5. Step 4 — Set Up Admin Access

The admin is identified by email address. You need to add your email in **two places**:

### In `public/js/firebase-config.js`:
```javascript
const ADMIN_EMAILS = [
  "yourname@gmail.com"   // ← put your email here
];
```

### In `firestore.rules`:
```
function isAdmin() {
  return isSignedIn() &&
    request.auth.token.email in ['yourname@gmail.com'];
}
```

### In `storage.rules`:
```
function isAdmin() {
  return isSignedIn() &&
    request.auth.token.email in ['yourname@gmail.com'];
}
```

> **Important:** Use the exact same email in all three places. This is the email
> you will use to log in as the admin. You will need to sign up as a regular member
> first (via the signup page) — admin status is based on your email, not a
> database role, so you'll be automatically recognized as admin when you log in.

---

## 6. Step 5 — Deploy with Firebase Hosting

### Install Firebase CLI (one-time setup)
You need Node.js installed. If you don't have it:
- Download from **https://nodejs.org** (choose the LTS version)
- Run the installer

Then install the Firebase CLI:
```bash
npm install -g firebase-tools
```

### Log in to Firebase
```bash
firebase login
```
A browser window will open — sign in with the Google account you used for Firebase.

### Deploy the site
Navigate to the project folder in your terminal/command prompt:
```bash
cd path/to/captain-randy
```

Deploy the security rules and the website:
```bash
firebase deploy
```

When it finishes, you'll see a line like:
```
Hosting URL: https://your-project-id.web.app
```

That's your live website! 🎉

### Deploy only hosting (after making changes)
```bash
firebase deploy --only hosting
```

### Deploy only rules (after editing security rules)
```bash
firebase deploy --only firestore:rules,storage
```

---

## 7. Step 6 — Connect Your GoDaddy Domain

### Step A — Get your Firebase hosting details
1. Go to Firebase Console → **Hosting** → **Add custom domain**
2. Enter your domain name (e.g., `www.captainrandy.com` or `captainrandy.com`)
3. Firebase will show you **DNS records** to add — keep this window open

### Step B — Update DNS in GoDaddy
1. Log in at **https://godaddy.com**
2. Go to **My Products** → find your domain → click **DNS**
3. You'll need to add the records Firebase showed you:
   - For an **A record**: Set the Host to `@`, point to the IP addresses Firebase provides
   - For a **CNAME record** (for `www`): Set Host to `www`, Value to your `.web.app` URL

**GoDaddy A Record example:**
| Type | Name | Value              | TTL |
|------|------|--------------------|-----|
| A    | @    | 151.101.1.195      | 600 |
| A    | @    | 151.101.65.195     | 600 |

*(Use the exact IPs Firebase gives you — they may differ)*

**GoDaddy CNAME example (for www):**
| Type  | Name | Value                        | TTL |
|-------|------|------------------------------|-----|
| CNAME | www  | your-project-id.web.app.     | 1HR |

4. Save the DNS changes
5. Go back to Firebase and click **Verify** — DNS changes can take up to 48 hours
   to propagate, but often work within an hour

### Step C — SSL Certificate
Firebase automatically provides a free SSL certificate (HTTPS) once your domain
is verified. You don't need to do anything extra.

---

## 8. Step 7 — Add Your Google Calendar

1. Open **https://calendar.google.com**
2. In the left sidebar, find your calendar under **"My calendars"**
3. Click the three dots **⋮** next to the calendar → **"Settings and sharing"**
4. Under **"Access permissions"**, check **"Make available to public"** (so the embed works)
5. Scroll down to **"Integrate calendar"**
6. Copy the **Embed code** — it looks like `<iframe src="https://calendar.google.com/...`
7. Open `public/calendar.html` in a text editor
8. Find this section:

```html
<!-- PLACEHOLDER — replace this entire block with your Google Calendar iframe -->
<div class="calendar-placeholder" id="calendar-placeholder">
  ...
</div>
```

9. Delete that entire `<div class="calendar-placeholder">` block
10. Paste your iframe, wrapping it like this:

```html
<div class="calendar-embed">
  <iframe
    src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=America%2FNew_York"
    style="border: 0"
    width="100%"
    height="650"
    frameborder="0"
    scrolling="no">
  </iframe>
</div>
```

11. Save the file and deploy: `firebase deploy --only hosting`

---

## 9. Day-to-Day Admin Tasks

### Approving New Members
1. Log in with your admin email
2. Go to **Admin Panel** (`/admin.html`) or click the Admin link in the nav
3. Click the **"Members"** tab
4. New members show up as **"Pending"** — click **Approve** or **Reject**
5. Approved members can immediately log in; rejected members see an error message

### Creating Blog Posts
1. Go to Admin Panel → **"Blog Posts"** tab
2. Click **"+ New Post"**
3. Fill in the title and body, click **Save Post**
4. You can also edit or delete posts from the Blog page directly

### Uploading Photos
1. Go to Admin Panel → **"Photos"** tab
2. Drag and drop images onto the upload area, or click to browse
3. Multiple files can be uploaded at once (max 10 MB per photo)
4. Click the **✕** button on any photo to delete it

---

## 10. Troubleshooting

### "Permission denied" errors
- Make sure your Firestore and Storage rules are deployed: `firebase deploy --only firestore:rules,storage`
- Check that your admin email is spelled exactly the same in `firebase-config.js`, `firestore.rules`, and `storage.rules`

### Login not working
- Verify your Firebase config keys in `public/js/firebase-config.js`
- Make sure Email/Password sign-in is enabled in Firebase Console → Authentication

### Photos not uploading
- Check Storage rules are deployed
- Verify your admin email matches
- Make sure the photo is under 10 MB and is an image file

### Site not loading after deploy
- Wait 2-5 minutes and refresh
- Check `firebase deploy` output for any errors
- Run `firebase hosting:channel:deploy preview` to test before going live

### DNS not resolving after connecting GoDaddy
- DNS changes can take up to 48 hours (usually faster)
- Use **https://dnschecker.org** to see if your records have propagated

---

## Need Help?

- Firebase Documentation: https://firebase.google.com/docs
- Firebase Console: https://console.firebase.google.com
- GoDaddy DNS Help: https://www.godaddy.com/help/manage-dns-records-680
