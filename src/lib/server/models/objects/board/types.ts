export type Account = {
  name: string;
  type?: "checking" | "savings" | "investment" | "cash";
  opening: number;
  closing: number;
};

export type Transaction = {
  description: string;
  type: "income" | "expense";
  cadence: "recurring" | "occasional";
  amount: number;
};

export type Accounts = {
  [accountId: string]: Account;
};

export type Transactions = {
  [transactionId: string]: Transaction;
};

export type Parameters = {
  savingsGoalPercentage: number;
};

export type BoardData = {
  accounts: Accounts;
  transactions: Transactions;
  parameters: Parameters;
};
