import type { Account, Transaction } from "./types";

export type CreateAccountParams = {
  name: string;
} & Partial<Account>;

export type CreateTransactionParams = {
  type: Transaction["type"];
  description: string;
} & Partial<Transaction>;

export type UpdateAccountParams = {
  accountId: string;
  account: {
    type?: Account["type"] | null;
  } & Partial<Omit<Account, "type">>;
};

export type UpdateTransactionParams = {
  transactionId: string;
  transaction: Partial<Transaction>;
};

export type DeleteAccountParams = {
  accountId: string;
};

export type DeleteTransactionParams = {
  transactionId: string;
};
