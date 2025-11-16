# Simple Guide: Build Your Website with GitHub Pages (Free!)

**The Easiest Way - No Domain Purchase, No Vercel, No DNS Configuration**

**Your website will be live at:** `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

---

## Table of Contents

1. [Install VS Code](#1-install-vs-code)
2. [Create Your Website Files](#2-create-your-website-files)
3. [Set Up GitHub](#3-set-up-github)
4. [Push Code to GitHub](#4-push-code-to-github)
5. [Enable GitHub Pages](#5-enable-github-pages)
6. [Your Site is Live!](#6-your-site-is-live)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Install VS Code

### Step 1.1: Download VS Code

1. Go to: **https://code.visualstudio.com**
2. Click **"Download for Mac"** (or your operating system)
3. Open the downloaded file
4. Drag **Visual Studio Code** to your **Applications** folder

   ```
   ┌─────────────────────────────────────┐
   │  Downloads                          │
   │                                     │
   │  📦 VSCode-darwin.zip              │
   │                                     │
   │  Drag to Applications ───────────→ │
   └─────────────────────────────────────┘
   ```

### Step 1.2: Open VS Code

1. Open **Applications** folder
2. Double-click **Visual Studio Code**
3. VS Code will open

**✅ VS Code Installed!**

---

## 2. Create Your Website Files

### Step 2.1: Create Project Folder

1. Open **Finder**
2. Navigate to **Desktop** (or wherever you want)
3. Create a new folder: Right-click → **New Folder**
4. Name it: `my-website` (or any name you like)

   ```
   Desktop/
   └── my-website/  ← New folder
   ```

### Step 2.2: Open Folder in VS Code

1. Open **VS Code**
2. Click **File** → **Open Folder...**
3. Navigate to your `my-website` folder
4. Click **Open**

   ```
   VS Code Menu:
   ┌─────────────────────────────────────┐
   │  File  Edit  View  ...              │
   │  └─ Open Folder... ──────────────→ │
   └─────────────────────────────────────┘
   ```

### Step 2.3: Create index.html

1. In VS Code, click the **"New File"** icon (or press `Cmd+N`)
2. Save the file: **File** → **Save As...**
3. Name it: `index.html`
4. Make sure it's saved in your `my-website` folder

   ```
   VS Code Sidebar:
   ┌─────────────────────────────────────┐
   │  EXPLORER                            │
   │                                      │
   │  📁 my-website                      │
   │     └── 📄 index.html  ← Created!   │
   └─────────────────────────────────────┘
   ```

5. **Add this HTML code:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="nav-brand">My Website</div>
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
            <h1>Welcome to My Website</h1>
            <p>This is my personal website built with GitHub Pages!</p>
            <a href="#about" class="cta-button">Learn More</a>
        </div>
    </section>

    <section id="about" class="about">
        <div class="container">
            <h2>About</h2>
            <p>This is a simple website hosted for free on GitHub Pages.</p>
        </div>
    </section>

    <section id="projects" class="projects">
        <div class="container">
            <h2>Projects</h2>
            <p>My projects will be listed here.</p>
        </div>
    </section>

    <section id="contact" class="contact">
        <div class="container">
            <h2>Contact</h2>
            <p>Get in touch with me!</p>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 My Name. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```

### Step 2.4: Create styles.css

1. Create a new file: Click **New File** icon
2. Save as: `styles.css`
3. **Add this CSS code:**

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

/* Navigation */
.navbar {
    background: #6366f1;
    color: white;
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

.navbar .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-brand {
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    color: white;
    text-decoration: none;
}

.nav-links a:hover {
    text-decoration: underline;
}

/* Hero Section */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
    padding: 8rem 2rem 4rem;
}

.hero-content h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero-content p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
}

.cta-button {
    display: inline-block;
    padding: 1rem 2rem;
    background: white;
    color: #6366f1;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    transition: transform 0.3s;
}

.cta-button:hover {
    transform: translateY(-2px);
}

/* Sections */
.about, .projects, .contact {
    padding: 4rem 0;
}

.about {
    background: #f9fafb;
}

.section-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-align: center;
}

