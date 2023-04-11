import { type RequestEvent, type ServerLoadEvent, error } from "@sveltejs/kit";

import type { JSONObject, JSONValue } from "../models/common/types";

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

export async function getEventContext<
  Event extends RequestEvent | ServerLoadEvent,
  RequiredSearchParamKeys extends ReadonlyArray<string> = [],
  RequiredJsonParamKeys extends ReadonlyArray<string> = [],
  NoJson extends boolean | undefined = undefined,
  AllowAnonymous extends boolean | undefined = undefined,
>(
  { request, params, platform, cookies }: Event,
  constraints?: {
    requiredSearchParams?: RequiredSearchParamKeys;
    requiredJsonParams?: NoJson extends true ? undefined : RequiredJsonParamKeys;
    noJson?: NoJson;
    allowAnonymous?: AllowAnonymous;
  },
): Promise<{
  serverServices: ServerServicesSingleton;
  username: AllowAnonymous extends true ? string | null : string;
  params: Event["params"];
  searchParams: Record<string, string | undefined> & {
    [K in RequiredSearchParamKeys[number]]: string;
  };
  json: NoJson extends true
    ? null
    : Record<string, JSONValue> & {
        [K in RequiredJsonParamKeys[number]]: Exclude<JSONValue, null | undefined>;
      };
}>;
export async function getEventContext<
  Event extends RequestEvent | ServerLoadEvent,
  RequiredSearchParamKeys extends ReadonlyArray<string> = [],
  RequiredJsonParamKeys extends ReadonlyArray<string> = [],
  NoJson extends boolean | undefined = undefined,
  AllowAnonymous extends boolean | undefined = undefined,
>(
  { request, params, platform, cookies }: Event,
  constraints?: {
    requiredSearchParams?: RequiredSearchParamKeys;
    requiredJsonParams?: RequiredJsonParamKeys;
    noJson?: NoJson;
    allowAnonymous?: AllowAnonymous;
  },
): Promise<{
  serverServices: ServerServicesSingleton;
  username: string | null;
  params: Event["params"];
  searchParams:
    | Record<string, string | undefined> & {
        [K in RequiredSearchParamKeys[number]]: string;
      };
  json:
    | (Record<string, JSONValue> & {
        [K in RequiredJsonParamKeys[number]]: Exclude<JSONValue, null | undefined>;
      })
    | null;
}> {
  const serverServices = getServerServices(platform);

  const { Users } = serverServices;

  const username = await Users().whoAmI(cookies);

  if (!constraints?.allowAnonymous && !username) {
    throw error(401);
  }

  const url = new URL(request.url);
  const searchParams: Record<string, string> = Object.fromEntries(
    url.searchParams.entries(),
  );

  for (const requiredSearchParam of constraints?.requiredSearchParams ?? []) {
    if (!searchParams[requiredSearchParam.toString()]) {
      throw error(400);
    }
  }

  if (constraints?.noJson === true) {
    return {
      username,
      serverServices,
      params,
      searchParams: searchParams as Record<string, string | undefined> & {
        [K in RequiredSearchParamKeys[number]]: string;
      },
      json: null,
    };
  }

  let json: JSONObject = {};

  try {
    json = await request.json();
  } catch {
    throw error(400);
  }

  for (const requiredJsonParamKey of constraints?.requiredJsonParams ?? []) {
    if (!json[requiredJsonParamKey]) {
      throw error(400);
    }
  }

  return {
    username,
    serverServices,
    params,
    searchParams: searchParams as Record<string, string | undefined> & {
      [K in RequiredSearchParamKeys[number]]: string;
    },
    json: json as Record<string, JSONValue> & {
      [K in RequiredJsonParamKeys[number]]: Exclude<JSONValue, null | undefined>;
    },
  };
}
