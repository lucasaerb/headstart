import { readdir, readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
for (const folder of [
  "tools/dev",
  "HeadStart-Starter-Package/site/dist",
  "HeadStart-Starter-Package/site/dist/api",
]) {
  for (const entry of await readdir(folder))
    if (/\.(m?js)$/.test(entry)) {
      const result = spawnSync(
        process.execPath,
        ["--check", `${folder}/${entry}`],
        { stdio: "inherit" },
      );
      if (result.status !== 0) process.exit(result.status || 1);
    }
}
for (const file of [
  "package.json",
  "HeadStart-Starter-Package/site/dist/catalog.js",
])
  if (file.endsWith(".json")) JSON.parse(await readFile(file, "utf8"));
console.log(
  "JavaScript syntax and package JSON valid. Semantic behavior is covered by npm test.",
);
