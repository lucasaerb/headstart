'use strict';
// Public research discovery is independent of the hero and the local bag.
window.HeadStartDiscovery = function ({ fields, draw, onItems }) {
  const get = id => document.getElementById(id);
  let request = null;
  let serial = 0;
  let nextCursor = null;
  let debounce;
  let restartPage = false;
  const owned = [...Object.keys(fields), 'cursor', 'view'];
  function view(mode) {
    get('game-grid').classList.toggle('list', mode === 'list');
    for (const value of ['grid', 'list']) {
      get(value + '-view').classList.toggle('active', value === mode);
      get(value + '-view').setAttribute('aria-pressed', String(value === mode));
    }
  }
  function restore() {
    const params = new URLSearchParams(location.search);
    for (const [key, id] of Object.entries(fields)) {
      const input = get(id);
      const value = params.get(key) || (key === 'sort' ? 'recommended' : '');
      if (input.tagName === 'SELECT' && ![...input.options].some(option => option.value === value)) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        input.append(option);
      }
      input.value = value;
    }
    view(params.get('view') === 'list' ? 'list' : 'grid');
    if ([...params.keys()].some(key=>key!=='q'&&owned.includes(key))) {
      get('library-filters').classList.add('expanded');
      get('toggle-filters').setAttribute('aria-expanded','true');
    }
  }
  function write({ cursor = null, mode, replace = false } = {}) {
    const url = new URL(location.href);
    for (const key of owned) url.searchParams.delete(key);
    for (const [key, id] of Object.entries(fields)) {
      const value = get(id).value.trim();
      if (value && !(key === 'sort' && value === 'recommended')) url.searchParams.set(key, value);
    }
    const layout = mode || (get('game-grid').classList.contains('list') ? 'list' : 'grid');
    if (layout === 'list') url.searchParams.set('view', layout);
    if (cursor) url.searchParams.set('cursor', cursor);
    if (url.href !== location.href) history[replace ? 'replaceState' : 'pushState']({}, '', url);
  }
  async function load() {
    clearTimeout(debounce);
    request?.abort();
    request = new AbortController();
    const controller = request;
    const mine = ++serial;
    const timeout = setTimeout(() => controller.abort(), 15000);
    const params = new URLSearchParams(location.search);
    const query = new URLSearchParams();
    for (const key of [...Object.keys(fields), 'cursor']) {
      if (params.has(key)) query.set(key, params.get(key));
    }
    query.set('limit', '12');
    get('discovery-status').hidden = false;
    get('discovery-status-text').textContent = 'Finding your starting points…';
    get('retry-games').hidden = true;
    get('retry-games').textContent = 'Try again';
    restartPage = false;
    get('game-grid').setAttribute('aria-busy', 'true');
    get('game-grid').replaceChildren();
    get('empty-games').hidden = true;
    get('pagination').hidden = true;
    get('clear-filters').hidden = ![...Object.keys(fields)].some(key => key !== 'sort' && params.has(key));
    get('result-count').textContent = 'Loading projects…';
    try {
      const response = await fetch('/api/research?' + query, { signal: controller.signal, headers: { Accept: 'application/json' } });
      const result = await response.json();
      if (!response.ok) {
        const error = new Error(result.error?.message || 'The game library could not be loaded.');
        error.unsupported = response.status === 400;
        error.stale = response.status === 409;
        throw error;
      }
      if (result.schemaVersion !== 'headstart-research-api-1' || result.eligibility !== 'research_only' || !Array.isArray(result.items) || !Number.isInteger(result.total)) throw new Error('The library returned an unsupported response.');
      if (mine !== serial) return;
      for (const [key, values] of Object.entries(result.facets || {})) {
        const input = fields[key] && get(fields[key]);
        if (!input || input.tagName !== 'SELECT' || !Array.isArray(values)) continue;
        for (const value of values) {
          if (typeof value !== 'string' || [...input.options].some(option=>option.value===value)) continue;
          const option=document.createElement('option');option.value=value;
          option.textContent=value.replaceAll('-',' ').replace(/^./,char=>char.toUpperCase());input.append(option);
        }
      }
      onItems(result.items);
      draw(result.items, result.total);
      nextCursor = result.nextCursor || null;
      get('discovery-status').hidden = true;
      get('pagination').hidden = !(params.has('cursor') || nextCursor);
      get('first-page').disabled = !params.has('cursor');
      get('next-page').disabled = !nextCursor;
      get('page-description').textContent = result.items.length + ' projects on this page';
    } catch (error) {
      if (mine !== serial) return;
      get('result-count').textContent = 'Library unavailable';
      restartPage = error.stale;
      get('retry-games').textContent = restartPage ? 'Restart page' : 'Try again';
      get('discovery-status-text').textContent = error.stale ? 'The library changed. Restart this page with the same filters.' : error.unsupported
        ? 'A filter in this link is unsupported. Clear filters to browse again.'
        : 'We couldn’t load the game library. Your bag is safe. Try again.';
      get('retry-games').hidden = false;
      get('clear-filters').hidden = false;
    } finally {
      clearTimeout(timeout);
      if (mine === serial) get('game-grid').setAttribute('aria-busy', 'false');
    }
  }
  function change() { write(); load(); }
  function search() { clearTimeout(debounce); debounce = setTimeout(change, 250); }
  function layout(mode) { view(mode); write({ mode, cursor: new URLSearchParams(location.search).get('cursor') }); }
  get('retry-games').addEventListener('click',()=>{if(restartPage)write();load();});
  get('toggle-filters').addEventListener('click',()=>{
    const expanded=get('library-filters').classList.toggle('expanded');
    get('toggle-filters').setAttribute('aria-expanded',String(expanded));
  });
  get('first-page').addEventListener('click', () => { write(); load(); });
  get('next-page').addEventListener('click', () => { if (nextCursor) { write({ cursor: nextCursor }); load(); get('result-count').scrollIntoView({ block: 'center' }); } });
  window.addEventListener('popstate', () => { restore(); load(); });
  return { restore, load, change, search, layout };
};
