import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export async function verifyAdminToken(
  req: functions.https.Request
): Promise<boolean> {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (!token) return false;
    const decoded = await admin.auth().verifyIdToken(token);
    if (!decoded.admin) return false;
    return true;
  } catch { return false; }
}
