<script>
  import { page } from "$app/stores";
  import BoardAccounts from "$lib/components/board/board-accounts.svelte";
  import BoardGrid from "$lib/components/board/board-grid.svelte";
  import PageContainer from "$lib/components/page-layout/page-container.svelte";
  import { focusStore } from "$lib/stores/focus-store";

  export let data;

  $: boardCurrency =
    data?.boardsets?.[data.boardsetIdParam ?? ""]?.currency ??
    data?.settings?.defaultCurrency;
  $: userLocale = data?.settings?.locale;
</script>

<PageContainer>
  {#if !data.board}
    The board cannot be found.
  {:else}
    <BoardGrid>
      <BoardAccounts
        createAction={$page.url.pathname + "?/create-account"}
        updateAction={$page.url.pathname + "?/update-account"}
        deleteAction={$page.url.pathname + "?/delete-account"}
        slot="accounts-opening"
        boardsetId={data.boardsetIdParam ?? ""}
        boardId={data.boardIdParam}
        accounts={data.board.accounts}
        balances="opening"
        currency={boardCurrency}
        locale={userLocale}
      />
      <BoardAccounts
        createAction={$page.url.pathname + "?/create-account"}
        updateAction={$page.url.pathname + "?/update-account"}
        deleteAction={$page.url.pathname + "?/delete-account"}
        slot="accounts-closing"
        boardsetId={data.boardsetIdParam ?? ""}
        boardId={data.boardIdParam}
        accounts={data.board.accounts}
        balances="closing"
        currency={boardCurrency}
        locale={userLocale}
      />
    </BoardGrid>
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
        <p>Board data</p>
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
        <p>Form data</p>
        <code>
          <pre>{JSON.stringify($page.form, null, 2)}</pre>
        </code>
      </section>
      <section class="col-auto">
        <p>Stores</p>
        <code>
          <pre>{JSON.stringify(
              {
                lastActiveElement: `<${$focusStore.lastActiveElement?.tagName.toLowerCase()} />`,
              },
              null,
              2,
            )}</pre>
        </code>
      </section>
    </div>
  {/if}
</PageContainer>
