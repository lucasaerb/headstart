'use strict';
const $ = id => document.getElementById(id);
const catalog = window.HEADSTART_CATALOG || [];
const gamesById = new Map(catalog.map(game => [game.id, game]));
const storageKey = 'headstart.local-bag.v1';
const BRIEF_LIMIT = 4000;
function node(tag, className, text) { const el = document.createElement(tag); if (className) el.className = className; if (text !== undefined) el.textContent = text; return el; }
function readStored(key) { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } }
const saved = readStored(storageKey);
const selected = new Set(Array.isArray(saved?.ids) ? saved.ids.filter(id => gamesById.has(id)).slice(0, 3) : []);
let brief = typeof saved?.brief === 'string' ? saved.brief.slice(0, BRIEF_LIMIT) : '';
let storageAvailable = true;
function saveBag() { try { localStorage.setItem(storageKey, JSON.stringify({version:1, ids:[...selected], brief})); storageAvailable = true; } catch { storageAvailable = false; } const status=document.querySelector('.bag-local'); if(status)status.textContent=storageAvailable?'Saved in this browser.':'Changes are not saved. Browser storage is unavailable; keep this page open or download your prompt.'; if(!storageAvailable)toast('Changes are not saved. Browser storage is unavailable.'); }
let toastTimer;
function toast(message) { $('toast').textContent = message; $('toast').hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { $('toast').hidden = true; }, 3500); }
const dialogOpeners = new Map();
function openDialog(id, opener) { const dialog = $(id); dialogOpeners.set(id, opener || document.activeElement); dialog.showModal(); document.body.style.overflow = 'hidden'; }
for (const dialog of document.querySelectorAll('dialog')) dialog.addEventListener('close', () => { if (!document.querySelector('dialog[open]')) document.body.style.overflow = ''; const opener = dialogOpeners.get(dialog.id); if (opener?.isConnected) opener.focus(); });
for (const button of document.querySelectorAll('[data-close]')) button.addEventListener('click', () => $(button.dataset.close).close());
$('bag-open').addEventListener('click', () => { renderBag(); openDialog('bag-dialog', $('bag-open')); });
$('library-bag').addEventListener('click', () => { renderBag(); openDialog('bag-dialog', $('library-bag')); });
$('mobile-bag').addEventListener('click', () => { renderBag(); openDialog('bag-dialog', $('mobile-bag')); });
$('how-open').addEventListener('click', () => openDialog('how-dialog', $('how-open')));
$('how-footer').addEventListener('click', () => openDialog('how-dialog', $('how-footer')));
function visitLibrary() { $('games').scrollIntoView({behavior: motionPreference.matches ? 'instant' : 'smooth'}); $('library-title').focus({preventScroll:true}); }
$('hero-browse').addEventListener('click', event => { event.preventDefault(); visitLibrary(); });
$('bag-browse').addEventListener('click', () => { $('bag-dialog').close(); visitLibrary(); });
$('how-browse').addEventListener('click', () => { $('how-dialog').close(); visitLibrary(); });
function isBrowser(game) { return game.platformKind === 'browser'; }
function platformLabel(game){return isBrowser(game)?'Browser':game.platformKind==='desktop'?'Desktop':'Platform unknown';}
function demoStatus(game){if(game.playReview?.status==='interactive_checked')return (game.playReview.editorial_pick?'Curator pick · ':'')+'Play checked '+game.playReview.checked_at.slice(0,10);if(game.playReview?.status==='load_incomplete')return 'Load check incomplete '+game.playReview.checked_at.slice(0,10);return game.demoKind==='browser'?'Demo not yet tested':game.demoKind==='video'?'Video preview · not play-tested':game.demoKind==='native-download'?'Opens project / download page':'No demo available';}
function externalLink(label, url, className) { const link=node('a', className, label); try { const parsed=new URL(url); if (!['https:','http:'].includes(parsed.protocol)) return node('span', className, 'Link unavailable'); link.href=parsed.href; link.target='_blank'; link.rel='noopener noreferrer'; } catch { return node('span', className, 'Link unavailable'); } return link; }
const pretty = value => value.replaceAll('-', ' ').replace(/^./, c => c.toUpperCase());
for (const genre of [...new Set(catalog.flatMap(g => g.genres))].sort()) { const option=node('option','',pretty(genre));option.value=genre;$('genre').append(option); }
for (const kind of [...new Set(catalog.map(g => g.contentKind))].filter(Boolean).sort()) { const option=node('option','',pretty(kind));option.value=kind;$('content-kind').append(option); }
for (const runtime of [...new Set(catalog.map(g => g.runtime))].filter(Boolean).sort()) { const option=node('option','',runtime);option.value=runtime;$('runtime').append(option); }
function starLabel(game){return Number.isInteger(game.githubStars)?'★ '+new Intl.NumberFormat('en',{notation:'compact',maximumFractionDigits:1}).format(game.githubStars):game.popularity?.status==='not_github'?'Not on GitHub':'Stars unavailable';}
function modelNames(game) { return game.aiProvenance?.status === 'creator_attributed' ? game.aiProvenance.models : []; }
function modelLabel(game) { const models=modelNames(game); return models.length ? models.join(' + ')+' · creator-reported' : 'Model unknown'; }
function imageReviewLabel(preview){return preview.rightsStatus==='candidate_local_display_pending_independent_review'?'Pending independent media/rights review':preview.rightsStatus==='official_source_local_display_rights_unresolved'?'Official-source local display; broader rights unresolved':'Reviewed for catalog display';}
for (const model of [...new Set(catalog.flatMap(modelNames))].sort()) { const option=node('option','',model);option.value=model;$('model').append(option); }
const unknownModel=node('option','','Model unknown');unknownModel.value='unknown';$('model').append(unknownModel);
let currentResults = [];
function placeholder(game) { const wrap=node('div','missing-preview');wrap.append(node('span','game-glyph',game.genres.includes('racing')?'⌁':'◇'),node('p','','Preview not captured'));return wrap; }
function renderGames() {
 const query=$('search-games').value.trim().toLowerCase(); const genre=$('genre').value; const contentKind=$('content-kind').value; const platform=$('platform').value; const runtime=$('runtime').value; const style=$('style').value; const model=$('model').value;
 currentResults=catalog.filter(game => (!query || [game.title,game.creator,game.summary,...game.genres,...game.capabilities,...game.platforms,game.contentKind,game.runtime,...game.visualStyle,...modelNames(game)].join(' ').toLowerCase().includes(query)) && (!genre || game.genres.includes(genre)) && (!contentKind || game.contentKind===contentKind) && (!platform || (platform==='browser' ? isBrowser(game) : game.platformKind==='desktop')) && (!runtime || game.runtime===runtime) && (!style || game.dimension===style) && (!model || (model==='unknown' ? modelNames(game).length===0 : modelNames(game).includes(model))));
 if($('sort').value==='stars'){currentResults.sort((a,b)=>(b.githubStars??-1)-(a.githubStars??-1)||a.title.localeCompare(b.title)||a.id.localeCompare(b.id));}
 $('game-grid').replaceChildren();
 for (const game of currentResults) {
  const card=node('article','game-card'+(selected.has(game.id)?' picked':''));card.dataset.game=game.id;
  const preview=node('div','game-preview');
  if(game.preview){const img=node('img');img.src=game.preview.src;img.alt=game.preview.alt;img.loading='lazy';img.width=640;img.height=400;img.addEventListener('error',()=>{preview.replaceChildren(placeholder(game));},{once:true});preview.append(img,node('span','preview-label','Game image'));}else preview.append(placeholder(game));
  const body=node('div','game-body');body.append(node('h3','',game.title),node('p','game-summary',game.summary));const tags=node('div','game-tags');const sites=(game.platforms||[]).some(p=>p.toLowerCase()==='sites');tags.setAttribute('aria-label','Categories: '+[pretty(game.contentKind),...game.genres.map(pretty),...(sites?['Sites']:[]),platformLabel(game),game.runtime].join(', '));tags.append(node('span','category-chip',pretty(game.contentKind)));if(sites)tags.append(node('span','category-chip','Sites'));for(const genreName of game.genres.slice(0,2))tags.append(node('span','',pretty(genreName)));tags.append(node('span','',platformLabel(game)),node('span','',game.dimension.toUpperCase()));const stars=node('span','github-stars',starLabel(game));stars.title=Number.isInteger(game.githubStars)?game.githubStars.toLocaleString('en')+' stars on the repository · Checked '+(game.popularity?.checked_at||'date unknown').slice(0,10)+' · Shared by subprojects':starLabel(game);stars.setAttribute('aria-label',stars.title);tags.append(stars);body.append(tags,node('p','runtime-credit','Runtime: '+game.runtime),node('p','model-credit',modelLabel(game)));
  const actions=node('div','game-actions');const demoLink=externalLink(game.label+' ↗',game.demoUrl);if(game.label==='Play demo'&&demoLink.tagName==='A'){demoLink.dataset.demoGame=game.id;demoLink.dataset.demoTitle=game.title;}actions.append(demoLink);const add=node('button',selected.has(game.id)?'in-bag':'',selected.has(game.id)?'✓ In bag':'Add to bag');add.type='button';add.dataset.add=game.id;add.setAttribute('aria-label',(selected.has(game.id)?'Remove ':'Add ')+game.title+(selected.has(game.id)?' from bag':' to bag'));add.setAttribute('aria-pressed',String(selected.has(game.id)));add.addEventListener('click',()=>toggleGame(game.id));actions.append(add);body.append(actions);
  const source=node('div','game-source');source.append(node('span','',demoStatus(game)+(game.sourceAvailability==='no_public_source'?' · No public source':!game.rights.code_license?' · License unknown':game.rights.code_license.includes('Noncommercial')?' · Noncommercial source':'')));const details=node('button','',game.sourceAvailability==='no_public_source'?'Evidence & image':'Source & image');details.setAttribute('aria-label','View project evidence and image credits for '+game.title);details.addEventListener('click',()=>showSource(game,details));source.append(details);body.append(source);card.append(preview,body);$('game-grid').append(card);
 }
 $('result-count').textContent=currentResults.length+' of '+catalog.length+' projects';$('clear-filters').hidden=!(query||genre||contentKind||platform||runtime||style||model);$('empty-games').hidden=currentResults.length>0;
}
function toggleGame(id) {
 if(selected.has(id)){selected.delete(id);toast(gamesById.get(id).title+' removed from your bag.');}else {if(selected.size===3){toast('Your bag has three games. Remove one to add another.');return;}selected.add(id);toast(gamesById.get(id).title+' added to your bag.');}
 saveBag();syncCardButtons();renderBag();if(!storageAvailable)toast('Your bag is available this visit. Browser storage is unavailable.');
}
function syncCardButtons(){for(const button of document.querySelectorAll('[data-add]')){const picked=selected.has(button.dataset.add);button.classList.toggle('in-bag',picked);button.textContent=picked?'✓ In bag':'Add to bag';button.setAttribute('aria-pressed',String(picked));button.setAttribute('aria-label',(picked?'Remove ':'Add ')+gamesById.get(button.dataset.add).title+(picked?' from bag':' to bag'));button.closest('.game-card').classList.toggle('picked',picked);}}
function renderBag(){
 $('bag-count').textContent=selected.size;$('mobile-bag-count').textContent=selected.size;$('library-bag-count').textContent=selected.size;$('bag-description').textContent=selected.size?selected.size+' of 3 starting points selected.':'Your next idea is waiting.';$('bag-empty').hidden=selected.size>0;$('bag-brief').hidden=selected.size===0;$('bag-items').replaceChildren();
 for(const id of selected){const game=gamesById.get(id);const row=node('article','bag-item');if(game.preview){const img=node('img');img.src=game.preview.src;img.alt='';row.append(img);}else row.append(node('span','bag-thumb'));const text=node('div');text.append(node('h3','',game.title),node('p','',pretty(game.genres[0])+' · '+(platformLabel(game))));const remove=node('button','','×');remove.setAttribute('aria-label','Remove '+game.title+' from bag');remove.addEventListener('click',()=>{toggleGame(id);const next=$('bag-items').querySelector('button');(next||$('bag-browse')).focus();});row.append(text,remove);$('bag-items').append(row);}
 refreshPrompt();$('remix-idea').value=brief;document.querySelector('.bag-local').textContent=storageAvailable?'Saved in this browser.':'Changes are not saved. Browser storage is unavailable; keep this page open or download your prompt.';
}
$('remix-idea').addEventListener('input',event=>{brief=event.target.value.slice(0,BRIEF_LIMIT);saveBag();refreshPrompt();});
function currentPrompt(){return window.HeadStartGauntlet.buildPrompt({games:[...selected].map(id=>gamesById.get(id)),brief});}
function refreshPrompt(){
 const available=selected.size>0;for(const id of ['continue-astra','download-bag'])$(id).disabled=!available;
 $('gauntlet-prompt').value='';
 $('chatgpt-fallback').hidden=true;
 $('prompt-status').textContent='Opens ChatGPT and copies this prompt. Paste it into a chat with Astra; your bag is not synced automatically.';
 if(!available){$('prompt-preview').open=false;return;}
 try{$('gauntlet-prompt').value=currentPrompt();}catch(error){for(const id of ['continue-astra','download-bag'])$(id).disabled=true;$('prompt-status').textContent='The prompt could not be prepared. Reload this page and try again.';}
}
$('continue-astra').addEventListener('click',async()=>{
 if(!selected.size)return;
 const fallback=$('chatgpt-fallback');fallback.hidden=true;
 try{
  const result=await window.HeadStartAstra.continueWithAstra(currentPrompt());
  fallback.hidden=result.opened;
  if(result.copied&&result.opened){$('prompt-status').textContent='ChatGPT opened and the prompt was copied. Choose Astra, then paste the prompt into the new chat.';toast('ChatGPT opened. Prompt copied.');return;}
  if(result.copied){$('prompt-status').textContent='The prompt was copied, but the new tab was blocked. Use Open ChatGPT, then paste it into a chat with Astra.';toast('Prompt copied. Open ChatGPT to continue.');return;}
  $('prompt-preview').open=true;const preview=$('gauntlet-prompt');preview.focus();preview.select();
  $('prompt-status').textContent=result.opened?'ChatGPT opened, but clipboard access is unavailable. Return here to copy the selected prompt or download it.':'The new tab and clipboard were unavailable. Use Open ChatGPT, then copy the selected prompt or download it.';
 }
 catch(error){fallback.hidden=false;$('prompt-preview').open=true;const preview=$('gauntlet-prompt');preview.focus();preview.select();$('prompt-status').textContent='Continue could not finish. Use Open ChatGPT, then copy the selected prompt or download it.';}
});
$('download-bag').addEventListener('click',()=>{
 if(!selected.size)return;
 try{const blob=new Blob([currentPrompt()],{type:'text/markdown;charset=utf-8'});const url=URL.createObjectURL(blob);const a=node('a');a.href=url;a.download='headstart-gauntlet-loop.md';document.body.append(a);try{a.click();}finally{a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}$('prompt-status').textContent='Prompt downloaded. Open the Markdown file and paste its contents into a new agent chat.';toast('Gauntlet Loop prompt downloaded.');}
 catch(error){$('prompt-status').textContent='Download unavailable. Use Copy prompt or select the text in Preview the prompt.';}
});
function showSource(game,opener){$('source-title').textContent=game.title;const content=$('source-content');content.replaceChildren();content.append(node('p','',game.creator),externalLink(game.sourceAvailability==='no_public_source'?'View official project ↗':'View pinned source ↗',game.pinnedSourceUrl||game.projectUrl||game.repoUrl));if(game.sourceAvailability==='no_public_source')content.append(node('p','','No public source repository or immutable source revision is linked in the inspected official evidence. This is a playable reference only; source export and reuse are unavailable.'));content.append(node('p','','Category: '+pretty(game.contentKind)+'. Genres: '+game.genres.map(pretty).join(', ')+'.'),node('p','','Runtime: '+game.runtime+' · Style: '+game.dimension.toUpperCase()+(game.visualStyle.length?' · '+game.visualStyle.map(pretty).join(', '):'')),node('p','','Reuse review required. Code license: '+(game.rights.code_license||'Unknown — no project license established')+'. '+game.rights.asset_notes+' Selected code, assets and dependencies need review for your game.'),node('p','',demoStatus(game)+'. '+game.demoNotes));if(game.playReview){content.append(node('h3','','Play observation'),node('p','',game.playReview.result),node('p','',game.playReview.scenario),node('p','','Environment: '+game.playReview.environment+'. Limitations: '+game.playReview.limitations));}if(game.buildingBlocks?.length){content.append(node('h3','','Systems to explore'));for(const block of game.buildingBlocks){const line=node('p','');line.append(externalLink(block.name+' ↗',block.evidence_url),node('span','',' — '+block.notes));content.append(line);}} content.append(node('h3','','Popularity signal'),node('p','',Number.isInteger(game.githubStars)?game.githubStars.toLocaleString('en')+' GitHub stars · checked '+(game.popularity?.checked_at||'date unknown').slice(0,10)+'. Count belongs to the repository and is shared by its subprojects.':starLabel(game)));if(game.popularity?.evidence_url){content.append(externalLink(game.popularity.status==='not_github'?'Official project ↗':'GitHub count source ↗',game.popularity.evidence_url));}content.append(node('h3','','Model attribution'),node('p','',modelLabel(game))); if(game.aiProvenance){if(!(game.aiProvenance.evidence||[]).some(e=>e.claim===game.aiProvenance.notes)){content.append(node('p','',game.aiProvenance.notes));}for(const evidence of game.aiProvenance.evidence||[]){const line=node('p','');line.append(externalLink('Creator attribution ↗',evidence.url),node('span','',' — '+evidence.claim));content.append(line);}} content.append(node('p','','Model attribution describes the creator’s reported workflow; it is separate from code rights and successful integration.')); if(game.preview){content.append(node('h3','','Game image'),node('p','',game.preview.credit),node('p','','Image review status: '+imageReviewLabel(game.preview)),node('p','','Image rights: '+game.preview.licenseExpression),node('p','',game.preview.allowedUse),node('p','',game.preview.versionRelation),externalLink('Image source ↗',game.preview.sourcePage),externalLink('Rights evidence ↗',game.preview.licenseEvidenceUrl));for(const url of game.preview.licenseUrls){const line=node('p','');line.append(externalLink('Related terms or source ↗',url));content.append(line);}}else content.append(node('p','','No verified image has been captured for this preview.'));openDialog('source-dialog',opener);}
function clearFilters(){for(const id of ['search-games','genre','content-kind','platform','style','runtime','model'])$(id).value='';renderGames();}
for(const id of ['genre','content-kind','platform','style','runtime','model'])$(id).addEventListener('change',renderGames);$('sort').addEventListener('change',renderGames);$('search-games').addEventListener('input',renderGames);$('clear-filters').addEventListener('click',clearFilters);$('reset-games').addEventListener('click',clearFilters);
for(const mode of ['grid','list'])$(mode+'-view').addEventListener('click',()=>{$('game-grid').classList.toggle('list',mode==='list');for(const id of ['grid','list']){$(id+'-view').classList.toggle('active',id===mode);$(id+'-view').setAttribute('aria-pressed',String(id===mode));}});
// World coordinates keep the explorer on the painted bridge even as the viewport and parallax change.
const hero=$('home'),scene=document.querySelector('.scene'),companion=$('companion'),position=$('companion-position'),targetMarker=document.querySelector('.bridge-target');
const worldVideo=$('world-video');
// The ambient plate is a real local video with the C4b image as an offline poster.
// If the browser cannot decode it, the still plate remains visible.
let videoEnabled=true;
let videoPlayPending=false;
worldVideo.muted=true;
worldVideo.addEventListener('playing',()=>{hero.classList.add('video-ready');});
worldVideo.addEventListener('error',()=>{videoEnabled=false;hero.classList.remove('video-ready');hero.dataset.video='fallback';});
function syncVideo(){if(!videoEnabled||paused||!inView||document.hidden){worldVideo.pause();return;}if(!worldVideo.getAttribute('src'))worldVideo.src=worldVideo.dataset.src;if(worldVideo.paused&&!videoPlayPending){videoPlayPending=true;worldVideo.play().catch(error=>{if(error.name!=='AbortError'){hero.dataset.video='blocked';setPaused(true,false);}}).finally(()=>{videoPlayPending=false;});}}
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
let paused=motionPreference.matches||readStored('headstart.world-paused')===true;
let sceneScale=1,sceneX=0,sceneY=0,parallaxX=0,parallaxY=0,targetParallaxX=0,targetParallaxY=0;
let walkerX=690,targetX=690,frame=0,lastTime=0,inView=true,direction=1;
const path=[[340,880],[480,844],[630,802],[785,775],[935,755],[1080,762],[1220,789]];
function bridgeY(x){let i=0;while(i<path.length-2&&x>path[i+1][0])i++;const[a,b]=[path[i],path[i+1]];return a[1]+(b[1]-a[1])*((x-a[0])/(b[0]-a[0]));}
function clamp(value,min,max){return Math.max(min,Math.min(max,value));}
function layoutWorld(){const width=hero.clientWidth,height=hero.clientHeight,mobile=width<=1050;sceneScale=mobile?Math.max(Math.min(width/1050,.74),(height*.54)/1024):Math.max(width/1536,height/1024)*1.018;sceneX=(width-1536*sceneScale)*(mobile?.52:.5);sceneY=mobile?height-1024*sceneScale+10:(height-1024*sceneScale)*.6;const [min,max]=walkerLimits();walkerX=clamp(walkerX,min,max);targetX=clamp(targetX,min,max);renderWorld();}
function walkerLimits(){const margin=Math.max(65,115*sceneScale)/2+15;return [Math.max(430,(margin-sceneX)/sceneScale),Math.min(1160,(hero.clientWidth-margin-sceneX)/sceneScale)];}
function renderWorld(){const x=sceneX+parallaxX,y=sceneY+parallaxY;scene.style.transform=`translate(${x}px,${y}px) scale(${sceneScale})`;$('foreground').style.transform=`translate(${parallaxX*2.8}px,${parallaxY*2.4}px)`;const size=Math.max(65,115*sceneScale);position.style.width=size+'px';position.style.height=size+'px';position.style.left=(x+walkerX*sceneScale)+'px';position.style.top=(y+bridgeY(walkerX)*sceneScale+size*.13)+'px';companion.style.scale=direction+' 1';const screenX=x+walkerX*sceneScale;const speechX=clamp(screenX,105,hero.clientWidth-105);$('companion-speech').style.left=(size/2+speechX-screenX)+'px';$('companion-speech').style.transform='translateX(-50%)';targetMarker.style.left=targetX+'px';targetMarker.style.top=bridgeY(targetX)+'px';hero.dataset.walkerX=walkerX.toFixed(2);hero.dataset.sceneScale=sceneScale.toFixed(3);}
function animate(time){frame=0;if(paused||!inView||document.hidden)return;const dt=lastTime?Math.min((time-lastTime)/1000,.05):0;lastTime=time;const dx=targetX-walkerX;const moving=Math.abs(dx)>1;if(moving){direction=dx>0?1:-1;walkerX+=Math.sign(dx)*Math.min(Math.abs(dx),dt*105);}companion.classList.toggle('moving',moving);parallaxX+=(targetParallaxX-parallaxX)*Math.min(1,dt*4);parallaxY+=(targetParallaxY-parallaxY)*Math.min(1,dt*4);renderWorld();frame=requestAnimationFrame(animate);}
function runWorld(){syncVideo();if(!paused&&inView&&!document.hidden&&!frame){lastTime=0;frame=requestAnimationFrame(animate);}}
function setPaused(value,remember=true){paused=value;hero.dataset.paused=String(paused);$('pause-world').setAttribute('aria-pressed',String(paused));$('pause-label').textContent=paused?'Play world':'Pause world';$('pause-icon').textContent=paused?'▶':'Ⅱ';$('world-instructions').textContent=paused?'The world is resting.':matchMedia('(pointer:coarse)').matches?'Tap the bridge to explore':'Move your cursor to explore';companion.classList.remove('moving');if(paused){cancelAnimationFrame(frame);frame=0;worldVideo.pause();}else runWorld();if(remember)try{localStorage.setItem('headstart.world-paused',JSON.stringify(paused));}catch{} }
$('pause-world').addEventListener('click',()=>setPaused(!paused));motionPreference.addEventListener('change',event=>{if(event.matches)setPaused(true,false);});
function pointWorld(event){if(paused||event.target.closest('a,button,input,textarea,select'))return;const rect=hero.getBoundingClientRect();const px=event.clientX-rect.left,py=event.clientY-rect.top;targetParallaxX=(.5-px/rect.width)*11;targetParallaxY=(.5-py/rect.height)*7;targetX=clamp((px-sceneX-parallaxX)/sceneScale,...walkerLimits());targetMarker.style.opacity='.8';runWorld();}
hero.addEventListener('pointermove',event=>{if(event.pointerType!=='touch')pointWorld(event);});hero.addEventListener('pointerdown',event=>{if(event.pointerType==='touch')pointWorld(event);});hero.addEventListener('pointerleave',()=>{targetParallaxX=0;targetParallaxY=0;targetMarker.style.opacity='0';});
companion.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const [min,max]=walkerLimits();targetX=event.key==='Home'?min:event.key==='End'?max:clamp(targetX+(event.key==='ArrowRight'?90:-90),min,max);if(paused){direction=targetX>=walkerX?1:-1;walkerX=targetX;renderWorld();}else runWorld();});companion.addEventListener('click',()=>{const words=['Let’s find your starting point.','Three games. One new idea.','Follow your curiosity.'];const current=words.indexOf($('companion-speech').textContent);$('companion-speech').textContent=words[(current+1)%words.length];});
new ResizeObserver(layoutWorld).observe(hero);new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;document.body.classList.toggle('hero-away',!inView);hero.classList.toggle('offscreen',!inView);if(!inView){cancelAnimationFrame(frame);frame=0;worldVideo.pause();}else runWorld();},{threshold:.02}).observe(hero);document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;worldVideo.pause();}else runWorld();});
for(const id of ['foreground','world-art'])$(id).addEventListener('error',()=>{$(id).hidden=true;});
renderGames();renderBag();layoutWorld();setPaused(paused,false);
