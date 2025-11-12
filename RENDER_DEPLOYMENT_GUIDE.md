# 🚀 Render Deployment Guide for TripSage

Complete guide to deploy your TripSage application (Backend + Frontend + Database) on Render.com

## 📋 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com) (free tier available)
2. **GitHub Account**: Your code in a GitHub repository
3. **API Keys Ready**: Gemini, Google Maps, Amadeus, etc.

## 🎯 Quick Start (Using render.yaml)

### Option A: Automatic Deployment with Blueprint (Recommended)

1. **Push render.yaml to GitHub**:
```bash
git add render.yaml
git commit -m "Add Render configuration"
git push origin main
```

2. **Go to Render Dashboard**:
   - Visit [dashboard.render.com](https://dashboard.render.com)
   - Click **"New"** → **"Blueprint"**
   
3. **Connect Repository**:
   - Select your GitHub repository
   - Render will detect `render.yaml` automatically
   
4. **Review Services**:
   - Database: `tripsage-db` (PostgreSQL)
   - Web Service: `tripsage-app` (Your app)
   
5. **Set Environment Variables**:
   - Render will prompt for the required API keys
   - Fill in your actual keys (see below)
   
6. **Deploy**:
   - Click **"Apply"**
   - Render will create and deploy everything!

---

## 🔧 Manual Setup (Step-by-Step)

### Step 1: Create PostgreSQL Database

1. Go to Render Dashboard → Click **"New +"**

2. Select **"PostgreSQL"**

3. Configure:
   - **Name**: `tripsage-db`
   - **Database**: `tripsage`
   - **User**: `tripsage_user`
   - **Region**: Oregon (or closest to you)
   - **Plan**: Free

4. Click **"Create Database"**

5. **Copy Connection Details**:
   - Go to database page
   - Copy **"Internal Database URL"** (starts with `postgres://`)
   - Save this for later!

### Step 2: Create Web Service

1. Click **"New +"** → **"Web Service"**

2. **Connect Repository**:
   - Connect your GitHub account
   - Select your TripSage repository

3. **Configure Service**:
   - **Name**: `tripsage-app` (or your preferred name)
   - **Region**: Oregon (same as database)
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Runtime**: Node
   - **Build Command**: 
     ```bash
     npm install && npm run build
     ```
   - **Start Command**: 
     ```bash
     npm run start
     ```

4. **Select Plan**: Free (or paid if you want always-on)

5. Click **"Create Web Service"** (don't worry about env vars yet)

### Step 3: Configure Environment Variables

Once your service is created:

1. Go to your web service dashboard

2. Click **"Environment"** in the left sidebar

3. Click **"Add Environment Variable"** and add each of these:

#### Required Variables:

```env
# Database
DATABASE_URL=<paste-your-internal-database-url-here>

# Server
NODE_ENV=production
PORT=5000

# Session (generate a random string)
SESSION_SECRET=your-super-secret-random-string-at-least-32-characters-long

# AI Services (REQUIRED)
GEMINI_API_KEY=your-gemini-api-key-here
GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here

# Google OAuth (REQUIRED for login)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-app-name.onrender.com/api/auth/google/callback

# Travel APIs (Optional)
AMADEUS_CLIENT_ID=your-amadeus-client-id
AMADEUS_CLIENT_SECRET=your-amadeus-client-secret
TRIPADVISOR_API_KEY=your-tripadvisor-api-key
UNSPLASH_ACCESS_KEY=your-unsplash-access-key

# Frontend
VITE_API_URL=https://your-app-name.onrender.com
```

4. Click **"Save Changes"**

**Important Notes:**
- Replace `your-app-name` with your actual Render service name
- Generate `SESSION_SECRET` using: `openssl rand -base64 32`
- The database URL should be the **Internal Database URL** from Step 1

### Step 4: Update Google OAuth Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com/)

2. Navigate to **APIs & Services** → **Credentials**

3. Select your OAuth 2.0 Client ID

4. Add **Authorized JavaScript origins**:
   ```
   https://your-app-name.onrender.com
   ```

5. Add **Authorized redirect URIs**:
   ```
   https://your-app-name.onrender.com/api/auth/google/callback
   ```

6. Click **"Save"**

### Step 5: Initial Deploy

1. Render will automatically start building your app

2. Watch the **"Logs"** tab for progress

3. Build process:
   - ✅ Installing dependencies
   - ✅ Building frontend (Vite)
   - ✅ Building backend (esbuild)
   - ✅ Starting server

4. First deploy takes ~5-10 minutes

### Step 6: Set Up Database

After deployment, you need to run migrations:

#### Option A: Using Render Shell (Recommended)

1. Go to your web service in Render

2. Click **"Shell"** in the top navigation

3. Run database migrations:
```bash
npm run db:push
```

4. Create an admin user:
```bash
node scripts/create-admin.js
```

#### Option B: Direct Database Connection

1. Go to your PostgreSQL database in Render

2. Click **"Connect"** → Copy the **External Database URL**

3. Use a database client (pgAdmin, DBeaver, or psql):
```bash
psql <external-database-url>
```

4. Run SQL files in order:
```sql
\i migrations/0000_rapid_rhino.sql
\i migrations/01_create_update_timestamp_trigger.sql
\i migrations/02_create_activity_logging_trigger.sql
-- etc.
```

### Step 7: Health Check

1. Once deployed, visit:
   ```
   https://your-app-name.onrender.com/api/health
   ```

2. Should return: `{"status":"ok"}`

3. If you see this, your backend is running! 🎉

### Step 8: Test Your App

Visit your app: `https://your-app-name.onrender.com`

Test these features:
- ✅ Homepage loads
- ✅ User registration
- ✅ Google OAuth login
- ✅ Trip planning with AI
- ✅ Flight search
- ✅ Hotel search

---

## 🛠️ Configuration Files Needed

Make sure these files exist in your repository:

### 1. `render.yaml` ✅ (Already created)
Blueprint configuration for automatic setup

### 2. `env.example` ✅ (Already created)
Template showing all required environment variables

### 3. `package.json` ✅ (Already exists)
Must have these scripts:
```json
{
  "scripts": {
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "cross-env NODE_ENV=production node -r dotenv/config dist/index.js",
    "db:push": "drizzle-kit push"
  }
}
```

---

## 🔍 Troubleshooting

### Build Failures

**Error**: `Module not found`
```bash
# Solution: Clear build cache
# In Render Dashboard → Settings → Clear build cache & deploy
```

**Error**: `Cannot find module '@shared/schema'`
```bash
# Solution: Check your imports in package.json
# Make sure "type": "module" is set
```

### Database Connection Issues

**Error**: `connect ECONNREFUSED`
```bash
# Solution: Use Internal Database URL (not External)
# Format: postgres://user:pass@hostname/database
```

**Error**: `SSL connection required`
```bash
# Add to DATABASE_URL:
?sslmode=require
```

### App Crashes

**Check Logs**:
1. Go to your service in Render
2. Click **"Logs"**
3. Look for error messages

**Common Issues**:
- Missing environment variables
- Database not connected
- Port conflict (use `process.env.PORT`)

### OAuth Not Working

**Error**: `redirect_uri_mismatch`
- Update Google OAuth settings with correct Render URL
- Make sure `GOOGLE_CALLBACK_URL` matches exactly
- Wait 5 minutes for Google changes to propagate

### Free Tier Limitations

⚠️ **Important**: Render free tier has limitations:
- Web services **spin down after 15 minutes** of inactivity
- First request after spin-down takes ~30 seconds
- 750 hours/month of runtime

**Solutions**:
1. **Upgrade to Paid Plan** ($7/month) - keeps app always running
2. **Use UptimeRobot** (free) - pings your app every 5 minutes
3. **Accept the cold starts** - fine for development

---

## 💰 Cost Breakdown

### Free Tier:
- ✅ PostgreSQL: Free (max 1GB)
- ✅ Web Service: Free (spins down when inactive)
- ✅ Custom domain: Free
- ✅ SSL certificate: Free (automatic)

### Paid Plans:
- **Starter**: $7/month (always-on, 512MB RAM)
- **Standard**: $25/month (2GB RAM, better performance)
- **PostgreSQL**: $7/month (unlimited connections)

**Recommendation**: Start free, upgrade web service to $7/month when ready for production.

---

## 🚀 Continuous Deployment

Render automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Add new feature"
git push origin main

# Render automatically:
# 1. Detects the push
# 2. Pulls latest code
# 3. Runs build
# 4. Deploys new version
# 5. Zero-downtime deployment!
```

**Auto-Deploy Settings**:
1. Go to service → **Settings**
2. Under **Build & Deploy**
3. Enable **"Auto-Deploy"** (should be on by default)

---

## 🔐 Security Best Practices

Before going live:

- [ ] **Change SESSION_SECRET** to a cryptographically random string
- [ ] **Enable HTTPS only** (automatic on Render)
- [ ] **Set NODE_ENV=production**
- [ ] **Use environment variables** for all secrets
- [ ] **Enable Render's DDoS protection** (automatic)
- [ ] **Set up database backups** (in database settings)
- [ ] **Review CORS settings** in `server/index.ts`
- [ ] **Enable rate limiting** for API endpoints

---

## 📊 Monitoring & Maintenance

### View Metrics

1. Go to your service in Render
2. Click **"Metrics"** tab
3. Monitor:
   - CPU usage
   - Memory usage
   - Request count
   - Response times

### Set Up Alerts

1. Service settings → **Notifications**
2. Add email for deploy notifications
3. Get notified of:
   - Successful deploys
   - Failed builds
   - Service errors

### Database Backups

1. Go to PostgreSQL database
2. Click **"Backups"** tab
3. Enable automatic backups
4. Free tier: 7 days retention
5. Can restore any backup with one click

---

## 🎯 Performance Optimization

### 1. Add Health Check Endpoint

Already configured in `render.yaml`:
```yaml
healthCheckPath: /api/health
```

Make sure this endpoint exists in your code!

### 2. Use Database Connection Pooling

Already configured in `server/db.ts` ✅

### 3. Enable Caching

Consider adding Redis for caching:
```bash
# In Render:
New + → Redis → Free tier available
```

### 4. Optimize Build Time

In `package.json`, ensure efficient build:
```json
{
  "scripts": {
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist"
  }
}
```

---

## 🌐 Custom Domain (Optional)

1. **Buy a domain** (Namecheap, Google Domains, etc.)

2. **In Render**:
   - Go to your service → **Settings**
   - Scroll to **Custom Domain**
   - Click **"Add Custom Domain"**
   - Enter your domain (e.g., `tripsage.com`)

3. **Update DNS**:
   - Add Render's DNS records to your domain provider
   - Render provides exact instructions
   - SSL certificate auto-generated

4. **Update Environment Variables**:
   ```env
   GOOGLE_CALLBACK_URL=https://yourdomain.com/api/auth/google/callback
   VITE_API_URL=https://yourdomain.com
   ```

5. **Update Google OAuth** with new domain

---

## 📝 Environment Variables Checklist

| Variable | Required | Where to Get |
|----------|----------|--------------|
| `DATABASE_URL` | ✅ Yes | Render PostgreSQL Dashboard |
| `NODE_ENV` | ✅ Yes | Set to `production` |
| `PORT` | ✅ Yes | Set to `5000` |
| `SESSION_SECRET` | ✅ Yes | Generate: `openssl rand -base64 32` |
| `GEMINI_API_KEY` | ✅ Yes | [Google AI Studio](https://makersuite.google.com/app/apikey) |
| `GOOGLE_MAPS_API_KEY` | ✅ Yes | [Google Cloud Console](https://console.cloud.google.com/) |
| `GOOGLE_CLIENT_ID` | ✅ Yes | Google OAuth Credentials |
| `GOOGLE_CLIENT_SECRET` | ✅ Yes | Google OAuth Credentials |
| `GOOGLE_CALLBACK_URL` | ✅ Yes | `https://your-app.onrender.com/api/auth/google/callback` |
| `AMADEUS_CLIENT_ID` | ⚠️ Optional | [Amadeus Developers](https://developers.amadeus.com/) |
| `AMADEUS_CLIENT_SECRET` | ⚠️ Optional | Amadeus Developers |
| `UNSPLASH_ACCESS_KEY` | ⚠️ Optional | [Unsplash Developers](https://unsplash.com/developers) |
| `TRIPADVISOR_API_KEY` | ⚠️ Optional | TripAdvisor API |

---

## 🆘 Getting Help

### Render Support:
- **Documentation**: [render.com/docs](https://render.com/docs)
- **Community**: [community.render.com](https://community.render.com)
- **Status**: [status.render.com](https://status.render.com)

### Common Issues:
- **Slow first load**: Free tier spins down (expected)
- **Build timeout**: Increase timeout in Settings
- **Database full**: Upgrade to paid PostgreSQL

---

## ✅ Post-Deployment Checklist

After successful deployment:

- [ ] App loads at Render URL
- [ ] Health check returns OK
- [ ] Database connected
- [ ] User registration works
- [ ] Google OAuth login works
- [ ] AI trip planning works
- [ ] Flight search works
- [ ] Hotel search works
- [ ] Profile page works
- [ ] Admin panel accessible
- [ ] All API endpoints responding
- [ ] Images loading correctly
- [ ] No console errors

---

## 🎉 You're Live!

Your TripSage app is now deployed on Render!

**Your URLs**:
- 🌍 **Production App**: `https://your-app-name.onrender.com`
- 👤 **User Portal**: `https://your-app-name.onrender.com`
- 🔧 **Admin Panel**: `https://your-app-name.onrender.com/admin`
- 💚 **Health Check**: `https://your-app-name.onrender.com/api/health`

**Next Steps**:
1. Share your app with users
2. Monitor performance in Render dashboard
3. Consider upgrading to paid tier for better performance
4. Set up custom domain
5. Configure backups
6. Add monitoring (Sentry, LogRocket)

**Happy Deploying! 🚀✨**

---

## 📱 Mobile PWA (Bonus)

To make your app installable as a mobile app:

1. Add to `client/index.html`:
```html
<link rel="manifest" href="/manifest.json">
```

2. Create `public/manifest.json`:
```json
{
  "name": "TripSage",
  "short_name": "TripSage",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#FF5722",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

3. Users can now **"Add to Home Screen"** on mobile! 📱

