import { d as defineEventHandler, g as getDb } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import 'pg';

const public_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e;
  try {
    const db = getDb();
    const defaultSettings = {
      showLanguageSwitch: true,
      companyName: "VanTrans82",
      phoneNumber: "+40 123 456 789",
      contactEmail: "contact@vantrans82.ro",
      address: "Str. Logistica nr. 123\nBucharest, Romania"
    };
    if (!db) {
      return {
        success: true,
        ...defaultSettings
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
    return {
      success: true,
      showLanguageSwitch: (_a = settings.showLanguageSwitch) != null ? _a : defaultSettings.showLanguageSwitch,
      companyName: (_b = settings.companyName) != null ? _b : defaultSettings.companyName,
      phoneNumber: (_c = settings.phoneNumber) != null ? _c : defaultSettings.phoneNumber,
      contactEmail: (_d = settings.contactEmail) != null ? _d : defaultSettings.contactEmail,
      address: (_e = settings.address) != null ? _e : defaultSettings.address
    };
  } catch (error) {
    return {
      success: true,
      showLanguageSwitch: true,
      companyName: "VanTrans82",
      phoneNumber: "+40 123 456 789",
      contactEmail: "contact@vantrans82.ro",
      address: "Str. Logistica nr. 123\nBucharest, Romania"
    };
  }
});

export { public_get as default };
//# sourceMappingURL=public.get.mjs.map
