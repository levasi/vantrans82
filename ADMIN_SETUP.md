# Admin Area Setup Guide

## Database Setup (Railway)

### 1. Create PostgreSQL Database on Railway

1. Go to your Railway project dashboard
2. Click "New" → "Database" → "Add PostgreSQL"
3. Railway will automatically create a PostgreSQL database
4. Copy the `DATABASE_URL` connection string from the database service

### 2. Set Environment Variable

**For Railway Deployment:**
Add the `DATABASE_URL` to your Railway environment variables:
- Go to your Railway service → Variables
- Add: `DATABASE_URL` = `postgresql://postgres:PASSWORD@HOST:PORT/DATABASE`
  - Replace `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your actual Railway database credentials

**For Local Development:**
Create a `.env` file in the project root (this file is gitignored):
```
DATABASE_URL=postgresql://user:password@localhost:5432/vantrans82
```

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

For local development, you can:

1. Set up a local PostgreSQL database, or
2. Use Railway's database connection string locally
3. Create a `.env` file with:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/vantrans82
   ```

## Security Notes

- Change default passwords in production
- Use strong passwords
- Consider implementing JWT tokens for better security
- Enable HTTPS in production
- Regularly update dependencies

