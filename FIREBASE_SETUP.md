# Firebase Visitor Counter Setup Guide

## Overview
Your portfolio now uses Firebase Realtime Database to track real-time visitor counts. This shows the actual number of people currently viewing your website.

## Step-by-Step Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., "Portfolio Visitor Counter")
4. Disable Google Analytics (optional, not needed for this project)
5. Click **"Create project"**

### 2. Enable Realtime Database

1. In your Firebase project, click **"Realtime Database"** from the left sidebar
2. Click **"Create Database"**
3. Select a location closest to your users (e.g., **us-central1**)
4. Choose **"Start in test mode"** for now
5. Click **"Enable"**

### 3. Configure Database Security Rules

⚠️ **IMPORTANT**: After enabling the database, you need to set proper security rules.

1. In the Realtime Database page, click on the **"Rules"** tab
2. Replace the default rules with the following:

```json
{
  "rules": {
    "visitors": {
      ".read": true,
      ".write": true,
      "$sessionId": {
        ".validate": "newData.hasChildren(['online', 'timestamp'])"
      }
    }
  }
}
```

3. Click **"Publish"**

**What these rules do:**
- Allow anyone to read the visitor count
- Allow anyone to write their presence (when they visit)
- Automatically clean up when visitors leave

### 4. Get Your Firebase Config

1. In Firebase Console, click the **gear icon** (⚙️) next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** (`</>`) to add a web app
5. Register your app with a nickname (e.g., "Portfolio Website")
6. **Copy the firebaseConfig object** that appears

### 5. Update Your firebase-config.js File

1. Open `firebase-config.js` in your code editor
2. Replace the placeholder values with your actual Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",  // Replace with your actual key
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

### 6. Test Locally

1. Open your portfolio in a web browser
2. Open browser DevTools (F12) and check the Console
3. You should see the visitor count update
4. Open the same site in a different browser or incognito mode
5. The count should increase!

### 7. Deploy to Production

Once everything works locally, deploy your site:

1. Add your production domain to Firebase:
   - Go to Firebase Console > Project Settings
   - Scroll to **"Authorized domains"**
   - Add your domain (e.g., `yourportfolio.com`)

2. Deploy your website files to your hosting service

## How It Works

### Real-Time Tracking
- When someone visits your portfolio, a unique session ID is created
- This session is added to Firebase under `/visitors/`
- Firebase tracks the connection status automatically
- When the visitor closes the tab, their session is automatically removed
- The counter updates in real-time for all visitors

### Data Structure in Firebase
```
visitors/
  ├── session_1234567890_abc123/
  │   ├── online: true
  │   └── timestamp: 1704067200000
  ├── session_9876543210_xyz789/
  │   ├── online: true
  │   └── timestamp: 1704067205000
  └── ...
```

## Troubleshooting

### Issue: Counter shows "..." forever

**Solution:**
- Check browser console for errors
- Verify Firebase config values are correct
- Make sure Realtime Database is enabled
- Check that security rules are published

### Issue: Counter shows random numbers instead of real count

**Solution:**
- Check that firebase-config.js is loading before main.js
- Verify Firebase SDK scripts are loaded in index.html
- Clear browser cache and reload

### Issue: "Permission denied" error

**Solution:**
- Check your database security rules
- Make sure rules allow read/write access to `/visitors/`

### Issue: Counter doesn't decrease when visitors leave

**Solution:**
- This is normal! Firebase's onDisconnect() might take 30-60 seconds
- Ensure you're not blocking Firebase's background connections
- Check that `.info/connected` is working

## Security Considerations

### Current Setup (Test Mode)
The current rules allow anyone to read/write to the visitors node. This is fine for a simple visitor counter.

### Production Recommendations
For better security in production:

1. **Add Rate Limiting**: Prevent spam by limiting writes per IP
2. **Add Validation**: Ensure data format is correct
3. **Set TTL**: Auto-delete old sessions after 5 minutes

Example production rules:
```json
{
  "rules": {
    "visitors": {
      ".read": true,
      "$sessionId": {
        ".write": "!data.exists() || (data.child('timestamp').val() + 300000 > now)",
        ".validate": "newData.hasChildren(['online', 'timestamp']) &&
                     newData.child('online').val() === true"
      }
    }
  }
}
```

## Cost & Limits

### Firebase Free Tier (Spark Plan)
- **Realtime Database**: 1 GB stored, 10 GB/month downloaded
- **Simultaneous connections**: 100 connections
- **More than enough** for a personal portfolio!

### Typical Usage for Portfolio
- Storage: ~1 KB (negligible)
- Bandwidth: ~100 MB/month (very low)
- Connections: Usually 1-20 concurrent visitors

**Verdict**: You'll likely never exceed the free tier!

## Need Help?

If you encounter issues:
1. Check the browser console for error messages
2. Verify all Firebase config values are correct
3. Ensure Realtime Database is enabled in Firebase Console
4. Check that security rules are properly set

## Alternative: No Firebase Setup

If you don't want to use Firebase, the code will automatically fall back to showing random visitor counts. Just leave the firebase-config.js file as is with placeholder values.

---

**That's it! Your visitor counter should now be tracking real-time visitors.** 🎉
