export type EnvironmentVariables = App.Platform["env"];

export interface EnvironmentIface {
  get<K extends keyof EnvironmentVariables>(key: K): EnvironmentVariables[K] | undefined;
  require<K extends keyof EnvironmentVariables>(key: K): NonNullable<EnvironmentVariables[K]>;
}
