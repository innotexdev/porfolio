# Innocent Akuh -Full-Stack Software Developer Portfolio

Premium, production-quality portfolio positioning **Innocent Akuh** as a full-stack software developer:
**React · TypeScript · Node.js · .NET · PostgreSQL · MongoDB**.

> "I build complete digital products, from interface to backend."

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Router (hash router -works on any static host)
- Zero heavy UI/animation dependencies -hand-rolled reveal system with `IntersectionObserver`

## Run

```bash
npm install
npm run dev      # local dev
npm run build    # type-check + production build → dist/
npm run preview  # serve the production build
```

## Structure

```
src/
├── components/   # Navbar, Footer, ProjectCard, ArchitectureDiagram, ui (TechBadge, SectionHeading, Card)
├── sections/     # Hero, About, ArchitectureSection, Experience, Projects, Ecosystems (.NET), Depth, Capabilities, Workflow, Contact
├── pages/        # Home, CaseStudy (TeiWill / TeiCraft / Pnuel / KYCInsight)
├── layouts/      # RootLayout
├── data/         # portfolio.ts -ALL content/data in one typed place
├── types/        # Project, CaseStudy, Experience, TechGroup, …
├── hooks/        # hooks.tsx -useReveal, Reveal, useTheme, useActiveSection
└── index.css     # design tokens, dark/light themes, reveal + marquee + card motion
```

## Customize (no invented data)

All personal content lives in `src/data/portfolio.ts`:

| Field | Action |
|---|---|
| `PROFILE.email` | Replace `YOUR_EMAIL_HERE` |
| `SOCIALS` | Replace `YOUR_GITHUB_URL`, `YOUR_LINKEDIN_URL`, `YOUR_RESUME_URL` |
| `PROJECTS[].githubUrl / liveUrl` | Currently `null` → renders "on request" placeholders. Add real URLs when available |
| `index.html` canonical + OG URLs | Replace `https://YOUR_DOMAIN_URL/` |

No companies, metrics, awards or testimonials are fabricated anywhere.

## Features

- Dark-first theme with light-theme toggle (`data-theme` + CSS variables, persisted per session)
- Interactive architecture diagram (8 selectable layers + live detail panel)
- Dual-ecosystem section: Node.js **and** .NET/ASP.NET Core
- "More Than Just the UI" depth visual, engineering workflow (8 steps), enterprise experience timeline
- Case-study routes: `#/work/teiwill`, `#/work/teicraft`, `#/work/pnuel`, `#/work/kycinsight`
- Downloadable resume: `public/resume.pdf` (regenerate with `npm run resume:pdf` after editing `scripts/resume-template.html`)
- SEO: title, description, canonical placeholder, Open Graph, Twitter cards, JSON-LD `Person` schema, semantic HTML
- Accessibility: skip link, landmarks, focus-visible rings, ARIA on interactive visuals, keyboard-operable nav, `prefers-reduced-motion` respected
- Responsive: intentional layouts at 1440 / 1280 / 1024 / 768 / 480 / 375
- Contact form is UI + clearly-marked integration point (`VITE_CONTACT_ENDPOINT` -wire to Formspree/Resend/your API)

## Deploy

Static output in `dist/`. Works on Vercel, Render, Netlify, or any static host (hash router = no rewrite rules needed).
