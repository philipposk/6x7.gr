# Setting Up appblueprints.6x7.gr Subdomain

This guide will help you set up the AppBlueprints project as a subdomain on Vercel.

---

## Step 1: Deploy AppBlueprints to Vercel

### Option A: Deploy from GitHub (Recommended)

1. **Push AppBlueprints to GitHub:**
   ```bash
   cd /Users/phktistakis/6x7.gr/AppBlueprints
   git init
   git add .
   git commit -m "Initial commit: AppBlueprints project"
   git remote add origin https://github.com/philipposk/appblueprints.git
   git branch -M main
   git push -u origin main
   ```
   (First create the repository on GitHub: `appblueprints`)

2. **In Vercel:**
   - Go to Vercel dashboard
   - Click **"Add New..."** → **"Project"**
   - Import the `appblueprints` repository
   - Deploy

### Option B: Deploy as Separate Project in Same Repo

1. **In Vercel Dashboard:**
   - Go to your `6x7.gr` project
   - Go to **Settings** → **Git**
   - The project is already connected

2. **Create New Project:**
   - Click **"Add New..."** → **"Project"**
   - Select the same repository (`6x7.gr`)
   - Configure:
     - **Project Name**: `appblueprints`
     - **Root Directory**: `AppBlueprints`
     - **Framework Preset**: Other
     - **Build Command**: (leave empty)
     - **Output Directory**: (leave empty)
   - Click **"Deploy"**

---

## Step 2: Add Subdomain in Vercel

1. **In Vercel Dashboard:**
   - Click on your **appblueprints** project
   - Go to **Settings** → **Domains**

2. **Add Subdomain:**
   - In "Add Domain" field, type: `appblueprints.6x7.gr`
   - Click **"Add"**

3. **Vercel will show DNS records:**
   - Copy the CNAME record value
   - It will look like: `cname.vercel-dns.com` or similar

---

## Step 3: Add DNS Record in Papaki

1. **Go to Papaki:**
   - Log into https://www.papaki.gr
   - Go to your domain: **6x7.gr**
   - Click **"Manage Domain"** or **"DNS Settings"**

2. **Add CNAME Record:**
   - Find **"DNS Service"** section
   - Click **"Add Record"** or **"Edit DNS"**
   - Fill in:
     - **Type**: `CNAME`
     - **Host/Name**: `appblueprints`
     - **Content/Value**: Paste the CNAME value from Vercel
       (e.g., `cname.vercel-dns.com` or the specific value Vercel shows)
   - Click **"Save"**

   ```
   DNS Records in Papaki:
   ┌─────────────────────────────────────┐
   │  Type   │ Host          │ Content    │
   │  ───────┼───────────────┼───────────│
   │  A      │ @             │ 216.198...│
   │  CNAME  │ www           │ cname...   │
   │  CNAME  │ praiser       │ cname...   │
   │  CNAME  │ appblueprints │ cname...   │ ← Add this
   └─────────────────────────────────────┘
   ```

---

## Step 4: Wait for DNS Propagation

1. **Wait 5-60 minutes** for DNS to propagate
2. **Check in Vercel:**
   - Go to Settings → Domains
   - Click **"Refresh"** button
   - Status should change to **"Valid Configuration"**

3. **Test Your Subdomain:**
   - Visit: **https://appblueprints.6x7.gr**
   - Your AppBlueprints site should load! 🎉

---

## Alternative: Deploy from Local Folder

If you want to deploy directly from the local folder:

1. **In Vercel Dashboard:**
   - Click **"Add New..."** → **"Project"**
   - Look for **"Or drag and drop a folder"**
   - Drag the `AppBlueprints` folder onto Vercel
   - Deploy

2. **Then follow Steps 2-4 above** to add the subdomain

---

## Quick Reference

**Subdomain URL:** `https://appblueprints.6x7.gr`

**DNS Record Needed:**
- Type: `CNAME`
- Host: `appblueprints`
- Value: (from Vercel)

**Vercel Settings:**
- Root Directory: `AppBlueprints` (if deploying from main repo)
- Or: Deploy as separate project

---

## Troubleshooting

### Subdomain not working?

1. **Check DNS record:**
   - Make sure CNAME is added correctly in Papaki
   - Host should be `appblueprints` (not `appblueprints.6x7.gr`)

2. **Check Vercel:**
   - Make sure domain is added in Vercel
   - Wait 5-60 minutes after adding DNS

3. **Test DNS:**
   - Visit: https://dnschecker.org
   - Enter: `appblueprints.6x7.gr`
   - Select: `CNAME` record type
   - See if it shows Vercel's value

---

**That's it! Your AppBlueprints subdomain will be live at appblueprints.6x7.gr** 🚀

