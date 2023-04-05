import type {
  CreateBoardParams,
  DeleteBoardParams,
  GetBoardParams,
  GetBoardsParams,
} from "$lib/server/models/objects/boardset-boards/params";
import type { BoardData } from "$lib/server/models/objects/boardset-boards/types";

import type { Env } from "../../env";
import { BaseDoOrFetchStorage } from "../base";
import { StorageOperationError } from "../errors";
import type { UserBoardsetsStorage } from "../user-boardsets";

import type { BoardsetBoardsStorage } from "./types";

export class BoardsetBoardsDoOrFetchStorage
  extends BaseDoOrFetchStorage
  implements BoardsetBoardsStorage
{
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
    params: GetBoardsParams,
  ): Promise<{ [year: string]: { [boardId: string]: BoardData } }> {
    return await this.operationRequest("getBoards", params);
  }

  async getBoard(
    params: GetBoardParams,
  ): Promise<{ [year: string]: { [boardId: string]: BoardData } } | null> {
    return await this.operationRequest("getBoard", params);
  }

  async createBoard(
    params: CreateBoardParams,
  ): Promise<{ [year: string]: { [boardId: string]: BoardData } }> {
    await this.checkBoardsetExists();
    return await this.operationRequest("createBoard", params);
  }

  async deleteBoard(params: DeleteBoardParams): Promise<void> {
    return await this.operationRequest("deleteBoard", params);
  }

  async deleteAllBoards(): Promise<void> {
    return await this.operationRequest("deleteAllBoards", undefined);
  }
}
