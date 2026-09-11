// Extension point: exact pathname => async Node (req, res) handler.
// Handlers receive res.status(code).json(value), must enforce their own methods/auth.
import { catalogHandler } from "./catalog-handler.mjs";
import { authHandler, handoffHandler } from "./auth-handler.mjs";
import { submissionsHandler } from "../../services/submissions/handler.mjs";
export const routes = {
  "/api/research": catalogHandler,
  "/api/catalog/search": catalogHandler,
  "/v1/search": catalogHandler,
};
export function resolveApiRoute(pathname) {
  if (
    /^\/v1\/(handoffs(?:\/[0-9a-f]{64}\/(?:json|markdown))?|bags\/(?:[0-9a-f]{64}|current))$/.test(
      pathname,
    )
  )
    return handoffHandler;
  if (
    /^\/api\/(submissions(?:\/(?:status|ownership))?|rights-reports|corrections|appeals|curator\/submissions(?:\/[^/]+)?)$/.test(
      pathname,
    )
  )
    return submissionsHandler;
  if (/^\/api\/auth\/(session|challenge|verify|logout|connect)$/.test(pathname))
    return authHandler;
  return /^\/v1\/(projects\/[^/]+|components\/[^/]+\/versions\/[^/]+)$/.test(
    pathname,
  )
    ? catalogHandler
    : null;
}
