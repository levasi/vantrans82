import { d as defineEventHandler, b as getRouterParam, c as createError, r as readBody, g as getDb } from '../../../../nitro/nitro.mjs';
import { writeFile } from 'fs/promises';
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

const _lang__put = defineEventHandler(async (event) => {
  const lang = getRouterParam(event, "lang");
  if (!lang || !["en", "ro"].includes(lang)) {
    throw createError({
      statusCode: 400,
      message: "Invalid language code"
    });
  }
  try {
    const body = await readBody(event);
    const { translations } = body;
    if (!translations || typeof translations !== "object") {
      throw createError({
        statusCode: 400,
        message: "Invalid translations data"
      });
    }
    const db = getDb();
    if (db) {
      await db.query(`
        CREATE TABLE IF NOT EXISTS translations (
          id SERIAL PRIMARY KEY,
          lang VARCHAR(10) NOT NULL,
          key_path VARCHAR(500) NOT NULL,
          value TEXT NOT NULL,
          UNIQUE(lang, key_path)
        )
      `);
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
      const flattened = flatten(translations);
      await db.query("DELETE FROM translations WHERE lang = $1", [lang]);
      for (const item of flattened) {
        await db.query(
          "INSERT INTO translations (lang, key_path, value) VALUES ($1, $2, $3)",
          [lang, item.key, item.value]
        );
      }
    }
    const filePath = join(process.cwd(), "locales", `${lang}.json`);
    const formattedJson = JSON.stringify(translations, null, 2);
    await writeFile(filePath, formattedJson, "utf-8");
    return {
      success: true,
      message: "Translations saved successfully"
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: error.message || "Failed to save translations"
    });
  }
});

export { _lang__put as default };
//# sourceMappingURL=_lang_.put.mjs.map
