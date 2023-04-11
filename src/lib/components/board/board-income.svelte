<script lang="ts">
  import type { Transactions } from "$lib/server/models/objects/board/types";

  import CurrencyInput from "../controls/currency-input.svelte";
  import TextInput from "../controls/text-input.svelte";

  import AddIncomeButton from "./add-income-button.svelte";
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
</script>

<div class="board-income card">
  <div class="card-body">
    <h5 class="card-title">Income</h5>

    {#each incomeEntries as [transactionId, transaction], idx (transactionId)}
      <div class="row">
        <TransactionInputs
          {boardsetId}
          {boardId}
          {transactionId}
          {transaction}
          {locale}
          {currency}
          labels={idx === 0}
        />
      </div>
    {:else}
      There are no income transactions on this board.
    {/each}

    <div class="card-whitespace" />

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

    <div class="card-actions mt-2">
      <AddIncomeButton {boardsetId} {boardId} />
    </div>
  </div>
</div>

<style lang="scss">
  .board-income {
    height: 100%;
    background-color: var(--bs-tertiary-bg);
    box-shadow: 0 5px 5px 3px var(--bs-secondary-bg-subtle);

    .card-body {
      display: flex;
      flex-direction: column;
    }

    .card-whitespace {
      flex-grow: 1;
    }

    .row,
    .input-group {
      margin-top: -1px;
    }

    .card-actions {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
