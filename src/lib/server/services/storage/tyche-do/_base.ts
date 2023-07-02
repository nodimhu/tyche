import type {
  Response as CloudflareResponse,
  DurableObjectNamespace,
  RequestInit,
  RequestInitCfProperties,
} from "@cloudflare/workers-types";

import { StorageOperationError } from "../errors";

export class BaseTycheDOBindingOrFetchStorage {
  constructor(
    private readonly NAME: string,
    private readonly BINDING: DurableObjectNamespace | undefined,
    private readonly DEV_URL: string | undefined,
  ) {}

  protected async operationRequest<ParamType = unknown, ResultType = unknown>(
    operation: string,
    parameters: ParamType,
    init: RequestInit<RequestInitCfProperties> = {},
  ): Promise<ResultType> {
    const requestInit = {
      body: JSON.stringify({ name: this.NAME, operation, parameters }),
      method: "POST",
      headers: {
        ...init?.headers,
        "content-type": "application/json",
      },
    };

    let response: Response | CloudflareResponse | undefined = undefined;

    if (this.BINDING) {
      response = await this.BINDING.get(this.BINDING.idFromName(this.NAME)).fetch(
        "https://.", // dummy URL
        {
          ...init,
          ...requestInit,
        },
      );
    } else {
      if (!this.DEV_URL) {
        throw new StorageOperationError("No Binding and No Dev URL Defined");
      }
      response = await fetch(this.DEV_URL, requestInit);
    }

    if (!response.ok && response.status !== 404) {
      let errorMessage: string;

      try {
        errorMessage = await response.json();
      } catch {
        throw new StorageOperationError(operation);
      }

      throw new StorageOperationError(operation + ": " + errorMessage);
    }

    if (response.status === 204 || response.status === 404) {
      return null as ResultType;
    }

    try {
      return await response.json<ResultType>();
    } catch {
      throw new StorageOperationError(operation + ": Malformed JSON Response");
    }
  }
}
