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

const deleteAccount_post = defineEventHandler(async (event) => {
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
    const userResult = await db.query(
      "SELECT id, email FROM admin_users WHERE id = $1",
      [userId]
    );
    if (userResult.rows.length === 0) {
      throw createError({
        statusCode: 404,
        message: "User not found"
      });
    }
    await db.query("DELETE FROM admin_users WHERE id = $1", [userId]);
    return {
      success: true,
      message: "Account deleted successfully"
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: error.message || "An error occurred while deleting the account"
    });
  }
});

export { deleteAccount_post as default };
//# sourceMappingURL=delete-account.post.mjs.map
