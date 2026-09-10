import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";
import { verifyPublicAssets } from "../../HeadStart-Starter-Package/site/dist/verify-assets.mjs";
test("public builds reject nested LFS pointers with a materialization command", async () => {
  const root = await mkdtemp(`${tmpdir()}/headstart-assets-`);
  try {
    await mkdir(`${root}/nested`);
    await writeFile(
      `${root}/nested/video.mp4`,
      "version https://git-lfs.github.com/spec/v1\noid sha256:abc\nsize 42\n",
    );
    await assert.rejects(
      verifyPublicAssets(pathToFileURL(root + "/")),
      /Unresolved Git LFS pointer.*npm run assets:fetch/,
    );
    await writeFile(
      `${root}/nested/video.mp4`,
      Buffer.from([0, 0, 0, 24, 102, 116, 121, 112]),
    );
    await verifyPublicAssets(pathToFileURL(root + "/"));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
