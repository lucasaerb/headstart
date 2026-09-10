import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const source = await readFile(new URL('../../HeadStart-Starter-Package/site/dist/signup.js', import.meta.url), 'utf8');

class FakeElement {
  constructor(id = '') {
    this.id = id;
    this.listeners = new Map();
    this.elements = {};
    this.hidden = false;
    this.open = false;
    this.textContent = '';
    this.value = '';
    this.checked = false;
    this.disabled = false;
    this.href = '';
  }
  addEventListener(type, listener) { this.listeners.set(type, listener); }
  async dispatch(type, event = {}) { await this.listeners.get(type)?.({ preventDefault() {}, ...event }); }
  querySelector(selector) { return selector === 'button[type="submit"]' ? this.submitButton : null; }
  reportValidity() { return true; }
  reset() { for (const element of Object.values(this.elements)) { element.value = ''; element.checked = false; } }
  showModal() { this.open = true; }
  focus() { this.focused = true; }
}

function createHarness({ stored = null, storageThrows = false, responseOk = true, fetchError = null, missingFooter = false, responseGate = null } = {}) {
  const elements = Object.fromEntries([
    'remembered-email', 'remembered-email-value', 'email-preference-status', 'forget-email',
    'demo-email-dialog', 'demo-email-form', 'demo-launch', 'demo-email-status', 'demo-email-context', 'demo-email'
  ].map(id => [id, new FakeElement(id)]));
  if (missingFooter) for (const id of ['remembered-email', 'remembered-email-value', 'email-preference-status', 'forget-email']) delete elements[id];
  elements['demo-email-form'].elements = { email: elements['demo-email'], website: new FakeElement(), updates: new FakeElement() };
  elements['demo-email-form'].submitButton = new FakeElement();
  const documentListeners = new Map();
  const document = {
    getElementById: id => elements[id],
    addEventListener: (type, listener) => documentListeners.set(type, listener)
  };
  const data = new Map(stored ? [['headstart.remembered-email.v1', stored]] : []);
  const localStorage = {
    getItem(key) { if (storageThrows) throw new Error('blocked'); return data.get(key) ?? null; },
    setItem(key, value) { if (storageThrows) throw new Error('blocked'); data.set(key, value); },
    removeItem(key) { if (storageThrows) throw new Error('blocked'); data.delete(key); }
  };
  const requests = [];
  const fetch = async (url, options) => {
    requests.push({ url, body: JSON.parse(options.body) });
    if (responseGate) await responseGate;
    if (fetchError) throw fetchError;
    return { ok: responseOk, json: async () => ({ message: responseOk ? 'Saved.' : 'Not saved.' }) };
  };
  vm.runInNewContext(source, { document, localStorage, fetch, AbortSignal, console }, { filename: 'signup.js' });
  const clickDemo = async ({ url = 'https://example.test/play?level=2', id = 'game-1', title = 'Game One' } = {}) => {
    let prevented = false;
    const link = new FakeElement();
    link.href = url;
    link.dataset = { demoGame: id, demoTitle: title };
    link.closest = () => link;
    await documentListeners.get('click')({ target: link, preventDefault() { prevented = true; } });
    return { prevented, link };
  };
  return { elements, data, requests, clickDemo };
}

test('remembered email is disclosed without network activity and bypasses the demo prompt', async () => {
  const email = 'saved@example.com';
  const harness = createHarness({ stored: JSON.stringify({ version: 1, email }) });
  assert.equal(harness.elements['remembered-email'].hidden, false);
  assert.equal(harness.elements['remembered-email-value'].textContent, email);
  assert.equal(harness.requests.length, 0);
  assert.equal((await harness.clickDemo()).prevented, false);
});

test('successful demo save remembers normalized email and later demos use their exact links', async () => {
  const harness = createHarness();
  const first = await harness.clickDemo();
  assert.equal(first.prevented, true);
  assert.equal(harness.elements['demo-email-dialog'].open, true);
  harness.elements['demo-email'].value = ' Player@Example.COM ';
  await harness.elements['demo-email-form'].dispatch('submit');
  assert.deepEqual(JSON.parse(harness.data.get('headstart.remembered-email.v1')), { version: 1, email: 'player@example.com' });
  assert.equal(harness.elements['demo-launch'].href, 'https://example.test/play?level=2');
  assert.equal(harness.requests[0].body.updates, false);
  assert.equal((await harness.clickDemo({ url: 'https://other.example/game#start' })).prevented, false);
});

test('demo marketing opt-in is sent only when explicitly selected', async () => {
  const harness = createHarness();
  await harness.clickDemo();
  harness.elements['demo-email'].value = 'updates@example.com';
  harness.elements['demo-email-form'].elements.updates.checked = true;
  await harness.elements['demo-email-form'].dispatch('submit');
  assert.equal(harness.requests[0].body.updates, true);
});

test('delayed success remembers only the submitted address despite an in-flight edit', async () => {
  let finish;
  const responseGate = new Promise(resolve => { finish = resolve; });
  const harness = createHarness({ responseGate });
  await harness.clickDemo();
  harness.elements['demo-email'].value = ' Submitted@Example.COM ';
  const pending = harness.elements['demo-email-form'].dispatch('submit');
  assert.equal(harness.requests[0].body.email, 'submitted@example.com');
  harness.elements['demo-email'].value = 'unsaved@example.com';
  assert.equal(harness.data.size, 0);
  finish(); await pending;
  assert.equal(JSON.parse(harness.data.get('headstart.remembered-email.v1')).email, 'submitted@example.com');
  assert.equal(harness.elements['remembered-email-value'].textContent, 'submitted@example.com');
});

test('delayed failure remembers neither submitted nor edited address', async () => {
  let finish;
  const responseGate = new Promise(resolve => { finish = resolve; });
  const harness = createHarness({ responseGate, responseOk: false });
  await harness.clickDemo();
  harness.elements['demo-email'].value = 'submitted@example.com';
  const pending = harness.elements['demo-email-form'].dispatch('submit');
  harness.elements['demo-email'].value = 'unsaved@example.com';
  finish(); await pending;
  assert.equal(harness.data.size, 0);
  assert.equal(harness.elements['demo-email'].value, 'unsaved@example.com');
  assert.equal((await harness.clickDemo()).prevented, true);
});

test('failed requests do not remember an email or unlock later demos', async () => {
  const harness = createHarness({ responseOk: false });
  await harness.clickDemo();
  harness.elements['demo-email'].value = 'retry@example.com';
  await harness.elements['demo-email-form'].dispatch('submit');
  assert.equal(harness.data.size, 0);
  assert.equal(harness.elements['demo-email'].value, 'retry@example.com');
  assert.equal((await harness.clickDemo()).prevented, true);
});

test('timed-out requests do not remember an email', async () => {
  const timeout = new Error('timeout'); timeout.name = 'TimeoutError';
  const harness = createHarness({ fetchError: timeout });
  await harness.clickDemo();
  harness.elements['demo-email'].value = 'retry@example.com';
  await harness.elements['demo-email-form'].dispatch('submit');
  assert.equal(harness.data.size, 0);
  assert.match(harness.elements['demo-email-status'].textContent, /timed out/i);
});

test('forgetting clears the preference and restores email entry', async () => {
  const harness = createHarness({ stored: JSON.stringify({ version: 1, email: 'shared@example.com' }) });
  await harness.elements['forget-email'].dispatch('click');
  assert.equal(harness.data.size, 0);
  assert.equal(harness.elements['remembered-email'].hidden, true);
  assert.match(harness.elements['email-preference-status'].textContent, /no longer remembers/i);
  assert.equal((await harness.clickDemo()).prevented, true);
});

test('blocked or corrupt storage fails safely and success remains usable for the current page', async () => {
  const corrupt = createHarness({ stored: '{broken' });
  assert.equal(corrupt.elements['remembered-email'].hidden, true);
  const blocked = createHarness({ storageThrows: true });
  await blocked.clickDemo();
  blocked.elements['demo-email'].value = 'once@example.com';
  await blocked.elements['demo-email-form'].dispatch('submit');
  assert.match(blocked.elements['demo-email-status'].textContent, /could not remember/i);
  assert.equal(blocked.elements['demo-launch'].hidden, false);
  assert.equal((await blocked.clickDemo()).prevented, false);
  const reload = createHarness({ storageThrows: true });
  assert.equal((await reload.clickDemo()).prevented, true);
});

test('demo flow still initializes when optional footer preference controls are absent', async () => {
  const harness = createHarness({ missingFooter: true });
  assert.equal((await harness.clickDemo()).prevented, true);
  assert.equal(harness.elements['demo-email-dialog'].open, true);
});
