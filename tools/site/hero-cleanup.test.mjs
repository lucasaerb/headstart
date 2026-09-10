import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const site = new URL('../../HeadStart-Starter-Package/site/dist/', import.meta.url);
const [html, app, css] = await Promise.all([
  readFile(new URL('index.html', site), 'utf8'),
  readFile(new URL('app.js', site), 'utf8'),
  readFile(new URL('styles.css', site), 'utf8')
]);

test('hero has one direct browse action and no simulated idea search', () => {
  const hero = html.match(/<main id="main-content"[\s\S]*?<\/main>/)?.[0] || '';
  assert.match(hero, /<a id="hero-browse" class="primary hero-browse" href="#games">Browse all games<\/a>/);
  assert.equal((hero.match(/class="primary(?:\s|\")/g) || []).length, 1);
  for (const removed of ['What are you making?', 'id="start-form"', 'id="idea"']) assert.doesNotMatch(hero, new RegExp(removed));
  for (const removed of ['start-form', 'edit-idea', 'brief-strip', 'start-card']) {
    assert.doesNotMatch(html + app + css, new RegExp(removed));
  }
  for (const removed of ['Get HeadStart updates', 'id="email-signup"', 'signup-card']) {
    assert.doesNotMatch(html + app + css, new RegExp(removed));
  }
});

test('browse activation uses the accessible catalog entry point', () => {
  assert.match(app, /function visitLibrary\(\) \{ \$\('games'\)\.scrollIntoView/);
  assert.match(app, /\$\('library-title'\)\.focus\(\{preventScroll:true\}\)/);
  assert.match(app, /\$\('hero-browse'\)\.addEventListener\('click',[\s\S]*?visitLibrary\(\)/);
});

test('real catalog search and bag remix brief remain present', () => {
  assert.match(html, /id="search-games" type="search"/);
  assert.match(app, /\$\('search-games'\)\.addEventListener\('input',discovery\.search\)/);
  assert.match(html, /<textarea id="remix-idea"/);
  assert.match(app, /\$\('remix-idea'\)\.addEventListener\('input'/);
  assert.match(app, /window\.HeadStartGauntlet\.buildPrompt/);
  assert.match(html, /id="continue-astra"/);
  assert.match(html, /id="remembered-email" class="remembered-email" hidden/);
  assert.match(html, /id="forget-email"/);
});
