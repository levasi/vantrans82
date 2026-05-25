import { d as defineEventHandler, b as getRouterParam, c as createError, g as getDb } from '../../../../nitro/nitro.mjs';
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

const reconstruct = (flat) => {
  const result = {};
  for (const item of flat) {
    const keys = item.key_path.split(".");
    let current = result;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = item.value;
  }
  return result;
};
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
const _lang__get = defineEventHandler(async (event) => {
  var _a, _b;
  const lang = getRouterParam(event, "lang");
  if (!lang || !["en", "ro"].includes(lang)) {
    throw createError({
      statusCode: 400,
      message: "Invalid language code"
    });
  }
  const db = getDb();
  if (!db) {
    try {
      const filePath = join(process.cwd(), "locales", `${lang}.json`);
      const fileContent = await readFile(filePath, "utf-8");
      const translations = JSON.parse(fileContent);
      return { success: true, translations };
    } catch (error) {
      if (error.code === "ENOENT") {
        throw createError({
          statusCode: 404,
          message: `Translation file for ${lang} not found`
        });
      }
      throw createError({
        statusCode: 500,
        message: error.message || `Failed to read translations from file for ${lang}`
      });
    }
  }
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS translations (
        id SERIAL PRIMARY KEY,
        lang VARCHAR(10) NOT NULL,
        key_path VARCHAR(500) NOT NULL,
        value TEXT NOT NULL,
        UNIQUE(lang, key_path)
      )
    `);
    const dbResult = await db.query(
      "SELECT key_path, value FROM translations WHERE lang = $1",
      [lang]
    );
    if (dbResult.rows.length > 0) {
      return { success: true, translations: reconstruct(dbResult.rows) };
    } else {
      const anyTranslationsResult = await db.query(
        "SELECT COUNT(*) as count FROM translations LIMIT 1"
      );
      const hasAnyTranslations = parseInt(((_a = anyTranslationsResult.rows[0]) == null ? void 0 : _a.count) || "0") > 0;
      const langTranslationsResult = await db.query(
        "SELECT COUNT(*) as count FROM translations WHERE lang = $1",
        [lang]
      );
      const hasLangTranslations = parseInt(((_b = langTranslationsResult.rows[0]) == null ? void 0 : _b.count) || "0") > 0;
      if (!hasLangTranslations) {
        const filePath = join(process.cwd(), "locales", `${lang}.json`);
        try {
          const fileContent = await readFile(filePath, "utf-8");
          const fileTranslations = JSON.parse(fileContent);
          const flattenedFileTranslations = flatten(fileTranslations);
          for (const item of flattenedFileTranslations) {
            await db.query(
              "INSERT INTO translations (lang, key_path, value) VALUES ($1, $2, $3) ON CONFLICT (lang, key_path) DO NOTHING",
              [lang, item.key, item.value]
            );
          }
          console.log(`Synced translations for ${lang} from file to database.`);
          return { success: true, translations: fileTranslations };
        } catch (fileError) {
          if (fileError.code === "ENOENT") {
            throw createError({
              statusCode: 404,
              message: `No translations found for ${lang} in database or file.`
            });
          }
          throw createError({
            statusCode: 500,
            message: fileError.message || `Failed to read or sync translations for ${lang}`
          });
        }
      } else {
        return { success: true, translations: {} };
      }
    }
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: error.message || `An error occurred while fetching translations for ${lang}`
    });
  }
});

export { _lang__get as default };
//# sourceMappingURL=_lang_.get.mjs.map
