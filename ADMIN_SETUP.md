# Admin Area Setup Guide

## Database Setup (Railway)

### 1. Create PostgreSQL Database on Railway

1. Go to your Railway project dashboard
2. Click "New" → "Database" → "Add PostgreSQL"
3. Railway will automatically create a PostgreSQL database
4. Copy the `DATABASE_URL` connection string from the database service

### 2. Set Environment Variable

**For Railway Deployment (Recommended - Private Network):**
To avoid egress fees, use Railway's private network connection:

1. Go to your Railway web service → Variables
2. Click "+ New Variable"
3. Add a reference variable: `DATABASE_PRIVATE_URL` = `postgresql://${{postgres.PGUSER}}:${{postgres.PGPASSWORD}}@${{postgres.RAILWAY_PRIVATE_DOMAIN}}:${{postgres.PGPORT}}/${{postgres.PGDATABASE}}`
   - Replace `postgres` with your actual PostgreSQL service name if different
   - This uses Railway's private network (`railway.internal`) to avoid egress fees

**Alternative - Public Endpoint (Not Recommended):**
If you need to use the public endpoint (will incur egress fees):
- Add: `DATABASE_URL` = `postgresql://postgres:PASSWORD@HOST:PORT/DATABASE`
  - Replace `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your actual Railway database credentials

**For Local Development:**
⚠️ **IMPORTANT**: To prevent accidentally modifying production data, use `DATABASE_LOCAL_URL` for local development.

Create a `.env` file in the project root (this file is gitignored):
```
# Use DATABASE_LOCAL_URL for local development to avoid affecting production
DATABASE_LOCAL_URL=postgresql://user:password@localhost:5432/vantrans82_local

# DO NOT set DATABASE_URL or DATABASE_PRIVATE_URL in local .env
# These are only for production (Railway will set them automatically)
```

**Setting up a local PostgreSQL database:**
1. Install PostgreSQL locally (if not already installed)
2. Create a local database:
   ```bash
   createdb vantrans82_local
   ```
3. Update your `.env` file with the local connection string
4. The app will automatically use the local database in development mode

### 3. Initialize Database and Create First Admin User

After deploying with the `DATABASE_URL` set, the database tables will be automatically created on first server start.

To create your first admin user, you can:

**Option A: Use the API endpoint (recommended)**
```bash
curl -X POST https://your-domain.com/api/admin/init \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@vantrans82.ro",
    "password": "your-secure-password",
    "name": "Admin User"
  }'
```

**Option B: Use a database client**
Connect to your Railway PostgreSQL database and run:
```sql
-- The table will be created automatically, but you can manually insert:
INSERT INTO admin_users (email, password_hash, name)
VALUES (
  'admin@vantrans82.ro',
  '$2a$10$...', -- Use bcrypt to hash your password
  'Admin User'
);
```

### 4. Login

1. Navigate to `/admin/login`
2. Enter your email and password
3. You'll be redirected to the admin dashboard

## Local Development

**Database Separation:**
The application automatically separates local and production databases:
- **Development mode**: Uses `DATABASE_LOCAL_URL` (if set) or falls back to `DATABASE_URL`
- **Production mode**: Uses `DATABASE_PRIVATE_URL` or `DATABASE_URL` (set by Railway)

This prevents accidentally modifying production data during local development.

**Setting up local development:**

1. **Install PostgreSQL locally** (if not already installed):
   - macOS: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql`
   - Windows: Download from [postgresql.org](https://www.postgresql.org/download/)

2. **Create a local database:**
   ```bash
   createdb vantrans82_local
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

5. **Initialize the local database:**
   The database tables will be created automatically on first run.

**⚠️ Important Notes:**
- Never set `DATABASE_URL` or `DATABASE_PRIVATE_URL` in your local `.env` file
- If you see a warning about connecting to Railway in development, check your `.env` file
- Your local database is completely separate from production

## Security Notes

- Change default passwords in production
- Use strong passwords
- Consider implementing JWT tokens for better security
- Enable HTTPS in production
- Regularly update dependencies

