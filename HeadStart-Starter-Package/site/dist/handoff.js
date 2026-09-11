/* Protected metadata handoffs. The anonymous Gauntlet prompt is a separate action. */
window.HeadStartHandoff = (() => {
  const pendingKey = "headstart.handoff.pending.v1";
  const node = (tag, text, cls) => {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (cls) el.className = cls;
    return el;
  };
  const canonical = (value) =>
    Array.isArray(value)
      ? "[" + value.map(canonical).join(",") + "]"
      : value && typeof value === "object"
        ? "{" + Object.keys(value).sort().map(k => JSON.stringify(k) + ":" + canonical(value[k])).join(",") + "}"
        : JSON.stringify(value);
  async function digest(value) {
    const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(canonical(value)));
    return Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, "0")).join("");
  }
  async function api(url, body) {
    const session = await window.HeadStartAuth.session();
    const response = await fetch(url, {
      method: body ? "POST" : "GET",
      headers: body ? {"Content-Type": "application/json", "X-CSRF-Token": session.csrf || ""} : {},
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
    const result = await response.json();
    if (!response.ok) throw new Error([result.error?.message, result.error?.action].filter(Boolean).join(" ") || "Handoff unavailable. Verify your email and retry.");
    return result;
  }
  function mount(container, selection, restored = null) {
    const section = node("section", undefined, "detail-panel");
    section.append(node("h3", "Take this system into your game"), node("p", "Prepare a pinned source and notice packet for your coding agent. Email verification is required. You will still review and validate changes in your own project."));
    const label = node("label", "What should this system do in your game?");
    const input = node("textarea"); input.rows = 3; input.maxLength = 4000; input.required = true; input.style.width = "100%"; input.style.boxSizing = "border-box";
    const project = window.HeadStartBriefStore.load(localStorage).state;
    input.value = restored?.intent || project.brief.constraints.experience?.value || "";
    label.append(input);
    const prepare = node("button", "Prepare agent handoff", "secondary"); prepare.type = "button";
    const status = node("p"); status.setAttribute("role", "status"); status.setAttribute("aria-live", "polite");
    const downloads = node("div", undefined, "detail-actions");
    Object.assign(downloads.style, {display: "flex", flexWrap: "wrap", gap: "8px"});
    section.append(label, prepare, status, downloads); container.append(section);
    async function run(request) {
      prepare.disabled = true; downloads.replaceChildren();
      status.textContent = "Checking your verified session and selected source…";
      try {
        const bag = {schemaVersion: 1, selections: request.selections, brief: request.brief, intent: request.intent};
        const authIntent = {action: "prepare_handoff", bagRevision: await digest(bag), selections: request.selections.map(r => ({...r, kind: "component"}))};
        sessionStorage.setItem(pendingKey, JSON.stringify({request, authIntent}));
        if (!await window.HeadStartAuth.require(authIntent)) return;
        const result = await api("/v1/handoffs", request);
        sessionStorage.removeItem(pendingKey);
        sessionStorage.removeItem("headstart.auth.resume");
        status.textContent = "Your handoff is ready. Download it and open it in your coding agent. No agent is connected or started by this action.";
        for (const format of ["json", "markdown"]) {
          const button = node("button", format === "json" ? "Download JSON" : "Download Markdown", "secondary"); button.type = "button";
          button.addEventListener("click", async () => {
            button.disabled = true;
            try {
              // Every download asks the protected server again, including revoked sessions.
              const artifact = await api("/v1/handoffs/" + result.digest + "/" + format);
              const blob = new Blob([artifact.content], {type: format === "json" ? "application/json" : "text/markdown"});
              const url = URL.createObjectURL(blob); const link = document.createElement("a");
              link.href = url; link.download = "headstart-handoff-" + result.digest.slice(0, 12) + (format === "json" ? ".json" : ".md"); link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
              status.textContent = "Handoff downloaded. Inspect the local target and preserve the included creator notices before authorized changes.";
            } catch (error) { status.textContent = error.message; }
            finally { button.disabled = false; }
          });
          downloads.append(button);
        }
      } catch (error) { status.textContent = error.message || "Handoff unavailable. Your selected source is unchanged."; }
      finally { prepare.disabled = false; }
    }
    prepare.addEventListener("click", () => {
      if (!input.reportValidity()) return;
      const brief = window.HeadStartBriefStore.load(localStorage).state.brief;
      run(restored ? {...restored, intent: input.value} : {schemaVersion: 1, selections: [selection], brief: {revision: brief.revision, constraints: brief.constraints}, intent: input.value, recipe: null});
    });
    return {section, run};
  }
  window.addEventListener("headstart-auth-resumed", async (event) => {
    try {
      const pending = JSON.parse(sessionStorage.getItem(pendingKey) || "null");
      if (!pending || canonical(pending.authIntent) !== canonical(event.detail)) return;
      const {request} = pending;
      const expected = await digest({schemaVersion: 1, selections: request.selections, brief: request.brief, intent: request.intent});
      if (expected !== event.detail.bagRevision) return;
      const content = document.getElementById("source-content");
      content.replaceChildren(); document.getElementById("source-title").textContent = "Your selected system";
      const ui = mount(content, request.selections[0], request);
      const dialog = document.getElementById("source-dialog"); if (!dialog.open) dialog.showModal();
      await ui.run(request);
    } catch { /* Corrupt browser recovery state never authorizes a request. */ }
  });
  return {mount};
})();
