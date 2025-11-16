# Complete Guide: Building 6x7.gr from Zero to Live Website

**A Step-by-Step Guide for Complete Beginners**

---

## Table of Contents

1. [Purchasing Your Domain](#1-purchasing-your-domain)
2. [Creating Your Website Files](#2-creating-your-website-files)
3. [Setting Up GitHub](#3-setting-up-github)
4. [Pushing Code to GitHub](#4-pushing-code-to-github)
5. [Setting Up Vercel](#5-setting-up-vercel)
6. [Connecting Your Domain to Vercel](#6-connecting-your-domain-to-vercel)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Purchasing Your Domain

### Step 1.1: Visit Papaki.gr

1. Open your web browser
2. Go to: **https://www.papaki.gr**
3. You should see the Papaki homepage

   ```
   ┌─────────────────────────────────────┐
   │  [Papaki.gr Logo]                   │
   │                                     │
   │  Search for domain: [________]      │
   │                    [Search Button] │
   └─────────────────────────────────────┘
   ```

### Step 1.2: Search for Your Domain

1. In the search box, type: `6x7.gr` (or your desired domain)
2. Click the **Search** button
3. Wait for results

   ```
   ┌─────────────────────────────────────┐
   │  Domain Search Results              │
   │                                     │
   │  ✅ 6x7.gr - Available             │
   │     Price: €XX.XX/year              │
   │     [Add to Cart]                   │
   └─────────────────────────────────────┘
   ```

### Step 1.3: Add to Cart and Checkout

1. Click **"Add to Cart"** or **"Buy Now"**
2. You'll be redirected to checkout
3. Fill in your information:
   - **Name**: Your full name
   - **Email**: Your email address
   - **Address**: Your physical address
   - **Phone**: Your phone number
4. Choose registration period (usually 1 year)
5. Complete payment

   ```
   ┌─────────────────────────────────────┐
   │  Shopping Cart                      │
   │                                     │
   │  ┌───────────────────────────────┐ │
   │  │ 6x7.gr                       │ │
   │  │ €XX.XX/year                  │ │
   │  │ [Remove]                     │ │
   │  └───────────────────────────────┘ │
   │                                     │
   │  Total: €XX.XX                      │
   │                                     │
   │  [Proceed to Checkout] ──────────→ │
   └─────────────────────────────────────┘
   ```

### Step 1.4: Confirm Domain Purchase

1. After payment, you'll receive a confirmation email
2. Log into your Papaki account
3. You should see your domain in the dashboard

   ```
   ┌─────────────────────────────────────┐
   │  My Domains                         │
   │                                     │
   │  ┌───────────────────────────────┐ │
   │  │ 6x7.gr                       │ │
   │  │ Status: Active ✅            │ │
   │  │ Expires: [Date]              │ │
   │  │ [Manage Domain] ───────────→ │ │
   │  └───────────────────────────────┘ │
   └─────────────────────────────────────┘
   ```

**✅ Domain Purchase Complete!**

---

## 2. Creating Your Website Files

### Step 2.1: Create Project Folder

1. Open **Finder** on your Mac
2. Navigate to your desired location (e.g., Desktop or Documents)
3. Create a new folder named: `6x7.gr`

   ```
   Finder Window:
   ┌─────────────────────────────────────┐
   │  Desktop                            │
   │                                     │
   │  📁 6x7.gr  ← New folder            │
   │  📄 Other files...                  │
   └─────────────────────────────────────┘
   ```

### Step 2.2: Create index.html

1. Open **TextEdit** or any code editor (VS Code recommended)
2. Create a new file
3. Save it as `index.html` in your `6x7.gr` folder

**File Structure:**
```
6x7.gr/
└── index.html  ← Your main website file
```

### Step 2.3: Add HTML Content

Copy and paste this basic HTML structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Filippos Dimitrios Ktistakis | 6x7.gr</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="nav-brand">6x7.gr</div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>

    <section id="home" class="hero">
        <div class="hero-content">
            <div class="welcome-card">
                <h1 class="welcome-title">Welcome to</h1>
                <h2 class="welcome-name">Filippos Dimitrios Ktistakis</h2>
                <p class="welcome-subtitle">Digital Platform & Creative Workspace</p>
            </div>
            <p class="hero-description">
                This is the central hub for all my applications, websites, projects, and digital creations.
            </p>
            <a href="#projects" class="cta-button">Explore Projects</a>
        </div>
    </section>

    <section id="about" class="about">
        <div class="container">
            <h2 class="section-title">About</h2>
            <div class="about-content">
                <p>Welcome to my digital platform! I'm Filippos Dimitrios Ktistakis, and this is where I showcase my work, projects, and digital innovations.</p>
            </div>
        </div>
    </section>

    <section id="projects" class="projects">
        <div class="container">
            <h2 class="section-title">Projects & Subdomains</h2>
            <div class="projects-grid">
                <div class="project-card">
                    <h3>Praiser</h3>
                    <p>An AI assistant designed to help you with various tasks.</p>
                    <a href="https://praiser.6x7.gr" class="project-link">Visit praiser.6x7.gr →</a>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Filippos Dimitrios Ktistakis. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```

### Step 2.4: Create styles.css

1. Create a new file named `styles.css` in the same folder
2. Add your CSS styling (you can use the styles.css file we created earlier)

**File Structure:**
```
6x7.gr/
├── index.html
└── styles.css  ← Styling file
```

### Step 2.5: Create script.js

1. Create a new file named `script.js`
2. Add JavaScript for interactivity (you can use the script.js file we created earlier)

**Final File Structure:**
```
6x7.gr/
├── index.html      ← Main HTML file
├── styles.css      ← CSS styling
└── script.js       ← JavaScript
```

**✅ Website Files Created!**

---

## 3. Setting Up GitHub

### Step 3.1: Create GitHub Account

1. Go to: **https://github.com**
2. Click **"Sign up"** (top right)

   ```
   ┌─────────────────────────────────────┐
   │  GitHub                             │
   │                                     │
   │  [Sign up]  [Sign in]              │
   │                                     │
   │  Username: [________]               │
   │  Email:    [________]               │
   │  Password: [________]               │
   │                                     │
   │  [Create account] ───────────────→ │
   └─────────────────────────────────────┘
   ```

3. Fill in:
   - **Username**: Choose a username (e.g., `philipposk`)
   - **Email**: Your email address
   - **Password**: Create a strong password
4. Verify your email address

### Step 3.2: Create New Repository

1. After logging in, click the **"+"** icon (top right)
2. Select **"New repository"**

   ```
   ┌─────────────────────────────────────┐
   │  GitHub                              │
   │                                     │
   │  + ──┐                              │
   │      ├─ New repository              │
   │      ├─ Import repository         │
   │      └─ New codespace              │
   └─────────────────────────────────────┘
   ```

3. Fill in repository details:
   - **Repository name**: `6x7.gr` (or `6x7-website`)
   - **Description**: "My personal website" (optional)
   - **Visibility**: Select **Public** ⚠️ (Required for free GitHub Pages)
   - **DO NOT** check "Add a README file"
   - **DO NOT** add .gitignore or license yet

   ```
   ┌─────────────────────────────────────┐
   │  Create a new repository            │
   │                                     │
   │  Owner: [philipposk ▼]             │
   │  Repository name: [6x7.gr]         │
   │  Description: [My website]         │
   │                                     │
   │  ⚪ Private                         │
   │  ⚫ Public  ← Select this!          │
   │                                     │
   │  ☐ Add a README file               │
   │  ☐ Add .gitignore                  │
   │  ☐ Choose a license                │
   │                                     │
   │  [Create repository] ────────────→ │
   └─────────────────────────────────────┘
   ```

4. Click **"Create repository"**

**✅ GitHub Repository Created!**

---

## 4. Pushing Code to GitHub

### Step 4.1: Install Git (if not installed)

1. Open **Terminal** (Applications → Utilities → Terminal)
2. Check if Git is installed:
   ```bash
   git --version
   ```
3. If not installed, install it:
   ```bash
   # On Mac, Git usually comes pre-installed
   # If not, install Xcode Command Line Tools:
   xcode-select --install
   ```

### Step 4.2: Create GitHub Personal Access Token

1. Go to GitHub.com
2. Click your profile picture (top right) → **Settings**

   ```
   ┌─────────────────────────────────────┐
   │  GitHub                              │
   │                                     │
   │  [Profile Pic] ──┐                  │
   │                  ├─ Your profile    │
   │                  ├─ Settings ────→ │
   │                  └─ Sign out        │
   └─────────────────────────────────────┘
   ```

3. Scroll down to **"Developer settings"** (left sidebar)
4. Click **"Personal access tokens"** → **"Tokens (classic)"**
5. Click **"Generate new token"** → **"Generate new token (classic)"**

   ```
   ┌─────────────────────────────────────┐
   │  Personal access tokens             │
   │                                     │
   │  Note: [6x7.gr website]             │
   │  Expiration: [90 days ▼]           │
   │                                     │
   │  Select scopes:                     │
   │  ☑ repo  ← Check this!              │
   │     └─ Full control of private     │
   │        repositories                 │
   │                                     │
   │  [Generate token] ────────────────→ │
   └─────────────────────────────────────┘
   ```

6. **Copy the token immediately** (you won't see it again!)
   - It looks like: `ghp_XXXXXXXXXXXXXXXXXXXXXXXX`

### Step 4.3: Initialize Git in Your Project

1. Open **Terminal**
2. Navigate to your project folder:
   ```bash
   cd /Users/phktistakis/6x7.gr
   ```
   (Replace with your actual path)

3. Initialize Git:
   ```bash
   git init
   ```

4. Add your files:
   ```bash
   git add .
   ```

5. Create first commit:
   ```bash
   git commit -m "Initial commit: Add website files"
   ```

### Step 4.4: Connect to GitHub and Push

1. Add your GitHub repository as remote:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/6x7.gr.git
   ```
   (Replace `YOUR_USERNAME` with your GitHub username)

2. Set main branch:
   ```bash
   git branch -M main
   ```

3. Push to GitHub:
   ```bash
   git push -u origin main
   ```

4. When prompted:
   - **Username**: Your GitHub username
   - **Password**: Paste your Personal Access Token (not your GitHub password!)

   ```
   Terminal:
   ┌─────────────────────────────────────┐
   │  Username for 'https://github.com': │
   │  philipposk                        │
   │  Password for 'https://...':        │
   │  [Paste token here]                 │
   └─────────────────────────────────────┘
   ```

5. Wait for upload to complete

**✅ Code Pushed to GitHub!**

You can now see your files at: `https://github.com/YOUR_USERNAME/6x7.gr`

---

## 5. Setting Up Vercel

### Step 5.1: Sign Up for Vercel

1. Go to: **https://vercel.com**
2. Click **"Sign Up"** (top right)

   ```
   ┌─────────────────────────────────────┐
   │  Vercel                              │
   │                                     │
   │  [Sign Up]  [Log In]               │
   │                                     │
   │  Continue with GitHub ────────────→ │
   │  Continue with GitLab               │
   │  Continue with Bitbucket           │
   │  Continue with Email                │
   └─────────────────────────────────────┘
   ```

3. **Recommended**: Click **"Continue with GitHub"**
   - This connects your GitHub account
   - Makes deployment automatic

4. Authorize Vercel to access your GitHub account

### Step 5.2: Import Your GitHub Repository

1. After logging in, you'll see the Vercel dashboard
2. Click **"Add New..."** → **"Project"**

   ```
   ┌─────────────────────────────────────┐
   │  Vercel Dashboard                   │
   │                                     │
   │  [Add New...] ──┐                   │
   │                 ├─ Project ──────→ │
   │                 ├─ Store            │
   │                 └─ Team             │
   └─────────────────────────────────────┘
   ```

3. You'll see your GitHub repositories
4. Find **"6x7.gr"** and click **"Import"**

   ```
   ┌─────────────────────────────────────┐
   │  Import Git Repository             │
   │                                     │
   │  ┌───────────────────────────────┐ │
   │  │ 📁 philipposk/6x7.gr          │ │
   │  │    Last updated: 2 hours ago  │ │
   │  │    [Import] ────────────────→ │ │
   │  └───────────────────────────────┘ │
   │                                     │
   │  ┌───────────────────────────────┐ │
   │  │ 📁 philipposk/other-repo      │ │
   │  └───────────────────────────────┘ │
   └─────────────────────────────────────┘
   ```

### Step 5.3: Configure Project Settings

1. Vercel will auto-detect your project settings
2. Verify these settings:

   ```
   ┌─────────────────────────────────────┐
   │  Configure Project                  │
   │                                     │
   │  Project Name: [6x7.gr]            │
   │                                     │
   │  Framework Preset: [Other ▼]      │
   │                                     │
   │  Root Directory: [./]              │
   │                                     │
   │  Build Command: [Leave empty]      │
   │                                     │
   │  Output Directory: [Leave empty]   │
   │                                     │
   │  Install Command: [npm install]    │
   │                                     │
   │  [Deploy] ────────────────────────→ │
   └─────────────────────────────────────┘
   ```

3. Click **"Deploy"**

### Step 5.4: Wait for Deployment

1. Vercel will build and deploy your site
2. You'll see a progress bar:

   ```
   ┌─────────────────────────────────────┐
   │  Deploying...                       │
   │                                     │
   │  ████████████████░░░░  80%         │
   │                                     │
   │  Building...                        │
   │  Uploading...                       │
   │  Deploying...                       │
   └─────────────────────────────────────┘
   ```

3. Wait 30-60 seconds
4. When complete, you'll see:

   ```
   ┌─────────────────────────────────────┐
   │  ✅ Deployment Ready!                │
   │                                     │
   │  Your site is live at:              │
   │  https://6x7gr.vercel.app           │
   │                                     │
   │  [Visit] ────────────────────────→ │
   └─────────────────────────────────────┘
   ```

**✅ Site Deployed on Vercel!**

Your site is now live at: `https://6x7gr.vercel.app`

---

## 6. Connecting Your Domain to Vercel

### Step 6.1: Add Domain in Vercel

1. In Vercel dashboard, click on your **6x7.gr** project
2. Click the **"Settings"** tab (top menu)

   ```
   ┌─────────────────────────────────────┐
   │  Project: 6x7.gr                    │
   │                                     │
   │  [Overview] [Deployments] [Settings]│
   │                    ↑                │
   │              Click here             │
   └─────────────────────────────────────┘
   ```

3. Click **"Domains"** in the left sidebar

   ```
   ┌─────────────────────────────────────┐
   │  Settings                           │
   │                                     │
   │  General                            │
   │  Domains ────────────────→ Click!   │
   │  Environment Variables              │
   │  Git                                 │
   │  ...                                 │
   └─────────────────────────────────────┘
   ```

4. In the **"Add Domain"** field, type: `6x7.gr`
5. Click **"Add"**

   ```
   ┌─────────────────────────────────────┐
   │  Domains                            │
   │                                     │
   │  Add Domain: [6x7.gr] [Add] ────→ │
   │                                     │
   │  ┌───────────────────────────────┐ │
   │  │ 6x7.gr                       │ │
   │  │ Status: Invalid Configuration│ │
   │  │                               │ │
   │  │ DNS Records:                  │ │
   │  │ Type: A                        │ │
   │  │ Name: @                        │ │
   │  │ Value: 216.198.79.1 ────────→ │ │
   │  │                               │ │
   │  │ [Copy] button                  │ │
   │  └───────────────────────────────┘ │
   └─────────────────────────────────────┘
   ```

6. Vercel will show you DNS records to add
7. **Copy these values** - you'll need them!

### Step 6.2: Add DNS Records in Papaki

1. Go to **https://www.papaki.gr**
2. Log into your account
3. Click on **"My Domains"** or find **6x7.gr**
4. Click **"Manage Domain"** or **"DNS Settings"**

   ```
   ┌─────────────────────────────────────┐
   │  Papaki Dashboard                   │
   │                                     │
   │  ┌───────────────────────────────┐ │
   │  │ 6x7.gr                       │ │
   │  │ [Manage Domain] ──────────→ │ │
   │  └───────────────────────────────┘ │
   └─────────────────────────────────────┘
   ```

5. Find **"DNS Service"** section
6. Click **"Add Record"** or **"Edit DNS"**

   ```
   ┌─────────────────────────────────────┐
   │  DNS Service                        │
   │                                     │
   │  Type │ Host │ Content              │
   │  ─────┼──────┼──────────────────    │
   │  A    │ @    │ [IP from Vercel]    │
   │                                     │
   │  [+ Add Record] ────────────────→ │
   └─────────────────────────────────────┘
   ```

7. **Add A Record for root domain:**
   - **Type**: Select `A`
   - **Host/Name**: Enter `@` (or leave blank)
   - **Content/Value**: Paste the IP from Vercel (e.g., `216.198.79.1`)
   - Click **"Save"** or **"Add"**

   ```
   ┌─────────────────────────────────────┐
   │  Add DNS Record                     │
   │                                     │
   │  Type: [A ▼]                        │
   │  Host: [@]                          │
   │  Value: [216.198.79.1]              │
   │                                     │
   │  [Save] ────────────────────────→ │
   └─────────────────────────────────────┘
   ```

8. **Add CNAME Record for www:**
   - Click **"Add Record"** again
   - **Type**: Select `CNAME`
   - **Host/Name**: Enter `www`
   - **Content/Value**: Paste the CNAME from Vercel (e.g., `3919fac90518e646.vercel-dns-017.com.`)
   - Click **"Save"**

   ```
   ┌─────────────────────────────────────┐
   │  DNS Records                         │
   │                                     │
   │  Type │ Host │ Content              │
   │  ─────┼──────┼──────────────────    │
   │  A    │ @    │ 216.198.79.1        │
   │  CNAME│ www  │ 3919fac90518e...    │
   │                                     │
   │  ✅ Both records added!              │
   └─────────────────────────────────────┘
   ```

### Step 6.3: Verify DNS Records

1. Go back to Vercel → Settings → Domains
2. Click **"Refresh"** button next to your domain
3. Wait 5-60 minutes for DNS to propagate
4. Status should change to **"Valid Configuration"**

   ```
   ┌─────────────────────────────────────┐
   │  Domains                            │
   │                                     │
   │  ┌───────────────────────────────┐ │
   │  │ 6x7.gr                       │ │
   │  │ Status: ✅ Valid Configuration│ │
   │  │                               │ │
   │  │ SSL: ✅ Active                │
   │  └───────────────────────────────┘ │
   └─────────────────────────────────────┘
   ```

### Step 6.4: Test Your Website

1. Wait 5-60 minutes after adding DNS records
2. Open a new browser window (or incognito mode)
3. Visit: **https://6x7.gr**
4. Your website should load! 🎉

**✅ Domain Connected!**

---

## 7. Troubleshooting

### Problem: "This site can't be reached" / ERR_NAME_NOT_RESOLVED

**Solution 1: Clear DNS Cache**
```bash
# Open Terminal and run:
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

**Solution 2: Change DNS Servers**
1. System Settings → Network
2. Select your connection → Details → DNS
3. Add: `8.8.8.8` and `1.1.1.1`
4. Apply and restart browser

**Solution 3: Wait Longer**
- New domains can take 2-4 hours to fully propagate
- Be patient!

### Problem: Vercel Shows "Invalid Configuration"

**Check:**
1. DNS records are added correctly in Papaki
2. Values match exactly what Vercel shows
3. Wait 5-60 minutes and click "Refresh" in Vercel

### Problem: Can't Push to GitHub

**Solution:**
1. Make sure you're using Personal Access Token (not password)
2. Token must have `repo` scope checked
3. Try: `git remote set-url origin https://TOKEN@github.com/USERNAME/REPO.git`

### Problem: Vercel Deployment Fails

**Check:**
1. All files are in the repository
2. `index.html` is in the root folder
3. No build errors in Vercel logs

---

## Quick Reference Checklist

- [ ] Domain purchased from Papaki.gr
- [ ] Website files created (index.html, styles.css, script.js)
- [ ] GitHub account created
- [ ] GitHub repository created (Public)
- [ ] Personal Access Token created
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Site deployed on Vercel
- [ ] Domain added in Vercel
- [ ] DNS records added in Papaki
- [ ] DNS propagated (5-60 minutes)
- [ ] Website accessible at 6x7.gr ✅

---

## Congratulations! 🎉

You've successfully:
- ✅ Purchased a domain
- ✅ Created a website
- ✅ Deployed it to Vercel
- ✅ Connected your custom domain

Your website is now live at **https://6x7.gr**!

---

## Next Steps

- Update your website content
- Add more projects
- Customize styling
- Add more pages
- Set up subdomains (like praiser.6x7.gr)

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- GitHub Docs: https://docs.github.com
- Papaki Support: Contact their support team

---

*Guide created for: Filippos Dimitrios Ktistakis*
*Date: 2024*
*Website: 6x7.gr*

