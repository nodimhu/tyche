<script>
  import BoardAccounts from "$lib/components/board/board-accounts.svelte";
  import BoardGrid from "$lib/components/board/board-grid.svelte";
  import BoardIncome from "$lib/components/board/board-income.svelte";
  import PageContainer from "$lib/components/page-layout/page-container.svelte";
  import { boardStore } from "$lib/stores/board-store";

  export let data;

  const devMode = false;

  $: boardCurrency =
    data?.boardsets?.[data.boardsetIdParam ?? ""]?.currency ??
    data?.settings?.defaultCurrency;
  $: userLocale = data?.settings?.locale;

  $: {
    if (data.board) {
      $boardStore = data.board;
    }
  }
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
    </BoardGrid>
    {#if devMode}
      <br /><br />
      <div class="row">
        <section class="col-auto">
          <p>Global data</p>
          <code>
            <pre>{JSON.stringify(
                {
                  username: data.username,
                  boardsets: data.boardsets,
                  settings: data.settings,
                },
                null,
                2,
              )}</pre>
          </code>
        </section>
        <section class="col-auto">
          <p>Boardset data</p>
          <code>
            <pre>{JSON.stringify(
                {
                  boardsetIdParam: data.boardsetIdParam,
                  boardset: data.boardset,
                  boards: data.boards,
                },
                null,
                2,
              )}</pre>
          </code>
        </section>
        <section class="col-auto">
          <p>Board data (initial)</p>
          <code>
            <pre>{JSON.stringify(
                {
                  yearParam: data.yearParam,
                  boardIdParam: data.boardIdParam,
                  board: data.board,
                },
                null,
                2,
              )}</pre>
          </code>
        </section>
        <section class="col-auto">
          <p>Board data store (dynamic)</p>
          <code>
            <pre>{JSON.stringify($boardStore, null, 2)}</pre>
          </code>
        </section>
      </div>
    {/if}
  {/if}
</PageContainer>
