import type { UserSettingsData } from "../../../models/objects/user-settings/types";
import type { Env } from "../../env";
import { BaseDoOrFetchStorage } from "../base";
import { StorageOperationError } from "../errors";
import type { UsersStorage } from "../users";

import type { UserSettingsStorage } from "./types";

export class UserSettingsDoOrFetchStorage
  extends BaseDoOrFetchStorage
  implements UserSettingsStorage
{
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

  async getSettigns(): Promise<UserSettingsData | null> {
    return await this.operationRequest("getSettings", undefined);
  }

  async updateSettings(params: Partial<UserSettingsData>): Promise<UserSettingsData> {
    await this.checkUserExists();
    return await this.operationRequest<Partial<UserSettingsData>, UserSettingsData>(
      "updateSettings",
      params,
    );
  }
}
