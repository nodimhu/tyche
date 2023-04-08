<script lang="ts">
  import type { Accounts } from "$lib/server/models/objects/board/types";

  import AccountForm from "../forms/account-form.svelte";
  import BoardActionForm from "../forms/board-action-form.svelte";

  export let updateAction: string;
  export let deleteAction: string;
  export let createAction: string;

  export let boardsetId: string;
  export let boardId: string;

  export let accounts: Accounts;

  export let balances: "opening" | "closing" = "opening";
  export let currency: string = "USD";
  export let locale: string = "en-US";
</script>

<div class="board-accounts container-fluid">
  <div class="row">
    <div class="col">
      <h5>{balances === "opening" ? "Opening Balances" : "Closing Balances"}</h5>
    </div>
    <div class="col-auto">
      <BoardActionForm
        action={createAction}
        actionText="Add account"
        {boardsetId}
        {boardId}
      />
    </div>
  </div>

  {#each Object.entries(accounts) as [accountId, account], idx (accountId)}
    <div class="row">
      <AccountForm
        {updateAction}
        {deleteAction}
        {boardsetId}
        {boardId}
        {accountId}
        {account}
        {locale}
        {currency}
        balance={balances}
        labels={idx === 0}
      />
    </div>
  {:else}
    There are no accounts on this board.
  {/each}
</div>

<style lang="scss">
  .board-accounts {
    .row {
      margin-top: -1px;
      padding-right: calc(var(--bs-gutter-x) * 0.5 + 2em);
    }
  }
</style>
