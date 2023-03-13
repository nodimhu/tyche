import { dev } from "$app/environment";
import { getServerServices } from "$lib/server/services";
import type { HandleServerError } from "@sveltejs/kit";

export const handleError: HandleServerError = ({ error, event }) => {
  // Unexpected errors land here before +error.svelte.
  // These are runtime errors or throw new Error(...)-s, ie. they ARE NOT throw error(...)-s (or throw redirect(...)-s),
  // which are expected HTTP error responses! (Also, only log in production.)

  if (!dev && event.platform) {
    const { errorEventLogger } = getServerServices(event.platform);
    errorEventLogger.log(error, event);
    return;
  }

  // Print error on the console in dev.
  const timestamp = Math.round(new Date().getTime() / 1000);
  console.error(`${timestamp} Event:`, event, `\n${timestamp} Error:`, error);
};
