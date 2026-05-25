import { d as defineEventHandler, r as readBody, c as createError, g as getDb } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import 'pg';

const settings_put = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { settings } = body;
    if (!settings || typeof settings !== "object") {
      throw createError({
        statusCode: 400,
        message: "Invalid settings data"
      });
    }
    const db = getDb();
    if (!db) {
      throw createError({
        statusCode: 503,
        message: "Database not available"
      });
    }
    await db.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) UNIQUE NOT NULL,
        value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    for (const [key, value] of Object.entries(settings)) {
      const valueStr = typeof value === "string" ? value : JSON.stringify(value);
      await db.query(
        `INSERT INTO settings (key, value, updated_at)
         VALUES ($1, $2, CURRENT_TIMESTAMP)
         ON CONFLICT (key) 
         DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP`,
        [key, valueStr]
      );
    }
    return {
      success: true,
      message: "Settings saved successfully"
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: error.message || "Failed to save settings"
    });
  }
});

export { settings_put as default };
//# sourceMappingURL=settings.put.mjs.map
