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
2. **Build Command** must be `npm run build` (not `nuxt build`). Override in **Settings → Build** if needed, or use `vercel.json` in the repo.
3. **Install Command**: `npm ci` (set in `vercel.json`).
4. Framework: **Nuxt.js** or **Other** — both work if the build command is `npm run build`.

### 3. Vercel Postgres (recommended)

1. In the Vercel project: **Storage** → **Create Database** → **Postgres** → link to this app.
2. Vercel injects `POSTGRES_URL` automatically — **no manual env copy needed**.
3. The app reads `POSTGRES_URL` in production (see [VERCEL_POSTGRES.md](./VERCEL_POSTGRES.md)).

Do **not** set `DATABASE_LOCAL_URL` on Vercel (local Docker only).

Optional: run `npx vercel env pull .env.local` to use the same DB locally.

### 4. After deploy

Tables are created on first start. Open `/admin` and complete setup (see [ADMIN_SETUP.md](./ADMIN_SETUP.md)).

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

