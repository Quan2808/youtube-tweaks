const { execSync } = require("child_process");
const { version } = require("./package.json");

const releaseType = process.argv[2] || "patch";

try {
  console.log(`Creating ${releaseType} release...`);

  // Update version
  execSync(`npm version ${releaseType} --no-git-tag-version`, {
    stdio: "inherit",
  });

  // Get new version
  const newPackage = require("./package.json");
  const newVersion = newPackage.version;

  // Git operations
  execSync("git add .", { stdio: "inherit" });
  execSync(`git commit -m "Release v${newVersion}"`, { stdio: "inherit" });
  execSync("git push origin main", { stdio: "inherit" });

  console.log(`✅ Successfully released v${newVersion}`);
} catch (error) {
  console.error("❌ Release failed:", error.message);
  process.exit(1);
}
