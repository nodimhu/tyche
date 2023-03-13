import { ServerServices } from "./server-services";
import type { ServerServicesIface } from "./server-services-iface";

let SERVER_SERVICES: ServerServicesIface | null = null;

export function getServerServices(platform: App.Platform): ServerServicesIface {
  if (SERVER_SERVICES === null) {
    SERVER_SERVICES = new ServerServices(platform);
  }
  return SERVER_SERVICES;
}
