# Benjamin Baya — Portfolio

Personal developer portfolio and API backend, built as an npm workspaces monorepo.

**Live:** [benjamin-baya.vercel.app](https://benjamin-baya.vercel.app)

---

## Project Structure

```
Portfolio/
├── apps/
│   ├── web/          # React 19 + Vite frontend (deployed to Vercel)
│   └── api/          # Express.js backend — chatbot & stats proxy (deployed to Render)
├── package.json      # Workspace root
└── README.md
```

---

## Tech Stack

### Frontend (`apps/web`)
- **React 19** — UI framework
- **Vite** — build tool
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — animations and scroll effects
- **React Router v6** — client-side routing
- **Recharts** — dashboard data visualisation
- **Lucide React** — icons
- **simple-icons** — brand/technology icons

### Backend (`apps/api`)
- **Express.js** — REST API server
- **Groq API** (llama-3.1-8b-instant) — AI chatbot, free tier
- **WakaTime API** — coding activity stats proxy
- **GitHub API** — contribution data proxy

---

## Features

- **Hero section** — animated typewriter introduction with CTA links
- **About** — bio with Teevexa callout and consultation CTA
- **Animated counters** — projects shipped, countries served, happy clients
- **Experience timeline** — career and education history, alternating left-right layout
- **Services** — what I build: web apps, mobile, SaaS, APIs, business systems
- **Skills** — 4-column tech stack grid with proficiency levels
- **Projects gallery** — filterable cards with GitHub and live demo links
- **Developer dashboard** — live WakaTime + GitHub stats with charts
- **Contact form** — direct email via FormSubmit
- **Resume viewer** — dedicated `/resume` route with embedded PDF, download, and open-in-new-tab
- **AI chatbot** — portfolio-aware assistant powered by Groq, with deterministic fallback
- **Command palette** — `Cmd/Ctrl+K` quick navigation
- **Scroll progress bar** — 2px gradient indicator at top of page
- **Dark mode** — system-aware with manual toggle
- **Fully responsive** — mobile, tablet, desktop

---

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Clone
git clone https://github.com/b3njaminbaya/Benjamin-Baya.git
cd Benjamin-Baya

# Install all workspace dependencies
npm install

# Copy and fill environment files
cp apps/api/.env.example apps/api/.env
# Add your GROQ_API_KEY, WAKATIME_API_KEY, GITHUB_TOKEN to apps/api/.env
```

### Run

```bash
# Frontend only
npm run dev --workspace=apps/web

# Backend only
npm run dev --workspace=apps/api

# Both concurrently (from root, if concurrently is configured)
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:5000`.

---

## Environment Variables

### `apps/api/.env`

| Variable | Description |
|---|---|
| `GROQ_API_KEY` | Groq API key — get one free at [console.groq.com](https://console.groq.com) |
| `WAKATIME_API_KEY` | WakaTime API key from your account settings |
| `GITHUB_TOKEN` | GitHub personal access token (read-only) |
| `PORT` | Server port (default: 5000) |

The chatbot degrades gracefully to deterministic responses if `GROQ_API_KEY` is missing.

---

## Deployment

| App | Platform | Notes |
|---|---|---|
| `apps/web` | Vercel | Auto-deploys from `main` |
| `apps/api` | Render | Web service; add env vars in dashboard |

---

## Contact

- **Email:** [b3njaminbaya@gmail.com](mailto:b3njaminbaya@gmail.com)
- **LinkedIn:** [linkedin.com/in/b3njaminbaya](https://linkedin.com/in/b3njaminbaya)
- **GitHub:** [github.com/b3njaminbaya](https://github.com/b3njaminbaya)
- **Teevexa:** [teevexa.com](https://www.teevexa.com)

---

## License

[MIT](./LICENSE)
