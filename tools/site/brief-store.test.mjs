import test from "node:test";
import assert from "node:assert/strict";
import "../../HeadStart-Starter-Package/site/dist/brief-store.js";
const core = globalThis.HeadStartBriefStore;
test("brief revisions round trip explicit constraints and editable assumptions", () => {
  let s = core.blank();
  s = core.revise(s, {
    experience: { value: "A gentle city builder", origin: "explicit" },
    runtime: { value: "Three.js", origin: "inferred" },
  });
  s = core.revise(s, {
    runtime: { value: "Godot 4", origin: "explicit" },
    budgets: { value: "60fps is a goal, not measured", origin: "explicit" },
  });
  assert.equal(s.brief.revision, 2);
  assert.equal(s.brief.history[1].constraints.runtime.origin, "inferred");
  assert.deepEqual(core.load({ getItem: () => JSON.stringify(s) }).state, s);
  assert.throws(() =>
    core.revise(s, { runtime: { value: "JS", origin: "verified" } }),
  );
  assert.throws(() =>
    core.revise(s, { secret: { value: "private", origin: "explicit" } }),
  );
});
test("collections keep immutable versions and expose unavailable or changed versions", () => {
  const a = core.snapshot(
    {
      id: "tile",
      title: "Tile",
      versionId: "tile-v1",
      data: { rights: { code_spdx: "MIT" } },
    },
    "component",
  );
  const b = { ...a, version: "tile-v2" };
  let s = core.toggle(core.blank(), a);
  s = core.toggle(s, b);
  assert.equal(s.saved.length, 2);
  assert.match(core.status(a, b), /Newer/);
  assert.match(core.status(a, null), /Unavailable/);
  assert.equal(core.status(a, undefined), "Not checked");
  s = core.toggle(s, b);
  assert.deepEqual(s.saved, [a]);
  assert.equal(a.facts.dependencies, "Unknown");
});
test("invalid or old data and unavailable storage never interrupt browsing", () => {
  for (const raw of [
    '{"schemaVersion":0}',
    JSON.stringify({ ...core.blank(), saved: [{}] }),
  ]) {
    const result = core.load({ getItem: () => raw });
    assert.deepEqual(result.state, core.blank());
    assert.equal(result.recovery, raw);
  }
  assert.match(
    core.load({
      getItem: () => {
        throw Error("denied");
      },
    }).warning,
    /unavailable/,
  );
});
test("project snapshots pin source commits but never invent missing revisions or rights", () => {
  const s = core.snapshot({
    id: "game",
    title: "Game",
    pinnedSourceUrl: "https://github.com/a/b/tree/" + "a".repeat(40),
    runtime: "Three.js",
  });
  assert.equal(s.version, "a".repeat(40));
  assert.match(s.facts.rights, /Unknown/);
  assert.match(
    core.status(
      core.snapshot({ id: "x", title: "X" }),
      core.snapshot({ id: "x", title: "X" }),
    ),
    /unknown/,
  );
});

test("nested malformed JSON retains a recovery copy and validation never throws", () => {
  const states = [
    null,
    [],
    {},
    { schemaVersion: 1, brief: null, saved: [] },
    {
      ...core.blank(),
      brief: { revision: 1, history: [null], constraints: {} },
    },
    { ...core.blank(), saved: [null] },
    {
      ...core.blank(),
      saved: [
        { id: "x", kind: "project", version: "1", title: "X", facts: null },
      ],
    },
    {
      ...core.blank(),
      brief: { revision: 1, history: [], constraints: { runtime: null } },
    },
  ];
  for (const value of states) {
    assert.doesNotThrow(() => core.valid(value));
    assert.equal(Boolean(core.valid(value)), false);
    const raw = JSON.stringify(value);
    const result = core.load({ getItem: () => raw });
    assert.equal(result.recovery, raw);
    assert.match(result.warning, /left untouched/);
    assert.deepEqual(result.state, core.blank());
  }
});
