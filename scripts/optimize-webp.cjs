const fs = require("node:fs/promises");
const fsConstants = require("node:fs").constants;
const path = require("node:path");
const sharp = require("sharp");

const projectRoot = path.resolve(__dirname, "..");
const imageRoot = path.join(projectRoot, "img");
const backupRoot = path.join(projectRoot, "img_original_webp_backup");
const indexFile = path.join(projectRoot, "index.html");
const sizeThreshold = 500 * 1024;
const quality = 80;
const primaryImages = new Set([
  "img/11周年大會_主視覺_確認版-01.webp",
  "img/激密之星/激密之星1920x1080_工作區域 1.webp",
]);
const excludedImages = new Set([
  "img/威力馬logo.webp",
  "img/螢幕擷取畫面 2026-05-26 180904.webp",
  "img/螢幕擷取畫面 2026-05-26 181115.webp",
]);

function relativePath(filePath) {
  return path.relative(projectRoot, filePath).split(path.sep).join("/");
}

function kib(bytes) {
  return `${(bytes / 1024).toFixed(1)} KiB`;
}

function mib(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MiB`;
}

function reduction(beforeBytes, afterBytes) {
  return `${((1 - afterBytes / beforeBytes) * 100).toFixed(1)}%`;
}

async function findWebpFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const images = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      images.push(...await findWebpFiles(absolutePath));
    } else if (/\.webp$/i.test(entry.name)) {
      images.push(absolutePath);
    }
  }

  return images.sort((left, right) => relativePath(left).localeCompare(relativePath(right), "zh-Hant"));
}

async function referencedWebpImages() {
  const html = await fs.readFile(indexFile, "utf8");
  const references = html.match(/(?:\.\/\/|\.\/)img\/[^"']+\.webp/gi) || [];
  return new Set(references.map((reference) => reference.replace(/^\.\/+/, "")));
}

function shouldOptimize(imagePath, referencedImages) {
  const relative = relativePath(imagePath);

  if (excludedImages.has(relative)) {
    return false;
  }

  return relative.startsWith("img/活動紀錄/") || referencedImages.has(relative);
}

async function getFileInfo(filePath) {
  const [stats, metadata] = await Promise.all([fs.stat(filePath), sharp(filePath).metadata()]);
  return {
    path: filePath,
    relativePath: relativePath(filePath),
    bytes: stats.size,
    width: metadata.width,
    height: metadata.height,
  };
}

function reportOverThreshold(title, images) {
  const overThreshold = images
    .filter((image) => image.bytes > sizeThreshold)
    .sort((left, right) => right.bytes - left.bytes);

  console.log(`\n${title} (${overThreshold.length})`);
  if (!overThreshold.length) {
    console.log("None.");
    return;
  }

  for (const image of overThreshold) {
    console.log(`${image.relativePath} | ${kib(image.bytes)} | ${image.width}x${image.height}`);
  }
}

async function createBackup(sourcePath) {
  const relative = path.relative(imageRoot, sourcePath);
  const backupPath = path.join(backupRoot, relative);
  await fs.mkdir(path.dirname(backupPath), { recursive: true });

  try {
    await fs.copyFile(sourcePath, backupPath, fsConstants.COPYFILE_EXCL);
    return "created";
  } catch (error) {
    if (error.code === "EEXIST") {
      return "preserved";
    }
    throw error;
  }
}

async function optimizeImage(image, backupStatus) {
  const maximumWidth = primaryImages.has(image.relativePath) ? 1600 : 1200;
  const temporaryPath = `${image.path}.optimize-tmp`;

  try {
    const sourceBuffer = await fs.readFile(image.path);
    await sharp(sourceBuffer)
      .resize({ width: maximumWidth, withoutEnlargement: true })
      .webp({ quality })
      .toFile(temporaryPath);
    await fs.copyFile(temporaryPath, image.path);
    await fs.rm(temporaryPath);
  } catch (error) {
    await fs.rm(temporaryPath, { force: true });
    throw error;
  }

  const optimized = await getFileInfo(image.path);
  return {
    before: image,
    after: optimized,
    maximumWidth,
    backupStatus,
  };
}

async function main() {
  const allFiles = await findWebpFiles(imageRoot);
  const referencedImages = await referencedWebpImages();
  const beforeImages = await Promise.all(allFiles.map(getFileInfo));
  const selectedImages = beforeImages.filter((image) => shouldOptimize(image.path, referencedImages));
  const beforeTotal = beforeImages.reduce((sum, image) => sum + image.bytes, 0);

  console.log(`Scanned ${beforeImages.length} WebP image(s) in img/.`);
  console.log(`Current total size: ${mib(beforeTotal)}.`);
  reportOverThreshold(`Before optimization: images above ${kib(sizeThreshold)}`, beforeImages);
  console.log(`\nOptimizing ${selectedImages.length} image(s) at WebP quality ${quality}.`);

  const backupStatuses = new Map();
  for (const image of selectedImages) {
    backupStatuses.set(image.relativePath, await createBackup(image.path));
  }
  const createdBackups = [...backupStatuses.values()].filter((status) => status === "created").length;
  console.log(
    `Prepared backups in img_original_webp_backup/: ${createdBackups} created, ` +
      `${selectedImages.length - createdBackups} already preserved.`
  );

  const optimizedImages = [];
  for (const image of selectedImages) {
    optimizedImages.push(await optimizeImage(image, backupStatuses.get(image.relativePath)));
  }

  console.log("\nOptimized image results");
  for (const result of optimizedImages) {
    const backupLabel = result.backupStatus === "created" ? "backup created" : "backup preserved";
    console.log(
      `${result.before.relativePath} | ${kib(result.before.bytes)} -> ${kib(result.after.bytes)} | ` +
        `-${reduction(result.before.bytes, result.after.bytes)} | ${result.after.width}x${result.after.height} | ${backupLabel}`
    );
  }

  const afterImages = await Promise.all(allFiles.map(getFileInfo));
  const afterTotal = afterImages.reduce((sum, image) => sum + image.bytes, 0);
  console.log(
    `\nTotal WebP size: ${mib(beforeTotal)} -> ${mib(afterTotal)} ` +
      `(-${reduction(beforeTotal, afterTotal)}).`
  );
  reportOverThreshold(`After optimization: images above ${kib(sizeThreshold)}`, afterImages);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
