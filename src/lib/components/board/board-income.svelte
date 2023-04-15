<script lang="ts">
  import type {
    Transaction,
    Transactions,
  } from "$lib/server/models/objects/board/types";

  import CurrencyInput from "../controls/currency-input.svelte";
  import TextInput from "../controls/text-input.svelte";

  import AddIncomeButton from "./add-income-button.svelte";
  import BoardCardEmpty from "./board-card-empty.svelte";
  import BoardCard from "./board-card.svelte";
  import SavingsGoalInput from "./savings-goal-input.svelte";
  import TransactionInputs from "./transaction-inputs.svelte";

  export let boardsetId: string;
  export let boardId: string;

  export let transactions: Transactions;
  export let savingsGoalPercentage = 0;

  export let currency: string = "USD";
  export let locale: string = "en-US";

  $: incomeEntries = Object.entries(transactions)?.filter(
    ([_, transaction]) => transaction.type === "income",
  );

  $: sum = incomeEntries.reduce((sum, [_, income]) => sum + income.amount, 0);

  $: incomeEntriesByCadence = incomeEntries.reduce(
    (collection, [incomeId, income]) => {
      collection[income.cadence].push([incomeId, income]);
      return collection;
    },
    {
      recurring: [] as [string, Transaction][],
      occasional: [] as [string, Transaction][],
    },
  );
</script>

<BoardCard appearance="success" title="Income">
  {#if incomeEntries.length === 0}
    <BoardCardEmpty message="There are no income transactions on this board." />
  {/if}

  <div class="mb-1">
    {#each incomeEntriesByCadence.recurring as [incomeId, income], idx (incomeId)}
      <TransactionInputs
        {boardsetId}
        {boardId}
        transactionId={incomeId}
        transaction={income}
        {locale}
        {currency}
        labels={idx === 0}
      />
    {/each}
  </div>
  {#each incomeEntriesByCadence.occasional as [incomeId, income] (incomeId)}
    <TransactionInputs
      {boardsetId}
      {boardId}
      transactionId={incomeId}
      transaction={income}
      {locale}
      {currency}
      labels={false}
    />
  {/each}

  <svelte:fragment slot="bottom">
    <div class="input-group mt-2">
      <TextInput value="Total" disabled />
      <CurrencyInput value={sum} {currency} {locale} readonly />
    </div>
    <div class="input-group">
      <TextInput value="Savings goal %" disabled />
      <SavingsGoalInput {boardsetId} {boardId} {savingsGoalPercentage} />
    </div>
    <div class="input-group">
      <TextInput value="Target savings" disabled />
      <CurrencyInput value={sum * savingsGoalPercentage} {currency} {locale} readonly />
    </div>
  </svelte:fragment>

  <svelte:fragment slot="actions">
    <AddIncomeButton {boardsetId} {boardId} cadence="recurring" />
    <AddIncomeButton {boardsetId} {boardId} cadence="occasional" />
  </svelte:fragment>
</BoardCard>
