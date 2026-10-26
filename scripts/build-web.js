const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const DIST = path.join(__dirname, "..", "dist");
const OLD_ASSET_DIR = path.join(DIST, "assets", "node_modules");
const NEW_ASSET_DIR = path.join(DIST, "assets", "_vendor");
const OLD_PATH_STRING = "assets/node_modules";
const NEW_PATH_STRING = "assets/_vendor";
execSync("npx expo export -p web", { stdio: "inherit" });
if (fs.existsSync(OLD_ASSET_DIR)) {
  fs.renameSync(OLD_ASSET_DIR, NEW_ASSET_DIR);
  const jsDir = path.join(DIST, "_expo", "static", "js", "web");
  const bundleFiles = fs.existsSync(jsDir)
    ? fs.readdirSync(jsDir).filter((f) => f.endsWith(".js"))
    : [];
  if (bundleFiles.length === 0) {
    throw new Error(
      `Expected at least one JS bundle under ${jsDir}, found none — export layout may have changed.`,
    );
  }
  let totalReplacements = 0;
  for (const file of bundleFiles) {
    const filePath = path.join(jsDir, file);
    const content = fs.readFileSync(filePath, "utf8");
    const occurrences = content.split(OLD_PATH_STRING).length - 1;
    if (occurrences > 0) {
      fs.writeFileSync(
        filePath,
        content.split(OLD_PATH_STRING).join(NEW_PATH_STRING),
      );
      totalReplacements += occurrences;
    }
  }
  if (totalReplacements === 0) {
    throw new Error(
      `Renamed ${OLD_ASSET_DIR} but found zero "${OLD_PATH_STRING}" references in any bundle under ${jsDir} — ` +
        "the rename may have broken asset loading instead of fixing it. Check manually before deploying.",
    );
  }
  console.log(
    `build-web: renamed assets/node_modules -> assets/_vendor, patched ${totalReplacements} reference(s) across ${bundleFiles.length} bundle file(s).`,
  );
} else {
  console.log(
    "build-web: no assets/node_modules folder in this export — nothing to patch (fonts/vendor assets may have changed, or this Vercel default may no longer apply).",
  );
}
