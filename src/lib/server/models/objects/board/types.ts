export type Account = {
  name: string;
  type?: "checking" | "savings" | "investment" | "cash";
  opening: number;
  closing: number;
};

export type Transaction = {
  description: string;
  type: "income" | "expense";
  cadence: "recurring" | "single";
  amount: number;
};

export type Accounts = {
  [accountId: string]: Account;
};

export type Transactions = {
  [transactionId: string]: Transaction;
};

export type BoardData = {
  accounts: Accounts;
  transactions: Transactions;
};
