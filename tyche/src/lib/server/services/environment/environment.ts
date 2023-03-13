import type { EnvironmentIface, EnvironmentVariables } from "./environment-iface";

export class Environment<K extends keyof EnvironmentVariables> implements EnvironmentIface {
  private env: EnvironmentVariables;

  constructor(platform: App.Platform) {
    this.env = { ...(platform?.env ?? process?.env) };
  }

  public get(key: K): EnvironmentVariables[K] | undefined {
    return this.env[key];
  }

  public require(key: K): Exclude<EnvironmentVariables[K], undefined> {
    const value = this.env[key];

    if (value === undefined) {
      throw new Error(`Environment Error: '${key}' is required, but not set.`);
    }

    return value;
  }
}
