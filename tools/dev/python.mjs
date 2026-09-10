import { spawnSync } from "node:child_process";
import { pythonCommand } from "./catalog-handler.mjs";
const result = spawnSync(pythonCommand(), process.argv.slice(2), {
  stdio: "inherit",
});
process.exit(result.status || (result.error ? 1 : 0));
