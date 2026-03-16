"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerDeploy = void 0;
const functions = require("firebase-functions");
const node_fetch_1 = require("node-fetch");
const auth_1 = require("./auth");
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = process.env.REPO || "ai-tdl/aitdl-command-center";
const workflowMap = {
    dev: "dev-preview.yml",
    beta: "beta-preview.yml",
    production: "production.yml",
};
exports.triggerDeploy = functions.https.onRequest(async (req, res) => {
    const origin = req.headers.origin || "";
    if (origin === "https://aitdl.com" || origin.startsWith("http://localhost:")) {
        res.set("Access-Control-Allow-Origin", origin);
    }
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        res.status(204).send("");
        return;
    }
    if (!await (0, auth_1.verifyAdminToken)(req)) {
        res.status(401).send("Unauthorized");
        return;
    }
    const { branch } = req.body;
    const workflow = workflowMap[branch];
    if (!workflow) {
        res.status(400).send("Unknown branch");
        return;
    }
    const response = await (0, node_fetch_1.default)(`https://api.github.com/repos/${REPO}/actions/workflows/${workflow}/dispatches`, {
        method: "POST",
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({ ref: branch })
    });
    if (!response.ok) {
        res.status(500).json({ error: "GitHub API dispatch failed" });
        return;
    }
    res.status(200).json({ ok: true, branch, workflow });
});
//# sourceMappingURL=triggerDeploy.js.map