# Portfolio — Alberto Saldaña Contreras

One-page personal portfolio built with **Astro**, **React**, and **Tailwind CSS v4**. Pastel storytelling layout with a floating header, scroll animations, parallax intro, RPG-style personality charts, and an animated dark mode switcher.

## Stack

- Astro 7 + React islands
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Motion for animations
- lucide-react icons

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server on port **43123** |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |

## Sections

1. **Intro** — name as hero brand, role, CTA
2. **Mi trabajo** — 1xINTERNET projects and Figma2Code
3. **Sobre mí** — narrative + interactive personality stats
4. **Mis estudios** — DAW (matrícula de honor) → Ingeniería UOC

Content lives in `src/data/content.ts`.
