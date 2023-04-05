import type {
  CreateBoardsetParams,
  GetBoardsetParams,
  UpdateBoardsetParams,
} from "$lib/server/models/objects/user-boardsets/params";
import type {
  Boardset,
  BoardsetsData,
} from "$lib/server/models/objects/user-boardsets/types";

import type { Env } from "../../env";
import { BaseDoOrFetchStorage } from "../base";
import { StorageOperationError } from "../errors";
import type { UsersStorage } from "../users";

import type { UserBoardsetsStorage } from "./types";

export class UserBoardsetsDoOrFetchStorage
  extends BaseDoOrFetchStorage
  implements UserBoardsetsStorage
{
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

  async getBoardsets(): Promise<BoardsetsData> {
    return await this.operationRequest("getBoardsets", undefined);
  }

  async getBoardset(params: GetBoardsetParams): Promise<Boardset | null> {
    return await this.operationRequest("getBoardset", params);
  }

  async createBoardset(params: CreateBoardsetParams): Promise<Partial<BoardsetsData>> {
    await this.checkUserExists();
    return await this.operationRequest("createBoardset", params);
  }

  async updateBoardset(params: UpdateBoardsetParams): Promise<Boardset> {
    await this.checkUserExists();
    return await this.operationRequest("updateBoardset", params);
  }

  async deleteBoardset(params: GetBoardsetParams): Promise<void> {
    await this.operationRequest("deleteBoardset", params);
  }

  async deleteAllBoardsets(): Promise<void> {
    await this.operationRequest("deleteAllBoardsets", undefined);
  }
}
