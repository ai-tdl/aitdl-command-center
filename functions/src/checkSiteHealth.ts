import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import fetch from "node-fetch";

const TARGET_URL = "https://aitdl.com";
const ALERT_THRESHOLD_MS = 2000;

export const checkSiteHealth = functions.pubsub
  .schedule("every 1 minutes")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    const startTime = Date.now();
    let status = "online"; let responseTime = -1;

    try {
      const response = await fetch(TARGET_URL, { method: "GET" });
      responseTime = Date.now() - startTime;
      if (!response.ok) status = "degraded";
      if (responseTime > ALERT_THRESHOLD_MS) status = "slow";
    } catch (err) {
      responseTime = Date.now() - startTime;
      status = "offline";
    }

    const db = admin.firestore();
    await db.doc("metrics/latest").set({ status, responseTime,
      timestamp: admin.firestore.FieldValue.serverTimestamp() });
    await db.collection("metrics/history/entries").add({ status, responseTime,
      timestamp: admin.firestore.FieldValue.serverTimestamp() });
  });
