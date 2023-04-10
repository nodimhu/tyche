import { dev } from "$app/environment";
import { TYCHE_USER_JWT_HEADER_NAME } from "$lib/config/common";
import { getServerServices } from "$lib/server/services";

import { type Handle, type HandleServerError, error, redirect } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const { Users } = getServerServices(event.platform);

  const url = new URL(event.request.url);

  if (url.pathname.startsWith("/api")) {
    if (
      !(await Users().verifyJwt(event.request.headers.get(TYCHE_USER_JWT_HEADER_NAME)))
    ) {
      throw error(401);
    }

    return await resolve(event);
  }

  const isLoginUrl = event.url.pathname.startsWith("/login");

  if (isLoginUrl) {
    if (await Users().verifyJwtCookie(event.cookies)) {
      throw redirect(302, "/");
    }

    return await resolve(event);
  }

  if (!(await Users().verifyJwtCookie(event.cookies))) {
    throw redirect(302, "/login");
  }

  await Users().renewJwtCookie(event.cookies);

  return await resolve(event);
};

export const handleError: HandleServerError = ({ error, event }) => {
  // Unexpected errors land here before +error.svelte.
  // These are runtime errors or throw new Error(...)-s, ie. they ARE NOT throw
  // error(...)-s (or throw redirect(...)-s), which are expected HTTP error responses!
  // (Also, only log in production.)

  if (!dev && event.platform) {
    const { errorLogger } = getServerServices(event.platform);
    errorLogger.log(error, event);
    return;
  }

  // Print error on the console in dev.
  const timestamp = Math.round(new Date().getTime() / 1000);
  console.error(`${timestamp} Event:`, event, `\n${timestamp} Error:`, error);
};
