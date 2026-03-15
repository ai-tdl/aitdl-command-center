"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSiteHealth = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const node_fetch_1 = require("node-fetch");
const TARGET_URL = "https://aitdl.com";
const ALERT_THRESHOLD_MS = 2000;
exports.checkSiteHealth = functions.pubsub
    .schedule("every 1 minutes")
    .timeZone("Asia/Kolkata")
    .onRun(async () => {
    const startTime = Date.now();
    let status = "online";
    let responseTime = -1;
    try {
        const response = await (0, node_fetch_1.default)(TARGET_URL, { method: "GET" });
        responseTime = Date.now() - startTime;
        if (!response.ok)
            status = "degraded";
        if (responseTime > ALERT_THRESHOLD_MS)
            status = "slow";
    }
    catch (err) {
        responseTime = Date.now() - startTime;
        status = "offline";
    }
    const db = admin.firestore();
    await db.doc("metrics/latest").set({ status, responseTime,
        timestamp: admin.firestore.FieldValue.serverTimestamp() });
    await db.collection("metrics/history/entries").add({ status, responseTime,
        timestamp: admin.firestore.FieldValue.serverTimestamp() });
});
//# sourceMappingURL=checkSiteHealth.js.map