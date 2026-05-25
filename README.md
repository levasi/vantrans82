# VanTrans82

A Nuxt 3 project with TailwindCSS.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Local Database

For local development, you need a separate database to avoid affecting production data.

**Quick Start (Docker - Recommended):**
```bash
# Start local PostgreSQL database
npm run db:start

# Create .env file with:
# DATABASE_LOCAL_URL=postgresql://vantrans82:vantrans82_dev@localhost:5432/vantrans82_local
```

**Or use the setup script:**
```bash
npm run db:setup
```

📖 **Full setup guide**: See [LOCAL_SETUP.md](./LOCAL_SETUP.md) for detailed instructions.

## Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Database Commands

- `npm run db:setup` - Interactive setup script
- `npm run db:start` - Start Docker PostgreSQL container
- `npm run db:stop` - Stop Docker PostgreSQL container
- `npm run db:logs` - View database logs

## Production

Build the application for production:

```bash
npm run build
```

Preview the production build locally (Node server):

```bash
npm run build
npm run start
```

## Deploy to Vercel

This app is configured for [Vercel](https://vercel.com) (Nuxt serverless + API routes).

### 1. Push to GitHub

Ensure the repo is on GitHub (or GitLab/Bitbucket supported by Vercel).

### 2. Import on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import `vantrans82`.
2. Framework preset should detect **Nuxt** automatically.
3. Build command: `npm run build` (default).
4. Install command: `npm install` (default).

### 3. Environment variables

In **Project → Settings → Environment Variables**, add for **Production** (and Preview if you use the admin/API on previews):

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (SSL required for hosted DBs). Use [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres), [Neon](https://neon.tech), or your existing Railway URL. |
| `NODE_ENV` | Set to `production` (Vercel often sets this automatically). |

Do **not** set `DATABASE_LOCAL_URL` on Vercel—that is for local Docker only.

Copy from `.env.example` and replace with your real production URL.

### 4. Database

- **Vercel Postgres / Neon**: create a database, paste the connection string into `DATABASE_URL`.
- **Existing Railway DB**: use the public `DATABASE_URL` (not `railway.internal`) so Vercel serverless can reach it; enable SSL if required.

After the first deploy, open `/admin` and complete setup if you use the admin panel (tables are created on first API use in production).

### 5. Deploy

- **Git**: every push to `main` deploys production; other branches get preview URLs.
- **CLI** (optional):

```bash
npx vercel login
npx vercel link
npx vercel env pull .env.local   # optional: sync env for local testing
npx vercel --prod
```

### Custom domain

Vercel → Project → **Settings → Domains** → add your domain and follow DNS instructions.

## Learn More

- [Nuxt Documentation](https://nuxt.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

