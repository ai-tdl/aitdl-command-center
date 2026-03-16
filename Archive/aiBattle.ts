import * as functions from "firebase-functions";
import { verifyAdminToken } from "./auth";
import * as admin from "firebase-admin";

/**
 * ============================================
 * AITDL — India's AI Command Center
 * ============================================
 * @author    Jawahar Ramkripal Mallah
 * @role      Software Developer & Service
 *            Provider since 2007
 *            Published Author | Tech Entrepreneur
 * @website   https://aitdl.com
 * @email     hello@aitdl.com
 * @copyright © 2026 All Rights Reserved
 * ============================================
 * aiBattle — Cloud Function
 * Compares two AI tools using Gemini via Firebase AI SDK.
 * Zero-cost policy: Firebase AI SDK routing (Spark plan safe).
 * DO NOT call Gemini from client-side — this function is the only AI entry point.
 * ============================================
 */

const db = admin.firestore();

export const aiBattle = functions.https.onRequest(async (req, res) => {

  // ── Auth guard (same pattern as triggerDeploy) ──────────────────────────
  if (!await verifyAdminToken(req)) {
    res.status(401).send("Unauthorized");
    return;
  }

  const { toolA, toolB, uid } = req.body as {
    toolA: string;
    toolB: string;
    uid?: string;
  };

  // ── Validation ────────────────────────────────────────────────────────────
  if (!toolA || !toolB) {
    res.status(400).json({ error: "toolA and toolB are required" });
    return;
  }
  if (toolA === toolB) {
    res.status(400).json({ error: "Select two different tools" });
    return;
  }

  // ── Fetch tool data from Firestore ────────────────────────────────────────
  const [snapA, snapB] = await Promise.all([
    db.collection("tools").doc(toolA).get(),
    db.collection("tools").doc(toolB).get(),
  ]);

  if (!snapA.exists || !snapB.exists) {
    res.status(404).json({ error: "One or both tools not found" });
    return;
  }

  const dataA = snapA.data()!;
  const dataB = snapB.data()!;

  // ── Prompt ────────────────────────────────────────────────────────────────
  const prompt = `
You are an AI tools analyst for AITDL Singularity — India's AI Command Center.

Compare these two AI tools for Indian users:

Tool A: ${dataA.name}
- Category: ${Array.isArray(dataA.category) ? dataA.category.join(", ") : dataA.category || "N/A"}
- Pricing: ${dataA.pricing || "N/A"}
- Description: ${dataA.description || "N/A"}
- India Score: ${dataA.india_score ?? "N/A"}/5
- Hindi Support: ${dataA.hindi_support ? "Yes" : "No"}

Tool B: ${dataB.name}
- Category: ${Array.isArray(dataB.category) ? dataB.category.join(", ") : dataB.category || "N/A"}
- Pricing: ${dataB.pricing || "N/A"}
- Description: ${dataB.description || "N/A"}
- India Score: ${dataB.india_score ?? "N/A"}/5
- Hindi Support: ${dataB.hindi_support ? "Yes" : "No"}

Structured battle analysis:
1. HEAD-TO-HEAD: 3 key differences
2. INDIA FIT: Which suits Indian users better (pricing, Hindi support, connectivity, use cases)
3. VERDICT: One winner with one-line reason
4. WHO SHOULD USE WHICH: Two clear audience recommendations

Concise, punchy, relevant to Indian professionals and students.
  `.trim();

  // ── Gemini via Firebase AI SDK (Spark plan — no direct HTTP, free) ────────
  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // ── Log to Firestore ──────────────────────────────────────────────────────
  await db.collection("battleLogs").add({
    uid: uid || "anonymous",
    toolA,
    toolB,
    toolAName: dataA.name,
    toolBName: dataB.name,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });

  res.status(200).json({
    ok: true,
    result: text,
    toolA: dataA.name,
    toolB: dataB.name,
  });
});
