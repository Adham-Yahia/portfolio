# Adham Yahia — Portfolio

A responsive, bilingual portfolio for an AI Engineer and Full-Stack Web Developer. The interface supports English and Arabic (including right-to-left layout) and persistent light and dark themes with a moody, professional aesthetic.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Vite prints the local development URL in the terminal (typically `http://localhost:5173`).

### Production Build

```bash
npm run build
npm run preview
```

## Tech Stack

- **Frontend Framework:** React 18 with Vite
- **Styling:** Tailwind CSS with semantic CSS custom properties
- **Internationalization:** i18next and react-i18next for English/Arabic support
- **Animations:** Framer Motion for restrained interface transitions
- **HTTP Client:** Axios for contact form submission
- **Theme System:** CSS custom properties for light/dark mode with neutral, moody color palette

## Features

- **Bilingual Support:** Full English and Arabic content with automatic RTL layout for Arabic
- **Theme System:** Light and dark themes with visitor preference saved locally
- **Responsive Design:** Optimized for all screen sizes with mobile-first approach
- **Project Filtering:** Fixed category filters (All, AI, Frontend, Backend, Full-Stack) with multi-category support
- **Certificate Showcase:** Filterable certificate collection with image preview modal
- **Contact Form:** Validated form with submission feedback
- **Accessibility:** Reduced-motion support and semantic HTML
- **Professional Aesthetic:** Moody, minimal design with neutral color palette (no blue/purple tones)

## Project Structure

```
myPortfolio/
├── public/
│   ├── images/
│   │   ├── certificates/
│   │   └── projects/
│   ├── favicon.svg
│   └── image.jpg
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Certificates.jsx
│   │   ├── Contact.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   └── Portfolio.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   └── useFeedback.js
│   ├── i18n/
│   │   ├── ar.json
│   │   ├── certificates.json
│   │   ├── config.js
│   │   └── en.json
│   ├── utils/
│   │   ├── animations.js
│   │   ├── haptics.js
│   │   └── sounds.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── docs/
│   └── architecture.md
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Content Management

### Text Content

All user-facing text lives in translation files:
- `src/i18n/en.json` — English content
- `src/i18n/ar.json` — Arabic content

Keep matching translation keys in both files. Changes to content should be made in both locale files.

### Projects

Project data is stored in the translation files under `portfolio.projects`. Each project includes:
- `id`: Unique identifier
- `name`: Project title
- `description`: Project description
- `tags`: Technology tags array
- `categories`: Category array (ai, frontend, backend, fullstack)
- `image`: Path to project image
- `link`: Live demo URL

### Certificates

Certificate records are defined in `src/components/Certificates.jsx`. Each certificate includes:
- `id`: Unique identifier
- `name`: Certificate title
- `issuer`: Issuing organization
- `date`: Completion date
- `category`: Category array
- `credentialId`: Verification ID
- `credentialUrl`: Verification URL
- `description`: Certificate description
- `image`: Path to certificate image
- `featured`: Boolean for featured status

### Skills

Skill categories are defined in `src/components/About.jsx` within the `skillCategories` array.

### Images

Place image assets in `public/images/` and reference them with root-relative paths:
- Projects: `/images/projects/filename.jpg`
- Certificates: `/images/certificates/filename.jpg`
- Profile: `/image.jpg`

## Theme Customization

Theme colors and visual patterns are defined in `src/index.css` using CSS custom properties:

### Light Mode Variables
Defined in `:root` block with warm neutral tones

### Dark Mode Variables
Defined in `.dark` block with moody charcoal/gunmetal palette and amber accent

Key tokens:
- `--bg-primary`: Main background
- `--text-primary`: Primary text color
- `--accent`: Accent color (amber in dark mode)
- `--shadow-card`: Card shadow depth

## Contact Form Configuration

The contact section submits to Web3Forms. Configure the service access key in `src/components/Contact.jsx` before deploying publicly.

**Important:** Never commit private credentials to the repository.

## Architecture Documentation

For detailed file-by-file breakdown and architecture explanation, see [`docs/architecture.md`](docs/architecture.md).

## Private Notes

`notes_internal.md` is a private Arabic reference file listed in `.gitignore`. It is not published to GitHub and should remain on the developer's machine only.

## License

© 2026 Adham Yahia. All Rights Reserved.
