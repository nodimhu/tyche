import type { RequestInfo } from "@cloudflare/workers-types";

export interface TycheStorageIface {
  get(request: RequestInfo): Promise<string>;
}
