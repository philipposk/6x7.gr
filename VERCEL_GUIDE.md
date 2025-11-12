# Complete Vercel Deployment Guide for 6x7.gr

## What is Vercel?

Vercel is a **FREE** hosting platform that makes deploying websites super easy. It's perfect for static sites like yours (HTML, CSS, JavaScript).

**Benefits:**
- ✅ 100% Free
- ✅ Super fast (global CDN)
- ✅ Automatic HTTPS/SSL
- ✅ Easy custom domain setup
- ✅ Deploy in seconds

---

## Step 1: Sign Up for Vercel

1. Go to **https://vercel.com**
2. Click **Sign Up** (top right)
3. You can sign up with:
   - **GitHub** (recommended - easiest)
   - **GitLab**
   - **Bitbucket**
   - **Email** (if you don't have GitHub)

**Recommendation:** Use GitHub if you have it, or create a free GitHub account first. It makes everything easier.

---

## Step 2: Deploy Your Website

You have **3 ways** to deploy. Choose the easiest for you:

### Method 1: Drag & Drop (Easiest!) ⭐

1. After logging into Vercel, you'll see the dashboard
2. Click **Add New...** → **Project**
3. Look for **"Or drag and drop a folder"** section
4. **Drag your entire `6x7.gr` folder** onto the page
5. Vercel will automatically:
   - Detect it's a static site
   - Deploy it
   - Give you a URL like: `your-site-name.vercel.app`
6. Click **Visit** to see your live site! 🎉

**That's it!** Your site is live in about 10 seconds.

---

### Method 2: Using Vercel CLI (Command Line)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```
   *(If you don't have Node.js/npm, install it from nodejs.org first)*

2. **Open Terminal:**
   - Mac: Open Terminal app
   - Windows: Open Command Prompt or PowerShell

3. **Navigate to your project:**
   ```bash
   cd /Users/phktistakis/6x7.gr
   ```

4. **Deploy:**
   ```bash
   vercel
   ```

5. **Follow the prompts:**
   - "Set up and deploy?" → Type `Y` and press Enter
   - "Which scope?" → Press Enter (use default)
   - "Link to existing project?" → Type `N` and press Enter
   - "What's your project's name?" → Press Enter (or type a name)
   - "In which directory is your code located?" → Press Enter (use `./`)
   - "Want to override the settings?" → Type `N` and press Enter

6. **Done!** Your site is deployed and you'll see the URL.

---

### Method 3: Connect GitHub Repository

1. **First, upload your files to GitHub** (see GitHub Pages guide if needed)

2. In Vercel dashboard, click **Add New...** → **Project**

3. Click **Import Git Repository**

4. Select your GitHub repository (or connect GitHub if first time)

5. Vercel will auto-detect settings:
   - Framework Preset: **Other**
   - Root Directory: `./`
   - Build Command: Leave empty
   - Output Directory: Leave empty

6. Click **Deploy**

7. Wait 30 seconds... **Done!** ✅

---

## Step 3: Connect Your Domain (6x7.gr)

### 3.1: Add Domain in Vercel

1. In Vercel dashboard, click on your **project**

2. Go to **Settings** tab (top menu)

3. Click **Domains** (left sidebar)

4. In the "Add Domain" field, type: `6x7.gr`

5. Click **Add**

6. Vercel will show you DNS records to add

---

### 3.2: Add DNS Records at Your Domain Registrar

Vercel will show you **exact DNS records** to add. They typically look like this:

**Option A: Using A Records (if shown):**
- Type: `A`
- Name: `@` (or leave blank)
- Value: `76.76.21.21` (Vercel will show you the exact IP)
- TTL: `3600` (or default)

**Option B: Using CNAME (if shown):**
- Type: `CNAME`
- Name: `@` (or leave blank)
- Value: `cname.vercel-dns.com` (Vercel shows exact value)
- TTL: `3600` (or default)

**For www subdomain:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com` (Vercel shows exact value)

**Important:** Vercel will show you the **exact values** to use. Copy them exactly!

---

### 3.3: How to Add DNS Records

1. **Log into your domain registrar** (where you bought 6x7.gr)

2. Find **DNS Management** or **DNS Settings**

3. Look for **DNS Records** section

4. **Add the records Vercel showed you:**
   - Click **Add Record** or **Create Record**
   - Enter the Type, Name, and Value exactly as Vercel shows
   - Save

5. **Wait 5-60 minutes** for DNS to propagate

6. **Check Vercel dashboard:**
   - Go back to **Settings** → **Domains**
   - You'll see status: "Valid Configuration" when it's working

---

## Step 4: Enable HTTPS (Automatic!)

Vercel automatically provides **free SSL certificates**:

1. After DNS is configured, Vercel will automatically:
   - Detect your domain
   - Issue SSL certificate
   - Enable HTTPS

2. This usually happens within **5-10 minutes** after DNS is set up

3. Your site will be accessible at:
   - `https://6x7.gr` ✅
   - `https://www.6x7.gr` ✅

---

## Step 5: Update Your Website

### Method 1: Re-upload via Dashboard

1. Go to your project in Vercel
2. Click **Deployments** tab
3. Click **...** (three dots) → **Redeploy**
4. Or drag & drop new files

### Method 2: Using CLI

```bash
cd /Users/phktistakis/6x7.gr
# Make your changes to files
vercel --prod
```

### Method 3: Auto-deploy from GitHub

If you connected GitHub:
1. Edit files on GitHub (or push changes)
2. Vercel automatically redeploys! ✨

---

## Vercel Dashboard Overview

Once deployed, you'll see:

- **Deployments**: All your site versions
- **Domains**: Your custom domains
- **Analytics**: Visitor stats (paid feature, but basic is free)
- **Settings**: Project configuration

---

## Troubleshooting

### Domain not working?

1. **Check DNS records:**
   - Make sure you added them exactly as Vercel shows
   - Wait longer (can take up to 48 hours, usually 1 hour)

2. **Verify in Vercel:**
   - Go to **Settings** → **Domains**
   - Check if it shows "Valid Configuration"
   - If it shows errors, fix the DNS records

3. **Test DNS:**
   - Visit: https://dnschecker.org
   - Enter: `6x7.gr`
   - See if it shows Vercel's IP

### Site not updating?

- Make sure you're deploying to production
- Check **Deployments** tab for latest version
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Build errors?

- Your site is static (HTML/CSS/JS), so there shouldn't be build errors
- If you see errors, check the **Deployments** tab for details

---

## Vercel Features You Get Free

✅ **Unlimited deployments**
✅ **Global CDN** (fast worldwide)
✅ **Automatic HTTPS**
✅ **Custom domains**
✅ **Preview deployments** (test before going live)
✅ **Analytics** (basic)

---

## Quick Command Reference

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# View deployments
vercel ls

# Remove deployment
vercel remove
```

---

## Summary: Quick Start

1. ✅ Sign up at vercel.com
2. ✅ Drag & drop your `6x7.gr` folder
3. ✅ Site is live in 10 seconds!
4. ✅ Go to Settings → Domains → Add `6x7.gr`
5. ✅ Copy DNS records from Vercel
6. ✅ Add DNS records at your domain registrar
7. ✅ Wait 5-60 minutes
8. ✅ Visit 6x7.gr - it works! 🎉

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Community**: https://github.com/vercel/vercel/discussions

**Vercel is one of the easiest and fastest ways to deploy your website!** 🚀

