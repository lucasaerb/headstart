const $ = (id) => document.getElementById(id);
async function api(path, data, method = "POST") {
  const headers = { "Content-Type": "application/json" };
  if (method === "PATCH") {
    const session = await fetch("/api/auth/session").then((r) => r.json());
    headers["x-csrf-token"] = session.csrf || "";
  }
  const response = await fetch(path, {
    method,
    headers,
    ...(method === "GET" ? {} : { body: JSON.stringify(data) }),
  });
  const result = await response.json();
  if (!response.ok)
    throw new Error(
      typeof result.error === "string"
        ? result.error
        : "The request could not be completed.",
    );
  return result;
}
function text(tag, value, parent) {
  const node = document.createElement(tag);
  node.textContent = value;
  parent.append(node);
  return node;
}
$("kind").addEventListener("change", () => {
  const report = ["rights_report", "appeal"].includes($("kind").value);
  $("project-fields").hidden = report;
  $("scope-fields").hidden = !report;
  $("parent-field").hidden = $("kind").value !== "appeal";
  $("proposal").elements.repository.required = !report;
  for (const name of ["sourceId", "version"])
    $("proposal").elements[name].required = report;
});
$("proposal").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const values = Object.fromEntries(new FormData(form));
  const kind = values.kind;
  let data = { description: values.description, reporter: values.reporter };
  if (["submission", "correction"].includes(kind))
    Object.assign(data, {
      repository: values.repository,
      subproject: values.subproject,
      demo: values.demo,
      runtime: values.runtime,
      ownershipClaim: form.elements.ownershipClaim.checked,
    });
  else
    Object.assign(data, {
      scope: {
        entity: values.entity,
        id: values.sourceId,
        version: values.version,
        paths: values.paths
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      },
      ...(kind === "appeal" ? { parentId: values.parentId } : {}),
    });
  const button = form.querySelector("button");
  button.disabled = true;
  $("result").hidden = false;
  $("result").replaceChildren();
  text("p", "Saving for review…", $("result"));
  try {
    const paths = {
      submission: "/api/submissions",
      correction: "/api/corrections",
      rights_report: "/api/rights-reports",
      appeal: "/api/appeals",
    };
    const result = await api(paths[kind], data);
    $("result").replaceChildren();
    text("h2", "Your suggestion is in the queue.", $("result"));
    text(
      "p",
      "Keep this private receipt to check its status. It is not an approval or a publication.",
      $("result"),
    );
    text(
      "pre",
      `Submission ID: ${result.id}\nPrivate receipt: ${result.receipt}`,
      $("result"),
    );
    if (result.ownershipChallenge)
      text(
        "pre",
        `Repository challenge:\nHeadStart ownership ${result.id} ${result.ownershipChallenge}`,
        $("result"),
      );
    for (const id of ["status-form", "ownership-form"]) {
      $(id).elements.id.value = result.id;
      $(id).elements.receipt.value = result.receipt;
    }
  } catch (error) {
    $("result").replaceChildren();
    text("p", error.message, $("result"));
  } finally {
    button.disabled = false;
  }
});
for (const [formId, path, resultId] of [
  ["status-form", "/api/submissions/status", "status-result"],
  ["ownership-form", "/api/submissions/ownership", "ownership-result"],
])
  $(formId).addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const result = await api(
        path,
        Object.fromEntries(new FormData(event.currentTarget)),
      );
      $(resultId).textContent =
        `${result.status} · revision ${result.revision}\n${result.nextAction}\n${result.blockingFields.join(", ")}`;
    } catch (error) {
      $(resultId).textContent = error.message;
    }
  });
$("load-queue").addEventListener("click", async () => {
  $("queue-message").textContent = "Loading…";
  $("queue").replaceChildren();
  try {
    const { items } = await api("/api/curator/submissions", null, "GET");
    $("queue-message").textContent = items.length
      ? `${items.length} review items`
      : "No submissions yet.";
    for (const item of items) {
      const article = document.createElement("article");
      article.className = "queue-item";
      $("queue").append(article);
      text("h2", `${item.kind.replaceAll("_", " ")} · ${item.status}`, article);
      text("p", `Revision ${item.revision} · ${item.id}`, article);
      text("pre", JSON.stringify(item.proposal, null, 2), article);
      text("p", `Private contact: ${item.reporter || "Not supplied"}`, article);
      text(
        "p",
        `Blocking: ${item.blockingFields.join(", ") || "None"}`,
        article,
      );
      if (item.duplicateOf)
        text("p", `Duplicate proposal: ${item.duplicateOf}`, article);
      const form = document.createElement("form");
      article.append(form);
      const stateLabel = text("label", "Decision", form);
      const state = document.createElement("select");
      state.name = "status";
      state.setAttribute("aria-label", "Decision");
      stateLabel.append(state);
      for (const value of [
        "pending",
        "changes_requested",
        "approved",
        "rejected",
        "resolved",
      ]) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value.replaceAll("_", " ");
        state.append(option);
      }
      state.value = item.status;
      for (const [name, label, value] of [
        ["description", "Reviewed description", item.proposal.description],
        ["nextAction", "Next action", item.nextAction],
        [
          "blockingFields",
          "Unresolved blocking fields (one per line)",
          item.blockingFields.join("\n"),
        ],
        [
          "reviewEvidence",
          "Reviewed evidence (one reference per line)",
          item.reviewEvidence.join("\n"),
        ],
      ]) {
        const l = text("label", label, form);
        const input = document.createElement("textarea");
        input.name = name;
        input.setAttribute("aria-label", label);
        input.value = value;
        input.rows = 2;
        l.append(input);
      }
      const button = text("button", "Save reviewed revision", form);
      button.type = "submit";
      const result = text("p", "", form);
      result.setAttribute("aria-live", "polite");
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        button.disabled = true;
        const values = Object.fromEntries(new FormData(form));
        try {
          const update = await api(
            `/api/curator/submissions/${item.id}`,
            {
              revision: item.revision,
              ...values,
              blockingFields: values.blockingFields.split("\n").filter(Boolean),
              reviewEvidence: values.reviewEvidence.split("\n").filter(Boolean),
            },
            "PATCH",
          );
          result.textContent = `Saved revision ${update.revision}. Reload the queue before further edits.`;
        } catch (error) {
          result.textContent = error.message;
          button.disabled = false;
        }
      });
      const history = text("button", "View immutable history", article);
      history.addEventListener("click", async () => {
        try {
          const result = await api(
            `/api/curator/submissions/${item.id}`,
            null,
            "GET",
          );
          text("pre", JSON.stringify(result.events, null, 2), article);
          history.disabled = true;
        } catch (error) {
          $("queue-message").textContent = error.message;
        }
      });
    }
  } catch (error) {
    $("queue-message").textContent = error.message;
  }
});
