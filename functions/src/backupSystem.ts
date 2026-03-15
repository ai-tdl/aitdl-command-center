import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { verifyAdminToken } from "./auth";

/**
 * Scheduled backup function (Weekly)
 * Exports the "deployments", "metrics", and "logs" collections to Storage.
 */
export const scheduledBackup = functions.pubsub
  .schedule("every sunday 03:00")
  .timeZone("Asia/Kolkata")
  .onRun(async (context) => {
    return runBackup("scheduled");
  });

/**
 * Manual backup trigger for admins
 */
export const triggerManualBackup = functions.https.onRequest(async (req, res) => {
  if (!await verifyAdminToken(req)) {
    res.status(401).send("Unauthorized");
    return;
  }

  try {
    const result = await runBackup("manual");
    res.status(200).json({ ok: true, ...result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Core backup logic
 */
async function runBackup(type: string) {
  const db = admin.firestore();
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const collections = ["deployments", "metrics", "logs"];
  
  const backupData: any = {};

  for (const coll of collections) {
    const snap = await db.collection(coll).get();
    backupData[coll] = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  // Save to Storage
  const bucket = admin.storage().bucket();
  const file = bucket.file(`backups/${type}/aitdl-backup-${timestamp}.json`);
  
  await file.save(JSON.stringify(backupData, null, 2), {
    contentType: "application/json",
    metadata: {
      type: type,
      timestamp: admin.firestore.FieldValue.serverTimestamp() as any
    }
  });

  // Log the backup event
  await db.collection("logs").add({
    type: "backup_complete",
    message: `${type.toUpperCase()} backup successful: aitdl-backup-${timestamp}.json`,
    metadata: {
      fileName: file.name,
      collectionsExported: collections,
      size: (await file.getMetadata())[0].size
    },
    severity: "info",
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  });

  return { fileName: file.name, timestamp };
}
