import type { EnvironmentIface, EnvironmentVariables } from "./environment-iface";

export class Environment implements EnvironmentIface {
  private env: EnvironmentVariables;

  constructor(platform?: App.Platform) {
    this.env = { ...(platform?.env ?? process?.env) };
  }

  public get<K extends keyof EnvironmentVariables>(key: K): EnvironmentVariables[K] | undefined {
    return this.env[key];
  }

  public require<K extends keyof EnvironmentVariables>(key: K): NonNullable<EnvironmentVariables[K]> {
    const value = this.env[key];

    if (value === undefined) {
      throw new Error(`Environment Error: '${key}' is required, but not set.`);
    }

    return value;
  }
}
