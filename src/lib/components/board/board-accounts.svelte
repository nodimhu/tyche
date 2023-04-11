<script lang="ts">
  import type { Accounts } from "$lib/server/models/objects/board/types";

  import CurrencyInput from "../controls/currency-input.svelte";
  import TextInput from "../controls/text-input.svelte";

  import AccountInputs from "./account-inputs.svelte";
  import AddAccountButton from "./add-account-button.svelte";

  export let boardsetId: string;
  export let boardId: string;

  export let accounts: Accounts;
  export let type: "opening" | "closing";

  export let currency: string = "USD";
  export let locale: string = "en-US";

  $: accountEntries = Object.entries(accounts);
  $: sum = accountEntries.reduce((sum, [_, account]) => sum + account[type], 0);
</script>

<div class="board-accounts card">
  <div class="card-body">
    <h5 class="card-title">
      {type === "opening" ? "Opening Balances" : "Closing Balances"}
    </h5>

    <div class="card-text">
      {#each accountEntries as [accountId, account], idx (accountId)}
        <div class="row">
          <AccountInputs
            {boardsetId}
            {boardId}
            {accountId}
            {account}
            {locale}
            {currency}
            balance={type}
            labels={idx === 0}
          />
        </div>
      {:else}
        There are no accounts on this board.
      {/each}
    </div>

    <div class="card-whitespace" />

    <div class="input-group mt-2">
      <TextInput value="Total" disabled />
      <CurrencyInput value={sum} {currency} {locale} readonly />
    </div>

    <div class="card-actions mt-2">
      <AddAccountButton {boardsetId} {boardId} />
    </div>
  </div>
</div>

<style lang="scss">
  .board-accounts {
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

    .row {
      margin-top: -1px;
    }

    .card-actions {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
