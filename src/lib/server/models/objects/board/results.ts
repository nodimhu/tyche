import type { Account, BoardData, Transaction } from "./types";

export type GetAccountsResult = BoardData["accounts"];

export type GetTransactionsResult = BoardData["transactions"];

export type CreateAccountResult = Partial<BoardData["accounts"]>;

export type CreateTransactionResult = Partial<BoardData["transactions"]>;

export type UpdateAccountResult = Account;

export type UpdateTransactionResult = Transaction;
