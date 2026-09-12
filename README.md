# Portfolio - Muhammad Haidar Hakim (darXhi)

A responsive personal portfolio website with a light/dark theme and an animated background. Built with plain HTML, CSS, and JavaScript, no build step required.

## Structure

```
Portfolio/
├── home.html            # Page structure (semantic HTML)
├── style.css            # All styling + light/dark design tokens
├── script.js            # Theme, navbar, scroll effects, projects & modal
└── assets/
    └── images/
        ├── favicon.svg
        ├── profile.svg          # placeholder profile photo
        └── project-1..6.svg     # placeholder project images
```

## Running it

Open `home.html` directly in a browser, or start a local server:

```bash
python -m http.server 5500
```

> For hosting (e.g. GitHub Pages), rename `home.html` to `index.html`.

## Customizing

| What to change | Where |
| --- | --- |
| Profile photo | Put your photo in `assets/images/` and update the `src` of `.home__photo` in `home.html` |
| Projects | The `PROJECTS` array at the top of `script.js` |
| Social media, phone, email | The `#contact` section in `home.html` (marked with `REPLACE` comments) |
| Colors / palette | Variables in `:root` and `[data-theme="dark"]` in `style.css` |
| Background animation | Section 3 of `style.css` (`.bg-blob` and its keyframes) |
| Scroll animations | Add `data-reveal="up / left / right / zoom / blur / flip"` to any element |
| Breakpoints | Section 12 of `style.css` (tablet `<=1024px`, mobile `<768px`) |

## Features

- Light/dark theme saved in `localStorage` (defaults to the OS preference)
- Animated color background (drifting, color-shifting blobs with scroll parallax)
- Sticky navbar with scroll-spy underline, scroll progress bar, and a hamburger menu on mobile
- Varied scroll reveal animations that replay when you scroll back down
- Project cards rendered from data, with a native `<dialog>` detail modal and a scrollable description
- Respects `prefers-reduced-motion`
