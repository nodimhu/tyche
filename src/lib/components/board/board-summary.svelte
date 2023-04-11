<script lang="ts">
  import type { Accounts, Transactions } from "$lib/server/models/objects/board/types";

  import CurrencyInput from "../controls/currency-input.svelte";
  import PercentageInput from "../controls/percentage-input.svelte";
  import TextInput from "../controls/text-input.svelte";

  export let transactions: Transactions;
  export let accounts: Accounts;
  export let savingsGoalPercentage = 0;

  export let currency: string = "USD";
  export let locale: string = "en-US";

  $: accountEntries = Object.entries(accounts);
  $: transactionEntries = Object.entries(transactions);

  $: accountSum = accountEntries.reduce(
    (sum, [_, account]) => ({
      opening: sum.opening + account.opening,
      closing: sum.closing + account.closing,
    }),
    { opening: 0, closing: 0 },
  );

  $: balance = accountSum.closing - accountSum.opening;

  $: transactionSum = transactionEntries.reduce(
    (sum, [_, transaction]) => ({
      income: sum.income + (transaction.type === "income" ? transaction.amount : 0),
      expense: sum.expense + (transaction.type === "expense" ? transaction.amount : 0),
    }),
    { income: 0, expense: 0 },
  );

  $: realExpense = accountSum.opening + transactionSum.income - accountSum.closing;

  $: unrecordedExpense =
    realExpense - transactionSum.expense > 0 ? realExpense - transactionSum.expense : 0;

  $: savings =
    transactionSum.income > 0
      ? Math.round((balance / transactionSum.income) * 10000) / 10000
      : 0;
</script>

<div class="board-summary card">
  <div class="card-body">
    <h5 class="card-title">Board Summary</h5>

    <div class="input-group mt-1">
      <TextInput value="Balance" danger={balance < 0} disabled />
      <CurrencyInput
        value={balance}
        {currency}
        {locale}
        danger={balance < 0}
        readonly
      />
    </div>
    <div class="input-group">
      <TextInput
        value="Real expenses"
        danger={realExpense > transactionSum.income}
        disabled
      />
      <CurrencyInput
        value={realExpense}
        {currency}
        {locale}
        danger={realExpense > transactionSum.income}
        readonly
      />
    </div>
    {#if unrecordedExpense > 0}
      <div class="input-group">
        <TextInput value="Unrecorded expenses" danger disabled />
        <CurrencyInput value={unrecordedExpense} {currency} {locale} danger readonly />
      </div>
    {/if}
    <div class="input-group">
      <TextInput
        value="Savings"
        success
        danger={savings === 0 || savings < savingsGoalPercentage}
        disabled
      />
      <PercentageInput
        value={savings}
        success
        danger={savings === 0 || savings < savingsGoalPercentage}
        readonly
      />
    </div>
  </div>
</div>

<style lang="scss">
  .board-summary {
    height: 100%;
    background-color: var(--bs-tertiary-bg);
    box-shadow: 0 5px 5px 3px var(--bs-secondary-bg-subtle);

    .card-body {
      display: flex;
      flex-direction: column;
    }

    .input-group {
      margin-top: -1px;
    }
  }
</style>
