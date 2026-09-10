/* Public metadata only. Local project planning never grants code delivery or integration. */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object") module.exports = api;
  else root.HeadStartBriefStore = api;
})(typeof window === "object" ? window : globalThis, () => {
  const KEY = "headstart.project.v1";
  const fields = [
    "experience",
    "style",
    "runtime",
    "runtimeVersion",
    "platform",
    "device",
    "camera",
    "input",
    "scope",
    "budgets",
    "preserve",
  ];
  const blank = () => ({
    schemaVersion: 1,
    brief: { revision: 0, history: [], constraints: {} },
    saved: [],
  });
  const text = (v) => typeof v === "string" && v.length <= 4000;
  function valid(s) {
    return (
      s?.schemaVersion === 1 &&
      Number.isInteger(s.brief?.revision) &&
      s.brief.revision >= 0 &&
      Array.isArray(s.brief.history) &&
      s.brief.history.length <= 100 &&
      validConstraints(s.brief.constraints) &&
      s.brief.history.every(
        (h) =>
          h !== null &&
          typeof h === "object" &&
          Number.isInteger(h.revision) &&
          validConstraints(h.constraints),
      ) &&
      Array.isArray(s.saved) &&
      s.saved.length <= 24 &&
      s.saved.every(
        (v) =>
          v !== null &&
          typeof v === "object" &&
          text(v.id) &&
          text(v.version) &&
          text(v.title) &&
          ["project", "component"].includes(v.kind) &&
          typeof v.facts === "object" &&
          v.facts !== null &&
          ["runtime", "rights", "readiness", "style", "dependencies"].every(
            (k) => text(v.facts[k]),
          ),
      )
    );
  }
  function validConstraints(c) {
    return (
      c &&
      typeof c === "object" &&
      !Array.isArray(c) &&
      Object.entries(c).every(
        ([k, v]) =>
          fields.includes(k) &&
          text(v?.value) &&
          ["explicit", "inferred"].includes(v.origin),
      )
    );
  }
  function load(storage) {
    try {
      const raw = storage.getItem(KEY);
      if (!raw) return { state: blank(), warning: "" };
      let s;
      try {
        s = JSON.parse(raw);
      } catch {
        return {
          state: blank(),
          warning:
            "Damaged project data was left untouched. Export the recovery copy before resetting.",
          recovery: raw,
        };
      }
      if (!valid(s))
        return {
          state: blank(),
          warning:
            "Older or damaged project data was left untouched. Export the recovery copy before resetting.",
          recovery: raw,
        };
      return { state: s, warning: "" };
    } catch {
      return {
        state: blank(),
        warning:
          "Browser storage is unavailable or unreadable. Changes last only while this page stays open.",
      };
    }
  }
  function revise(state, constraints) {
    if (!validConstraints(constraints))
      throw new Error("Invalid brief constraints");
    const copy = JSON.parse(JSON.stringify(state));
    copy.brief.history.push({
      revision: copy.brief.revision,
      constraints: copy.brief.constraints,
    });
    copy.brief.history = copy.brief.history.slice(-100);
    copy.brief.revision++;
    copy.brief.constraints = JSON.parse(JSON.stringify(constraints));
    return copy;
  }
  function runtimeSummary(item) {
    const tuples = item.compatibility || item.data?.compatibility;
    if (Array.isArray(tuples) && tuples.length)
      return tuples
        .map(
          (c) =>
            (c.runtime || "Runtime unknown") +
            " " +
            (c.version_range || "version unknown") +
            " · " +
            (c.support || "unknown").replaceAll("_", " "),
        )
        .join("; ");
    return item.runtime || item.data?.runtime || "Unknown";
  }
  function dependencySummary(item) {
    if (Array.isArray(item.resolvedDependencies)) {
      if (!item.resolvedDependencies.length)
        return "No dependency edges recorded for this reviewed scope; target integration still needs review.";
      return item.resolvedDependencies
        .map((d) =>
          d.status !== "reviewed_metadata"
            ? "Unknown — dependency metadata unavailable"
            : (d.package || "Scoped dependency") +
              " · " +
              (d.kind || "relationship unknown") +
              " · " +
              (d.optional ? "optional" : "required") +
              " · constraint " +
              (d.versionConstraint || "unknown") +
              " · resolved version " +
              (d.resolvedVersion || "unknown") +
              ". " +
              (d.scope || "Scope unknown"),
        )
        .join("; ");
    }
    return item.data?.dependencies?.length
      ? "Unknown — dependency references have not been resolved"
      : "Unknown";
  }
  function snapshot(item, kind = "project") {
    const d = item.data || {};
    const pin = item.pinnedSourceUrl?.match(
      /\/(?:tree|blob)\/([a-f0-9]{40})(?:\/|$)/,
    )?.[1];
    const version = item.versionId || pin || "unversioned-reference";
    const show = (v) =>
      v == null || v === ""
        ? "Unknown"
        : typeof v === "string"
          ? v
          : JSON.stringify(v);
    return {
      id: String(item.id),
      kind,
      version,
      title: String(item.title || item.id),
      savedAt: new Date().toISOString(),
      facts: {
        runtime: runtimeSummary(item),
        rights:
          kind === "component"
            ? show(d.rights?.code_spdx) + " · selected files only"
            : show(item.rights?.code_license) +
              " · research; asset scope not cleared",
        readiness: show(
          item.readiness || "Research reference; integration not tested",
        ),
        style: show(item.dimension || d.style),
        dependencies: dependencySummary(item),
      },
    };
  }
  function toggle(state, item) {
    const copy = JSON.parse(JSON.stringify(state));
    const index = copy.saved.findIndex(
      (s) =>
        s.id === item.id && s.kind === item.kind && s.version === item.version,
    );
    if (index >= 0) copy.saved.splice(index, 1);
    else {
      if (copy.saved.length >= 24)
        throw new Error(
          "Keep up to 24 saved versions. Remove one before saving another.",
        );
      copy.saved.push(item);
    }
    return copy;
  }
  function status(saved, current) {
    if (current === undefined) return "Not checked";
    if (current === null) return "Unavailable in current catalog";
    return saved.version === current.version
      ? saved.version === "unversioned-reference"
        ? "Source revision unknown"
        : "Current catalog version"
      : "Newer catalog version available · saved version retained";
  }
  return {
    KEY,
    fields,
    blank,
    valid,
    load,
    revise,
    snapshot,
    toggle,
    status,
    runtimeSummary,
    dependencySummary,
  };
});
