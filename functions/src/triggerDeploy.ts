import * as functions from "firebase-functions";
import fetch from "node-fetch";
import { verifyAdminToken } from "./auth";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const REPO = process.env.REPO || "ai-tdl/aitdl-command-center";

const workflowMap: Record<string, string> = {
  dev: "dev-preview.yml",
  beta: "beta-preview.yml",
  production: "production.yml",
};

export const triggerDeploy = functions.https.onRequest(async (req, res) => {
  if (!verifyAdminToken(req)) { res.status(401).send("Unauthorized"); return; }

  const { branch } = req.body as { branch: string };
  const workflow = workflowMap[branch];
  if (!workflow) { res.status(400).send("Unknown branch"); return; }

  const response = await fetch(
    `https://api.github.com/repos/${REPO}/actions/workflows/${workflow}/dispatches`,
    { 
      method: "POST", 
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, "Content-Type": "application/json" }, 
      body: JSON.stringify({ ref: branch }) 
    }
  );

  if (!response.ok) { res.status(500).json({ error: "GitHub API dispatch failed" }); return; }
  res.status(200).json({ ok: true, branch, workflow });
});
