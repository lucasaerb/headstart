/* A service probe is never evidence of a user's client installation. */
(() => {
  const button = document.getElementById("check-catalog");
  const status = document.getElementById("catalog-setup-status");
  const local = location.protocol === "http:" && location.hostname === "127.0.0.1";
  document.getElementById("local-signin").hidden = !local;
  button.addEventListener("click", async () => {
    button.disabled = true;
    status.textContent = "Checking catalog compatibility…";
    try {
      const response = await fetch("/v1/search?type=component&limit=1", {
        cache: "no-store", credentials: "omit", signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw new Error("unavailable");
      const value = await response.json();
      if (!value || typeof value !== "object" || value.schemaVersion !== "headstart-catalog-api-1" || !Array.isArray(value.items)) {
        status.textContent = "This catalog contract is unsupported. Use compatible plugin and service versions. Your Codex connection is still unconfirmed.";
        return;
      }
      status.textContent = local
        ? "The local catalog responded with a compatible contract. Finish browser pairing, then confirm a successful lookup inside Codex. This check does not confirm plugin installation."
        : "The public catalog responded. Plugin pairing in this preview requires the separate localhost service. Your Codex connection is still unconfirmed.";
    } catch {
      status.textContent = "The catalog could not be reached. Start the local service and retry, or use the archive’s offline research mode. Your selection is unchanged; Codex connection is unconfirmed.";
    } finally { button.disabled = false; }
  });
})();
