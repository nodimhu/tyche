import type { DurableObjectNamespace } from "@cloudflare/workers-types";

declare interface CommonVars {
  // Variables that may be present both in Cloudflare and locally, during development.
  ENVIRONMENT?: string;
  APP_SIGNING_SECRET?: string;
  SENTRY_DSN?: string;

  BOARD_DEV_URL?: string;
  BOARDSET_BOARDS_DEV_URL?: string;
  USER_BOARDSETS_DEV_URL?: string;
  USER_SETTINGS_DEV_URL?: string;
  USERS_DEV_URL?: string;
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Platform {
      env:
        | ({
            // Durable Object bindings, only present in Cloudflare.
            BOARD?: DurableObjectNamespace;
            BOARDSET_BOARDS?: DurableObjectNamespace;
            USER_BOARDSETS?: DurableObjectNamespace;
            USER_SETTINGS?: DurableObjectNamespace;
            USERS?: DurableObjectNamespace;
          } & CommonVars)
        | undefined;
    }
    namespace NodeJS {
      // Process.env vars used during development.
      interface ProcessEnv extends CommonVars {}
    }
  }
}

export {};
