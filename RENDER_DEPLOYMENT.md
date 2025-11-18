# Render Deployment Guide

## Problem Fixed ✅

The PostgreSQL session store connection error on Render has been resolved. The application now automatically falls back to in-memory sessions when `DATABASE_URL` is not configured.

### What Changed

**File Modified:** `server/googleAuth.ts`

The session configuration now intelligently chooses the appropriate session store:
- **With DATABASE_URL**: Uses PostgreSQL session store (persistent sessions)
- **Without DATABASE_URL**: Uses in-memory session store (works but sessions reset on restart)

## Deployment to Render

### Option 1: Deploy with In-Memory Sessions (Simple)

Your application will now work on Render **without any additional configuration**. Just push your code to GitHub:

```bash
git add .
git commit -m "Fix: Add fallback to in-memory session store for Render"
git push origin main
```

Render will automatically redeploy, and the session error will be gone.

**Trade-off:** User sessions will be lost when the service restarts (on deploy or sleep/wake).

### Option 2: Deploy with PostgreSQL Sessions (Recommended)

For persistent user sessions that survive restarts:

1. **Add PostgreSQL to Your Render Service**
   - Go to your Render dashboard
   - Click "New" → "PostgreSQL"
   - Create a new PostgreSQL database
   - Copy the "Internal Database URL"

2. **Add Environment Variable**
   - Go to your web service settings
   - Click "Environment"
   - Add new environment variable:
     - Key: `DATABASE_URL`
     - Value: [paste the Internal Database URL]
   - Click "Save Changes"

3. **Initialize Database Schema**
   
   The database needs the session table. You can either:
   
   **Method A: Let it auto-create (easiest)**
   - In `server/googleAuth.ts`, temporarily change line 18:
     ```typescript
     createTableIfMissing: true,  // Changed from false
     ```
   - Deploy, let it create the table
   - Change it back to `false` and redeploy

   **Method B: Manually create (if you have database access)**
   - Connect to your Render PostgreSQL database
   - Run the session table creation SQL (Render will have this in logs)

4. **Push Changes**
   ```bash
   git add .
   git commit -m "Update for PostgreSQL session store on Render"
   git push origin main
   ```

## Environment Variables Required on Render

### Required
- `SESSION_SECRET` - A random secret key for session encryption

### Optional (for features)
- `DATABASE_URL` - PostgreSQL connection string (for persistent sessions)
- `ADMIN_USERNAME` - Default admin username
- `ADMIN_PASSWORD` - Default admin password
- `GOOGLE_CLIENT_ID` - For Google OAuth
- `GOOGLE_CLIENT_SECRET` - For Google OAuth
- `ALLOWED_EMAIL` - Email whitelist for Google OAuth

## Verifying the Deployment

After deployment, check your Render logs:

**With DATABASE_URL configured:**
```
✅ Using PostgreSQL session store
```

**Without DATABASE_URL:**
```
⚠️ Using in-memory session store (sessions will be lost on restart)
```

Both configurations work - choose based on your needs!

## Current Status on Replit

✅ Working perfectly with PostgreSQL session store  
✅ Application running on port 5000  
✅ All features functional  

The same code will now work seamlessly on both Replit and Render.
