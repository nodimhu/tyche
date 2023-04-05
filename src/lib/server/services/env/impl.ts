import type { Env, EnvVars } from "./types";

export class PlatformOrProcessEnv implements Env {
  private env: EnvVars;

  constructor(platform?: App.Platform) {
    this.env = { ...(platform?.env ?? process?.env) } as EnvVars;
  }

  public get<K extends keyof EnvVars>(key: K): EnvVars[K] | undefined {
    return this.env[key];
  }

  public require<K extends keyof EnvVars>(key: K): NonNullable<EnvVars[K]> {
    const value = this.env[key];

    if (value === undefined) {
      throw new Error(`Environment Error: '${key}' is required, but not set.`);
    }

    return value;
  }
}
