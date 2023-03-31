import { ServerServicesSingleton } from "./impl";

let SERVER_SERVICES: ServerServicesSingleton | null = null;

export function getServerServices(
  platform: App.Platform | undefined,
): ServerServicesSingleton {
  if (SERVER_SERVICES === null) {
    SERVER_SERVICES = new ServerServicesSingleton(platform);
  }
  return SERVER_SERVICES;
}
