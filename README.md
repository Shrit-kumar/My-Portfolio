# Shrit Kumar — Portfolio Website

A premium, dark-themed, glassmorphism portfolio built with plain **HTML, CSS,
and JavaScript** — no frameworks, no build step. Fully responsive, animated,
and ready to deploy on Vercel or GitHub Pages.

## File structure

```
portfolio/
├── index.html              All page content & structure
├── css/
│   └── style.css           Design system, components, responsive rules
├── js/
│   └── script.js           Nav, animations, particles, form logic
├── images/
│   ├── README.md           Where to drop your real photo
│   └── (add profile.jpg, og-cover.png here)
├── resume/
│   ├── README.md           Where to drop your resume PDF
│   └── (add Shrit-Kumar-Resume.pdf here)
├── favicon.svg
├── robots.txt
└── sitemap.xml
```

## Before you deploy — quick checklist

1. **Add your photo** → `images/profile.jpg` (see `images/README.md`).
   The hero card gracefully falls back to an "SK" placeholder if it's
   missing, so the site still works without it.
2. **Add your resume** → `resume/Shrit-Kumar-Resume.pdf` (see
   `resume/README.md`). Both "Resume" buttons already point here.
3. **Update real links** — open `index.html` and replace:
   - `https://github.com/yourusername` (appears in Contact + Footer)
   - `https://linkedin.com/in/yourusername` (appears in Contact + Footer)
   - `mailto:shritkumar@example.com` (your real email, two places)
   - `https://shritkumar.dev` in the `<head>` (canonical/OG tags, JSON-LD,
     `sitemap.xml`, `robots.txt`) once you know your real deployed domain.
   - Project `GitHub` / `Live Demo` button `href="#"` placeholders for
     PlantGuard and Smart Task Distributor.
4. **Contact form** — it currently validates input and shows a success
   message, but doesn't send real email (this is a static site, so there's
   no backend). To receive real messages, the easiest options are:
   - [Formspree](https://formspree.io) — add `action="https://formspree.io/f/yourFormId"`
     and `method="POST"` to the `<form id="contactForm">` tag, then remove
     the `e.preventDefault()` block in `js/script.js` (or follow their JS
     fetch example).
   - [EmailJS](https://www.emailjs.com) — drop in their script and call it
     inside the existing `submit` handler in `js/script.js`.

## Customization

- **Colors / fonts**: all defined as CSS variables at the top of
  `css/style.css` under `:root` — change once, applies everywhere.
- **Skill percentages**: each skill bar reads its value from the
  `data-percent` attribute on the `.skill-row` element in `index.html`.
- **Typing animation words**: edit the `roles` array near the top of
  `js/script.js`.

## Running locally

No build step needed — but opening `index.html` directly (`file://`) will
block the `fetch`-free features fine, though it's better to serve it so
relative paths and any future API calls behave like production:

```bash
# Python (built-in on most systems)
python3 -m http.server 5500
# then open http://localhost:5500
```

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) → import the repo.
3. Framework preset: **Other** (it's a static site, no build command
   needed). Leave build/output settings blank.
4. Deploy — done.

## Deploy on GitHub Pages

1. Push this folder to a GitHub repository (e.g. `shrit-portfolio`).
2. Go to **Settings → Pages**.
3. Source: **Deploy from a branch** → branch `main`, folder `/ (root)`.
4. Save. Your site will be live at
   `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## Performance & accessibility notes

- Single CSS + single JS file, no external JS dependencies — fast load.
- Respects `prefers-reduced-motion` (disables particles, cursor glow, tilt,
  and typing animation for users who request reduced motion).
- Keyboard-navigable nav, visible focus states, semantic landmarks
  (`header`, `main`, `section`, `footer`), one `<h1>` per page,
  `aria-live` status on the contact form.
- Includes `robots.txt`, `sitemap.xml`, Open Graph/Twitter tags, and a
  JSON-LD `Person` schema for richer search results.
