'use strict';
const items = window.MOCKUPS || [];
const byId = new Map(items.map(item => [item.id, item]));
const selected = new Set();
let filtered = [...items];
let viewing = 0;
let lastOpener = null;
const $ = id => document.getElementById(id);
const source = item => '../../' + item.src;
const families = [...new Set(items.map(item => item.group))];
for (const family of families) { const option = document.createElement('option'); option.value = family; option.textContent = family; $('family').append(option); }
function el(tag, className, text) { const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = text; return node; }
function render() {
  const query = $('search').value.trim().toLowerCase();
  const family = $('family').value;
  filtered = items.filter(item => (!family || item.group === family) && [item.title, item.id, item.description, item.group].join(' ').toLowerCase().includes(query));
  $('gallery').replaceChildren();
  filtered.forEach((item, index) => {
    const card = el('article', 'card' + (selected.has(item.id) ? ' chosen' : '')); card.dataset.id = item.id;
    const preview = el('button', 'preview'); preview.type = 'button'; preview.setAttribute('aria-label', 'Enlarge ' + item.title);
    const img = el('img'); img.src = source(item); img.alt = item.title + ' — ' + item.description; img.loading = index < 2 ? 'eager' : 'lazy'; img.decoding = 'async';
    img.addEventListener('error', () => { img.hidden = true; preview.append(el('span', 'image-error', 'Preview unavailable. Open to view the original.')); }, { once: true });
    preview.append(img, el('span', 'preview-hint', 'Enlarge')); preview.addEventListener('click', () => openViewer(index, preview));
    const body = el('div', 'card-body'); const top = el('div', 'card-top'); const title = el('div');
    title.append(el('span', 'meta', item.group), el('h2', '', item.title));
    const label = el('label', 'pick'); const checkbox = el('input'); checkbox.type = 'checkbox'; checkbox.checked = selected.has(item.id); checkbox.dataset.pick = item.id; checkbox.setAttribute('aria-label', 'Compare ' + item.title);
    checkbox.addEventListener('change', () => { if (checkbox.checked) { if (selected.size === 2) { checkbox.checked = false; $('selection-status').textContent = 'Two designs selected. Remove one to choose another.'; return; } selected.add(item.id); } else selected.delete(item.id); syncSelection(); });
    label.append(checkbox, document.createTextNode('Compare')); top.append(title, label); body.append(top, el('p', '', item.description)); card.append(preview, body); $('gallery').append(card);
  });
  $('count').textContent = filtered.length + ' of ' + items.length + ' mockups'; $('empty').hidden = filtered.length > 0; $('reset').hidden = !query && !family; syncSelection(false);
}
function syncSelection(announce = true) {
  document.querySelectorAll('[data-pick]').forEach(input => { input.checked = selected.has(input.dataset.pick); input.disabled = selected.size === 2 && !input.checked; input.closest('.card').classList.toggle('chosen', input.checked); });
  $('selection').hidden = selected.size === 0; $('selected-items').replaceChildren();
  for (const id of selected) { const item = byId.get(id); const entry = el('div', 'selected-item'); const img = el('img'); img.src = source(item); img.alt = ''; const remove = el('button', '', '✕'); remove.setAttribute('aria-label', 'Remove ' + item.title + ' from comparison'); remove.addEventListener('click', () => { selected.delete(id); syncSelection(); }); entry.append(img, el('span', '', item.title), remove); $('selected-items').append(entry); }
  $('compare').disabled = selected.size !== 2; $('compare').textContent = selected.size === 2 ? 'Compare 2 designs' : 'Choose one more';
  if (announce) $('selection-status').textContent = selected.size + ' of 2 designs selected.';
}
function clearFilters() { $('search').value = ''; $('family').value = ''; render(); }
$('search').addEventListener('input', render); $('family').addEventListener('change', render); $('reset').addEventListener('click', clearFilters); $('empty-reset').addEventListener('click', clearFilters);
$('clear-selected').addEventListener('click', () => { selected.clear(); syncSelection(); });
function setViewer() {
  const item = filtered[viewing]; $('viewer-title').textContent = item.title; $('viewer-family').textContent = item.group; $('viewer-description').textContent = item.description;
  $('large-image').src = source(item); $('large-image').alt = item.title + ' — ' + item.description; $('original').href = source(item); $('image-stage').classList.remove('zoomed'); $('zoom').textContent = 'Zoom in'; $('zoom').setAttribute('aria-pressed', 'false'); $('image-stage').scrollTo(0, 0);
  $('previous').disabled = filtered.length < 2; $('next').disabled = filtered.length < 2;
}
function openViewer(index, opener) { viewing = index; lastOpener = opener; setViewer(); $('viewer').showModal(); document.body.style.overflow = 'hidden'; }
function moveViewer(delta) { viewing = (viewing + delta + filtered.length) % filtered.length; setViewer(); }
$('previous').addEventListener('click', () => moveViewer(-1)); $('next').addEventListener('click', () => moveViewer(1));
$('zoom').addEventListener('click', () => { const zoomed = $('image-stage').classList.toggle('zoomed'); $('zoom').textContent = zoomed ? 'Fit image' : 'Zoom in'; $('zoom').setAttribute('aria-pressed', String(zoomed)); });
$('viewer').addEventListener('keydown', event => { if ($('image-stage').classList.contains('zoomed')) return; if (event.key === 'ArrowRight') { event.preventDefault(); moveViewer(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); moveViewer(-1); } });
$('compare').addEventListener('click', () => {
  if (selected.size !== 2) return; lastOpener = $('compare'); $('compare-grid').replaceChildren();
  for (const id of selected) { const item = byId.get(id); const panel = el('section', 'compare-panel'); const img = el('img'); img.src = source(item); img.alt = item.title + ' — ' + item.description; const link = el('a', '', 'Open original'); link.href = source(item); link.target = '_blank'; link.rel = 'noopener'; panel.append(el('span', 'meta', item.group), el('h3', '', item.title), el('p', '', item.description), link, img); $('compare-grid').append(panel); }
  $('comparison').showModal(); document.body.style.overflow = 'hidden';
});
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => $(button.dataset.close).close()));
for (const id of ['viewer', 'comparison']) $(id).addEventListener('close', () => { document.body.style.overflow = ''; if (lastOpener?.isConnected) lastOpener.focus(); });
render();
