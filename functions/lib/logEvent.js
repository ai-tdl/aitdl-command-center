"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logEvent = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
exports.logEvent = functions.https.onRequest(async (req, res) => {
    // We allow logging without an admin token for system reports,
    // but we restrict WHO can call it via a simple shared secret in production
    // or just rely on Firebase security rules for READ access.
    // For this implementation, we'll keep it simple: any valid POST logs.
    if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
    }
    const { type, message, metadata, severity = "info" } = req.body;
    try {
        await admin.firestore().collection("logs").add({
            type,
            message,
            metadata: metadata || {},
            severity,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(200).json({ ok: true });
    }
    catch (error) {
        console.error("Failed to log event:", error);
        res.status(500).send("Internal Server Error");
    }
});
//# sourceMappingURL=logEvent.js.map