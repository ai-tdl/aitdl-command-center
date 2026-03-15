"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminToken = verifyAdminToken;
const admin = require("firebase-admin");
async function verifyAdminToken(req) {
    try {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
        if (!token)
            return false;
        const decoded = await admin.auth().verifyIdToken(token);
        if (!decoded.admin)
            return false;
        return true;
    }
    catch (_a) {
        return false;
    }
}
//# sourceMappingURL=auth.js.map