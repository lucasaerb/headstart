import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const site = new URL('../../HeadStart-Starter-Package/site/dist/', import.meta.url);
const [html, css] = await Promise.all([
  readFile(new URL('index.html', site), 'utf8'),
  readFile(new URL('styles.css', site), 'utf8')
]);

const header = html.match(/<header class="site-header">[\s\S]*?<\/header>/)?.[0] || '';

test('header places the canonical GitHub link beside the plugin action', () => {
  assert.match(
    header,
    /<div class="header-project-actions"><a class="header-plugin-cta"[\s\S]*?<\/a><a class="header-github-cta" href="https:\/\/github\.com\/lucasaerb\/headstart"[\s\S]*?<\/a><\/div>/
  );
  assert.equal((header.match(/class="header-github-cta"/g) || []).length, 1);
});

test('GitHub action names its external behavior and isolates the new tab', () => {
  const link = header.match(/<a class="header-github-cta"[\s\S]*?<\/a>/)?.[0] || '';
  assert.match(link, /target="_blank"/);
  assert.match(link, /rel="noopener noreferrer"/);
  assert.match(link, /aria-label="View HeadStart on GitHub \(opens in a new tab\)"/);
  assert.match(link, />GitHub <span aria-hidden="true">↗<\/span><\/a>/);
});

test('header action pair has responsive sizing without hiding either action', () => {
  assert.match(css, /\.header-project-actions\{display:flex;align-items:center;gap:9px\}/);
  assert.match(css, /@media\(max-width:700px\)[\s\S]*?\.site-header \.header-project-actions\{grid-column:2;grid-row:2;justify-self:end;gap:6px\}/);
  assert.match(css, /\.site-header \.header-project-actions>a\{min-height:40px;padding:9px 10px;font-size:12px\}/);
  assert.doesNotMatch(css, /\.header-github-cta[^}]*display:none/);
});

test('narrow header gives the complete action pair its own full-width row', () => {
  const narrow = css.match(/@media\(max-width:420px\)\{[\s\S]*?\}\}/)?.[0] || '';
  assert.match(narrow, /\.site-header \.header-project-actions\{grid-column:1\/-1;grid-row:3;display:grid;/);
  assert.match(narrow, /grid-template-columns:minmax\(0,1\.35fr\) minmax\(0,1fr\)/);
  assert.match(narrow, /justify-self:stretch;width:100%;gap:8px/);
  assert.match(narrow, /\.site-header \.header-project-actions>a\{width:100%;min-width:0;padding:9px 8px;font-size:12px\}/);
  assert.doesNotMatch(narrow, /text-overflow|overflow:hidden|display:none/);
});
