import * as admin from "firebase-admin";

admin.initializeApp();

const email = "admin@aitdl.com";

async function setAdmin() {
  const user = await admin.auth().getUserByEmail(email);
  await admin.auth().setCustomUserClaims(user.uid, { admin: true });
  console.log(`Admin claim set for ${email}`);
}

setAdmin();
