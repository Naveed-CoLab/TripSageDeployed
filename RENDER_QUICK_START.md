# ⚡ Render Quick Start - 5 Minutes to Deploy

Get TripSage running on Render in 5 minutes!

## 🎯 Prerequisites

- GitHub account with your code pushed
- Render account (sign up free at [render.com](https://render.com))
- API keys ready:
  - ✅ Gemini API Key (get from [Google AI Studio](https://makersuite.google.com/app/apikey))
  - ✅ Google Maps API Key
  - ✅ Google OAuth credentials

## 🚀 5-Minute Deploy

### Step 1: Push to GitHub (30 seconds)

```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### Step 2: Create Services on Render (2 minutes)

#### A. Create Database:
1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click **"New +"** → **"PostgreSQL"**
3. Name: `tripsage-db`
4. Plan: **Free**
5. Click **"Create Database"**
6. **COPY** the **Internal Database URL**

#### B. Create Web Service:
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repo
3. Fill in:
   - **Name**: `tripsage-app`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
4. Plan: **Free**
5. Click **"Create Web Service"**

### Step 3: Add Environment Variables (2 minutes)

In your web service, go to **"Environment"** and add:

```env
DATABASE_URL=<paste-internal-url-from-step-2A>
NODE_ENV=production
PORT=5000
SESSION_SECRET=use-openssl-rand-base64-32-to-generate-this
GEMINI_API_KEY=your-key-here
GOOGLE_MAPS_API_KEY=your-key-here
GOOGLE_CLIENT_ID=your-google-oauth-id
GOOGLE_CLIENT_SECRET=your-google-oauth-secret
GOOGLE_CALLBACK_URL=https://your-app-name.onrender.com/api/auth/google/callback
VITE_API_URL=https://your-app-name.onrender.com
```

Click **"Save Changes"**

### Step 4: Update Google OAuth (30 seconds)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Add to Authorized URIs:
   - `https://your-app-name.onrender.com`
   - `https://your-app-name.onrender.com/api/auth/google/callback`

### Step 5: Deploy! (Wait ~5 minutes)

Watch the logs in Render dashboard. When you see "serving on port 5000", you're live!

## ✅ Test Your App

Visit: `https://your-app-name.onrender.com`

Test:
- Homepage loads ✅
- Register/Login works ✅
- Google OAuth works ✅
- AI Trip Planning works ✅

## 🎉 Done!

Your app is live! See `RENDER_DEPLOYMENT_GUIDE.md` for advanced configuration.

## 🔥 Pro Tips

1. **Generate SESSION_SECRET**:
   ```bash
   openssl rand -base64 32
   ```

2. **Keep free tier active**:
   - Set up [UptimeRobot](https://uptimerobot.com/) to ping your app every 5 minutes

3. **Upgrade to $7/month** when ready:
   - No more spin-down
   - Always-on
   - Better for production

## ❗ Common Issues

**App takes 30 seconds to load first time?**
- Free tier spins down after 15 min. This is normal!
- Upgrade to paid ($7/mo) for always-on

**"Unauthorized" on Google login?**
- Check OAuth redirect URI matches exactly
- Wait 5 minutes for Google changes to propagate

**Build fails?**
- Check build logs in Render
- Verify all dependencies in `package.json`

**Database not connecting?**
- Use **Internal** Database URL (not External)
- Check DATABASE_URL includes password

## 📚 Next Steps

- Read full guide: `RENDER_DEPLOYMENT_GUIDE.md`
- Set up custom domain
- Configure database backups
- Add monitoring

**Need help?** Check [Render Community](https://community.render.com)

