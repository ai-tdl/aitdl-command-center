
import * as admin from "firebase-admin";

// Initialize with environment variables if available, or it will use default service account
if (!admin.apps.length) {
  admin.initializeApp();
}

const email = "admin@aitdl.com";
const password = "AdminPassword123!"; // Temporary password for login

async function updateAdmin() {
  try {
    let user;
    try {
      user = await admin.auth().getUserByEmail(email);
      console.log(`User ${email} found, updating password...`);
      await admin.auth().updateUser(user.uid, {
        password: password
      });
    } catch (e) {
      console.log(`User ${email} not found, creating new user...`);
      user = await admin.auth().createUser({
        email: email,
        password: password
      });
    }
    
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`Admin claim and password set for ${email}`);
    console.log(`Password is: ${password}`);
  } catch (err) {
    console.error("Error setting admin password:", err);
  }
}

updateAdmin();
