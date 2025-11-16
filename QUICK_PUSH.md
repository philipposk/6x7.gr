# Quick Push Instructions

## You have your token ready! Here's how to push:

### Option 1: Run in Terminal (Recommended)

1. **Open Terminal** (on Mac: Cmd+Space, type "Terminal")

2. **Run this command:**
   ```bash
   cd /Users/phktistakis/6x7.gr && git push -u origin main
   ```

3. **When prompted:**
   - **Username:** `philipposk`
   - **Password:** Paste your GitHub token (the one you just created)

4. **Done!** Your files will be pushed to GitHub ✅

---

### Option 2: Embed Token in URL (One-time)

If you want to avoid entering credentials each time, you can temporarily embed the token in the URL:

```bash
cd /Users/phktistakis/6x7.gr
git remote set-url origin https://YOUR_TOKEN@github.com/philipposk/6x7.gr.git
git push -u origin main
```

**Replace `YOUR_TOKEN` with your actual token.**

⚠️ **Security Note:** After pushing, remove the token from the URL:
```bash
git remote set-url origin https://github.com/philipposk/6x7.gr.git
```

---

### Option 3: Use the Script

I created a helper script. Run:
```bash
cd /Users/phktistakis/6x7.gr
./push.sh
```

Then enter your credentials when prompted.

---

## After Pushing Successfully

You'll see something like:
```
Enumerating objects: 8, done.
Counting objects: 100% (8/8), done.
Writing objects: 100% (8/8), done.
To https://github.com/philipposk/6x7.gr.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

Then your files will be on GitHub at: https://github.com/philipposk/6x7.gr

---

## Next Steps After Push

1. **Deploy to Vercel:**
   - Go to vercel.com
   - Import your GitHub repository
   - Auto-deploy!

2. **Or enable GitHub Pages:**
   - Go to repo Settings → Pages
   - Enable it

3. **Connect your domain (6x7.gr):**
   - Follow `VERCEL_GUIDE.md` or `CONNECT_DOMAIN.md`

---

**Ready to push! Just run the command in your terminal.** 🚀

