import { d as defineEventHandler, g as getDb } from '../../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import 'pg';

const system_get = defineEventHandler(async (event) => {
  try {
    const db = getDb();
    const dbConnected = db !== null;
    let dbTestResult = false;
    if (db) {
      try {
        await db.query("SELECT 1");
        dbTestResult = true;
      } catch {
        dbTestResult = false;
      }
    }
    const nodeVersion = process.version;
    const environment = "production";
    const uptime = "Running";
    return {
      dbConnected: dbTestResult,
      environment,
      nodeVersion,
      uptime
    };
  } catch (error) {
    return {
      dbConnected: false,
      environment: "production",
      nodeVersion: process.version,
      uptime: "Unknown"
    };
  }
});

export { system_get as default };
//# sourceMappingURL=system.get.mjs.map
