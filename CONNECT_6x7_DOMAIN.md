# Connect 6x7.gr to Vercel - Step by Step

Your site is live at https://6x7gr.vercel.app/ ✅
Now let's connect your custom domain 6x7.gr!

---

## Step 1: Add Domain in Vercel

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Click on your **6x7.gr** project

2. **Go to Settings:**
   - Click the **Settings** tab (top menu)

3. **Open Domains:**
   - Click **Domains** in the left sidebar

4. **Add Your Domain:**
   - In the "Add Domain" field, type: `6x7.gr`
   - Click **Add**

5. **Vercel will show you DNS records:**
   - You'll see something like:
     - **A Record** or **CNAME Record** with specific values
     - Copy these values - you'll need them!

---

## Step 2: Add DNS Records at Your Domain Registrar

### Find Your Domain Registrar

You need to know **where you bought 6x7.gr**. Common places:
- GoDaddy
- Namecheap
- Google Domains
- Cloudflare
- Your local Greek registrar

**How to find it:**
- Check your email for purchase confirmation
- Look for DNS management emails
- Try logging into common registrars

### Add DNS Records

1. **Log into your domain registrar** (where you bought 6x7.gr)

2. **Find DNS Management:**
   - Look for: **DNS Settings**, **DNS Management**, **Domain Settings**, or **Manage DNS**

3. **Add the Records Vercel Showed You:**

   **For the root domain (6x7.gr):**
   
   Vercel will show you ONE of these options:
   
   **Option A - A Record:**
   - Type: `A`
   - Name/Host: `@` (or leave blank, or `6x7.gr`)
   - Value/IP: `76.76.21.21` (Vercel shows exact IP - copy it!)
   - TTL: `3600` (or default)

   **Option B - CNAME Record:**
   - Type: `CNAME`
   - Name/Host: `@` (or leave blank)
   - Value/Target: `cname.vercel-dns.com` (Vercel shows exact value - copy it!)
   - TTL: `3600` (or default)

   **For www subdomain:**
   - Type: `CNAME`
   - Name/Host: `www`
   - Value/Target: `cname.vercel-dns.com` (Vercel shows exact value)
   - TTL: `3600` (or default)

4. **Save the records**

---

## Step 3: Wait for DNS Propagation

- **Usually takes:** 5 minutes to 1 hour
- **Can take up to:** 48 hours (rare)
- **Check status in Vercel:**
   - Go back to Vercel → Settings → Domains
   - You'll see status: "Valid Configuration" when it's working

---

## Step 4: Verify It's Working

1. **Wait 5-60 minutes** after adding DNS records

2. **Check in Vercel:**
   - Go to Settings → Domains
   - Look for status: "Valid Configuration" ✅

3. **Visit your site:**
   - Go to: https://6x7.gr
   - It should show your website!

4. **HTTPS is automatic:**
   - Vercel will automatically issue SSL certificate
   - Your site will be secure with 🔒

---

## Troubleshooting

### Domain not working after 1 hour?

1. **Double-check DNS records:**
   - Make sure you copied values exactly from Vercel
   - Check for typos
   - Verify record types (A vs CNAME)

2. **Check DNS propagation:**
   - Visit: https://dnschecker.org
   - Enter: `6x7.gr`
   - Select: `A` or `CNAME` (depending on what you added)
   - See if it shows Vercel's values

3. **Verify in Vercel:**
   - Go to Settings → Domains
   - Check for any error messages
   - Make sure it shows "Valid Configuration"

4. **Clear browser cache:**
   - Try incognito/private mode
   - Or wait a bit longer

### Common Mistakes:

❌ **Wrong IP address** - Make sure you copied the exact IP from Vercel
❌ **Wrong CNAME target** - Copy the exact value Vercel shows
❌ **Missing www record** - Add both `@` and `www` records
❌ **Wrong record type** - A record needs IP, CNAME needs domain name

---

## Quick Reference

**Vercel Dashboard:** https://vercel.com/dashboard
**DNS Checker:** https://dnschecker.org

**What Vercel will show you:**
- Exact DNS records to add
- Specific IP addresses or CNAME targets
- Status of domain configuration

**Important:** Always copy the **exact values** Vercel shows you - they're specific to your deployment!

---

## Summary

1. ✅ Site is live on Vercel (6x7gr.vercel.app)
2. ⏳ Add domain in Vercel Settings → Domains
3. ⏳ Copy DNS records from Vercel
4. ⏳ Add DNS records at your domain registrar
5. ⏳ Wait 5-60 minutes
6. ✅ Visit 6x7.gr - it works! 🎉

**The key is: Copy the exact DNS values Vercel shows you and add them at your domain registrar!**

