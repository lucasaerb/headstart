import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';
import { emailAddress, privatePath } from '../../HeadStart-Starter-Package/site/dist/api/subscribe.js';
const require = createRequire(new URL('../../HeadStart-Starter-Package/site/dist/package.json', import.meta.url));
const { list, get, del } = require('@vercel/blob');
const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) throw new Error('Set BLOB_READ_WRITE_TOKEN in your private environment.');
const [action, value] = process.argv.slice(2);
const options = { token };
if (action === 'export' && value) {
  const records = []; let cursor;
  do {
    const page = await list({ ...options, prefix: 'signups/v1/', cursor, limit: 100 });
    for (const blob of page.blobs) {
      const result = await get(blob.pathname, { ...options, access: 'private', useCache: false });
      if (result?.statusCode !== 200) throw new Error('A record could not be read; export aborted.');
      records.push(await new Response(result.stream).json());
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  await writeFile(value, JSON.stringify(records, null, 2) + '\n', { mode: 0o600, flag: 'wx' });
  console.log(`Exported ${records.length} records to a new private file.`);
} else if (action === 'delete' && emailAddress(value)) {
  await del(['updates', 'demo-access'].map(purpose => privatePath(emailAddress(value), process.env.SIGNUP_HASH_SECRET || token, purpose)), options);
  console.log('Deletion requested. Repeated deletion is safe.');
} else if (action === 'prune-rate-limits') {
  let cursor; let count = 0; const oldest = Math.floor(Date.now() / 3600000) - 1;
  do {
    const page = await list({ ...options, prefix: 'signup-rate/v1/', cursor, limit: 100 });
    const expired = page.blobs.filter(blob => Number(blob.pathname.split('/')[2]) < oldest);
    if (expired.length) { await del(expired.map(blob => blob.url), options); count += expired.length; }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  console.log(`Deleted ${count} expired rate-limit records.`);
} else throw new Error('Usage: node tools/signup/manage.mjs export /private/new-file.json | delete email@example.com | prune-rate-limits');
