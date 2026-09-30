# Architecture and File Guide

This project is a single-page React application built with Vite. `src/App.jsx` composes the page sections; each section is an independent component. Translation dictionaries provide the user-facing content, while CSS custom properties centralize the visual themes with a moody, professional aesthetic.

## Root Files

- `index.html` — Vite HTML entry point, font loading, and React mount element.
- `package.json` / `package-lock.json` — npm scripts and dependency versions.
- `vite.config.js` — Vite and React plugin configuration.
- `tailwind.config.js` — Tailwind content scanning, class-based dark mode, and design extensions.
- `postcss.config.js` — PostCSS plugins used by Tailwind.
- `.gitignore` — excludes generated files, local configuration, and `notes_internal.md`.
- `server.js` / `server.cjs` — optional Node server entry points for the contact/backend setup.
- `README.md` — installation, stack, features, and common edit locations.
- `notes_internal.md` — private Arabic working notes; ignored by Git and not published.

## Application Source

- `src/main.jsx` — loads global styles and i18n, then mounts the React application.
- `src/App.jsx` — wraps the page with `ThemeProvider`, updates document language/direction, and composes the sections in page order.
- `src/index.css` — Tailwind layers, semantic light/dark CSS variables, shared component classes, skill-category accents, modal styles, micro-interactions, and reduced-motion rules.
- `src/context/ThemeContext.jsx` — reads and persists the theme preference and toggles the `dark` class on the document.
- `src/i18n/config.js` — configures i18next, language selection, and translation resources.
- `src/i18n/en.json` — English labels, copy, portfolio project data, and category translations.
- `src/i18n/ar.json` — Arabic equivalents for translated interface content, project data, and category translations.
- `src/i18n/certificates.json` — certificate resource data used by the translation setup or related views.

## Page Components

- `src/components/Navbar.jsx` — sticky navigation, active section indicator, language switch, and theme switch.
- `src/components/Hero.jsx` — introduction, role, summary, and section links (profile picture moved to About section).
- `src/components/About.jsx` — biography, prominent profile picture display, and categorized skill groups with distinct category styling and visual hierarchy.
- `src/components/Experience.jsx` — experience and education entries with modern card layout.
- `src/components/Certificates.jsx` — certificate records, category filters, straight image frames (no tilting), preview modal, and credential links.
- `src/components/Portfolio.jsx` — translated project collection, fixed category filters (All, AI, Frontend, Backend, Full-Stack), multi-category support, sorting, images, and project links.
- `src/components/Contact.jsx` — contact details, form state and validation, Web3Forms submission, and status messages with refined focus states.
- `src/components/ContactAdvanced.jsx` — alternate contact implementation; `App.jsx` currently renders `Contact.jsx`.
- `src/components/Footer.jsx` — quick links, social profiles (GitHub, LinkedIn), and copyright notice.

## Supporting Modules and Assets

- `src/hooks/useFeedback.js` — shared click and hover feedback behavior.
- `src/utils/animations.js` — reusable Framer Motion variants.
- `src/utils/haptics.js` — optional haptic feedback helper.
- `src/utils/sounds.js` — optional sound feedback helper.
- `public/favicon.svg` — browser tab icon.
- `public/image.jpg` — profile photograph.
- `public/images/projects/` — project preview images.
- `public/images/certificates/` — certificate images.

## Visual System

### Light Mode
Uses a clean, minimal warm neutral palette with:
- Warm paper background (`#faf9f7`)
- Crisp dark text (`#1a1a1a`)
- Neutral gray accents
- Subtle, soft shadows

### Dark Mode
Uses a moody, professional charcoal/gunmetal palette with:
- Deep black background (`#0a0a0a`)
- Pitch black secondary (`#080808`)
- Off-white text (`#f0f0f0`)
- Amber accent (`#d4a574`) — strictly no blue or purple tones
- Subtle, diffused shadows

### Shared Component Classes
- `.surface-card` — card containers with hover effects
- `.flat-button` — primary and secondary buttons
- `.filter-chip` — category filter buttons
- `.skill-card` — skill category cards with tone-specific styling
- `.media-frame` — image containers with consistent sizing
- `.control` — form inputs with refined focus states (no glowing effects)

## Project Filtering System

### Fixed Categories
Projects are filtered using fixed categories:
- `all` — Shows all projects
- `ai` — AI/Machine Learning projects
- `frontend` — Frontend-focused projects
- `backend` — Backend-focused projects
- `fullstack` — Full-stack projects

### Multi-Category Support
Each project can belong to multiple categories simultaneously via the `categories` array in project data. For example, a project can appear under both "AI" and "Full-Stack" filters.

### Data Structure
```json
{
  "id": 1,
  "name": "Project Name",
  "description": "Project description",
  "tags": ["React", "Node.js"],
  "categories": ["frontend", "fullstack"],
  "image": "/images/projects/example.jpg",
  "link": "https://example.com"
}
```

## Common Updates

### Text Content
Add or edit visible text in both `src/i18n/en.json` and `src/i18n/ar.json`, preserving matching keys.

### Projects
Update project data in both locale files under `portfolio.projects`. Ensure `categories` array includes appropriate category keys.

### Certificates
Update certificate entries in `src/components/Certificates.jsx`.

### Skills
Update skill groups in `src/components/About.jsx` within the `skillCategories` array.

### Images
Place new images in the matching folder under `public/images/` and use root-relative paths.

### Theme Colors
Edit the `:root` and `.dark` token blocks in `src/index.css` for palette changes. Shared component styles consume these variables.

## Design Principles

1. **No AI-Slop Aesthetics:** No neon, glowing, or particle effects
2. **Strict Color Restriction:** No blue or purple tones in any mode
3. **Moody & Professional:** Dark mode uses deep charcoal/gunmetal with amber accent
4. **Minimal Animation:** Subtle, restrained micro-interactions only
5. **Clean Focus States:** Form inputs use smooth border transitions, no glowing effects
6. **Professional Hierarchy:** Clear visual separation between section headings and content
