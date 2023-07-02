declare global {
  type JSONValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | { [K: string]: JSONValue }
    | JSONValue[];

  type JSONObject = { [K: string]: JSONValue };

  type HashData = {
    hash: string;
    salt: string;
  };
}

export {};
