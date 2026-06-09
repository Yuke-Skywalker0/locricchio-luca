# Luca Lo Cricchio — Personal Portfolio

> *"I don't write code. I architect systems."*

**Live site:** [yuke-skywalker0.github.io/locricchio-luca](https://yuke-skywalker0.github.io/locricchio-luca/)

---

## About

Personal portfolio of **Luca Lo Cricchio** — Full Stack Developer from Monza, Italy.

Built entirely from scratch: no frameworks, no templates, no shortcuts. Every pixel, every animation, every line of JavaScript written by hand. Because when you're a developer, your portfolio is also your proof of work.

---

## Stack

```
HTML5 · CSS3 · Vanilla JavaScript
```

No React. No Vue. No Bootstrap. Just clean, fast, standards-compliant web.

---

## Features

- **Big Bang intro animation** — canvas-based particle system that collapses into a singularity before exploding
- **Parallax star field** — multi-layer scrolling background with procedural matrix rain
- **Custom cursor + trail** — 18-dot trailing cursor with blend-mode effects (desktop only)
- **Warp speed effect** — triggers on section change
- **Text scramble** — headings decode themselves as they enter the viewport
- **3D tilt cards** — perspective transform on mouse move (desktop only)
- **Typewriter** — cycling role descriptions with natural typing rhythm
- **Skill bars** — animated on scroll with IntersectionObserver
- **Timeline** — sequential dot reveal for certifications
- **Cert expand/collapse** — shows first 5, expandable to all 15 with smooth animation
- **Counter animation** — numbers count up when the about section enters view
- **Nav active indicator** — highlights current section while scrolling
- **Mobile hamburger menu** — full-screen overlay with smooth open/close
- **CV download** — direct PDF download, no redirects

---

## SEO

This site is optimised to rank for `"Luca Lo Cricchio"` and related searches even on GitHub Pages hosting.

**On-page:**
- Single semantic `<h1>` in the hero (intro uses a `<p>` to avoid duplication)
- Correct H1 → H2 → H3 hierarchy across all sections
- `<main>`, `<nav>`, `<article>`, `<footer>`, `<time>` semantic HTML
- Microdata (`itemscope`/`itemprop`) on projects and certifications
- All images have descriptive `alt` text
- `aria-label`, `aria-live`, `role` on interactive and dynamic elements
- Skip-to-content link for screen readers and crawlers

**Meta:**
- Title, description, keywords, author, robots
- Geo meta (`geo.region`, `geo.placename`, `geo.position`, `ICBM`)
- Open Graph (type: `profile`, with `profile:first_name` / `profile:last_name`)
- Twitter/X Card (`summary_large_image`)
- `canonical` pointing to the correct GitHub Pages URL
- `color-scheme`, `theme-color`, `viewport-fit=cover`

**Structured data (LD-JSON) — 6 schemas:**

| Schema | Purpose |
|--------|---------|
| `Person` | Primary entity — skills, credentials, address, languages, `sameAs` links |
| `WebSite` | Site identity with `@id`, `alternateName`, `copyrightHolder` |
| `ProfilePage` | `isPartOf` + `mainEntity` cross-referencing Person and WebSite |
| `ItemList` | All 4 projects as `CreativeWork` with author `@id`, dates, keywords |
| `BreadcrumbList` | 5-item breadcrumb trail |
| `FAQPage` | 4 Q&As — eligible for Google rich results |

**Files:**
- `sitemap.xml` — all sections listed with `lastmod`, `changefreq`, `priority`, `hreflang`
- `robots.txt` — points crawlers to sitemap

---

## Project Structure

```
locricchio-luca/
├── index.html              # Full page — semantic HTML, LD-JSON, microdata
├── style.css               # All styles — mobile-first, custom properties
├── script.js               # All interactions — animations, toggle, nav
├── sitemap.xml             # XML sitemap for Google Search Console
├── robots.txt              # Crawler instructions
├── cv-luca-lo-cricchio.pdf # Downloadable CV
└── README.md               # You are here
```

---

## Sections

| Section | ID | Description |
|---------|-----|-------------|
| Hero | `#hero` | Name, typewriter, CTA buttons |
| About | `#about` | Bio, photo, stats |
| Story | `#story` | Timeline of key milestones (2021–2026) |
| Tech Stack | `#skills` | 6 skill categories with animated progress bars |
| Soft Skills | `#softskills` | 12 human skills as icon cards |
| Projects | `#projects` | 4 real projects with tech tags and live links |
| Certifications | `#certifications` | 15 certs, first 5 visible, expandable |
| Download CV | `#download` | Direct PDF download |
| Contact | `#contact` | Social links + email + phone |

---

## Responsive

Designed mobile-first. Tested across:

- Mobile (320px – 480px)
- Tablet (481px – 1024px)
- Desktop (1025px+)

Touch-specific: cursor hidden, tilt cards disabled, tap targets minimum 48×48px (Google accessibility standard), hamburger menu replaces nav links.

---

## Performance notes

- Photo embedded as base64 (`loading="eager"`, `fetchpriority="high"`) — no extra HTTP request for the above-the-fold image
- Fonts loaded via Google Fonts with `preconnect` hints
- All animations use `requestAnimationFrame` and `IntersectionObserver` — no scroll listeners hammering the main thread
- Canvas background runs on a fixed layer, never triggers layout reflow

---

## Deployment

Push all files to the root of your GitHub Pages branch:

```bash
git add .
git commit -m "update portfolio"
git push origin main
```

Then go to **Settings → Pages** and set source to `main / root`.

After deploy, submit `sitemap.xml` to [Google Search Console](https://search.google.com/search-console) for faster indexing.

---

## Contact

- **Email:** lucalocricchio1@gmail.com
- **LinkedIn:** [linkedin.com/in/luca-lo-cricchio](https://www.linkedin.com/in/luca-lo-cricchio/)
- **GitHub:** [github.com/Yuke-Skywalker0](https://github.com/Yuke-Skywalker0)
- **LSD Software:** [lsd-software.github.io](https://lsd-software.github.io)

---

<p align="center">
  <sub>© 2026 Luca Lo Cricchio — Designed & built in the void · Monza, Italy</sub>
</p>
