// Optional leading indicators only. Never send text, URLs, email or target data.
(() => {
 const allowed=new Set(['search','detail','demo','source','handoff','plugin_lookup','first_plan','reuse_self_reported']);
 async function record(type){
  if(!allowed.has(type))return;
  try{const preference=JSON.parse(localStorage.getItem('headstart.telemetry.v1'));if(preference?.consent!==true||!/^\w{64}$/.test(preference.deletionToken))return;
   const eventId=Array.from(crypto.getRandomValues(new Uint8Array(32)),x=>x.toString(16).padStart(2,'0')).join('');
   await fetch('/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({consent:true,event:{eventId,deletionToken:preference.deletionToken,type}})});
  }catch{/* Discovery remains usable when telemetry or storage is unavailable. */}
 }
 window.HeadStartTelemetry=Object.freeze({record});
 document.addEventListener('change',event=>{if(event.target.id==='search-games')record('search');});
 document.addEventListener('submit',event=>{if(event.target.id==='systems-search')record('search');});
 document.addEventListener('click',event=>{const link=event.target.closest('a');if(link?.id==='demo-launch')record('demo');else if(link?.closest('#source-content')&&/^https:\/\/(github.com|gitlab.com|codeberg.org)\//.test(link.href))record('source');});
 const detail=document.getElementById('source-dialog');if(detail)new MutationObserver(()=>{if(detail.open)record('detail');}).observe(detail,{attributes:true,attributeFilter:['open']});
})();
