# How GitHub Pages Works - Complete Guide

## What is GitHub Pages?

GitHub Pages is a **FREE** service from GitHub that turns your code repository into a live website. Think of it like this:

- **GitHub** = A place to store your code (like Dropbox for code)
- **GitHub Pages** = Automatically turns your code into a website that anyone can visit

## How It Works (Simple Explanation)

1. You upload your website files (HTML, CSS, JS) to GitHub
2. GitHub automatically hosts them and makes them accessible on the internet
3. Your site gets a free URL like: `yourusername.github.io/your-repo-name`
4. You can also connect your own domain (like 6x7.gr) to it

## Step-by-Step: Deploy Your Site to GitHub Pages

### Prerequisites
- A GitHub account (free at github.com)
- Your website files ready (you already have them!)

---

### Step 1: Create a GitHub Account

1. Go to **https://github.com**
2. Click **Sign up**
3. Choose a username, enter email, create password
4. Verify your email

---

### Step 2: Create a New Repository

A "repository" (repo) is like a folder where you store your code.

1. After logging in, click the **+** icon (top right) → **New repository**
2. Repository name: `6x7-website` (or any name you like)
3. Description: "My personal website" (optional)
4. Make sure it's set to **Public** (required for free GitHub Pages)
5. **Don't** check "Add a README file" (we'll add files manually)
6. Click **Create repository**

---

### Step 3: Upload Your Files to GitHub

You have two options:

#### Option A: Using GitHub Website (Easiest for beginners)

1. After creating the repo, you'll see a page with instructions
2. Scroll down to "uploading an existing file"
3. Click **uploading an existing file**
4. Drag and drop these files from your `6x7.gr` folder:
   - `index.html`
   - `styles.css`
   - `script.js`
   - (You can skip README.md and DEPLOY.md if you want)
5. Scroll down, type a commit message: "Initial commit"
6. Click **Commit changes**

#### Option B: Using Terminal/Command Line (For developers)

Open Terminal (Mac) or Command Prompt (Windows) and run:

```bash
# Navigate to your project folder
cd /Users/phktistakis/6x7.gr

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit"

# Connect to GitHub (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/6x7-website.git

# Push files to GitHub
git branch -M main
git push -u origin main
```

---

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click the **Settings** tab (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**

---

### Step 5: Your Site is Live! 🎉

1. Wait 1-2 minutes for GitHub to build your site
2. Go back to **Settings** → **Pages**
3. You'll see a message: "Your site is live at..."
4. Your site URL will be: `https://YOUR_USERNAME.github.io/6x7-website/`
5. Click the link to see your website!

---

### Step 6: Connect Your Custom Domain (6x7.gr)

#### 6.1: Add Domain in GitHub

1. In **Settings** → **Pages**, scroll to **Custom domain**
2. Type: `6x7.gr`
3. Click **Save**
4. GitHub will create a file called `CNAME` automatically

#### 6.2: Configure DNS at Your Domain Registrar

Go to where you bought 6x7.gr (your domain registrar) and add these DNS records:

**A Records** (4 records - all required):
- Type: `A` | Name: `@` | Value: `185.199.108.153`
- Type: `A` | Name: `@` | Value: `185.199.109.153`
- Type: `A` | Name: `@` | Value: `185.199.110.153`
- Type: `A` | Name: `@` | Value: `185.199.111.153`

**CNAME Record** (for www):
- Type: `CNAME` | Name: `www` | Value: `YOUR_USERNAME.github.io`

#### 6.3: Wait for DNS Propagation

- DNS changes can take 5 minutes to 48 hours
- Usually works within 1 hour
- Check if it's working: Visit `6x7.gr` in your browser

#### 6.4: Enable HTTPS (Automatic)

1. After DNS is set up, go back to GitHub Pages settings
2. Check **Enforce HTTPS** (this gives you free SSL certificate)
3. Your site will be secure with the padlock icon 🔒

---

## How to Update Your Website

### Method 1: Edit on GitHub Website

1. Go to your repository
2. Click on any file (like `index.html`)
3. Click the pencil icon (✏️) to edit
4. Make your changes
5. Scroll down, add commit message, click **Commit changes**
6. Your site updates automatically in 1-2 minutes!

### Method 2: Upload New Files

1. In your repo, click **Add file** → **Upload files**
2. Drag new/changed files
3. Commit changes
4. Site updates automatically

### Method 3: Using Terminal (For developers)

```bash
# Make changes to your files locally
# Then:
git add .
git commit -m "Updated website"
git push
```

---

## Important Notes

### ✅ What GitHub Pages Can Do:
- Host static websites (HTML, CSS, JavaScript)
- Free SSL certificate (HTTPS)
- Custom domains
- Unlimited bandwidth
- Free forever

### ❌ What GitHub Pages Cannot Do:
- Server-side code (PHP, Python, Node.js backends)
- Databases
- Dynamic server processing

**But your website is static (just HTML/CSS/JS), so GitHub Pages is perfect!**

---

## Troubleshooting

### Site not showing up?
- Wait 2-5 minutes after enabling Pages
- Check that your repo is **Public**
- Make sure `index.html` is in the root folder
- Check the Pages settings → Source is set to `main` branch

### Domain not working?
- Wait longer (DNS can take up to 48 hours)
- Double-check DNS records are correct
- Make sure you added all 4 A records
- Verify CNAME record points to `YOUR_USERNAME.github.io`

### Need to see build errors?
- Go to **Actions** tab in your repo
- Check for any failed workflows

---

## Advantages of GitHub Pages

1. **Free** - No cost ever
2. **Easy Updates** - Just edit files and push
3. **Version Control** - See history of all changes
4. **Reliable** - Hosted by GitHub (very stable)
5. **Fast** - CDN delivery worldwide
6. **Free SSL** - Automatic HTTPS

---

## Summary

**GitHub Pages = Free website hosting that automatically publishes your code**

1. Put your files on GitHub (repository)
2. Enable Pages in settings
3. Your site goes live automatically
4. Connect your domain for 6x7.gr

**That's it!** No servers, no configuration, just upload and go! 🚀

