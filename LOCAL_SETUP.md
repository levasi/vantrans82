# Local Development Setup Guide

This guide will help you set up a local database for development, completely separate from the production database on Railway.

## Quick Start

### Option 1: Using Docker (Recommended - Easiest)

1. **Start the local PostgreSQL database:**
   ```bash
   npm run db:start
   ```
   Or manually:
   ```bash
   docker compose up -d postgres
   ```

2. **Create a `.env` file** in the project root:
   ```env
   DATABASE_LOCAL_URL=postgresql://vantrans82:vantrans82_dev@localhost:5432/vantrans82_local
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Stop the database when done:**
   ```bash
   npm run db:stop
   ```
   Or manually:
   ```bash
   docker compose down
   ```

### Option 2: Using Local PostgreSQL

1. **Install PostgreSQL** (if not already installed):
   - **macOS**: `brew install postgresql`
   - **Linux**: `sudo apt-get install postgresql` or `sudo yum install postgresql`
   - **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)

2. **Create a local database:**
   ```bash
   createdb vantrans82_local
   ```
   Or with a specific user:
   ```bash
   createdb -U your_username vantrans82_local
   ```

3. **Create a `.env` file** in the project root:
   ```env
   DATABASE_LOCAL_URL=postgresql://your_username:your_password@localhost:5432/vantrans82_local
   ```
   Replace `your_username` and `your_password` with your PostgreSQL credentials.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

### Option 3: Automated Setup Script

Run the setup script to guide you through the process:

```bash
chmod +x scripts/setup-local-db.sh
./scripts/setup-local-db.sh
```

## Environment Variables

Create a `.env` file in the project root with:

```env
# Local Development Database (REQUIRED for local development)
DATABASE_LOCAL_URL=postgresql://user:password@localhost:5432/vantrans82_local

# DO NOT set these in local .env - they are for production only!
# DATABASE_URL=...
# DATABASE_PRIVATE_URL=...
```

## Verification

After starting the development server, you should see:

1. **Database connection log:**
   ```
   📊 Database connection: postgresql://vantrans82:****@localhost:5432/vantrans82_local...
   ```

2. **No warnings** about connecting to Railway database

3. **Database tables initialized:**
   ```
   Database tables initialized successfully
   ```

## Troubleshooting

### "DATABASE_LOCAL_URL not set"
- Make sure you created a `.env` file in the project root
- Check that the file contains `DATABASE_LOCAL_URL=...`
- Restart the development server after creating/updating `.env`

### "Connection refused" or "Cannot connect"
- **Docker**: Make sure the container is running: `docker compose ps`
- **Local PostgreSQL**: Make sure PostgreSQL is running:
  - macOS: `brew services start postgresql`
  - Linux: `sudo systemctl start postgresql`
  - Windows: Check PostgreSQL service in Services

### "Warning: You are connecting to a Railway database"
- Remove `DATABASE_URL` or `DATABASE_PRIVATE_URL` from your `.env` file
- Make sure only `DATABASE_LOCAL_URL` is set for local development

### "Database does not exist"
- Create the database: `createdb vantrans82_local`
- Or use Docker: `docker-compose up -d postgres`

## Database Management

### Using Docker

- **View logs**: `npm run db:logs` or `docker compose logs -f postgres`
- **Stop database**: `npm run db:stop` or `docker compose down`
- **Start database**: `npm run db:start` or `docker compose up -d postgres`
- **Reset database** (⚠️ deletes all data): `docker compose down -v && docker compose up -d postgres`

### Using Local PostgreSQL

- **Connect to database**: `psql vantrans82_local`
- **List databases**: `psql -l`
- **Drop database** (⚠️ deletes all data): `dropdb vantrans82_local`
- **Create database**: `createdb vantrans82_local`

## Creating Admin User

After the database is set up, create your first admin user:

```bash
curl -X POST http://localhost:3000/api/admin/init \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@vantrans82.ro",
    "password": "your-secure-password",
    "name": "Admin User"
  }'
```

Or use the admin panel at `http://localhost:3000/admin/login` after creating the user.

## Important Notes

✅ **DO:**
- Use `DATABASE_LOCAL_URL` for local development
- Keep your `.env` file in `.gitignore` (already configured)
- Use Docker for the easiest setup

❌ **DON'T:**
- Set `DATABASE_URL` or `DATABASE_PRIVATE_URL` in local `.env`
- Commit your `.env` file to git
- Use production database credentials locally

## Next Steps

1. ✅ Set up local database (using one of the options above)
2. ✅ Create `.env` file with `DATABASE_LOCAL_URL`
3. ✅ Start development server: `npm run dev`
4. ✅ Create admin user via API or admin panel
5. ✅ Start developing! 🚀
