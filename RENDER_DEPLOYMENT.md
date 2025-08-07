# 🚀 Render Deployment Guide for Codev

## Prerequisites

1. **Create Render Account**
   - Go to https://render.com/
   - Sign up for a free account
   - Connect your GitHub account

2. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

## Step-by-Step Render Deployment

### Step 1: Create Web Service

1. **Login to Render Dashboard**
   - Go to https://dashboard.render.com/
   - Click "New +" → "Web Service"

2. **Connect GitHub Repository**
   - Select "Connect a repository"
   - Choose your Codev repository
   - Click "Connect"

### Step 2: Configure Web Service

Fill in these settings:

**Basic Settings:**
- **Name**: `codev` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`

**Build & Deploy Settings:**
- **Build Command**: `npm install && cd frontend && npm install && npm run build`
- **Start Command**: `cd backend && npm start`

**Environment Variables:**
Add these environment variables:
- **Key**: `VITE_BACKEND_URL`
- **Value**: `https://your-app-name.onrender.com` (replace with your actual app URL)

### Step 3: Deploy

1. **Click "Create Web Service"**
2. **Wait for build to complete** (5-10 minutes)
3. **Your app will be live at**: `https://your-app-name.onrender.com`

## Environment Variables Setup

### In Render Dashboard:
1. Go to your web service
2. Click "Environment" tab
3. Add these variables:

```
VITE_BACKEND_URL=https://your-app-name.onrender.com
NODE_ENV=production
```

## File Structure for Render

```
Codev/
├── backend/
│   ├── src/
│   │   └── server.js          # Serves static files + WebSocket
│   ├── package.json           # Backend dependencies
│   └── Procfile              # Render process file
├── frontend/
│   ├── src/
│   │   └── socket.js          # Updated for production
│   └── package.json           # Frontend dependencies
├── package.json               # Root package.json
└── RENDER_DEPLOYMENT.md       # This file
```

## Render vs Heroku

### ✅ **Render Advantages:**
- **Free tier available** (750 hours/month)
- **Automatic deployments** from GitHub
- **SSL certificates** included
- **Custom domains** supported
- **Better performance** than Heroku free tier

### ⚠️ **Render Limitations:**
- **Sleeps after 15 minutes** of inactivity (free tier)
- **Limited bandwidth** on free tier
- **Cold starts** when waking from sleep

## Troubleshooting

### Common Issues:

1. **Build fails**
   - Check build logs in Render dashboard
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

2. **Socket connection fails**
   - Verify `VITE_BACKEND_URL` environment variable
   - Check CORS configuration in server.js
   - Ensure WebSocket transport is enabled

3. **Static files not served**
   - Verify build path in server.js
   - Check that frontend/dist folder exists after build

### Useful Commands:

```bash
# Check build logs
# Go to Render Dashboard → Your App → Logs

# Restart service
# Go to Render Dashboard → Your App → Manual Deploy

# Check environment variables
# Go to Render Dashboard → Your App → Environment
```

## Monitoring

1. **View Logs**: Render Dashboard → Your App → Logs
2. **Monitor Performance**: Render Dashboard → Your App → Metrics
3. **Check Status**: Render Dashboard → Your App → Events

## Cost

### Free Tier:
- **750 hours/month** (enough for 24/7 usage)
- **512 MB RAM**
- **Shared CPU**
- **Sleeps after 15 minutes** of inactivity

### Paid Plans:
- **Starter**: $7/month (always on, 512 MB RAM)
- **Standard**: $25/month (always on, 1 GB RAM)

## Custom Domain (Optional)

1. **Add Custom Domain**:
   - Go to Render Dashboard → Your App → Settings
   - Click "Add Custom Domain"
   - Follow DNS configuration instructions

2. **Update Environment Variable**:
   - Update `VITE_BACKEND_URL` to your custom domain

## Auto-Deploy

Render automatically deploys when you:
1. Push to your main branch
2. Create a new tag
3. Manually trigger deployment

## Support

If you encounter issues:
1. Check Render status: https://status.render.com/
2. View build logs in Render dashboard
3. Check environment variables
4. Restart the service if needed

---

**Your app will be live at: https://your-app-name.onrender.com**

## Quick Deploy Commands

```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy to Render"
git push origin main

# 2. Go to Render Dashboard and create web service
# 3. Configure as shown above
# 4. Wait for deployment to complete
```

---

**Render is much better than Heroku for free deployments! 🎉**
