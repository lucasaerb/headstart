'use strict';
(() => {
  const section = document.getElementById('reviewed-systems');
  const status = document.getElementById('systems-status');
  const results = document.getElementById('systems-results');
  const retry = document.getElementById('systems-retry');
  const more = document.getElementById('systems-more');
  const input = document.getElementById('systems-query');
  let loaded = false, cursor = null, controller;
  function write(changes) {
    const url = new URL(location.href);
    for (const [key,value] of Object.entries(changes)) {
      if (value) url.searchParams.set('systems_'+key,value);
      else url.searchParams.delete('systems_'+key);
    }
    if (url.href !== location.href) history.pushState({},'',url);
  }
  function restore() {
    const params = new URLSearchParams(location.search);
    input.value = params.get('systems_q') || '';
    section.open = params.get('systems_open') === '1';
    loaded = false;
    controller?.abort(); controller = null;
    if (section.open) load();
  }
  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  async function load() {
    controller?.abort();
    const current = new AbortController();
    controller = current;
    const timeout = setTimeout(()=>current.abort(),15000);
    status.textContent = 'Finding reviewed systems…';
    retry.hidden = true;
    more.hidden = true;
    results.replaceChildren();
    const query = new URLSearchParams({type:'component',limit:'12'});
    const params = new URLSearchParams(location.search);
    const text = params.get('systems_q') || '';
    if (text) query.set('q',text);
    if (params.get('systems_cursor')) query.set('cursor',params.get('systems_cursor'));
    try {
      const response = await fetch('/api/catalog/search?'+query,{signal:current.signal});
      const payload = await response.json();
      if(!response.ok || payload.schemaVersion!=='headstart-catalog-api-1' || !Array.isArray(payload.items)) throw new Error('Unavailable');
      if(current!==controller)return;
      for(const item of payload.items) {
        if(item.type!=='component')continue;
        const card=element('article',undefined,'reviewed-system');
        card.append(element('h3',item.title),element('p','From '+item.projectId+' · '+item.readiness.replaceAll('_',' ')));
        card.append(element('p','Reviewed files: '+item.data.scope.required_files.join(', ')));
        card.append(element('p','License: '+item.data.rights.code_spdx+'. Applies only to these files; the full game and its assets are outside this scope.'));
        card.append(element('p','Integration has not been tested for your game. '+item.data.scope.coupling_notes.join(' ')));
        const details=element('details');details.append(element('summary','Evidence and required notices'));
        for(const evidence of item.data.evidence) {
          const paragraph=element('p',evidence.claim+' Reviewed '+evidence.observed_at.slice(0,10)+'. ');
          const repo=new URL(item.repositoryUrl);
          if(repo.protocol==='https:' && repo.hostname==='github.com') {
            const link=element('a','Inspect '+evidence.path+' ↗');
            link.href=repo.href.replace(/\/$/,'')+'/blob/'+encodeURIComponent(evidence.source_commit)+'/'+evidence.path.split('/').map(encodeURIComponent).join('/');
            link.target='_blank';link.rel='noopener noreferrer';
            link.setAttribute('aria-label','Inspect '+evidence.path+' (opens source in a new tab)');paragraph.append(link);
          }
          details.append(paragraph);
        }
        for(const notice of item.data.rights.notices)details.append(element('pre',notice));
        card.append(details);results.append(card);
      }
      status.textContent=payload.total ? payload.total+' source-reviewed '+(payload.total===1?'system':'systems')+'. Check the scope before reuse.' : 'No reviewed systems match. Try another search or clear the search field.';
      cursor=payload.nextCursor || null;more.hidden=!cursor;loaded=true;
    } catch(error) {
      if(current!==controller)return;
      status.textContent='Reviewed systems could not be loaded. Try again.';retry.hidden=false;
    } finally {clearTimeout(timeout);}
  }
  // Persist user activation synchronously; the native toggle event is queued and
  // may otherwise lose a close when the visitor immediately reloads/navigates.
  section.querySelector(':scope > summary').addEventListener('click',event=>{
    event.preventDefault();
    const open = !section.open;
    write({open:open?'1':null});
    section.open = open;
  });
  section.addEventListener('toggle',()=>{
    const savedOpen = new URLSearchParams(location.search).get('systems_open') === '1';
    if (savedOpen !== section.open) write({open:section.open?'1':null});
    if(section.open&&!loaded&&!controller)load();
  });
  document.getElementById('systems-search').addEventListener('submit',event=>{
    event.preventDefault();write({q:input.value.trim(),open:'1',cursor:null});load();
  });
  retry.addEventListener('click',()=>load());
  more.addEventListener('click',()=>{if(cursor){write({cursor});load();}});
  window.addEventListener('popstate',restore);
  restore();
})();
