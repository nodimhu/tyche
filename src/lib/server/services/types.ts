import type { Env } from "./env";
import type { ErrorLogger } from "./error-logger";

export interface ServerServices {
  readonly env: Env;
  readonly errorLogger: ErrorLogger;
}
