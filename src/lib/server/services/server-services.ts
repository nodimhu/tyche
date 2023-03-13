import { Environment, type EnvironmentIface } from "./environment";
import { ErrorEventLogger, type ErrorEventLoggerIface } from "./error-event-logger";
import type { ServerServicesIface } from "./server-services-iface";
import { TycheDOStorage } from "./tyche-storage/tyche-storage";
import type { TycheStorageIface } from "./tyche-storage/tyche-storage-iface";

export class ServerServices implements ServerServicesIface {
  public readonly env: EnvironmentIface;
  public readonly errorEventLogger: ErrorEventLoggerIface;
  public readonly tycheStorage: TycheStorageIface;

  constructor(platform?: App.Platform) {
    this.env = new Environment(platform);
    this.errorEventLogger = new ErrorEventLogger(this.env);
    this.tycheStorage = new TycheDOStorage(this.env);
  }
}
