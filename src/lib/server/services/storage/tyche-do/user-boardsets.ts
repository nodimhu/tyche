import type { Env } from "../../env";
import { StorageOperationError } from "../errors";

import { BaseTycheDOBindingOrFetchStorage } from "./_base";
import type { UsersStorage } from "./users";

export class UserBoardsetsStorage extends BaseTycheDOBindingOrFetchStorage {
  constructor(
    env: Env,
    private readonly usersStorage: UsersStorage,
    private readonly username: string,
  ) {
    super(username, env.get("USER_BOARDSETS"), env.get("USER_BOARDSETS_DEV_URL"));
  }

  private async checkUserExists(): Promise<void> {
    if (!(await this.usersStorage.getUser({ username: this.username }))) {
      throw new StorageOperationError("User does not exist.");
    }
  }

  async getBoardsets(): Promise<TycheDO.UserBoardsets.BoardsetsData> {
    return await this.operationRequest("getBoardsets", undefined);
  }

  async getBoardset(
    params: TycheDO.UserBoardsets.GetBoardsetParams,
  ): Promise<TycheDO.UserBoardsets.GetBoardsetResult | null> {
    return await this.operationRequest("getBoardset", params);
  }

  async createBoardset(
    params: TycheDO.UserBoardsets.CreateBoardsetParams,
  ): Promise<TycheDO.UserBoardsets.CreateBoardsetResult> {
    await this.checkUserExists();
    return await this.operationRequest("createBoardset", params);
  }

  async updateBoardset(
    params: TycheDO.UserBoardsets.UpdateBoardsetParams,
  ): Promise<TycheDO.UserBoardsets.UpdateBoardsetResult> {
    await this.checkUserExists();
    return await this.operationRequest("updateBoardset", params);
  }

  async deleteBoardset(params: TycheDO.UserBoardsets.GetBoardsetParams): Promise<void> {
    await this.operationRequest("deleteBoardset", params);
  }

  async deleteAllBoardsets(): Promise<void> {
    await this.operationRequest("deleteAllBoardsets", undefined);
  }
}
