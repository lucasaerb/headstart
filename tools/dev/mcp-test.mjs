import { spawnSync } from "node:child_process";
import { pythonCommand } from "./catalog-handler.mjs";
const python = process.env.HEADSTART_MCP_PYTHON || pythonCommand();
for (const args of [
  ["-m", "unittest", "discover", "-s", "tests/mcp", "-v"],
  ["tests/mcp/live_protocol.py"],
]) {
  const result = spawnSync(python, args, { stdio: "inherit" });
  if (result.error) {
    console.error(
      "MCP test interpreter unavailable; install tests/mcp/requirements.txt.",
    );
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status || 1);
}
