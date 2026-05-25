import { d as defineEventHandler, r as readBody, c as createError, g as getDb } from '../../../nitro/nitro.mjs';
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

const login_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password } = body;
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
    const result = await db.query(
      "SELECT id, email, password_hash, name FROM admin_users WHERE email = $1",
      [email.toLowerCase()]
    );
    if (result.rows.length === 0) {
      throw createError({
        statusCode: 401,
        message: "Invalid email or password"
      });
    }
    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        message: "Invalid email or password"
      });
    }
    const sessionToken = Buffer.from(`${user.id}:${Date.now()}`).toString("base64");
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token: sessionToken
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: error.message || "An error occurred during login"
    });
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
