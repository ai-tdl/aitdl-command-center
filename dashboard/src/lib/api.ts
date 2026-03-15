import { auth } from "./firebase";

const FUNCTIONS_BASE = import.meta.env.VITE_FUNCTIONS_BASE;

async function getAdminToken() {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
}

export async function callFunction(name: string, body?: any) {
  const token = await getAdminToken();
  if (!token) throw new Error("Unauthorized: No admin token found");

  const response = await fetch(`${FUNCTIONS_BASE}/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `API Error: ${response.status}`);
  }

  return await response.json();
}

export async function getGithubActivity() {
  return await callFunction("getGithubActivity");
}

export async function triggerDeploy(branch: string) {
  return await callFunction("triggerDeploy", { branch });
}

export async function mergeBranch(from: string, to: string) {
  return await callFunction("mergeBranch", { from, to });
}

export async function rollbackDeploy() {
  return await callFunction("rollbackDeploy");
}

export async function triggerManualBackup() {
  return await callFunction("triggerManualBackup");
}
