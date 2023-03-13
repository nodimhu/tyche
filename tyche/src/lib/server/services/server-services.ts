import { Environment, type EnvironmentIface } from "./environment";
import { ErrorEventLogger, type ErrorEventLoggerIface } from "./error-event-logger";
import type { ServerServicesIface } from "./server-services-iface";

export class ServerServices implements ServerServicesIface {
  public readonly env: EnvironmentIface;
  public readonly errorEventLogger: ErrorEventLoggerIface;

  constructor(platform: App.Platform) {
    this.env = new Environment(platform);
    this.errorEventLogger = new ErrorEventLogger(this.env);
  }
}
