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

Preview the production build:

```bash
npm run preview
```

## Learn More

- [Nuxt Documentation](https://nuxt.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

