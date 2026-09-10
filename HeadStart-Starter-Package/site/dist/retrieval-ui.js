"use strict";
(() => {
  const element = (tag, text) => {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    return node;
  };
  window.HeadStartRetrieval = {
    show(payload, scope = "research") {
      const info = payload.retrieval,
        query = info?.interpretation?.originalQuery;
      const id =
        scope === "research" ? "retrieval-research" : "retrieval-systems";
      document.getElementById(id)?.remove();
      if (!query || !info) return;
      const panel = element("details");
      panel.id = id;
      panel.className = "retrieval-panel";
      const summary = element(
        "summary",
        info.mode === "hybrid"
          ? "How these matches were found"
          : "Using word matches",
      );
      panel.append(summary);
      const intent = info.interpretation;
      panel.append(element("p", "Your search: “" + query + "”"));
      if (intent.capabilities.length)
        panel.append(
          element(
            "p",
            "Related capabilities: " +
              intent.capabilities.join(", ") +
              ". These are editable search hints, not confirmed features.",
          ),
        );
      if (intent.style.length)
        panel.append(
          element(
            "p",
            "Style hints: " +
              intent.style.join(", ") +
              ". Visual fit needs your judgment.",
          ),
        );
      panel.append(
        element(
          "p",
          info.mode === "hybrid"
            ? "Word matches and local semantic similarity are combined. Exact titles and source paths stay precise."
            : "Semantic search is unavailable or switched off. Results use the original words; your filters still apply.",
        ),
      );
      panel.append(
        element(
          "p",
          "Compatibility: only your explicit filters apply. A match does not establish tested support.",
        ),
      );
      const controls = element("div");
      controls.className = "retrieval-controls";
      const toggle = element(
        "button",
        info.mode === "hybrid" ? "Use exact words" : "Try related ideas",
      );
      toggle.type = "button";
      toggle.className = "text-button";
      toggle.addEventListener("click", () => {
        const url = new URL(location.href);
        const prefix = scope === "research" ? "" : "systems_";
        url.searchParams.set(
          prefix + "retrieval",
          info.mode === "hybrid" ? "lexical" : "hybrid",
        );
        url.searchParams.set(
          prefix + "interpret",
          info.mode === "hybrid" ? "off" : "on",
        );
        url.searchParams.delete(prefix + "cursor");
        history.pushState({}, "", url);
        dispatchEvent(new PopStateEvent("popstate"));
      });
      const edit = element("button", "Edit search");
      edit.type = "button";
      edit.className = "text-button";
      edit.addEventListener("click", () =>
        document
          .getElementById(
            scope === "research" ? "search-games" : "systems-query",
          )
          .focus(),
      );
      controls.append(toggle, edit);
      panel.append(controls);
      const anchor = document.getElementById(
        scope === "research" ? "discovery-status" : "systems-status",
      );
      anchor.before(panel);
      const cards = document.querySelectorAll(
        scope === "research" ? ".game-card" : ".reviewed-system",
      );
      cards.forEach((card, index) => {
        card.querySelector(".retrieval-reason")?.remove();
        const reasons = payload.items[index]?.matchReasons;
        if (!reasons?.length) return;
        const label = element(
          "p",
          reasons.some((reason) => reason.startsWith("Exact"))
            ? "Exact reference match"
            : reasons.some((reason) => reason.startsWith("Semantic"))
              ? "Related by metadata · inspect fit"
              : "Matches your search words",
        );
        label.className = "retrieval-reason";
        const target = card.querySelector(".game-body") || card;
        target.append(label);
      });
    },
  };
})();
