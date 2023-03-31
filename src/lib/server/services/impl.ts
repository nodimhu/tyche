import { type Env, PlatformOrProcessEnv } from "./env";
import { type ErrorLogger, SentryErrorLogger } from "./error-logger";
import type { ServerServices } from "./types";

export class ServerServicesSingleton implements ServerServices {
  readonly env: Env;
  readonly errorLogger: ErrorLogger;

  constructor(platform?: App.Platform) {
    this.env = new PlatformOrProcessEnv(platform);
    this.errorLogger = new SentryErrorLogger(this.env);
  }
}
