import type { EnvironmentIface } from "./environment";
import type { ErrorEventLoggerIface } from "./error-event-logger";

export interface ServerServicesIface {
  env: EnvironmentIface;
  errorEventLogger: ErrorEventLoggerIface;
}
