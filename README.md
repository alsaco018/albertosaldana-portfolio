# Portfolio — Alberto Saldaña Contreras

One-page personal portfolio built with **Astro**, **React**, and **Tailwind CSS v4**. Rose light theme, Miami neon dark mode, scroll storytelling, and personality stats.

**Live:** [albertosaldana.dev](https://albertosaldana.dev)

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
2. **Work** — 1xINTERNET projects and Figma2Code
3. **Tech** — technologies
4. **About** — narrative + interactive personality stats
5. **Studies** — vocational diploma → Computer Engineering (UOC)
6. **Loves** — hobbies and interests

Content lives in `src/data/content.ts`.

## Deploy (Hostinger VPS + Docker)

Production serves the static `dist/` folder with **nginx** behind **Caddy** (automatic HTTPS via Let’s Encrypt). Domain: **albertosaldana.dev**.

### One-time: DNS (hPanel)

1. Open **hPanel → Domains → albertosaldana.dev → DNS**
2. Set **A** record `@` → your VPS public IP
3. Set **A** record `www` → same IP (or CNAME `www` → `@`)
4. Wait for DNS propagation

### One-time: VPS setup

SSH into the Hostinger VPS (hPanel → VPS → SSH), then:

```bash
# Install Docker (Engine + Compose plugin) if missing
# Follow: https://docs.docker.com/engine/install/

sudo mkdir -p /opt/portfolio
sudo chown "$USER":"$USER" /opt/portfolio
git clone <YOUR_REPO_URL> /opt/portfolio
cd /opt/portfolio

cp .env.example .env
# Edit .env: set ACME_EMAIL to a real address for Let's Encrypt

docker compose up -d --build
```

Ensure firewall allows **22**, **80**, and **443**.

If Hostinger’s default panel/nginx already binds 80/443, free those ports (or disable the host proxy) so Caddy can obtain certificates.

### GitHub Actions auto-deploy

On every push to `main`, [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) SSHs into the VPS, pulls, and rebuilds.

Add repository secrets:

| Secret | Value |
|--------|--------|
| `VPS_HOST` | VPS public IP |
| `VPS_USER` | SSH user (`root` or your user) |
| `VPS_SSH_KEY` | Private SSH key (full PEM) |
| `VPS_PORT` | `22` (optional if default) |

The VPS user must be able to `git pull` in `/opt/portfolio` and run `docker compose`.

### Local Docker smoke test

```bash
docker compose up -d --build
# App is behind Caddy; for a quick nginx-only check:
docker compose up -d --build portfolio
curl -I http://127.0.0.1  # only if you temporarily publish portfolio ports
```

On a machine without the real domain, Caddy TLS will fail until DNS points here — that is expected.
