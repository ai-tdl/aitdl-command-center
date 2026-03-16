import * as functions from "firebase-functions";
import fetch from "node-fetch";
import { verifyAdminToken } from "./auth";

export const mergeBranch = functions.https.onRequest(async (req, res) => {
  const origin = req.headers.origin || "";
  if (origin === "https://aitdl.com" || origin.startsWith("http://localhost:")) {
    res.set("Access-Control-Allow-Origin", origin);
  }
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") { res.status(204).send(""); return; }

  if (!await verifyAdminToken(req)) { res.status(401).send("Unauthorized"); return; }

  const { from, to } = req.body as { from: string; to: string };

  const response = await fetch(
    `https://api.github.com/repos/${process.env.REPO || "ai-tdl/aitdl-command-center"}/merges`,
    { 
      method: "POST", 
      headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ base: to, head: from, commit_message: `chore: merge ${from} -> ${to} via Command Center` }) 
    }
  );

  const data = await response.json();
  res.status(response.ok ? 200 : 500).json(data);
});
