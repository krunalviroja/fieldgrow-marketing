import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const require = createRequire(import.meta.url);

async function main() {
  // Use tsx-less approach: spawn via next build artifacts is heavy.
  // Generate with dynamic import of compiled path using ts-node alternative:
  // We'll inline generation by importing from a small JS bridge.
  const { register } = await import("node:module");
  // Fallback: call generators through tsx if available, else use child_process with npx tsx
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["tsx", "scripts/write-docs.ts"],
    { cwd: root, stdio: "inherit", shell: true },
  );
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

main();