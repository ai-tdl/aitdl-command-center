"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiBattle = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
/**
 * ============================================
 * AITDL — India's AI Command Center
 * ============================================
 * @author    Jawahar Ramkripal Mallah
 * @copyright © 2026 All Rights Reserved
 * ============================================
 * aiBattle — Cloud Function (Secured)
 * - Firebase Auth token required (any logged-in user)
 * - Rate limit: 10 battles per user per hour (Firestore-based)
 * - Zero-cost policy: Gemini via Firebase AI SDK (Spark plan safe)
 * - DO NOT call Gemini from client-side: this is the only AI entry point
 * ============================================
 */
const db = admin.firestore();
const RATE_LIMIT = 10; // max battles per user
const WINDOW_MS = 60 * 60 * 1000; // 1 hour window
exports.aiBattle = functions.https.onRequest(async (req, res) => {
    var _a, _b;
    // ── CORS ─────────────────────────────────────────────────────────────────
    const origin = req.headers.origin || "";
    if (origin === "http://localhost:3000" || origin === "https://aitdl.com") {
        res.set("Access-Control-Allow-Origin", origin);
    }
    else {
        res.set("Access-Control-Allow-Origin", "https://aitdl.com");
    }
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
    if (req.method === "OPTIONS") {
        res.status(204).send("");
        return;
    }
    if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
    }
    // ── Firebase Auth token verification (any signed-in user) ─────────────────
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (!token) {
        res.status(401).json({ error: "Unauthorized — sign in required" });
        return;
    }
    let uid;
    try {
        const decoded = await admin.auth().verifyIdToken(token);
        uid = decoded.uid;
    }
    catch (_c) {
        res.status(401).json({ error: "Invalid auth token" });
        return;
    }
    // ── Rate limiting (10 req / user / hour via Firestore) ────────────────────
    const rateRef = db.collection("battleRateLimit").doc(uid);
    const now = Date.now();
    const rateSnap = await rateRef.get();
    if (rateSnap.exists) {
        const { count, windowStart } = rateSnap.data();
        if (now - windowStart < WINDOW_MS && count >= RATE_LIMIT) {
            const resetIn = Math.ceil((WINDOW_MS - (now - windowStart)) / 60000);
            res.status(429).json({
                error: `Rate limit reached (${RATE_LIMIT}/hr). Resets in ${resetIn} min.`,
            });
            return;
        }
        // Reset window if expired, else increment
        const updCount = now - windowStart >= WINDOW_MS ? 1 : count + 1;
        const updStart = now - windowStart >= WINDOW_MS ? now : windowStart;
        await rateRef.set({ count: updCount, windowStart: updStart });
    }
    else {
        await rateRef.set({ count: 1, windowStart: now });
    }
    // ── Input validation ──────────────────────────────────────────────────────
    const { toolA, toolB } = req.body;
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
    const dataA = snapA.data();
    const dataB = snapB.data();
    // ── Gemini prompt ─────────────────────────────────────────────────────────
    const prompt = `
You are an AI tools analyst for AITDL Singularity — India's AI Command Center.

Compare these two AI tools for Indian users:

Tool A: ${dataA.name}
- Category: ${Array.isArray(dataA.category) ? dataA.category.join(", ") : dataA.category || "N/A"}
- Pricing: ${dataA.pricing || "N/A"}
- Description: ${dataA.description || "N/A"}
- India Score: ${(_a = dataA.india_score) !== null && _a !== void 0 ? _a : "N/A"}/5
- Hindi Support: ${dataA.hindi_support ? "Yes" : "No"}

Tool B: ${dataB.name}
- Category: ${Array.isArray(dataB.category) ? dataB.category.join(", ") : dataB.category || "N/A"}
- Pricing: ${dataB.pricing || "N/A"}
- Description: ${dataB.description || "N/A"}
- India Score: ${(_b = dataB.india_score) !== null && _b !== void 0 ? _b : "N/A"}/5
- Hindi Support: ${dataB.hindi_support ? "Yes" : "No"}

Battle analysis:
1. HEAD-TO-HEAD: 3 key differences
2. INDIA FIT: Which suits Indian users better
3. VERDICT: One winner with one-line reason
4. WHO SHOULD USE WHICH: Two audience recommendations

Keep it concise, punchy, relevant to Indian professionals and students.
  `.trim();
    // ── Call Gemini (Firebase AI SDK, Spark plan safe) ────────────────────────
    try {
        const { GoogleGenerativeAI } = await Promise.resolve().then(() => require("@google/generative-ai"));
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        // ── Log to Firestore (no tool data, just IDs + user) ──────────────────
        await db.collection("battleLogs").add({
            uid,
            toolA,
            toolB,
            toolAName: dataA.name,
            toolBName: dataB.name,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
        res.status(200).json({ ok: true, result: text, toolA: dataA.name, toolB: dataB.name });
    }
    catch (err) {
        functions.logger.error("aiBattle Gemini error", err);
        res.status(500).json({ error: "AI analysis failed. Try again." });
    }
});
//# sourceMappingURL=aiBattle.js.map