export type EnvVars = Exclude<App.Platform["env"], undefined>;

export interface Env {
  get<K extends keyof EnvVars>(key: K): EnvVars[K] | undefined;
  require<K extends keyof EnvVars>(key: K): NonNullable<EnvVars[K]>;
}
