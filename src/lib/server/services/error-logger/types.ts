import type { RequestEvent } from "@sveltejs/kit";

export interface ErrorLogger {
  log(error: unknown, event: RequestEvent): Promise<void>;
}