/* Footer */
.footer {
    background: #1f2937;
    color: white;
    padding: 2rem 0;
    text-align: center;
}
```

### Step 2.5: Create script.js

1. Create a new file: Click **New File** icon
2. Save as: `script.js`
3. **Add this JavaScript code:**

```javascript
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
```

### Step 2.6: Verify Your Files

Your folder should look like this:

```
my-website/
├── index.html
├── styles.css
└── script.js
```

**✅ Website Files Created!**

---

## 3. Set Up GitHub

### Step 3.1: Create GitHub Account

1. Go to: **https://github.com**
2. Click **"Sign up"** (top right)

   ```
   ┌─────────────────────────────────────┐
   │  GitHub                              │
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
   - **Username**: Choose a username (e.g., `johndoe`)
   - **Email**: Your email address
   - **Password**: Create a strong password
4. Verify your email address (check your inbox)

### Step 3.2: Create New Repository

1. After logging in, click the **"+"** icon (top right)
2. Select **"New repository"**

   ```
   ┌─────────────────────────────────────┐
   │  GitHub                              │
   │                                     │
   │  + ──┐                              │
   │      ├─ New repository ──────────→ │
   │      ├─ Import repository         │
   │      └─ New codespace              │
   └─────────────────────────────────────┘
   ```

3. Fill in repository details:
   - **Repository name**: `my-website` (or any name)
   - **Description**: "My personal website" (optional)
   - **Visibility**: Select **Public** ⚠️ (Required for free GitHub Pages!)
   - **DO NOT** check "Add a README file"
   - **DO NOT** add .gitignore or license

   ```
   ┌─────────────────────────────────────┐
   │  Create a new repository            │
   │                                     │
   │  Owner: [your-username ▼]          │
   │  Repository name: [my-website]     │
   │  Description: [My website]         │
   │                                     │
   │  ⚪ Private                         │
   │  ⚫ Public  ← Select this!          │
   │                                     │
   │  ☐ Add a README file               │
   │  ☐ Add .gitignore                  │
   │  ☐ Choose a license                 │
   │                                     │
   │  [Create repository] ────────────→ │
   └─────────────────────────────────────┘
   ```

4. Click **"Create repository"**

**✅ GitHub Repository Created!**

---

## 4. Push Code to GitHub

### Step 4.1: Install Git (if needed)

1. Open **Terminal** (Applications → Utilities → Terminal)
2. Check if Git is installed:
   ```bash
   git --version
   ```
3. If you see a version number, Git is installed ✅
4. If not, install it:
   ```bash
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
   │                  ├─ Settings ────→ │
   │                  └─ Sign out        │
   └─────────────────────────────────────┘
   ```

3. Scroll down to **"Developer settings"** (left sidebar, bottom)
4. Click **"Personal access tokens"** → **"Tokens (classic)"**
5. Click **"Generate new token"** → **"Generate new token (classic)"**

   ```
   ┌─────────────────────────────────────┐
   │  Personal access tokens             │
   │                                     │
   │  Note: [my-website]                 │
   │  Expiration: [90 days ▼]           │
   │                                     │
   │  Select scopes:                     │
   │  ☑ repo  ← Check this!              │
   │     └─ Full control of private     │
   │        repositories                 │
   │                                     │
   │  [Generate token] ───────────────→ │
   └─────────────────────────────────────┘
   ```

