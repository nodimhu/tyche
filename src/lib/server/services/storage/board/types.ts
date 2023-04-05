import type {
  CreateAccountParams,
  CreateTransactionParams,
  DeleteAccountParams,
  DeleteTransactionParams,
  UpdateAccountParams,
  UpdateTransactionParams,
} from "$lib/server/models/objects/board/params";
import type {
  CreateAccountResult,
  CreateTransactionResult,
  GetAccountsResult,
  GetTransactionsResult,
  UpdateAccountResult,
  UpdateTransactionResult,
} from "$lib/server/models/objects/board/results";

export interface BoardStorage {
  getAccounts(): Promise<GetAccountsResult>;
  createAccount(params: CreateAccountParams): Promise<CreateAccountResult>;
  updateAccount(params: UpdateAccountParams): Promise<UpdateAccountResult>;
  deleteAccount(params: DeleteAccountParams): Promise<void>;
  getTransactions(): Promise<GetTransactionsResult>;
  createTransaction(params: CreateTransactionParams): Promise<CreateTransactionResult>;
  updateTransaction(params: UpdateTransactionParams): Promise<UpdateTransactionResult>;
  deleteTransaction(params: DeleteTransactionParams): Promise<void>;
}
