import type { URL, DurableObjectNamespace } from "@cloudflare/workers-types";
import type { EnvironmentIface } from "../environment";
import type { TycheStorageIface } from "./tyche-storage-iface";

export class TycheDOStorage implements TycheStorageIface {
  private tycheDO: DurableObjectNamespace;

  constructor(environment: EnvironmentIface) {
    this.tycheDO = environment.require("TYCHE_DO");
  }

  public async get(urlPath: string): Promise<string> {
    const tycheDOId = this.tycheDO.idFromName("hello");
    const tycheDOStub = this.tycheDO.get(tycheDOId);
    const response = await tycheDOStub.fetch(urlPath);
    return await response.text();
  }
}
