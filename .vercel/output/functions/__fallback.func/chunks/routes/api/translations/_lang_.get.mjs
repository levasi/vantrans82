import { d as defineEventHandler, b as getRouterParam, c as createError, g as getDb } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import 'pg';

const _lang__get = defineEventHandler(async (event) => {
  var _a;
  const lang = getRouterParam(event, "lang");
  if (!lang || !["en", "ro"].includes(lang)) {
    throw createError({
      statusCode: 400,
      message: "Invalid language code"
    });
  }
  try {
    const db = getDb();
    if (!db) {
      const { readFile } = await import('fs/promises');
      const { join } = await import('path');
      const filePath = join(process.cwd(), "locales", `${lang}.json`);
      try {
        const fileContent = await readFile(filePath, "utf-8");
        return JSON.parse(fileContent);
      } catch {
        return {};
      }
    }
    await db.query(`
      CREATE TABLE IF NOT EXISTS translations (
        id SERIAL PRIMARY KEY,
        lang VARCHAR(10) NOT NULL,
        key_path VARCHAR(500) NOT NULL,
        value TEXT NOT NULL,
        UNIQUE(lang, key_path)
      )
    `);
    const result = await db.query(
      "SELECT key_path, value FROM translations WHERE lang = $1",
      [lang]
    );
    if (result.rows.length === 0) {
      const anyTranslationsResult = await db.query(
        "SELECT COUNT(*) as count FROM translations LIMIT 1"
      );
      const hasAnyTranslations = parseInt(((_a = anyTranslationsResult.rows[0]) == null ? void 0 : _a.count) || "0") > 0;
      if (!hasAnyTranslations) {
        const { readFile } = await import('fs/promises');
        const { join } = await import('path');
        const filePath = join(process.cwd(), "locales", `${lang}.json`);
        try {
          const fileContent = await readFile(filePath, "utf-8");
          const translations2 = JSON.parse(fileContent);
          const flatten = (obj, prefix = "") => {
            const result2 = [];
            for (const key in obj) {
              const newKey = prefix ? `${prefix}.${key}` : key;
              if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
                result2.push(...flatten(obj[key], newKey));
              } else {
                result2.push({ key: newKey, value: String(obj[key] || "") });
              }
            }
            return result2;
          };
          const flattened = flatten(translations2);
          for (const item of flattened) {
            await db.query(
              "INSERT INTO translations (lang, key_path, value) VALUES ($1, $2, $3) ON CONFLICT (lang, key_path) DO NOTHING",
              [lang, item.key, item.value]
            );
          }
          return translations2;
        } catch (fileError) {
          if (fileError.code === "ENOENT") {
            return {};
          }
          throw fileError;
        }
      }
      return {};
    }
    const translations = {};
    for (const row of result.rows) {
      const keys = row.key_path.split(".");
      let current = translations;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = row.value;
    }
    return translations;
  } catch (error) {
    console.error("Error loading translations:", error);
    try {
      const { readFile } = await import('fs/promises');
      const { join } = await import('path');
      const filePath = join(process.cwd(), "locales", `${lang}.json`);
      const fileContent = await readFile(filePath, "utf-8");
      return JSON.parse(fileContent);
    } catch {
      return {};
    }
  }
});

export { _lang__get as default };
//# sourceMappingURL=_lang_.get.mjs.map
