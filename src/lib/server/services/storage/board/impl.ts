import type {
  CreateAccountParams,
  CreateTransactionParams,
  DeleteAccountParams,
  DeleteTransactionParams,
  UpdateAccountParams,
  UpdateTransactionParams,
} from "$lib/server/models/objects/board/params";
import type {
  Account,
  Accounts,
  Parameters,
  Transaction,
  Transactions,
} from "$lib/server/models/objects/board/types";

import type { Env } from "../../env";
import { BaseDoOrFetchStorage } from "../base";
import type { BoardsetBoardsStorage } from "../boardset-boards";
import { StorageOperationError } from "../errors";

import type { BoardStorage } from "./types";

export class BoardDoOrFetchStorage
  extends BaseDoOrFetchStorage
  implements BoardStorage
{
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

  async getAccounts(): Promise<Accounts> {
    return await this.operationRequest("getAccounts", undefined);
  }

  async createAccount(params: CreateAccountParams): Promise<Accounts> {
    await this.checkBoardExists();
    return await this.operationRequest("createAccount", params);
  }

  async updateAccount(params: UpdateAccountParams): Promise<Account> {
    await this.checkBoardExists();
    return await this.operationRequest("updateAccount", params);
  }

  async deleteAccount(params: DeleteAccountParams): Promise<void> {
    await this.checkBoardExists();
    return await this.operationRequest("deleteAccount", params);
  }

  async getTransactions(): Promise<Transactions> {
    return await this.operationRequest("getTransactions", undefined);
  }

  async createTransaction(params: CreateTransactionParams): Promise<Transactions> {
    await this.checkBoardExists();
    return await this.operationRequest("createTransaction", params);
  }

  async updateTransaction(params: UpdateTransactionParams): Promise<Transaction> {
    await this.checkBoardExists();
    return await this.operationRequest("updateTransaction", params);
  }

  async deleteTransaction(params: DeleteTransactionParams): Promise<void> {
    await this.checkBoardExists();
    return await this.operationRequest("deleteTransaction", params);
  }

  async getParameters(): Promise<Parameters> {
    return await this.operationRequest("getParameters", undefined);
  }

  async updateParameters(params: Partial<Parameters>): Promise<Parameters> {
    await this.checkBoardExists();
    return await this.operationRequest("updateParameters", params);
  }
}
