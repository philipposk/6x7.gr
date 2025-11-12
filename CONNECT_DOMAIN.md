# How to Connect Your Domain (6x7.gr) to Your Website

Since you've already bought 6x7.gr, you just need to point it to your hosting service. Here's how:

---

## Step 1: Choose Your Hosting Service

You need to decide where to host your website first. Then connect your domain to it.

**Options:**
- **Netlify** (easiest - drag & drop)
- **GitHub Pages** (free, reliable)
- **Vercel** (fast, modern)
- **Cloudflare Pages** (great performance)

---

## Step 2: Find Your Domain Registrar

You need to know **where you bought 6x7.gr**. Common registrars:
- GoDaddy
- Namecheap
- Google Domains
- Cloudflare
- Name.com
- Your local Greek registrar

**How to find out:**
- Check your email for purchase confirmation
- Look for DNS management emails
- Try logging into common registrars

---

## Step 3: Connect Domain Based on Your Hosting Choice

### Option A: If Using Netlify

1. **Deploy your site on Netlify first** (drag & drop your files)
2. In Netlify dashboard → Your site → **Site settings** → **Domain management**
3. Click **Add custom domain**
4. Enter: `6x7.gr`
5. Netlify will show you DNS records to add

6. **Go to your domain registrar** and add these DNS records:

   **A Record:**
   - Type: `A`
   - Name/Host: `@` (or leave blank, or `6x7.gr`)
   - Value/IP: `75.2.60.5`
   - TTL: `3600` (or default)

   **CNAME Record (for www):**
   - Type: `CNAME`
   - Name/Host: `www`
   - Value/Target: `your-site-name.netlify.app` (Netlify shows you the exact value)
   - TTL: `3600` (or default)

7. Save and wait 5-60 minutes

---

### Option B: If Using GitHub Pages

1. **Deploy your site on GitHub Pages first** (follow GitHub Pages guide)
2. In GitHub repo → **Settings** → **Pages**
3. Under **Custom domain**, enter: `6x7.gr`
4. Click **Save**

5. **Go to your domain registrar** and add these DNS records:

   **A Records** (add all 4 - required):
   - Type: `A` | Name: `@` | Value: `185.199.108.153`
   - Type: `A` | Name: `@` | Value: `185.199.109.153`
   - Type: `A` | Name: `@` | Value: `185.199.110.153`
   - Type: `A` | Name: `@` | Value: `185.199.111.153`

   **CNAME Record:**
   - Type: `CNAME` | Name: `www` | Value: `YOUR_USERNAME.github.io` (replace with your GitHub username)

6. Save and wait 5-60 minutes to 48 hours

---

### Option C: If Using Vercel

1. **Deploy your site on Vercel first**
2. In Vercel dashboard → Your project → **Settings** → **Domains**
3. Click **Add** and enter: `6x7.gr`
4. Vercel will show you DNS records

5. **Go to your domain registrar** and add the DNS records Vercel shows you

---

### Option D: If Using Cloudflare Pages

1. **Deploy your site on Cloudflare Pages first**
2. In Pages → Your project → **Custom domains**
3. Add `6x7.gr`
4. If you use Cloudflare's nameservers, DNS is automatic
5. Otherwise, add the DNS records Cloudflare shows you

---

## Step 4: How to Add DNS Records (General Guide)

The exact steps vary by registrar, but the process is similar:

### Common Steps:

1. **Log into your domain registrar** (where you bought 6x7.gr)
2. Find **DNS Management** or **DNS Settings** or **Domain Settings**
3. Look for **DNS Records** or **Manage DNS**
4. Click **Add Record** or **Create Record**

### For A Record:
- **Type**: Select `A`
- **Name/Host**: Enter `@` (or leave blank, or `6x7.gr`)
- **Value/IP Address**: Enter the IP address (e.g., `75.2.60.5` for Netlify)
- **TTL**: Leave default (usually 3600)
- Click **Save** or **Add**

### For CNAME Record:
- **Type**: Select `CNAME`
- **Name/Host**: Enter `www`
- **Value/Target**: Enter the target (e.g., `your-site.netlify.app`)
- **TTL**: Leave default
- Click **Save** or **Add**

---

## Step 5: Wait for DNS Propagation

- **Usually takes**: 5 minutes to 1 hour
- **Can take up to**: 48 hours (rare)
- **Check if it's working**: Visit `6x7.gr` in your browser

**To check DNS propagation:**
- Visit: https://dnschecker.org
- Enter: `6x7.gr`
- Select: `A` record type
- See if it shows your hosting IP

---

## Troubleshooting

### Domain not working after 1 hour?

1. **Double-check DNS records:**
   - Make sure you added all required records
   - Check for typos in IP addresses
   - Verify CNAME target is correct

2. **Clear your browser cache:**
   - Try incognito/private mode
   - Or wait a bit longer

3. **Check with your registrar:**
   - Some registrars have support chat
   - Ask them to verify DNS records are correct

4. **Verify on hosting service:**
   - Check Netlify/GitHub/Vercel dashboard
   - Look for any error messages about domain

### Common Mistakes:

❌ **Wrong IP address** - Double-check the IP from your hosting service
❌ **Missing www CNAME** - Make sure you add both `@` and `www` records
❌ **Wrong record type** - A record needs IP, CNAME needs domain name
❌ **Typo in domain** - Make sure it's exactly `6x7.gr` (not `6x7.com`)

---

## Quick Reference: DNS Records by Service

### Netlify:
- A: `@` → `75.2.60.5`
- CNAME: `www` → `your-site.netlify.app`

### GitHub Pages:
- A: `@` → `185.199.108.153`
- A: `@` → `185.199.109.153`
- A: `@` → `185.199.110.153`
- A: `@` → `185.199.111.153`
- CNAME: `www` → `username.github.io`

### Vercel:
- Check Vercel dashboard for exact records (they vary)

---

## Need Help Finding Your Registrar?

**Check your email:**
- Search for "6x7.gr" or "domain purchase"
- Look for DNS management emails

**Common Greek registrars:**
- Some local Greek domain providers
- International ones work the same way

**If you can't find it:**
- Use WHOIS lookup: https://whois.net
- Enter `6x7.gr`
- It will show the registrar

---

## Summary

1. ✅ You have the domain (6x7.gr) - **Done!**
2. ⏳ Choose hosting service (Netlify/GitHub/Vercel)
3. ⏳ Deploy your website files
4. ⏳ Get DNS records from hosting service
5. ⏳ Add DNS records at your domain registrar
6. ⏳ Wait 5-60 minutes
7. ✅ Visit 6x7.gr - it works! 🎉

**The key is: Your domain registrar needs to know where to send visitors (your hosting service's IP address).**

