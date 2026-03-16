const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "aitdl-83536321-fd75b"
  });
}

const email = "aitdl.connect@gmail.com";
const password = "AdminPassword123!";

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
    process.exit(0);
  } catch (err) {
    console.error("Error setting admin password:", err);
    process.exit(1);
  }
}

updateAdmin();
