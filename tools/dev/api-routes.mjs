// Extension point: exact pathname => async Node (req, res) handler.
// Handlers receive res.status(code).json(value), must enforce their own methods/auth.
import { catalogHandler } from "./catalog-handler.mjs";
export const routes = {
  "/api/research": catalogHandler,
  "/api/catalog/search": catalogHandler,
  "/v1/search": catalogHandler,
};
export function resolveApiRoute(pathname) {
  return /^\/v1\/(projects\/[^/]+|components\/[^/]+\/versions\/[^/]+)$/.test(
    pathname,
  )
    ? catalogHandler
    : null;
}
