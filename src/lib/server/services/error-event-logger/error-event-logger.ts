import type { RequestEvent } from "@sveltejs/kit";
import type { EnvironmentIface } from "../environment";
import type { ErrorEventLoggerIface } from "./error-event-logger-iface";
import * as Sentry from "@sentry/svelte";

export class SentryErrorEventLogger implements ErrorEventLoggerIface {
  constructor(private readonly env: EnvironmentIface) {
    Sentry.init({
      dsn: this.env.require("SENTRY_DSN"),
    });
  }

  public async log(error: unknown, event: RequestEvent): Promise<void> {
    let requestHeaders = "";
    let requestBody = "";

    try {
      requestBody = await event.request.text();
    } catch {}

    for (const [key, value] of event.request.headers.entries()) {
      requestHeaders += `${key}: ${value}\n`;
    }

    Sentry.captureException(error, {
      extra: {
        "Request Headers": requestHeaders,
        "Request Body": requestBody,
      },
    });
  }
}
