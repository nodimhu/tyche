export type EnvironmentVariables = App.Platform["env"];

export interface EnvironmentIface<K extends keyof EnvironmentVariables = keyof EnvironmentVariables> {
  get(key: K): EnvironmentVariables[K] | undefined;
  require(key: K): Exclude<EnvironmentVariables[K], undefined>;
}
