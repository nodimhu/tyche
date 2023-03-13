import type { RequestEvent } from "@sveltejs/kit";

export interface ErrorEventLoggerIface {
  log(error: unknown, event: RequestEvent): Promise<void>;
}
