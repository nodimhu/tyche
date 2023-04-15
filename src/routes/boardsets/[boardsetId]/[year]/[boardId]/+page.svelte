<script lang="ts">
  import BoardAccounts from "$lib/components/board/board-accounts.svelte";
  import BoardExpenses from "$lib/components/board/board-expenses.svelte";
  import BoardGrid from "$lib/components/board/board-grid.svelte";
  import BoardIncome from "$lib/components/board/board-income.svelte";
  import BoardSummary from "$lib/components/board/board-summary.svelte";
  import PageContainer from "$lib/components/page-layout/page-container.svelte";
  import { DEFAULT_BOARD_STORE_DATA, boardStore } from "$lib/stores/board-store";

  import { onDestroy } from "svelte";

  export let data;

  $: boardCurrency =
    data?.boardsets?.[data.boardsetIdParam ?? ""]?.currency ??
    data?.settings?.defaultCurrency;
  $: userLocale = data?.settings?.locale;

  $: $boardStore = data.board ?? DEFAULT_BOARD_STORE_DATA;

  onDestroy(() => {
    $boardStore = DEFAULT_BOARD_STORE_DATA;
  });
</script>

<PageContainer>
  {#if !data.board}
    The board cannot be found.
  {:else}
    <BoardGrid>
      <BoardAccounts
        slot="accounts-opening"
        type="opening"
        boardsetId={data.boardsetIdParam ?? ""}
        boardId={data.boardIdParam}
        accounts={$boardStore.accounts}
        currency={boardCurrency}
        locale={userLocale}
      />
      <BoardIncome
        slot="income"
        boardsetId={data.boardsetIdParam ?? ""}
        boardId={data.boardIdParam}
        transactions={$boardStore.transactions}
        savingsGoalPercentage={$boardStore.parameters.savingsGoalPercentage}
        currency={boardCurrency}
        locale={userLocale}
      />
      <BoardAccounts
        slot="accounts-closing"
        type="closing"
        boardsetId={data.boardsetIdParam ?? ""}
        boardId={data.boardIdParam}
        accounts={$boardStore.accounts}
        currency={boardCurrency}
        locale={userLocale}
      />
      <BoardExpenses
        slot="recurring-expenses"
        boardsetId={data.boardsetIdParam ?? ""}
        boardId={data.boardIdParam}
        transactions={$boardStore.transactions}
        cadence="recurring"
        currency={boardCurrency}
        locale={userLocale}
      />
      <BoardExpenses
        slot="occasional-expenses"
        boardsetId={data.boardsetIdParam ?? ""}
        boardId={data.boardIdParam}
        transactions={$boardStore.transactions}
        cadence="occasional"
        currency={boardCurrency}
        locale={userLocale}
      />
      <BoardSummary
        slot="summary"
        transactions={$boardStore.transactions}
        accounts={$boardStore.accounts}
        savingsGoalPercentage={$boardStore.parameters.savingsGoalPercentage}
        currency={boardCurrency}
        locale={userLocale}
      />
    </BoardGrid>
  {/if}
</PageContainer>
