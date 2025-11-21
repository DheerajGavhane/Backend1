# Firebase Service Account Setup for Render

## Problem
The `FIREBASE_SERVICE_ACCOUNT` environment variable is not being recognized in Render.

## Solution Options

### Option 1: Use Render's Dashboard (Recommended)

1. **Copy the credentials:**
   - Go to your backend folder
   - Open `config/serviceAccountKey.json`
   - Select ALL content (Ctrl+A)
   - Copy it (Ctrl+C)

2. **Add to Render:**
   - Go to https://dashboard.render.com
   - Select `finarrator-backend` service
   - Click **"Settings"** (usually at the bottom of the page)
   - Scroll down to find **"Environment"** section
   - Click **"Add Environment Variable"**
   - Enter:
     - **Key:** `FIREBASE_SERVICE_ACCOUNT`
     - **Value:** Paste the entire JSON content
   - Click **"Save"** button
   - Trigger **"Manual Deploy"** from the top

### Option 2: Create .env.production File (Local Testing)

If Option 1 doesn't work, try this for local Render simulation:

1. Create `backend/.env.production`:
   ```bash
   NODE_ENV=production
   FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
   ```

2. The file is already in `.gitignore`, so it won't be committed

3. Test locally:
   ```bash
   NODE_ENV=production npm start
   ```

### Option 3: Use Render File Uploads

If environment variables aren't working:

1. In Render Dashboard → Settings
2. Look for **"Files"** section
3. Upload `config/serviceAccountKey.json` directly
4. Update `AdminFirebase.js` to read from the uploaded file path

### Debugging

After adding the variable, check the deploy logs for:
```
🚀 Backend Starting...
FIREBASE_SERVICE_ACCOUNT present: true
✅ Successfully parsed FIREBASE_SERVICE_ACCOUNT
```

If it shows `false`, the variable wasn't set correctly.

## Important Notes

- The JSON must be complete (starts with `{` and ends with `}`)
- Do NOT add any line breaks or formatting
- Do NOT commit this file to Git
- Always use **Save** button after entering variables
- Render may cache old deployments - use **Manual Deploy** to force refresh

