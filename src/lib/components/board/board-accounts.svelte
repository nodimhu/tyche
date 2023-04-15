<script lang="ts">
  import type { Accounts } from "$lib/server/models/objects/board/types";

  import CurrencyValueInput from "../controls/currency-value-input.svelte";
  import TextInput from "../controls/text-input.svelte";

  import AccountInputs from "./account-inputs.svelte";
  import AddAccountButton from "./add-account-button.svelte";
  import BoardCardEmpty from "./board-card-empty.svelte";
  import BoardCard from "./board-card.svelte";

  export let boardsetId: string;
  export let boardId: string;

  export let accounts: Accounts;
  export let type: "opening" | "closing";

  export let currency: string = "USD";
  export let locale: string = "en-US";

  $: accountEntries = Object.entries(accounts);
  $: sum = accountEntries.reduce((sum, [_, account]) => sum + account[type], 0);
</script>

<BoardCard
  appearance="primary"
  title={type === "opening" ? "Opening Balances" : "Closing Balances"}
>
  {#each accountEntries as [accountId, account], idx (accountId)}
    <div class="account-inputs">
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
    <BoardCardEmpty message="There are no accounts on this board" />
  {/each}

  <svelte:fragment slot="bottom">
    <div class="input-group">
      <TextInput value="Total" disabled />
      <CurrencyValueInput value={sum} {currency} {locale} readonly />
    </div>
  </svelte:fragment>

  <AddAccountButton slot="actions" {boardsetId} {boardId} />
</BoardCard>
