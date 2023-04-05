export class StorageOperationError extends Error {
  name = "StorageOperationError";

  constructor(message?: string) {
    const constructedMessage = "Storage Operation Error" + message ? message : "";
    super(constructedMessage);
  }
}
