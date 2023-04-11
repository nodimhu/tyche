<script lang="ts">
  import type { Transactions } from "$lib/server/models/objects/board/types";

  import CurrencyInput from "../controls/currency-input.svelte";
  import TextInput from "../controls/text-input.svelte";

  import AddExpenseButton from "./add-expense-button.svelte";
  import TransactionInputs from "./transaction-inputs.svelte";

  export let boardsetId: string;
  export let boardId: string;

  export let transactions: Transactions;
  export let cadence: "recurring" | "occasional";

  export let currency: string = "USD";
  export let locale: string = "en-US";

  $: expenseEntries = Object.entries(transactions)?.filter(
    ([transactionId, transaction]) =>
      transaction.type === "expense" && transaction.cadence === cadence,
  );
  $: sum = expenseEntries.reduce((sum, [_, expense]) => sum + expense.amount, 0);
</script>

<div class="board-expenses card">
  <div class="card-body">
    <h5 class="card-title">
      {`${cadence[0].toUpperCase() + cadence.slice(1)} Expenses`}
    </h5>

    {#each expenseEntries as [transactionId, transaction], idx (transactionId)}
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
      There are no {cadence} expenses on this board.
    {/each}

    <div class="card-whitespace" />

    <div class="input-group mt-2">
      <TextInput value="Total" disabled />
      <CurrencyInput value={sum} {currency} {locale} readonly />
    </div>

    <div class="card-actions mt-2">
      <AddExpenseButton {boardsetId} {boardId} {cadence} />
    </div>
  </div>
</div>

<style lang="scss">
  .board-expenses {
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
