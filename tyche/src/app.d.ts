// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Platform {
      env: {
        [K in never]: never; // empty env for now
      };
    }
  }
}

export {};
