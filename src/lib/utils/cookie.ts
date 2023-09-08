import { TYCHE_USER_JWT_COOKIE_NAME } from "$lib/config/common";

export function getTycheUserJWT(): string {
  return (
    document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith(TYCHE_USER_JWT_COOKIE_NAME))
      ?.split("=")[1]
      .trim() ?? ""
  );
}
