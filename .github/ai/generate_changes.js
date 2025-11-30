// .github/ai/generate_changes.js - tuned for Unified Log Analytics Platform
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const perplexityKey = process.env.PERPLEXITY_API_KEY;
const task = process.argv.slice(2).join(" ");

if (!perplexityKey) {
  console.error("Missing PERPLEXITY_API_KEY");
  process.exit(1);
}

if (!task) {
  console.error("Missing task argument");
  process.exit(1);
}

function collectContext() {
  const roots = [
    "src/main/java",
    "src/main/resources",
    "docker-compose.yml",
    "pom.xml"
  ];

  const chunks = [];

  const pushFile = (file) => {
    if (!fs.existsSync(file)) return;
    const stat = fs.statSync(file);
    if (stat.isDirectory()) {
      const entries = fs.readdirSync(file);
      for (const e of entries) {
        const full = path.join(file, e);
        const s = fs.statSync(full);
        if (s.isDirectory()) pushFile(full);
        else if (full.endsWith(".java") || full.endsWith(".yml") || full.endsWith(".yaml")) {
          const content = fs.readFileSync(full, "utf8");
          chunks.push(`FILE: ${full}\n${content}\n\n`);
          if (chunks.join("").length > 25000) return;
        }
      }
    } else {
      const content = fs.readFileSync(file, "utf8");
      chunks.push(`FILE: ${file}\n${content}\n\n`);
    }
  };

  roots.forEach(pushFile);

  return chunks.join("");
}

async function callPerplexityForCode(context) {
  const prompt =
    `You are working in a Java Spring Boot project called "Unified Log Analytics & Monitoring Platform". ` +
    `It uses Spring Boot (REST, Security, MongoDB, Redis), Elasticsearch, Kibana, MongoDB, Redis, and Docker.\n\n` +
    `Current project files (truncated):\n${context}\n\n` +
    `TASK: ${task}\n\n` +
    `Generate a JSON array of file changes. Each item MUST be:\n` +
    `{"path": "relative/path/File.java", "content": "FULL FILE CONTENT"}\n\n` +
    `Rules:\n` +
    `- Use correct package names based on existing structure (e.g. com.logplatform.controller, service, config, etc.).\n` +
    `- For new code, include full compilable files (imports, package, class, etc.).\n` +
    `- You MAY update existing files (e.g. docker-compose.yml, application.properties) by outputting the full updated content.\n` +
    `- Prefer adding:\n` +
    `  * New controllers/services for the task\n` +
    `  * Elasticsearch index mappings and queries\n` +
    `  * Redis caching logic where appropriate\n` +
    `  * MongoDB entities/repositories if the task implies persistence\n` +
    `  * Docker / config updates needed for new components\n` +
    `- Respond with ONLY a valid JSON array (no markdown, no comments, no explanations).`;

  const body = {
    model: "sonar-reasoning-pro",
    messages: [
      { role: "system", content: "You are a precise code generation agent that outputs only valid JSON." },
      { role: "user", content: prompt }
    ],
    max_tokens: 2400
  };

  const res = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${perplexityKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify
