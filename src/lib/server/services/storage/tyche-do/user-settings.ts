import type { Env } from "../../env";
import { StorageOperationError } from "../errors";

import { BaseTycheDOBindingOrFetchStorage } from "./_base";
import type { UsersStorage } from "./users";

export class UserSettingsStorage extends BaseTycheDOBindingOrFetchStorage {
  constructor(
    env: Env,
    private readonly usersStorage: UsersStorage,
    private readonly username: string,
  ) {
    super(username, env.get("USER_SETTINGS"), env.get("USER_SETTINGS_DEV_URL"));
  }

  private async checkUserExists(): Promise<void> {
    if (!(await this.usersStorage.getUser({ username: this.username }))) {
      throw new StorageOperationError("User does not exist.");
    }
  }

  async getSettigns(): Promise<TycheDO.UserSettings.UserSettingsData | null> {
    return await this.operationRequest("getSettings", undefined);
  }

  async updateSettings(
    params: Partial<TycheDO.UserSettings.UserSettingsData>,
  ): Promise<TycheDO.UserSettings.UpdateUserSettingsResult> {
    await this.checkUserExists();
    return await this.operationRequest("updateSettings", params);
  }
}
