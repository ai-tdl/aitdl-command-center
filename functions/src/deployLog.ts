import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const deployLog = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") { res.status(405).send("Method Not Allowed"); return; }

  const token = req.headers.authorization?.split("Bearer ")[1];
  if (token !== process.env.FIREBASE_ADMIN_TOKEN) {
    res.status(401).send("Unauthorized"); return;
  }

  const { branch, status, commit } = req.body;
  await admin.firestore().collection("deployments").add({
    branch, status, commit,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });

  res.status(200).json({ ok: true });
});
