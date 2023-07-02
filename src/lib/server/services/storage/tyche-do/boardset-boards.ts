import type { Env } from "../../env";
import { StorageOperationError } from "../errors";

import { BaseTycheDOBindingOrFetchStorage } from "./_base";
import type { UserBoardsetsStorage } from "./user-boardsets";

export class BoardsetBoardsStorage extends BaseTycheDOBindingOrFetchStorage {
  constructor(
    env: Env,
    private readonly userBoardsetsStorage: UserBoardsetsStorage,
    private readonly boardsetId: string,
  ) {
    super(boardsetId, env.get("BOARDSET_BOARDS"), env.get("BOARDSET_BOARDS_DEV_URL"));
  }

  private async checkBoardsetExists(): Promise<void> {
    if (
      !(await this.userBoardsetsStorage.getBoardset({ boardsetId: this.boardsetId }))
    ) {
      throw new StorageOperationError("Boardset does not exist.");
    }
  }

  async getBoards(
    params: TycheDO.BoardsetBoards.GetBoardsParams,
  ): Promise<TycheDO.BoardsetBoards.GetBoardsResult> {
    return await this.operationRequest("getBoards", params);
  }

  async getBoard(
    params: TycheDO.BoardsetBoards.GetBoardParams,
  ): Promise<TycheDO.BoardsetBoards.GetBoardsResult | null> {
    return await this.operationRequest("getBoard", params);
  }

  async createBoard(
    params: TycheDO.BoardsetBoards.CreateBoardParams,
  ): Promise<TycheDO.BoardsetBoards.CreateBoardResult> {
    await this.checkBoardsetExists();
    return await this.operationRequest("createBoard", params);
  }

  async copyBoard(
    params: TycheDO.BoardsetBoards.CopyBoardParams,
  ): Promise<TycheDO.BoardsetBoards.CopyBoardResult> {
    await this.checkBoardsetExists();
    return await this.operationRequest("copyBoard", params);
  }

  async deleteBoard(params: TycheDO.BoardsetBoards.DeleteBoardParams): Promise<void> {
    return await this.operationRequest("deleteBoard", params);
  }

  async deleteAllBoards(): Promise<void> {
    return await this.operationRequest("deleteAllBoards", undefined);
  }
}
