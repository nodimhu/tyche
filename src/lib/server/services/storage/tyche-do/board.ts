import type { Env } from "../../env";
import { StorageOperationError } from "../errors";

import { BaseTycheDOBindingOrFetchStorage } from "./_base";
import type { BoardsetBoardsStorage } from "./boardset-boards";

export class BoardStorage extends BaseTycheDOBindingOrFetchStorage {
  constructor(
    env: Env,
    private readonly boardsetBoardsStorage: BoardsetBoardsStorage,
    private readonly boardId: string,
  ) {
    super(boardId, env.get("BOARD"), env.get("BOARD_DEV_URL"));
  }

  private async checkBoardExists(): Promise<void> {
    if (!(await this.boardsetBoardsStorage.getBoard({ boardId: this.boardId }))) {
      throw new StorageOperationError("Board does not exist.");
    }
  }

  async getAccounts(): Promise<TycheDO.Board.Accounts> {
    return await this.operationRequest("getAccounts", undefined);
  }

  async createAccount(
    params: TycheDO.Board.CreateAccountParams,
  ): Promise<TycheDO.Board.CreateAccountResult> {
    await this.checkBoardExists();
    return await this.operationRequest("createAccount", params);
  }

  async updateAccount(
    params: TycheDO.Board.UpdateAccountParams,
  ): Promise<TycheDO.Board.UpdateAccountResult> {
    await this.checkBoardExists();
    return await this.operationRequest("updateAccount", params);
  }

  async deleteAccount(params: TycheDO.Board.DeleteAccountParams): Promise<void> {
    await this.checkBoardExists();
    return await this.operationRequest("deleteAccount", params);
  }

  async getTransactions(): Promise<TycheDO.Board.GetTransactionsResult> {
    return await this.operationRequest("getTransactions", undefined);
  }

  async createTransaction(
    params: TycheDO.Board.CreateTransactionParams,
  ): Promise<TycheDO.Board.CreateTransactionResult> {
    await this.checkBoardExists();
    return await this.operationRequest("createTransaction", params);
  }

  async updateTransaction(
    params: TycheDO.Board.UpdateTransactionParams,
  ): Promise<TycheDO.Board.UpdateTransactionResult> {
    await this.checkBoardExists();
    return await this.operationRequest("updateTransaction", params);
  }

  async deleteTransaction(
    params: TycheDO.Board.DeleteTransactionParams,
  ): Promise<void> {
    await this.checkBoardExists();
    return await this.operationRequest("deleteTransaction", params);
  }

  async getParameters(): Promise<TycheDO.Board.GetParametersResult> {
    return await this.operationRequest("getParameters", undefined);
  }

  async updateParameters(
    params: Partial<TycheDO.Board.UpdateParametersParams>,
  ): Promise<TycheDO.Board.UpdateParametersResult> {
    await this.checkBoardExists();
    return await this.operationRequest("updateParameters", params);
  }
}
