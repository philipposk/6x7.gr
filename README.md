# 6x7.gr - Personal Platform Website

Welcome to the central hub for Filippos Dimitrios Ktistakis's digital projects and applications.

## Features

- **Modern, Responsive Design**: Beautiful UI that works on all devices
- **Welcome Section**: Eye-catching hero section with welcome message
- **About Section**: Information about the platform and creator
- **Projects Showcase**: Display of all projects and subdomains
- **Smooth Animations**: Engaging scroll animations and transitions

## Projects & Subdomains

- **praiser.6x7.gr**: AI Assistant application

## Deployment (FREE Options - No Web Hosting Needed!)

### Option 1: Netlify (Easiest - Recommended) ⭐

**Step-by-step:**

1. **Go to [netlify.com](https://netlify.com)** and sign up (free account)

2. **Drag & Drop Method** (Easiest):
   - Log into Netlify
   - Drag the entire `6x7.gr` folder onto the Netlify dashboard
   - Your site will be live in seconds at a URL like `random-name-123.netlify.app`

3. **Connect Your Domain (6x7.gr)**:
   - In Netlify dashboard, go to: **Site settings → Domain management → Add custom domain**
   - Enter: `6x7.gr` and `www.6x7.gr`
   - Netlify will show you DNS records to add
   - Go to your domain registrar (where you bought 6x7.gr)
   - Add these DNS records:
     - Type: `A` → Name: `@` → Value: `75.2.60.5`
     - Type: `CNAME` → Name: `www` → Value: `your-site-name.netlify.app`
   - Wait 5-60 minutes for DNS to propagate

**That's it!** Your site will be live at 6x7.gr

---

### Option 2: Vercel (Also Very Easy)

1. **Go to [vercel.com](https://vercel.com)** and sign up (free)

2. **Install Vercel CLI** (or use web interface):
   ```bash
   npm install -g vercel
   ```

3. **Deploy**:
   - Open terminal in your `6x7.gr` folder
   - Run: `vercel`
   - Follow the prompts
   - Your site will be live!

4. **Add Custom Domain**:
   - In Vercel dashboard → Your project → Settings → Domains
   - Add `6x7.gr` and follow DNS instructions

---

### Option 3: GitHub Pages (Free, but requires GitHub account)

1. **Create GitHub account** at [github.com](https://github.com)

2. **Create a new repository**:
   - Click "New repository"
   - Name it: `6x7-website` (or any name)
   - Make it **Public**
   - Don't initialize with README

3. **Upload files**:
   ```bash
   # In your terminal, navigate to the 6x7.gr folder
   cd /Users/phktistakis/6x7.gr
   
   # Initialize git (if not already done)
   git init
   git add .
   git commit -m "Initial commit"
   
   # Connect to GitHub (replace YOUR_USERNAME with your GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/6x7-website.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main branch** → **/ (root)**
   - Click **Save**
   - Your site will be at: `https://YOUR_USERNAME.github.io/6x7-website/`

5. **Add Custom Domain**:
   - In Pages settings, add `6x7.gr` in "Custom domain"
   - Create a file named `CNAME` (no extension) in your repo with content: `6x7.gr`
   - Add DNS records at your domain registrar:
     - Type: `A` → `@` → `185.199.108.153`
     - Type: `A` → `@` → `185.199.109.153`
     - Type: `A` → `@` → `185.199.110.153`
     - Type: `A` → `@` → `185.199.111.153`

---

### Option 4: Cloudflare Pages (Free, Great Performance)

1. **Go to [cloudflare.com](https://cloudflare.com)** and sign up

2. **Add your site**:
   - Go to **Pages** in dashboard
   - Click **Create a project**
   - Choose **Upload assets**
   - Upload your `6x7.gr` folder

3. **Connect domain**:
   - In Pages settings, add custom domain `6x7.gr`
   - Cloudflare will handle DNS automatically if you use their nameservers

---

## Which Should You Choose?

- **Netlify**: Easiest, best for beginners, drag & drop
- **Vercel**: Great for developers, fast deployment
- **GitHub Pages**: Good if you already use GitHub
- **Cloudflare Pages**: Best performance, free SSL

**Recommendation: Start with Netlify** - it's the simplest!

## File Structure

```
6x7.gr/
├── index.html      # Main HTML file
├── styles.css      # All styling
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Customization

- Edit `index.html` to change content
- Modify `styles.css` to change colors, fonts, and layout
- Update `script.js` for additional interactivity

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

© 2024 Filippos Dimitrios Ktistakis. All rights reserved.

