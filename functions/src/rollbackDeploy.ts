import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import fetch from "node-fetch";
import { verifyAdminToken } from "./auth";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const REPO = process.env.REPO || "ai-tdl/aitdl-command-center";

export const rollbackDeploy = functions.https.onRequest(async (req, res) => {
  const origin = req.headers.origin || "";
  if (origin === "https://aitdl.com" || origin.startsWith("http://localhost:")) {
    res.set("Access-Control-Allow-Origin", origin);
  }
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") { res.status(204).send(""); return; }

  if (!await verifyAdminToken(req)) {
    res.status(401).send("Unauthorized");
    return;
  }

  try {
    // 1. Get the last two successful main deployments
    const snap = await admin.firestore().collection("deployments")
      .where("branch", "==", "main")
      .where("status", "==", "success")
      .orderBy("timestamp", "desc")
      .limit(2)
      .get();

    if (snap.size < 2) {
      res.status(400).send("No previous successful deploy to rollback to.");
      return;
    }

    // 2. Identify the target SHA (the second latest successful one)
    const targetCommit = snap.docs[1].data().commit;

    // 3. Force-patch the main branch ref via GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${REPO}/git/refs/heads/main`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          sha: targetCommit,
          force: true
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("GitHub Rollback failed:", errorData);
      res.status(500).json({ error: "GitHub API rollback failed", details: errorData });
      return;
    }

    // 4. Log the rollback event
    await admin.firestore().collection("logs").add({
      type: "rollback",
      branch: "main",
      fromSha: snap.docs[0].data().commit,
      toSha: targetCommit,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      initiatedBy: "dashboard-admin"
    });

    res.status(200).json({ ok: true, rolledBackTo: targetCommit });
  } catch (error) {
    console.error("Rollback error:", error);
    res.status(500).send("Internal Server Error");
  }
});
