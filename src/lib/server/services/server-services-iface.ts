import type { EnvironmentIface } from "./environment";
import type { ErrorEventLoggerIface } from "./error-event-logger";
import type { TycheStorageIface } from "./tyche-storage/tyche-storage-iface";

export interface ServerServicesIface {
  env: EnvironmentIface;
  errorEventLogger: ErrorEventLoggerIface;
  tycheStorage: TycheStorageIface;
}
