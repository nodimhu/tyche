<script lang="ts">
  import type { Accounts, Transactions } from "$lib/server/models/objects/board/types";

  import CurrencyValueInput from "../controls/currency-value-input.svelte";
  import PercentageInput from "../controls/percentage-input.svelte";
  import TextInput from "../controls/text-input.svelte";

  import BoardCard from "./board-card.svelte";

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
      ? Number((balance / transactionSum.income).toFixed(2))
      : 0;
</script>

<BoardCard appearance="info" title="Summary">
  <div class="input-group mt-1">
    <TextInput value="Balance" danger={balance < 0} disabled />
    <CurrencyValueInput
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
    <CurrencyValueInput
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
      <CurrencyValueInput
        value={unrecordedExpense}
        {currency}
        {locale}
        danger
        readonly
      />
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
</BoardCard>
