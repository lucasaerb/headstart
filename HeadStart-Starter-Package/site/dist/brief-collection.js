"use strict";
(() => {
  const core = window.HeadStartBriefStore;
  let loaded = core.load({ getItem: (key) => localStorage.getItem(key) }),
    state = loaded.state,
    recovery = loaded.recovery,
    warning = loaded.warning;
  const current = new Map();
  const key = (s) => s.kind + ":" + s.id;
  const el = (tag, text, cls) => {
    const n = document.createElement(tag);
    if (text !== undefined) n.textContent = text;
    if (cls) n.className = cls;
    return n;
  };
  const button = (text, fn, cls = "secondary") => {
    const n = el("button", text, cls);
    n.type = "button";
    n.addEventListener("click", fn);
    return n;
  };
  let dialog, notice, content, opener, viewMode, savedRefresh = null;
  function persist() {
    if (recovery) {
      warning =
        "Your changes are available this visit. Export the recovery copy and reset before replacing older data.";
      return;
    }
    try {
      localStorage.setItem(core.KEY, JSON.stringify(state));
      warning = "";
    } catch {
      warning =
        "Changes are not saved. Browser storage is unavailable; export your project before leaving.";
    }
  }
  function sync() {
    document.querySelectorAll("[data-save-version]").forEach((b) => {
      const yes = state.saved.some(
        (s) =>
          s.kind === b.dataset.saveKind &&
          s.id === b.dataset.saveId &&
          s.version === b.dataset.saveVersion,
      );
      b.textContent = yes ? "✓ Saved" : "Save";
      b.setAttribute("aria-pressed", String(yes));
    });
    if (notice) {
      notice.textContent = warning;
      notice.hidden = !warning;
    }
  }
  function saveButton(item, kind = "project") {
    const s = core.snapshot(item, kind);
    current.set(key(s), s);
    const b = button(
      "Save",
      () => {
        try {
          state = core.toggle(state, s);
          persist();
          sync();
        } catch (e) {
          warning = e.message;
          sync();
        }
      },
      "text-button project-save-button",
    );
    b.dataset.saveVersion = s.version;
    b.dataset.saveId = s.id;
    b.dataset.saveKind = kind;
    b.setAttribute("aria-label", "Save " + s.title + " for comparison");
    queueMicrotask(sync);
    return b;
  }
  function observe(items, kind = "project") {
    for (const item of items) {
      const s = core.snapshot(item, kind);
      current.set(key(s), s);
    }
  }
  function exportData(data, name) {
    const blob = new Blob(
      [typeof data === "string" ? data : JSON.stringify(data, null, 2)],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob),
      a = el("a");
    a.href = url;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const labels = {
    experience: "What are you making?",
    style: "Style or references",
    runtime: "Runtime",
    runtimeVersion: "Runtime version",
    platform: "Target platform",
    device: "Representative device",
    camera: "Camera",
    input: "Controls",
    scope: "Scope",
    budgets: "Time, performance or download goals",
    preserve: "Systems to preserve",
  };
  function edit() {
    viewMode = "brief";
    content.setAttribute("aria-busy", "false");
    content.replaceChildren();
    const form = el("form");
    form.id = "project-brief-form";
    form.append(
      el(
        "p",
        "Start with your idea. Everything else is optional; add constraints when they change your choices.",
        "project-intro",
      ),
    );
    const grid = el("div", undefined, "project-fields");
    const optional = el("details");
    optional.append(el("summary", "Optional constraints & assumptions"));
    const extras = el("div", undefined, "project-fields");
    optional.append(extras);
    for (const field of core.fields) {
      const label = el("label", undefined, "project-field");
      label.append(el("span", labels[field]));
      const input = el("input");
      input.name = field;
      input.maxLength = 4000;
      input.value = state.brief.constraints[field]?.value || "";
      if (field === "experience" && !input.value) {
        const query = document.getElementById("search-games")?.value.trim();
        if (query) input.value = query;
      }
      const origin = el("select");
      origin.name = field + "-origin";
      origin.setAttribute("aria-label", labels[field] + " origin");
      for (const [value, text] of [
        ["explicit", "My constraint"],
        ["inferred", "Assumption · editable"],
      ]) {
        const option = el("option", text);
        option.value = value;
        origin.append(option);
      }
      origin.value =
        state.brief.constraints[field]?.origin ||
        (field === "experience" && input.value ? "inferred" : "explicit");
      label.append(input, origin);
      (field === "experience" ? grid : extras).append(label);
    }
    form.append(grid, optional);
    const actions = el("div", undefined, "project-actions");
    const submit = el("button", "Save brief", "primary");
    submit.type = "submit";
    actions.append(
      submit,
      el("span", "Revision " + state.brief.revision, "project-intro"),
    );
    form.append(actions);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form),
        constraints = {};
      for (const f of core.fields) {
        const value = data.get(f).trim();
        if (value) constraints[f] = { value, origin: data.get(f + "-origin") };
      }
      state = core.revise(state, constraints);
      persist();
      sync();
      edit();
      const message = el(
        "p",
        warning
          ? "Brief updated for this visit."
          : "Brief saved in this browser.",
      );
      message.setAttribute("role", "status");
      content.prepend(message);
    });
    content.append(form);
  }
  async function checkSaved() {
    const kinds = [...new Set(state.saved.map((s) => s.kind))];
    await Promise.all(
      kinds.map(async (kind) => {
        const matches = new Map();
        for (const saved of state.saved.filter((s) => s.kind === kind))
          current.delete(key(saved));
        try {
          let cursor = null;
          for (let page = 0; page < 20; page++) {
            const query = new URLSearchParams({ limit: "50" });
            if (kind === "component") query.set("type", "component");
            if (cursor) query.set("cursor", cursor);
            const response = await fetch(
              (kind === "component"
                ? "/api/catalog/search?"
                : "/api/research?") + query,
              { signal: AbortSignal.timeout(10000) },
            );
            if (!response.ok) return;
            const data = await response.json();
            if (!Array.isArray(data.items)) return;
            for (const item of data.items)
              matches.set(item.id, core.snapshot(item, kind));
            cursor = data.nextCursor;
            if (!cursor) {
              for (const saved of state.saved.filter((s) => s.kind === kind))
                current.set(key(saved), matches.get(saved.id) || null);
              return;
            }
          }
          // A bounded incomplete scan cannot establish that a saved ID is absent.
        } catch {
          /* Failed checks remain visibly unknown. */
        }
      }),
    );
  }
  function savedView(compare = false) {
    viewMode = compare ? "compare" : "saved";
    content.setAttribute("aria-busy", String(Boolean(savedRefresh)));
    content.replaceChildren();
    const top = el(
      "p",
      compare
        ? "Compare public metadata for up to four saved versions. Unknowns need inspection; these are not integration recommendations."
        : "Keep useful references here, separately from your three-game remix bag. Saved versions stay pinned.",
      "project-intro",
    );
    content.append(top);
    if (!state.saved.length) {
      content.append(
        el(
          "p",
          "No saved projects yet. Use Save on a game or reviewed system.",
        ),
      );
      return;
    }
    const list = el(
      "div",
      undefined,
      compare ? "project-compare" : "project-saves",
    );
    const visible = compare
      ? state.saved
          .filter((s) =>
            selectedCompare.has(s.kind + ":" + s.id + ":" + s.version),
          )
          .slice(0, 4)
      : state.saved;
    if (compare && !visible.length) {
      content.append(
        el("p", "Choose up to four items in Saved, then open Compare."),
      );
      return;
    }
    for (const s of visible) {
      const card = el("article", undefined, "project-save");
      const statusLine = el("p", core.status(s, current.get(key(s))), "project-version project-status");
      statusLine.dataset.kind = s.kind;
      statusLine.dataset.id = s.id;
      statusLine.dataset.version = s.version;
      card.append(
        el("h3", s.title),
        el("p", s.kind + " · " + s.version, "project-version"),
        statusLine,
      );
      if (compare) {
        const dl = el("dl");
        for (const [f, label] of Object.entries({
          runtime: "Runtime",
          rights: "Rights",
          readiness: "Readiness",
          style: "Style",
          dependencies: "Known dependencies",
        })) {
          dl.append(el("dt", label), el("dd", s.facts[f]));
        }
        card.append(dl);
        const target = state.brief.constraints.runtime;
        card.append(
          el(
            "p",
            target
              ? "Your runtime: " +
                  target.value +
                  " (" +
                  target.origin +
                  "). Compatibility has not been established."
              : "No runtime constraint set. Add one to your brief when it matters.",
            "project-intro",
          ),
        );
      } else {
        const label = el("label");
        const input = el("input");
        input.type = "checkbox";
        const id = s.kind + ":" + s.id + ":" + s.version;
        input.checked = selectedCompare.has(id);
        input.addEventListener("change", () => {
          if (input.checked && selectedCompare.size >= 4) {
            input.checked = false;
            warning = "Compare up to four saved versions at a time.";
            sync();
            return;
          }
          input.checked ? selectedCompare.add(id) : selectedCompare.delete(id);
        });
        label.append(input, document.createTextNode(" Compare"));
        card.append(
          label,
          button(
            "Remove",
            () => {
              state = core.toggle(state, s);
              selectedCompare.delete(id);
              persist();
              sync();
              savedView();
            },
            "text-button",
          ),
        );
      }
      list.append(card);
    }
    content.append(list);
  }
  const selectedCompare = new Set(
    state.saved.slice(0, 4).map((s) => s.kind + ":" + s.id + ":" + s.version),
  );
  function open(from) {
    opener = from;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    sync();
    edit();
  }
  function init() {
    dialog = el("dialog", undefined, "project-dialog");
    dialog.id = "project-dialog";
    dialog.setAttribute("aria-labelledby", "project-title");
    const heading = el("h2", "Your next game");
    heading.id = "project-title";
    const close = button("Close", () => dialog.close(), "text-button");
    const header = el("div", undefined, "project-tools");
    header.append(heading, close);
    dialog.append(
      header,
      el(
        "p",
        "Your brief and shortlist, saved only in this browser.",
        "project-intro",
      ),
    );
    notice = el("p", warning, "project-warning");
    notice.setAttribute("role", "status");
    dialog.append(notice);
    const tabs = el("nav", undefined, "project-tabs");
    tabs.setAttribute("aria-label", "Project views");
    tabs.append(
      button("Brief", edit),
      button("Saved", async () => {
        savedView();
        content.setAttribute("aria-busy", "true");
        if (!savedRefresh) {
          savedRefresh = checkSaved().finally(() => {
            savedRefresh = null;
            // Refresh only status text: preserve active selection, focus and scroll.
            for (const line of content.querySelectorAll(".project-status")) {
              const saved = state.saved.find((item) => item.kind === line.dataset.kind && item.id === line.dataset.id && item.version === line.dataset.version);
              if (saved) line.textContent = core.status(saved, current.get(key(saved)));
            }
            content.setAttribute("aria-busy", "false");
          });
        }
        await savedRefresh;
      }),
      button("Compare", () => savedView(true)),
    );
    content = el("div");
    dialog.append(tabs, content);
    const actions = el("div", undefined, "project-actions");
    actions.append(
      button(
        "Export project",
        () => exportData(state, "headstart-project.json"),
        "text-button",
      ),
      button(
        "Export recovery copy",
        () => exportData(recovery || state, "headstart-project-recovery.json"),
        "text-button",
      ),
      button(
        "Reset project",
        () => {
          if (
            !confirm(
              "Clear this browser’s brief and saved comparisons? Your remix bag and remembered demo email stay unchanged.",
            )
          )
            return;
          state = core.blank();
          recovery = null;
          selectedCompare.clear();
          try {
            localStorage.removeItem(core.KEY);
            warning = "";
          } catch {
            warning =
              "Browser storage could not be cleared. This visit was reset; older data may return after reload.";
          }
          sync();
          edit();
        },
        "text-button",
      ),
    );
    dialog.append(actions);
    document.body.append(dialog);
    dialog.addEventListener("close", () => {
      if (!document.querySelector("dialog[open]"))
        document.body.style.overflow = "";
      opener?.focus();
    });
    const parent = document.getElementById("library-bag").parentNode;
    const openButton = button("My project", () => open(openButton));
    openButton.id = "project-open";
    parent.insertBefore(openButton, document.getElementById("library-bag"));
    observe(window.HEADSTART_CATALOG || []);
    sync();
  }
  window.HeadStartCollection = { button: saveButton, observe, open };
  init();
})();
