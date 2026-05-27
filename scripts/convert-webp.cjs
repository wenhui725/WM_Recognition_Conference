const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

const projectRoot = path.resolve(__dirname, "..");
const excludedDirectories = new Set([".git", "node_modules", "dist", "build"]);
const supportedExtensions = new Set([".jpg", ".jpeg", ".png"]);
const sourceFiles = ["index.html", "recognition.css", "recognition.js"];
const localImageReference = /((?:\.\/\/|\.\/)img\/[^"']+?)\.(?:jpe?g|png)(?=(?:[?#][^"']*)?["'])/gi;

async function findImages(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const images = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (!excludedDirectories.has(entry.name)) {
        images.push(...await findImages(absolutePath));
      }
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (supportedExtensions.has(extension) && !/favicon/i.test(entry.name)) {
      images.push(absolutePath);
    }
  }

  return images;
}

function relativePath(filePath) {
  return path.relative(projectRoot, filePath).split(path.sep).join("/");
}

async function convertImage(sourcePath) {
  const outputPath = sourcePath.replace(/\.(?:jpe?g|png)$/i, ".webp");
  await sharp(sourcePath).webp({ quality: 82 }).toFile(outputPath);
  console.log(`${relativePath(sourcePath)} -> ${relativePath(outputPath)}`);
}

async function updateLocalReferences() {
  const modifiedFiles = [];

  for (const sourceFile of sourceFiles) {
    const filePath = path.join(projectRoot, sourceFile);
    const contents = await fs.readFile(filePath, "utf8");
    const updatedContents = contents.replace(localImageReference, "$1.webp");

    if (updatedContents !== contents) {
      await fs.writeFile(filePath, updatedContents, "utf8");
      modifiedFiles.push(sourceFile);
    }
  }

  return modifiedFiles;
}

async function main() {
  const images = (await findImages(projectRoot)).sort((left, right) =>
    left.localeCompare(right, "zh-Hant")
  );

  await Promise.all(images.map(convertImage));
  console.log(`Converted ${images.length} local image(s) to WebP.`);

  const modifiedFiles = await updateLocalReferences();
  for (const modifiedFile of modifiedFiles) {
    console.log(`Updated local image references in ${modifiedFile}.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
