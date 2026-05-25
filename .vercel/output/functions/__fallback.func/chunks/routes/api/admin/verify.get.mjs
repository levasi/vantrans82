import { d as defineEventHandler, a as getQuery, c as createError, g as getDb } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import 'pg';

const verify_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const token = query.token;
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "No token provided"
      });
    }
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [userId] = decoded.split(":");
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
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
      "SELECT id, email, name FROM admin_users WHERE id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      throw createError({
        statusCode: 401,
        message: "User not found"
      });
    }
    const user = result.rows[0];
    return {
      success: true,
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
      message: error.message || "An error occurred during verification"
    });
  }
});

export { verify_get as default };
//# sourceMappingURL=verify.get.mjs.map
