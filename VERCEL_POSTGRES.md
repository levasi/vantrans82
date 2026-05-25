# Vercel Postgres setup

This app uses **PostgreSQL** via the `pg` package. On Vercel, use **Vercel Postgres** (Storage in the dashboard; powered by Neon).

## 1. Create the database

1. Open your project on [vercel.com](https://vercel.com).
2. Go to **Storage** → **Create Database** → **Postgres** (or **Connect Store** → Postgres / Neon).
3. Choose a region close to your users and create the database.
4. Link it to your **vantrans82** project.

Vercel will add environment variables automatically (no manual copy required for deploys).

## 2. Variables used by this app

| Variable | Used when |
|----------|-----------|
| `POSTGRES_URL` | **Production on Vercel** (pooled connection — default) |
| `POSTGRES_URL_NON_POOLING` | Fallback if pooled URL is missing |
| `DATABASE_URL` | Fallback; you can set it equal to `POSTGRES_URL` if you like |
| `DATABASE_LOCAL_URL` | **Local only** — Docker Postgres (`npm run db:start`) |

You do **not** need to add `DATABASE_URL` on Vercel if `POSTGRES_URL` is present.

## 3. Local development with production DB (optional)

Pull env vars from Vercel (never commit `.env.local`):

```bash
npx vercel env pull .env.local
```

Prefer local Docker instead:

```bash
npm run db:start
# .env: DATABASE_LOCAL_URL=postgresql://vantrans82:vantrans82_dev@localhost:5432/vantrans82_local
```

## 4. Deploy

Push to `main` or run `npx vercel --prod`. Tables (`admin_users`, `settings`, `translations`) are created on first API use / server init.

## 5. First admin user

After deploy, open `https://your-domain.vercel.app/admin` and complete setup, or call `POST /api/admin/init` once with your admin email/password (see `ADMIN_SETUP.md`).

## Troubleshooting

- **“No database URL set”** — Storage not linked to the project, or env vars only on Production: add them for Preview too if needed.
- **SSL errors** — Connection strings from Vercel Postgres already include SSL; the app enables SSL for hosted URLs automatically.
- **Too many connections** — Production uses `POSTGRES_URL` (pooler) and `max: 1` per serverless instance on Vercel.
