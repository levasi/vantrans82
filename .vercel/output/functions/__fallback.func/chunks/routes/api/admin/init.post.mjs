import { d as defineEventHandler, i as initDb, r as readBody, c as createError, g as getDb } from '../../../nitro/nitro.mjs';
import bcrypt from 'bcryptjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import 'pg';

const init_post = defineEventHandler(async (event) => {
  try {
    await initDb();
    const body = await readBody(event);
    const { email, password, name } = body;
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: "Email and password are required"
      });
    }
    const db = getDb();
    if (!db) {
      throw createError({
        statusCode: 503,
        message: "Database not available"
      });
    }
    const existingUsers = await db.query("SELECT COUNT(*) as count FROM admin_users");
    const userCount = parseInt(existingUsers.rows[0].count);
    const existingUser = await db.query(
      "SELECT id FROM admin_users WHERE email = $1",
      [email.toLowerCase()]
    );
    if (existingUser.rows.length > 0) {
      throw createError({
        statusCode: 409,
        message: "User with this email already exists"
      });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const result = await db.query(
      "INSERT INTO admin_users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name",
      [email.toLowerCase(), passwordHash, name || null]
    );
    const user = result.rows[0];
    return {
      success: true,
      message: userCount === 0 ? "Database initialized and first admin user created" : "Admin user created",
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: error.message || "An error occurred while initializing"
    });
  }
});

export { init_post as default };
//# sourceMappingURL=init.post.mjs.map
