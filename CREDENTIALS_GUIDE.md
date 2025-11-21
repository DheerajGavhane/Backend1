# Credentials Management Guide

## Secure Credentials Handling

Your `serviceAccountKey.json` file has been **removed from Git** to keep your credentials safe. Here's how to handle it on Render.

## ✅ What Was Done

1. ✓ Removed `serviceAccountKey.json` from Git history
2. ✓ Updated `.gitignore` to exclude all credential files
3. ✓ Pushed clean code to GitHub (without secrets)
4. ✓ Your local file is still safe on your machine

## 🔒 Handling Credentials on Render

### Option 1: Upload File via Render Dashboard (Recommended)

1. Go to your Render service dashboard
2. Click on "Environment"
3. Scroll down to "Secret Files"
4. Click "Add Secret File"
5. **File Name**: `config/serviceAccountKey.json`
6. **File Content**: Copy entire contents of your local `config/serviceAccountKey.json`
7. Click "Save"

### Option 2: Store as Environment Variable

If the file is too large, convert it to a string:

1. **In your local machine:**
```bash
# Convert JSON to string (Windows PowerShell)
$content = Get-Content "config/serviceAccountKey.json" -Raw
$content | Set-Clipboard
```

2. **On Render Dashboard:**
   - Go to Environment
   - Add new environment variable:
     - Key: `FIREBASE_CREDENTIALS_JSON`
     - Value: Paste the JSON string

3. **Update your code to use it:**
```javascript
// In config/AdminFirebase.js
const credentials = process.env.FIREBASE_CREDENTIALS_JSON 
  ? JSON.parse(process.env.FIREBASE_CREDENTIALS_JSON)
  : require('./serviceAccountKey.json');
```

### Option 3: Use Firebase Service Account Metadata

If Render has an integration, you can use environment variables instead:

- Use Firebase project ID and other metadata
- Set individual environment variables instead of the entire JSON

## 📋 Files Now Protected

Your `.gitignore` now excludes:

```
config/serviceAccountKey.json
serviceAccountKey.json
firebase-adminsdk-*.json
.firebaserc
credentials.json
secrets.json
.env
```

## ⚠️ Important Notes

- **Never commit** `serviceAccountKey.json` to Git
- **Always use** environment variables or secret files for production
- **Rotate credentials** periodically for security
- **Use different keys** for development and production

## 🔑 Getting New Credentials

If you need new Firebase credentials:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to Settings → Service Accounts
4. Click "Generate New Private Key"
5. Download the JSON file
6. Keep it secure and never share it

## Testing Locally

Your local setup still works:
- Keep `config/serviceAccountKey.json` in your `.gitignore`
- The file exists locally but won't be tracked by Git
- Render will use the secret file/env var you configured

## Verification

To verify everything is working:

1. **Check Git didn't track it:**
```bash
git log --all --full-history -- config/serviceAccountKey.json
```
Should show no results if properly removed.

2. **Test on Render:**
- Deploy to Render
- Check logs to confirm Firebase initializes correctly
- No "credentials not found" errors

## Need Help?

If you get authentication errors on Render:

1. Verify secret file is uploaded in Render dashboard
2. Check file path matches: `config/serviceAccountKey.json`
3. Verify content is valid JSON
4. Check Firebase project ID matches
5. Review Render logs for detailed error messages

---

Your backend is now secure and ready for production! 🚀
