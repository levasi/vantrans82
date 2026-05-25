import { d as defineEventHandler, g as getDb, c as createError } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import 'pg';

const settings_get = defineEventHandler(async (event) => {
  try {
    const db = getDb();
    if (!db) {
      return {
        success: true,
        settings: {
          companyName: "VanTrans82",
          contactEmail: "contact@vantrans82.ro",
          phoneNumber: "+40 123 456 789",
          address: "Str. Logistica nr. 123\nBucharest, Romania",
          smtpHost: "",
          smtpPort: "587",
          smtpUsername: "",
          smtpPassword: "",
          smtpSecure: false,
          showLanguageSwitch: true
        }
      };
    }
    await db.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) UNIQUE NOT NULL,
        value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    const result = await db.query("SELECT key, value FROM settings");
    const settings = {};
    result.rows.forEach((row) => {
      try {
        settings[row.key] = JSON.parse(row.value);
      } catch {
        settings[row.key] = row.value;
      }
    });
    const defaultSettings = {
      companyName: "VanTrans82",
      contactEmail: "contact@vantrans82.ro",
      phoneNumber: "+40 123 456 789",
      address: "Str. Logistica nr. 123\nBucharest, Romania",
      smtpHost: "",
      smtpPort: "587",
      smtpUsername: "",
      smtpPassword: "",
      smtpSecure: false,
      showLanguageSwitch: true
    };
    return {
      success: true,
      settings: { ...defaultSettings, ...settings }
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error.message || "Failed to load settings"
    });
  }
});

export { settings_get as default };
//# sourceMappingURL=settings.get.mjs.map
