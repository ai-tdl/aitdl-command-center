"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeBranch = void 0;
const functions = require("firebase-functions");
const node_fetch_1 = require("node-fetch");
const auth_1 = require("./auth");
exports.mergeBranch = functions.https.onRequest(async (req, res) => {
    if (!await (0, auth_1.verifyAdminToken)(req)) {
        res.status(401).send("Unauthorized");
        return;
    }
    const { from, to } = req.body;
    const response = await (0, node_fetch_1.default)(`https://api.github.com/repos/${process.env.REPO || "ai-tdl/aitdl-command-center"}/merges`, {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({ base: to, head: from, commit_message: `chore: merge ${from} -> ${to} via Command Center` })
    });
    const data = await response.json();
    res.status(response.ok ? 200 : 500).json(data);
});
//# sourceMappingURL=mergeBranch.js.map