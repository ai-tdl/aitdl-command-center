"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGithubActivity = void 0;
const functions = require("firebase-functions");
const node_fetch_1 = require("node-fetch");
const auth_1 = require("./auth");
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = process.env.REPO || "ai-tdl/aitdl-command-center";
exports.getGithubActivity = functions.https.onRequest(async (req, res) => {
    if (!await (0, auth_1.verifyAdminToken)(req)) {
        res.status(401).send("Unauthorized");
        return;
    }
    try {
        // Fetch recent commits
        const commitsRes = await (0, node_fetch_1.default)(`https://api.github.com/repos/${REPO}/commits?per_page=10`, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
            },
        });
        const commits = await commitsRes.json();
        // Fetch recent workflow runs
        const runsRes = await (0, node_fetch_1.default)(`https://api.github.com/repos/${REPO}/actions/runs?per_page=10`, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
            },
        });
        const runs = await runsRes.json();
        res.status(200).json({
            commits: Array.isArray(commits) ? commits.map((c) => ({
                sha: c.sha,
                message: c.commit.message,
                author: c.commit.author.name,
                date: c.commit.author.date,
            })) : [],
            runs: runs.workflow_runs ? runs.workflow_runs.map((r) => ({
                id: r.id,
                name: r.name,
                status: r.status,
                conclusion: r.conclusion,
                branch: r.head_branch,
                date: r.created_at,
            })) : [],
        });
    }
    catch (error) {
        console.error("Error fetching GitHub activity:", error);
        res.status(500).send("Internal Server Error");
    }
});
//# sourceMappingURL=getGithubActivity.js.map