# Deploying Mini Games for Online Play 🎮

This guide will help you deploy your mini games so they're playable online, with a "View on GitHub" button on each game page.

## Option 1: GitHub Pages (Recommended - Free & Easy)

### Step 1: Enable GitHub Pages for MiniGames Repository

1. **Go to your MiniGames repository on GitHub:**
   - Visit: https://github.com/philipposk/MiniGames
   - Click on **Settings** (top right of the repository)

2. **Enable GitHub Pages:**
   - Scroll down to **Pages** in the left sidebar
   - Under **Source**, select **Deploy from a branch**
   - Choose **main** branch
   - Select **/ (root)** folder
   - Click **Save**

3. **Wait 1-2 minutes** for GitHub to build your site

4. **Your games will be available at:**
   - Bounce Ball: `https://philipposk.github.io/MiniGames/bounce-ball/`
   - Color Clash: `https://philipposk.github.io/MiniGames/color-clash/`
   - Stick Runner: `https://philipposk.github.io/MiniGames/stick-runner/`
   - The Rising: `https://philipposk.github.io/MiniGames/the-rising/`

### Step 2: Add "View on GitHub" Button to Each Game

For each game, you need to add a button that links back to the GitHub repository. Here's how:

#### For each game folder (bounce-ball, color-clash, stick-runner, the-rising):

1. **Open the `index.html` file in each game folder**

2. **Add this button code** (preferably in the top-right corner or as a floating button):

```html
<!-- Add this inside the <body> tag, preferably near the top -->
<a href="https://github.com/philipposk/MiniGames/tree/main/[GAME-FOLDER-NAME]" 
   target="_blank" 
   rel="noopener noreferrer" 
   class="github-button"
   style="position: fixed; top: 20px; right: 20px; z-index: 1000; 
          background: #24292e; color: white; padding: 10px 20px; 
          border-radius: 6px; text-decoration: none; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
          font-size: 14px; display: flex; align-items: center; gap: 8px; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: transform 0.2s;">
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="margin-right: 4px;">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
    </svg>
    View on GitHub
</a>

<style>
.github-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
</style>
```

3. **Replace `[GAME-FOLDER-NAME]` with the actual folder name:**
   - For bounce-ball: `bounce-ball`
   - For color-clash: `color-clash`
   - For stick-runner: `stick-runner`
   - For the-rising: `the-rising`

#### Example for bounce-ball:

```html
<a href="https://github.com/philipposk/MiniGames/tree/main/bounce-ball" 
   target="_blank" 
   rel="noopener noreferrer" 
   class="github-button"
   style="position: fixed; top: 20px; right: 20px; z-index: 1000; 
          background: #24292e; color: white; padding: 10px 20px; 
          border-radius: 6px; text-decoration: none; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
          font-size: 14px; display: flex; align-items: center; gap: 8px; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: transform 0.2s;">
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="margin-right: 4px;">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
    </svg>
    View on GitHub
</a>
```

4. **Commit and push the changes:**
   ```bash
   cd /path/to/MiniGames
   git add .
   git commit -m "Add View on GitHub button to games"
   git push
   ```

---

## Option 2: Custom Subdomains (Alternative)

If you prefer custom subdomains like `bounceball.6x7.gr`, `colorclash.6x7.gr`, etc.:

### Step 1: Deploy Each Game to Vercel/Netlify

1. **For each game folder**, create a separate deployment:
   - Deploy `bounce-ball` folder → Get URL
   - Deploy `color-clash` folder → Get URL
   - Deploy `stick-runner` folder → Get URL
   - Deploy `the-rising` folder → Get URL

2. **Add subdomains in your deployment service:**
   - In Vercel/Netlify, go to Settings → Domains
   - Add: `bounceball.6x7.gr`, `colorclash.6x7.gr`, etc.

3. **Add DNS records** (similar to how you set up other subdomains)

### Step 2: Update Links in index.html

Update the modal links in `6x7.gr/index.html` to use the subdomain URLs instead of GitHub Pages URLs.

---

## Quick Setup Script

If you want to add the GitHub button to all games at once, you can use this approach:

1. **Clone the MiniGames repository locally**
2. **Run a script to add the button to each game's index.html**

Or manually add the button to each game's HTML file as shown above.

---

## Testing

After deployment:

1. ✅ Visit each game URL to make sure it loads
2. ✅ Click the "View on GitHub" button to verify it works
3. ✅ Test the links from the modal on 6x7.gr

---

## Notes

- GitHub Pages URLs are case-sensitive: `bounce-ball` not `Bounce-Ball`
- Make sure each game folder has an `index.html` file
- The games should work immediately after GitHub Pages is enabled
- If a game doesn't load, check the browser console for errors
