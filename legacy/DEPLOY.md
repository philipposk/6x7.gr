# Quick Deploy Guide 🚀

## Easiest Way: Netlify (5 minutes)

### Step 1: Sign Up
1. Go to **https://netlify.com**
2. Click "Sign up" (use email or GitHub)
3. It's **100% FREE**

### Step 2: Deploy Your Site
1. After logging in, you'll see the Netlify dashboard
2. **Drag and drop** your entire `6x7.gr` folder onto the page
3. Wait 10 seconds... **DONE!** ✅
4. Your site is now live at something like: `amazing-site-123.netlify.app`

### Step 3: Connect Your Domain (6x7.gr)
1. In Netlify, click on your site
2. Go to: **Site settings** → **Domain management**
3. Click **Add custom domain**
4. Type: `6x7.gr` and click **Verify**
5. Netlify will show you what DNS records to add

6. **Go to where you bought your domain** (your domain registrar):
   - Look for "DNS Settings" or "DNS Management"
   - Add these records:
     - **A Record**: `@` → `75.2.60.5`
     - **CNAME Record**: `www` → `your-site-name.netlify.app` (Netlify will show you the exact value)

7. Wait 5-60 minutes for DNS to update
8. **Visit 6x7.gr** - it should work! 🎉

---

## Alternative: Vercel (Also Easy)

1. Go to **https://vercel.com** and sign up (free)
2. Click **Add New Project**
3. Drag your `6x7.gr` folder
4. Click **Deploy**
5. Done! Then add your domain in settings

---

## Need Help?

- **Netlify Support**: https://docs.netlify.com
- **Domain DNS Help**: Contact your domain registrar's support

---

**That's it! No coding, no servers, no hosting fees. Just drag, drop, and go live!** 🎊

