import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const n = Number(process.argv[2]);
if (!Number.isInteger(n) || n < 1 || n > 12) {
  console.error("usage: npm run new-day -- <1-12>");
  process.exit(1);
}

const root = join(import.meta.dirname, "..");
const dayDir = join(root, "src", `day${String(n).padStart(2, "0")}`);
if (existsSync(dayDir)) {
  console.error(`${dayDir} already exists`);
  process.exit(1);
}

mkdirSync(dayDir, { recursive: true });
copyFileSync(join(root, "src", "template", "solution.ts"), join(dayDir, "solution.ts"));
writeFileSync(join(dayDir, "input.txt"), "");
writeFileSync(join(dayDir, "test-input.txt"), "");
console.log(`created ${dayDir}`);
