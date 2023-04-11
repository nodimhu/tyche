import type { Account, Accounts, Parameters, Transaction, Transactions } from "./types";

export type GetAccountsResult = Accounts;

export type GetTransactionsResult = Transactions;

export type CreateAccountResult = GetAccountsResult;

export type CreateTransactionResult = GetTransactionsResult;

export type UpdateAccountResult = Account;

export type UpdateTransactionResult = Transaction;

export type GetParametersResult = Parameters;

export type UpdateParametersResult = GetParametersResult;