6. **Copy the token immediately!** (You won't see it again)
   - It looks like: `ghp_XXXXXXXXXXXXXXXXXXXXXXXX`

### Step 4.3: Initialize Git in VS Code

1. In VS Code, open the **Terminal** (View → Terminal, or press `` Ctrl+` ``)
2. Make sure you're in your project folder
3. Run these commands:

```bash
git init
git add .
git commit -m "Initial commit: Add website files"
```

   ```
   VS Code Terminal:
   ┌─────────────────────────────────────┐
   │  Terminal                            │
   │                                     │
   │  $ git init                          │
   │  Initialized empty Git repository   │
   │                                     │
   │  $ git add .                         │
   │                                     │
   │  $ git commit -m "Initial commit"   │
   │  [main (root-commit) abc123]        │
   │    3 files changed                  │
   └─────────────────────────────────────┘
   ```

### Step 4.4: Connect to GitHub and Push

1. In the Terminal, run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/my-website.git
```

   (Replace `YOUR_USERNAME` with your GitHub username)

2. Set the main branch:

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
   │  your-username                      │
   │  Password for 'https://...':        │
   │  [Paste token here]                  │
   └─────────────────────────────────────┘
   ```

5. Wait for upload to complete

**✅ Code Pushed to GitHub!**

You can now see your files at: `https://github.com/YOUR_USERNAME/my-website`

---

## 5. Enable GitHub Pages

### Step 5.1: Go to Repository Settings

1. On GitHub, go to your repository: `https://github.com/YOUR_USERNAME/my-website`
2. Click the **"Settings"** tab (top menu)

   ```
   ┌─────────────────────────────────────┐
   │  Repository: my-website              │
   │                                     │
   │  [Code] [Issues] [Settings] ────→ │
   │                    ↑                │
   │              Click here             │
   └─────────────────────────────────────┘
   ```

### Step 5.2: Enable GitHub Pages

1. Scroll down to **"Pages"** (left sidebar)

   ```
   ┌─────────────────────────────────────┐
   │  Settings                           │
   │                                     │
   │  General                            │
   │  Pages ────────────────→ Click!     │
   │  Environments                       │
   │  ...                                 │
   └─────────────────────────────────────┘
   ```

2. Under **"Source"**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`

   ```
   ┌─────────────────────────────────────┐
   │  GitHub Pages                       │
   │                                     │
   │  Source:                            │
   │  [main ▼]  [/ (root) ▼]           │
   │                                     │
   │  [Save] ────────────────────────→ │
   └─────────────────────────────────────┘
   ```

3. Click **"Save"**

### Step 5.3: Wait for Deployment

1. Wait 1-2 minutes
2. Refresh the page
3. You'll see a message like:

   ```
   ┌─────────────────────────────────────┐
   │  ✅ Your site is live at:            │
   │                                     │
   │  https://YOUR_USERNAME.github.io/  │
   │     my-website/                     │
   │                                     │
   │  [Visit site] ──────────────────→ │
   └─────────────────────────────────────┘
   ```

**✅ GitHub Pages Enabled!**

---

## 6. Your Site is Live!

### Your Website URL

Your website is now live at:
**`https://YOUR_USERNAME.github.io/my-website`**

(Replace `YOUR_USERNAME` with your GitHub username and `my-website` with your repository name)

### How to Update Your Website

1. **Edit files in VS Code**
2. **Save your changes**
3. **In Terminal, run:**

```bash
git add .
git commit -m "Updated website"
git push
```

4. **Wait 1-2 minutes** - Your site updates automatically!

### Example Update Workflow

```
1. Edit index.html in VS Code
   └─ Change "Welcome" to "Hello World"
   
2. Save the file (Cmd+S)

3. In Terminal:
   git add .
   git commit -m "Change welcome message"
   git push
   
4. Wait 1-2 minutes
   
5. Visit your site - changes are live! ✅
```

---

## 7. Troubleshooting

### Problem: Can't push to GitHub

**Solution:**
- Make sure you're using Personal Access Token (not password)
- Token must have `repo` scope checked
- Try: `git remote set-url origin https://TOKEN@github.com/USERNAME/REPO.git`

### Problem: GitHub Pages not working

**Check:**
- Repository is **Public** (not Private)
- `index.html` is in the root folder
- You selected `main` branch and `/ (root)` folder
- Wait 2-5 minutes after enabling

### Problem: Site shows 404 error

**Solution:**
- Make sure your repository name matches the URL
- Check that `index.html` exists in the root
- Wait a few more minutes for GitHub to build

### Problem: Changes not showing

**Solution:**
- Make sure you committed and pushed changes
- Wait 1-2 minutes after pushing
- Clear browser cache (Cmd+Shift+R)
- Try incognito/private window

---

## Quick Reference

### Your Website URL Format:
```
https://YOUR_USERNAME.github.io/REPOSITORY_NAME
```

### Update Your Website:
```bash
git add .
git commit -m "Your message"
git push
```

### Files You Need:
- `index.html` - Main page
- `styles.css` - Styling
- `script.js` - JavaScript (optional)

---

## Summary

✅ **What You Did:**
1. Installed VS Code
2. Created website files
3. Set up GitHub account
4. Pushed code to GitHub
5. Enabled GitHub Pages

✅ **What You Got:**
- Free website hosting
- Free URL (github.io)
- Easy updates via Git
- No domain purchase needed
- No DNS configuration needed
- No Vercel needed

✅ **Your Website:**
- Live at: `https://YOUR_USERNAME.github.io/my-website`
- Updates automatically when you push changes
- Completely free!

---

## Next Steps

- Customize your website content
- Add more pages
- Change colors and styling
- Add images
- Learn more HTML/CSS/JavaScript

---

**Congratulations! 🎉**

You've built and deployed your website for free using only GitHub and VS Code!

---

*Guide created: 2024*
*Tools used: VS Code + GitHub Pages*
*Cost: $0 (100% Free!)*

