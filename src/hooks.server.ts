import { dev } from "$app/environment";
import { getServerServices } from "$lib/server/services";

import { type Handle, type HandleServerError, redirect } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const { Users } = getServerServices(event.platform);
  const users = Users();

  const isLoginUrl = event.url.pathname.startsWith("/login");

  if (isLoginUrl) {
    if (await users.verifyToken(event.cookies)) {
      throw redirect(302, "/boardsets");
    }
    return await resolve(event);
  }

  if (!(await users.verifyToken(event.cookies))) {
    throw redirect(302, "/login");
  }

  await users.renewToken(event.cookies);
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
