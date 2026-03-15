"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployLog = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.deployLog = functions.https.onRequest(async (req, res) => {
    var _a;
    if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
    }
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1];
    if (token !== process.env.FIREBASE_ADMIN_TOKEN) {
        res.status(401).send("Unauthorized");
        return;
    }
    const { branch, status, commit } = req.body;
    await admin.firestore().collection("deployments").add({
        branch, status, commit,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(200).json({ ok: true });
});
//# sourceMappingURL=deployLog.js.map