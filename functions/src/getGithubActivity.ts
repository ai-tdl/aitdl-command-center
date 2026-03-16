import * as functions from "firebase-functions";
import fetch from "node-fetch";
import { verifyAdminToken } from "./auth";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const REPO = process.env.REPO || "ai-tdl/aitdl-command-center";

export const getGithubActivity = functions.https.onRequest(async (req, res) => {
  const origin = req.headers.origin || "";
  if (origin === "https://aitdl.com" || origin.startsWith("http://localhost:")) {
    res.set("Access-Control-Allow-Origin", origin);
  }
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") { res.status(204).send(""); return; }

  if (!await verifyAdminToken(req)) {
    res.status(401).send("Unauthorized");
    return;
  }

  try {
    // Fetch recent commits
    const commitsRes = await fetch(
      `https://api.github.com/repos/${REPO}/commits?per_page=10`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    const commits = await commitsRes.json();

    // Fetch recent workflow runs
    const runsRes = await fetch(
      `https://api.github.com/repos/${REPO}/actions/runs?per_page=10`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    const runs = await runsRes.json();

    res.status(200).json({
      commits: Array.isArray(commits) ? commits.map((c: any) => ({
        sha: c.sha,
        message: c.commit.message,
        author: c.commit.author.name,
        date: c.commit.author.date,
      })) : [],
      runs: runs.workflow_runs ? runs.workflow_runs.map((r: any) => ({
        id: r.id,
        name: r.name,
        status: r.status,
        conclusion: r.conclusion,
        branch: r.head_branch,
        date: r.created_at,
      })) : [],
    });
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
    res.status(500).send("Internal Server Error");
  }
});
