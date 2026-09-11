'use strict';
(() => {
 const $=id=>document.getElementById(id),store=window.HeadStartBriefStore;
 let storage;try{storage=localStorage;}catch{storage={getItem:()=>null,setItem:()=>{throw Error('unavailable');}};}
 const loaded=store.load(storage);let state=loaded.state,serial=0;
 const fields={experience:'recipe-experience',runtime:'recipe-runtime',platform:'recipe-platform',camera:'recipe-camera'};
 const node=(tag,text,cls)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;};
 for(const [key,id] of Object.entries(fields)){const value=state.brief.constraints[key]?.value||'';if($(id).tagName==='SELECT'&&![...$(id).options].some(o=>o.value===value))$(id).append(new Option(value,value));$(id).value=value;}
 $('recipe-storage').textContent=loaded.warning;
 function detail(row){
  const recipe=row.template,content=$('source-content');content.replaceChildren();$('source-title').textContent=recipe.title;
  content.append(node('p','Planning candidate · composition untested. Performance unmeasured.','recipe-note'));
  const guide=node('section',undefined,'recipe-scope');guide.append(node('h3','The visual direction'));
  for(const [key,value] of Object.entries(recipe.settings))guide.append(node('p',key+': '+(Array.isArray(value)?value.join(', '):value)));
  content.append(guide);
  for(const part of recipe.components){const section=node('section',undefined,'recipe-scope');section.append(node('h3',part.id),node('p','Version '+part.version+' · source '+part.sourceCommit),node('p',part.rights),node('p',part.lifecycle),node('p',part.externalPeer?'Engine peer: '+part.externalPeer.package+' '+part.externalPeer.declared_version+'; inspect the target before resolving it.':'This scoped module declares no external engine import; inspect its target adapter.'));
   const list=node('ul');for(const file of part.sourceFiles){const li=node('li'),link=node('a',file.path);link.href=file.url;link.target='_blank';link.rel='noopener noreferrer';li.append(link);list.append(li);}section.append(list);
   const plan=node('button','Plan with this system','secondary');plan.type='button';plan.addEventListener('click',()=>{const area=node('div');section.append(area);plan.disabled=true;window.HeadStartHandoff.mount(area,{id:part.versionId,version:part.version},null,row.recommendationContext);});section.append(plan);content.append(section);}
  content.append(node('p','Caller assets are excluded. '+recipe.tradeoff));
  if(recipe.components.some(p=>p.externalPeer))content.append(node('p','Whole-recipe handoff needs external dependency review. A self-contained capability may be prepared separately; its context remains a planning candidate.','recipe-note'));
  const all=node('div');content.append(all);window.HeadStartHandoff.mount(all,recipe.components.map(p=>({id:p.versionId,version:p.version})),null,row.recommendationContext);
  content.append(node('p','A recipe handoff is a multi-system plan. The local reference adapter supports only its declared single capability; it cannot execute this assembled recipe.'));
  $('source-dialog').showModal();
 }
 async function load(){const mine=++serial;$('recipe-results').setAttribute('aria-busy','true');$('recipe-results').replaceChildren();$('recipe-status').textContent='Finding starting points for your brief…';
  const brief={revision:state.brief.revision,constraints:state.brief.constraints};$('recipe-revision').textContent='Brief revision '+brief.revision;
  try{const response=await fetch('/api/recommendations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({brief,query:$('recipe-query').value,constraints:{readiness:$('recipe-readiness').value}}),signal:AbortSignal.timeout(15000)});const data=await response.json();if(!response.ok)throw Error(data.error||'Recommendations unavailable');if(data.schemaVersion!=='headstart-recommendation-plan-1'||!Array.isArray(data.items))throw Error('Unsupported recommendation response');if(mine!==serial)return;
   $('recipe-status').textContent=data.items.length?'Source-backed ideas, with the tradeoffs in view.':data.emptyAction;
   for(const row of data.items){const recipe=row.template,article=node('article',undefined,'recipe-row'),picture=node('div',undefined,'recipe-picture');picture.setAttribute('aria-label','Illustrative color study, not a game screenshot');const colors={'cozy-builder':['#a8bbaa','#d9bb86','#718a9d'],'first-person-island':['#a4cccd','#62957b','#ebd9a6'],'flight-landscape':['#b4cee9','#94b5a0','#7696ba']}[recipe.id]||['#cddbe6','#8ba89b','#6a829f'];picture.style.background=colors[0];for(let i=1;i<=2;i++){const shape=node('span');Object.assign(shape.style,{display:'block',width:'50px',height:i===1?'80px':'110px',background:colors[i],borderRadius:i===1?'25px 25px 8px 8px':'30px 30px 8px 8px',margin:'6px',transform:'translateY(16px)'});picture.append(shape);}const body=node('div');body.append(node('p','Planning candidate · Three.js 0.186.0','recipe-label'),node('h3',recipe.title));const reasons=node('ul');for(const reason of row.reasons)reasons.append(node('li',reason.text));body.append(reasons,node('p',recipe.tradeoff));const alternative=data.items.find(r=>r.template.id===row.alternative);body.append(node('p',alternative?'Alternative: '+alternative.template.title:'No alternative meets these explicit filters.','recipe-label'));const button=node('button','Explore this recipe','secondary');button.type='button';button.addEventListener('click',()=>detail(row));body.append(button);article.append(picture,body);$('recipe-results').append(article);}
  }catch(error){if(mine===serial)$('recipe-status').textContent=error.message||'Could not load recipes. Your brief is safe; retry.';}finally{if(mine===serial)$('recipe-results').setAttribute('aria-busy','false');}
 }
 $('recipe-brief').addEventListener('submit',event=>{event.preventDefault();const constraints=structuredClone(state.brief.constraints);for(const [key,id] of Object.entries(fields)){const value=$(id).value.trim();if(value)constraints[key]={value,origin:'explicit'};else delete constraints[key];}if(JSON.stringify(constraints)!==JSON.stringify(state.brief.constraints)){state=store.revise(state,constraints);try{if(loaded.recovery)throw Error('recovery');storage.setItem(store.KEY,JSON.stringify(state));$('recipe-storage').textContent='Brief saved in this browser.';}catch{$('recipe-storage').textContent='This brief lasts for this page only. Existing browser data was preserved.';}}load();});
 $('recipe-close').addEventListener('click',()=>$('source-dialog').close());load();
})();
