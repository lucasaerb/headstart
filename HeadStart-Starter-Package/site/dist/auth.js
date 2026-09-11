/* Verification is separate from demo email preferences and marketing consent. */
(() => {
  const pending = "headstart.auth.intent", resume = "headstart.auth.resume";
  async function api(path, body, csrf) {
    const response = await fetch("/api/auth/" + path, {method:body?"POST":"GET",headers:body?{"Content-Type":"application/json",...(csrf?{"X-CSRF-Token":csrf}:{})}:{},body:body?JSON.stringify(body):undefined});
    const data=await response.json(); if(!response.ok) throw new Error(data.error?.code || "AUTH_UNAVAILABLE");return data;
  }
  window.HeadStartAuth={
    async session(){return api("session");},
    async require(intent){
      const current=await api("session");if(current.state==="verified") return true;
      sessionStorage.setItem(pending,JSON.stringify(intent));location.assign("auth.html");return false;
    },
  };
  if(!document.getElementById("auth-form")) {
    try {
      const raw=sessionStorage.getItem(resume);
      if(raw){
        // Deferred consumers must finish loading before the recovery event.
        // Keep the recovery intent until its consumer acknowledges success.
        const dispatch=()=>window.dispatchEvent(new CustomEvent("headstart-auth-resumed",{detail:JSON.parse(raw)}));
        if(document.readyState==="complete") setTimeout(dispatch,0);
        else document.addEventListener("DOMContentLoaded",dispatch,{once:true});
      }
    } catch {}
    return;
  }
  const $=id=>document.getElementById(id),status=$("auth-status");
  window.addEventListener("hashchange",()=>location.reload());
  const fragment=new URLSearchParams(location.hash.slice(1));
  history.replaceState(null,"",location.pathname);
  let csrf="", challenge=fragment.get("challenge"),token=fragment.get("token");
  function error(e){status.textContent= e.message==="VERIFICATION_FAILED" ? "This link is invalid, expired or already used. Request a new link in this browser. Your bag is unchanged." : e.message==="DELIVERY_UNAVAILABLE" ? "Email delivery is unavailable. For local development, enable the private preview adapter. Your bag is unchanged." : e.message==="RATE_LIMITED" ? "Too many attempts. Wait 15 minutes before trying again. Your bag is unchanged." : "Verification is unavailable. Please try again; your bag is unchanged.";}
  $("auth-form").addEventListener("submit",async event=>{event.preventDefault();const button=event.submitter;button.disabled=true;try{const selected=JSON.parse(sessionStorage.getItem(pending)||"null") || {action:"account",bagRevision:"0".repeat(64),selections:[]};const result=await api("challenge",{email:$("auth-email").value,intent:selected});status.textContent="Link prepared in the local delivery preview. Open it in this browser within 10 minutes. Preview reference: "+result.challenge;$("auth-confirm").hidden=true;}catch(e){error(e);}finally{button.disabled=false;}});
  $("auth-confirm").hidden=!(challenge&&token);
  if(challenge&&token){status.textContent="Your link is ready. Confirm to return to the selected bag.";$("auth-confirm").focus();}
  $("auth-confirm").addEventListener("click",async()=>{const button=$("auth-confirm");button.disabled=true;try{const result=await api("verify",{challenge,token});token="";sessionStorage.setItem(resume,JSON.stringify(result.intent));sessionStorage.removeItem(pending);location.replace(result.returnTo);}catch(e){error(e);}finally{button.disabled=false;}});
  $("auth-logout").addEventListener("click",async()=>{try{await api("logout",{},csrf);status.textContent="Signed out. Local MCP access is revoked. Your bag stays in this browser.";$("auth-logout").hidden=true;$("auth-connect").hidden=true;}catch(e){error(e);}});
  $("auth-connect").addEventListener("click",async()=>{try{const result=await api("connect",{request:fragment.get("connect")},csrf);status.textContent=result.message;$("auth-connect").hidden=true;}catch(e){error(e);}});
  api("session").then(result=>{if(result.state==="verified"){csrf=result.csrf;$("auth-logout").hidden=false;if(fragment.has("connect")){$("auth-connect").hidden=false;status.textContent="Approve only if you just ran the local MCP connection command. Access expires within one hour and signing out revokes it. No local editing is authorized.";}}}).catch(error);
})();
