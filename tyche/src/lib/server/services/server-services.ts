import { Environment, type EnvironmentIface } from "./environment";
import type { ServerServicesIface } from "./server-services-iface";

export class ServerServices implements ServerServicesIface {
  public env: EnvironmentIface;

  constructor(platform: App.Platform) {
    this.env = new Environment(platform);
  }
}
