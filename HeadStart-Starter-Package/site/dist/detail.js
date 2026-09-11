'use strict';
window.HeadStartDetails = (() => {
  let openDialog, request;
  const node=(tag,text,cls)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;};
  function link(text,url){const el=node('a',text);try{const parsed=new URL(url);if(parsed.protocol!=='https:')throw new Error();el.href=parsed.href;el.target='_blank';el.rel='noopener noreferrer';}catch{return node('span','Source link unavailable');}return el;}
  const date=value=>value ? String(value).slice(0,10) : 'Date not recorded';
  function panel(title){const section=node('section',undefined,'detail-panel');section.append(node('h3',title));return section;}
  function states(game){
    const section=panel('What is known');const list=node('dl',undefined,'detail-facts');
    const pairs=[['Reuse readiness',game.readiness || 'Research reference — scope review required'],['Demo observation',(game.playReview?.status || game.interactiveStatus || 'Unknown')+' · '+date(game.playReview?.checked_at)],['Source / demo relationship',game.demoSourceRelation || 'Unknown — deployment not matched to source'],['Source revision',game.sourceAvailability==='no_public_source'?'No public source available':String(game.pinnedSourceUrl||'').match(/[a-f0-9]{40}/)?.[0] || 'Unresolved — repository link is mutable'],[game.sourceAvailability==='no_public_source'?'Reference evidence review':'Source inspection',date(game.sourceInspectedAt)],['Platform',game.platformKind || 'Unknown']];
    for(const [label,value] of pairs)list.append(node('dt',label),node('dd',value.replaceAll('_',' ')));
    section.append(list);return section;
  }
  function demo(game){
    const section=panel('Try it on its own website');
    const status=game.playReview?.status || game.demoStatus || game.interactiveStatus || 'unknown';
    const unavailable=['broken','removed','unavailable'].includes(status);
    const native=game.platformKind==='desktop'||game.demoKind==='native-download';
    section.append(node('p',game.demoKind==='none'?'No demo is available for this research reference. Use the project link below.':game.demoKind==='video'?'This reference provides a video preview, not a playable demo.':native?'This project needs a desktop download. Save its source link for your desktop; it does not run inside HeadStart.':unavailable?'The demo is '+status+'. Use the source link below while availability is unresolved.':'The demo opens in a separate tab. HeadStart keeps your bag here. Close that tab to return; no game runs in this page.'));
    section.append(node('p','Controls: '+(game.playReview?.scenario || game.controls || 'Not independently documented. Check the instructions on the project website.')));
    section.append(node('p','Availability: '+status.replaceAll('_',' ')+' · '+date(game.playReview?.checked_at || game.demoCheckedAt)+'. A past observation does not guarantee current availability.'));
    if(!native&&!unavailable&&game.demoKind==='browser'){
      const launch=link('Open external demo ↗',game.demoUrl);
      if(launch.tagName==='A'){launch.className='secondary';launch.dataset.demoGame=game.id;launch.dataset.demoTitle=game.title;}
      section.append(launch);
    }else if(native)section.append(link('Open desktop project / downloads ↗',game.demoUrl||game.repoUrl));
    section.append(link('Source / project fallback ↗',game.pinnedSourceUrl||game.projectUrl||game.repoUrl));
    if(status==='frame_blocked')section.append(node('p','Embedding is blocked. Use the external website; no iframe is requested.'));
    return section;
  }
  function tour(game){
    const section=panel('An inspected source tour');
    const pinned=String(game.pinnedSourceUrl||'').match(/(?:tree|commit)\/([a-f0-9]{40})(?:\/|$)/)?.[1];
    const steps=(game.buildingBlocks||[]).filter(block=>{
      if(block.status!=='source_inspected'||!pinned||!block.source_path||block.source_path.split('/').includes('..'))return false;
      try{const source=new URL(block.evidence_url),repo=new URL(game.repoUrl);return source.protocol==='https:'&&source.origin===repo.origin&&decodeURIComponent(source.pathname)===repo.pathname.replace(/\/$/,'')+'/blob/'+pinned+'/'+block.source_path;}catch{return false;}
    });
    if(!steps.length)section.append(node('p','No pinned, inspected tour is available for this reference yet. Unreviewed capability suggestions remain research leads.'));
    for(const block of steps){const details=node('details');details.append(node('summary',block.name),node('p',block.notes),link('Inspect '+block.source_path+' ↗',block.evidence_url),node('p','Inspected '+date(game.sourceInspectedAt)+'. Boundary: this file is a source lead, not an extracted or integration-tested component. Dependencies outside its inspected notes remain unresolved.'));section.append(details);}
    return section;
  }
  function enhance(game){
    const content=document.getElementById('source-content');
    if(!String(game.pinnedSourceUrl||'').match(/[a-f0-9]{40}/))for(const a of content.querySelectorAll('a'))if(a.textContent==='View pinned source ↗')a.textContent='View repository (revision unresolved) ↗';
    const top=node('div',undefined,'detail-overview');top.append(states(game),demo(game),tour(game));content.prepend(top);
    const rights=panel('Code, assets and data are separate');
    rights.append(node('p','Code: '+(game.rights?.code_license || 'License unresolved')+'. '+(game.rights?.code_status || 'Review required')+'.'),node('p','Assets: '+(game.rights?.asset_status || 'Unresolved')+'. '+(game.rights?.asset_notes || 'No asset clearance established.')),node('p','Datasets: '+(game.rights?.data_status || 'Not separately reviewed')+'. Dependencies: '+(game.dependencies?.length ? game.dependencies.join(', ') : 'No complete dependency review is available for this research reference.')));
    top.append(rights);
    document.getElementById('source-dialog').scrollTop=0;
  }
  async function showComponent(item,opener){
    request?.abort();request=new AbortController();const current=request;
    const timeout=setTimeout(()=>current.abort(),15000);
    document.getElementById('source-title').textContent=item.title;
    const content=document.getElementById('source-content');content.replaceChildren(node('p','Loading immutable component details…','detail-loading'));
    openDialog('source-dialog',opener);
    document.getElementById('source-dialog').scrollTop=0;
    try{
      const response=await fetch('/v1/components/'+encodeURIComponent(item.id)+'/versions/'+encodeURIComponent(item.version),{signal:current.signal});
      const body=await response.json();if(!response.ok||body.schemaVersion!=='headstart-catalog-api-1'||!body.item)throw new Error();
      if(request!==current||!document.getElementById('source-dialog').open)return;
      const detail=body.item,data=detail.data;content.replaceChildren();
      const summary=panel('A piece of '+detail.projectId);
      summary.append(node('p','Readiness: '+detail.readiness.replaceAll('_',' ')+'. Source commit: '+data.source_commit),node('p','Runtime: '+data.compatibility.map(c=>c.runtime+' '+(c.version_range||'version unknown')+' · '+c.support.replaceAll('_',' ')).join('; ')),node('p','Demo health: not evaluated for this component. Source / demo relationship: no matching demo build established.'));
      const scope=panel('Included and excluded');scope.append(node('p','Required files: '+data.scope.required_files.join(', ')),node('p','Excluded systems: '+data.scope.excluded_systems.join(', ')),node('p',data.scope.coupling_notes.join(' ')),node('p','Dependencies: '+window.HeadStartBriefStore.dependencySummary(detail)));
      for(const dependency of detail.resolvedDependencies||[])if(dependency.sourceUrl)scope.append(link('Inspect dependency manifest ↗',dependency.sourceUrl));
      const evidence=panel('Inspected source and creator notices');
      for(const e of data.evidence)evidence.append(link('Inspect '+e.path+' ↗',detail.repositoryUrl+'/blob/'+data.source_commit+'/'+e.path),node('p',e.claim+' · '+date(e.observed_at)+' · '+e.reviewer));
      evidence.append(node('p','Code: '+data.rights.code_spdx+'. Assets: '+data.rights.asset_status+'. Data outside this scope is not cleared.'));
      for(const notice of data.rights.notices)evidence.append(node('pre',notice));
      content.append(summary,scope,evidence);
    }catch{if(request!==current)return;content.replaceChildren(node('p','This component is unavailable or no longer eligible. Return to the library and refresh; no source content has been exported.','detail-error'));}finally{clearTimeout(timeout);}
  }
  return {configure(options){openDialog=options.openDialog;document.getElementById('source-dialog').addEventListener('close',()=>{request?.abort();request=null;});},enhance,showComponent};
})();
