import { open, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export async function verifyPublicAssets(root = new URL('./assets/', import.meta.url)) {
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const path = new URL(entry.name + (entry.isDirectory() ? '/' : ''), root);
    if (entry.isDirectory()) { await verifyPublicAssets(path); continue; }
    const file = await open(path, 'r');
    try {
      const buffer = Buffer.alloc(128);
      const { bytesRead } = await file.read(buffer, 0, buffer.length, 0);
      if (buffer.subarray(0, bytesRead).toString().startsWith('version https://git-lfs.github.com/spec/v1')) {
        throw new Error(`Unresolved Git LFS pointer in public asset ${fileURLToPath(path)}. Run npm run assets:fetch from the repository root before building.`);
      }
    } finally { await file.close(); }
  }
}
