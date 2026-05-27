const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const sourceFiles = ["index.html", "recognition.css", "recognition.js"];
const referencePattern = /(?:src|href|poster)\s*=\s*["']([^"']+)["']|url\(\s*["']?([^"')]+)["']?\s*\)/gi;
const errors = [];

for (const sourceFile of sourceFiles) {
  const contents = fs.readFileSync(path.join(projectRoot, sourceFile), "utf8");
  for (const match of contents.matchAll(referencePattern)) {
    const reference = match[1] || match[2];
    if (/^(?:https?:)?\/\//i.test(reference) || /^data:/i.test(reference)) {
      continue;
    }

    if (/\.(?:jpe?g|png)(?:[?#]|$)/i.test(reference)) {
      errors.push(`${sourceFile}: local legacy image reference remains: ${reference}`);
      continue;
    }

    if (!/\.webp(?:[?#]|$)/i.test(reference)) {
      continue;
    }

    const assetPath = reference.split(/[?#]/, 1)[0].replace(/^\.\/+/, "");
    if (!fs.existsSync(path.resolve(projectRoot, assetPath))) {
      errors.push(`${sourceFile}: missing local WebP asset: ${reference}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Local image references resolve to generated WebP assets.");
}
