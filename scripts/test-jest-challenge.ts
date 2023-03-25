import { join } from "path";
import { statSync } from "fs";
import execa from "execa";

export const main = async () => {
  const [challengeId] = process.argv.slice(2);

  if (!challengeId) {
    console.log("Usage: npm run test <challengeId>");
    return;
  }

  const challengePath = join(__dirname, "..", "src", "challenges", challengeId);
  const challengeStat = statSync(challengePath);

  if (!challengeStat.isDirectory()) {
    throw new Error(`Path ${challengePath} is not a directory`);
  }

  const challengeTestDirectory = join(challengePath, "julius", "test");

  try {
    await execa("jest", [challengeTestDirectory], {
      stdio: "inherit",
    });
  } catch (error) {
    process.exit(1);
  }
};

main();
