<script lang="ts">
  import type { Transactions } from "$lib/server/models/objects/board/types";

  import CurrencyValueInput from "../controls/currency-value-input.svelte";
  import TextInput from "../controls/text-input.svelte";

  import AddExpenseButton from "./add-expense-button.svelte";
  import BoardCardEmpty from "./board-card-empty.svelte";
  import BoardCard from "./board-card.svelte";
  import TransactionInputs from "./transaction-inputs.svelte";

  export let boardsetId: string;
  export let boardId: string;

  export let transactions: Transactions;
  export let cadence: "recurring" | "occasional";

  export let currency: string = "USD";
  export let locale: string = "en-US";

  $: expenseEntries = Object.entries(transactions)?.filter(
    ([_, transaction]) =>
      transaction.type === "expense" && transaction.cadence === cadence,
  );
  $: sum = expenseEntries.reduce((sum, [_, expense]) => sum + expense.amount, 0);
</script>

<BoardCard
  appearance="danger"
  title={`${cadence[0].toUpperCase() + cadence.slice(1)} Expenses`}
>
  {#each expenseEntries as [transactionId, transaction], idx (transactionId)}
    <TransactionInputs
      {boardsetId}
      {boardId}
      {transactionId}
      {transaction}
      {locale}
      {currency}
      labels={idx === 0}
    />
  {:else}
    <BoardCardEmpty message={`There are no ${cadence} expenses on this board.`} />
  {/each}

  <svelte:fragment slot="bottom">
    <div class="input-group mt-2">
      <TextInput value="Total" disabled />
      <CurrencyValueInput value={sum} {currency} {locale} readonly />
    </div>
  </svelte:fragment>

  <svelte:fragment slot="actions">
    <AddExpenseButton {boardsetId} {boardId} {cadence} />
  </svelte:fragment>
</BoardCard>
