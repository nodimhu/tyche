import * as Sentry from "@sentry/svelte";
import type { RequestEvent } from "@sveltejs/kit";

import type { Env } from "../env";

import type { ErrorLogger } from "./types";

export class SentryErrorLogger implements ErrorLogger {
  constructor(private readonly env: Env) {
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
