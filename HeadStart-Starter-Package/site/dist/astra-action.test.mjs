import assert from 'node:assert/strict';
import test from 'node:test';

await import('./astra-action.js');
const { CHATGPT_URL, continueWithAstra } = globalThis.HeadStartAstra;

test('opens ChatGPT and copies the exact prompt from one action', async () => {
  const calls = [];
  const tab = { opener: {}, location: { replace: url => calls.push(['navigate', url]) } };
  const result = await continueWithAstra('selected games and brief', {
    openWindow: (...args) => { calls.push(['open', ...args]); return tab; },
    writeClipboard: async text => calls.push(['copy', text]),
  });
  assert.deepEqual(result, { opened: true, copied: true });
  assert.deepEqual(calls, [
    ['open', 'about:blank', '_blank'],
    ['navigate', CHATGPT_URL],
    ['copy', 'selected games and brief'],
  ]);
  assert.equal(tab.opener, null);
});

test('reports blocked tab while still copying the prompt', async () => {
  let copied;
  const result = await continueWithAstra('prompt', {
    openWindow: () => null,
    writeClipboard: async text => { copied = text; },
  });
  assert.deepEqual(result, { opened: false, copied: true });
  assert.equal(copied, 'prompt');
});

test('reports clipboard failure without losing an opened ChatGPT tab', async () => {
  const tab = { location: { replace() {} } };
  const result = await continueWithAstra('prompt', {
    openWindow: () => tab,
    writeClipboard: async () => { throw new Error('permission denied'); },
  });
  assert.deepEqual(result, { opened: true, copied: false });
  assert.equal(tab.opener, null);
});

test('rejects an empty prompt before opening a tab', async () => {
  let opened = false;
  await assert.rejects(() => continueWithAstra('  ', {
    openWindow: () => { opened = true; },
    writeClipboard: async () => {},
  }), /nonempty prompt/);
  assert.equal(opened, false);
});
