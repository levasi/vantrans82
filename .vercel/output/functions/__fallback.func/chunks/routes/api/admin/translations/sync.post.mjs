import { d as defineEventHandler, g as getDb, c as createError, r as readBody } from '../../../../nitro/nitro.mjs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import 'pg';

const flatten = (obj, prefix = "") => {
  const result = [];
  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
      result.push(...flatten(obj[key], newKey));
    } else {
      result.push({ key: newKey, value: String(obj[key] || "") });
    }
  }
  return result;
};
const sync_post = defineEventHandler(async (event) => {
  try {
    const db = getDb();
    if (!db) {
      throw createError({
        statusCode: 500,
        message: "Database not available"
      });
    }
    const body = await readBody(event).catch(() => ({}));
    const { lang, force } = body;
    await db.query(`
      CREATE TABLE IF NOT EXISTS translations (
        id SERIAL PRIMARY KEY,
        lang VARCHAR(10) NOT NULL,
        key_path VARCHAR(500) NOT NULL,
        value TEXT NOT NULL,
        UNIQUE(lang, key_path)
      )
    `);
    const languages = lang ? [lang] : ["en", "ro"];
    const synced = [];
    const errors = [];
    for (const language of languages) {
      try {
        const filePath = join(process.cwd(), "locales", `${language}.json`);
        const fileContent = await readFile(filePath, "utf-8");
        const translations = JSON.parse(fileContent);
        const flattened = flatten(translations);
        if (force) {
          await db.query("DELETE FROM translations WHERE lang = $1", [language]);
        }
        for (const item of flattened) {
          if (force) {
            await db.query(
              "INSERT INTO translations (lang, key_path, value) VALUES ($1, $2, $3) ON CONFLICT (lang, key_path) DO UPDATE SET value = $3",
              [language, item.key, item.value]
            );
          } else {
            const existing = await db.query(
              "SELECT value FROM translations WHERE lang = $1 AND key_path = $2",
              [language, item.key]
            );
            if (existing.rows.length === 0) {
              await db.query(
                "INSERT INTO translations (lang, key_path, value) VALUES ($1, $2, $3)",
                [language, item.key, item.value]
              );
            } else if (!existing.rows[0].value || existing.rows[0].value.trim() === "") {
              await db.query(
                "UPDATE translations SET value = $3 WHERE lang = $1 AND key_path = $2",
                [language, item.key, item.value]
              );
            }
          }
        }
        synced.push(language);
      } catch (error) {
        if (error.code === "ENOENT") {
          errors.push({ lang: language, error: `Translation file not found: locales/${language}.json` });
        } else {
          errors.push({ lang: language, error: error.message || "Unknown error" });
        }
      }
    }
    return {
      success: true,
      message: `Synced ${synced.length} language(s) from JSON files to database`,
      synced,
      errors: errors.length > 0 ? errors : void 0
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error.message || "Failed to sync translations"
    });
  }
});

export { sync_post as default };
//# sourceMappingURL=sync.post.mjs.map
