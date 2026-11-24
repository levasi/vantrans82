import type { Pool } from 'pg'

const MAX_ATTEMPTS = 8
const WINDOW_MINUTES = 15

export async function assertLoginAllowed(db: Pool, email: string, ip: string) {
  await ensureLoginAttemptsTable(db)

  const result = await db.query(
    `SELECT COUNT(*)::int AS count
     FROM login_attempts
     WHERE created_at > NOW() - INTERVAL '${WINDOW_MINUTES} minutes'
       AND (email = $1 OR ip = $2)`,
    [email, ip]
  )

  if (Number(result.rows[0]?.count || 0) >= MAX_ATTEMPTS) {
    throw createError({
      statusCode: 429,
      message: 'Too many login attempts. Try again later.'
    })
  }
}

export async function recordLoginFailure(db: Pool, email: string, ip: string) {
  await ensureLoginAttemptsTable(db)
  await db.query(
    `DELETE FROM login_attempts WHERE created_at < NOW() - INTERVAL '1 day'`
  )
  await db.query(
    'INSERT INTO login_attempts (email, ip) VALUES ($1, $2)',
    [email.slice(0, 255), ip.slice(0, 64)]
  )
}

export async function clearLoginFailures(db: Pool, email: string) {
  await ensureLoginAttemptsTable(db)
  await db.query('DELETE FROM login_attempts WHERE email = $1', [email])
}

async function ensureLoginAttemptsTable(db: Pool) {
  await db.query(`
    CREATE TABLE IF NOT EXISTS login_attempts (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      ip VARCHAR(64) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)
  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_login_attempts_created_at
    ON login_attempts (created_at)
  `)
}
