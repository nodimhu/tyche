import { dev } from "$app/environment";

export const TYCHE_USER_JWT_HEADER_NAME = "Tyche-User-JWT";
export let TYCHE_USER_JWT_COOKIE_NAME = TYCHE_USER_JWT_HEADER_NAME;

if (!dev) {
  TYCHE_USER_JWT_COOKIE_NAME = "__Host-" + TYCHE_USER_JWT_COOKIE_NAME;
}
