declare global {
  namespace TycheDO {
    namespace Board {
      // --- DATA ---

      type Account = {
        name: string;
        type?: "checking" | "savings" | "investment" | "cash";
        opening: number;
        closing: number;
      };
      type Transaction = {
        description: string;
        type: "income" | "expense";
        cadence: "recurring" | "occasional";
        amount: number;
      };
      type Accounts = {
        [accountId: string]: Account;
      };
      type Transactions = {
        [transactionId: string]: Transaction;
      };
      type Parameters = {
        savingsGoalPercentage: number;
      };
      type BoardData = {
        accounts: Accounts;
        transactions: Transactions;
        parameters: Parameters;
      };

      // --- PARAMS ---

      type CreateAccountParams = Partial<Account> & {
        name: string;
      };
      type CreateTransactionParams = Partial<Transaction> & {
        type: Transaction["type"];
        description: string;
      };
      type UpdateAccountParams = {
        accountId: string;
        account: {
          type?: Account["type"] | null;
        } & Partial<Omit<Account, "type">>;
      };
      type UpdateTransactionParams = {
        transactionId: string;
        transaction: Partial<Transaction>;
      };
      type DeleteAccountParams = {
        accountId: string;
      };
      type DeleteTransactionParams = {
        transactionId: string;
      };
      type UpdateParametersParams = Partial<Parameters>;

      // --- RESULTS ---

      type GetAccountsResult = Accounts;
      type GetTransactionsResult = Transactions;
      type CreateAccountResult = GetAccountsResult;
      type CreateTransactionResult = GetTransactionsResult;
      type UpdateAccountResult = Account;
      type UpdateTransactionResult = Transaction;
      type GetParametersResult = Parameters;
      type UpdateParametersResult = GetParametersResult;
    }
  }
}

export {};
