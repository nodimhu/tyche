import type { DurableObjectNamespace } from "@cloudflare/workers-types";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Platform {
      env: {
        SENTRY_DSN?: string;
        TYCHE_DO?: DurableObjectNamespace;
      };
    }
  }
}

export {};
