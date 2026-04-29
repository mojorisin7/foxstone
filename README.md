# Foxstone Forestry Ltd — Website

Static website for Foxstone Forestry Ltd, hosted on GitHub Pages at `www.foxstoneforestryltd.co.uk`.

## Viewing locally

```bash
cd /Users/michaelanson/Code/foxstone
python3 -m http.server 8080
```

Then open **http://localhost:8080** in your browser.

> You need a local server (not just opening the HTML file directly) so the browser can load the CSS, JS and images correctly.

## Before going live — fill in these placeholders

| File | Search for | Replace with |
|---|---|---|
| `index.html` | `+44XXXXXXXXXX` | Your phone number |
| `index.html` | `[Your area here]` | Your service area / county |
| `index.html` | `[Area]` | Same area in the hero heading |
| `index.html` | `{FORM_ID}` | Your Formspree form ID (see below) |
| `index.html` | Facebook `href="#"` | Your Facebook page URL |
| `index.html` | Instagram `href="#"` | Your Instagram profile URL |
| `CNAME` | *(already set)* | `www.foxstoneforestryltd.co.uk` |

### Setting up Formspree (contact form)

1. Sign up free at [formspree.io](https://formspree.io)
2. Click **New Form**, give it a name, enter your email address
3. Copy the form ID (the part after `/f/` in the action URL, e.g. `xpwzabcd`)
4. In `index.html`, replace `{FORM_ID}` with that ID

## Deploying to GitHub Pages

```bash
git init
git add .
git commit -m "Initial site"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Then in the GitHub repo: **Settings → Pages → Source: Deploy from branch → main / root**

GitHub will detect the `CNAME` file and configure the custom domain automatically. Enable **Enforce HTTPS** once the DNS has propagated.

## GoDaddy DNS setup

### `foxstoneforestryltd.co.uk` (primary domain)

| Type | Name | Value | TTL |
|---|---|---|---|
| CNAME | www | `YOUR_GITHUB_USERNAME.github.io` | 600 |
| A | @ | `185.199.108.153` | 600 |
| A | @ | `185.199.109.153` | 600 |
| A | @ | `185.199.110.153` | 600 |
| A | @ | `185.199.111.153` | 600 |

### `foxstoneforestryltd.com` (redirect to .co.uk)

In GoDaddy, use **Domain Forwarding** (not DNS records) to forward `foxstoneforestryltd.com` → `https://www.foxstoneforestryltd.co.uk` with a **301 (permanent)** redirect.

## File structure

```
foxstone/
├── index.html          Single-page site
├── css/styles.css      All styles (mobile-first, CSS variables)
├── js/main.js          Hamburger nav, smooth scroll, contact form
├── images/
│   └── foxstone-logo.jpeg
└── CNAME               Custom domain for GitHub Pages
```
