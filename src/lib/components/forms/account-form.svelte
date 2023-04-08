<script lang="ts">
  import { enhance } from "$app/forms";
  import type { Account } from "$lib/server/models/objects/board/types";
  import { v4 as uuidv4 } from "uuid";

  import { Trash } from "svelte-bootstrap-icons";
  import { fade } from "svelte/transition";

  import HiddenData from "../common/hidden-data.svelte";

  import CurrencyInput from "./inputs/currency-input.svelte";
  import TextInput from "./inputs/text-input.svelte";

  export let updateAction: string;
  export let deleteAction: string;
  export let accountId: string;
  export let boardsetId: string;
  export let boardId: string;
  export let account: Account;
  export let balance: "opening" | "closing" = "opening";

  export let currency = "USD";
  export let labels = true;
  export let locale = "en-US";

  const uniqueId = uuidv4();

  let submitButton: HTMLButtonElement;
  let isTrashVisible = false;
</script>

<form
  method="POST"
  action={updateAction}
  on:mouseenter={() => (isTrashVisible = true)}
  on:mouseleave={() => (isTrashVisible = false)}
  on:keydown={(event) => {
    if (event.key === "Enter") event.preventDefault();
  }}
  use:enhance
>
  <HiddenData data={{ boardsetId, boardId, accountId }} />
  <button bind:this={submitButton} class="d-none" />

  {#if labels}
    <div class="row gx-0">
      <label class="form-label col" for={uniqueId + "-name"}> Account name </label>
      <label class="form-label col" for={uniqueId + "-amount"}> Balance </label>
    </div>
  {/if}

  <div class="input-group">
    <TextInput
      id={uniqueId + "-name"}
      placeholder="Account name"
      name="accountName"
      value={account.name}
      autocomplete="off"
      on:blur-change={() => submitButton.click()}
      required={true}
    />

    {#if balance === "opening"}
      <CurrencyInput
        id={uniqueId + "-amount"}
        placeholder="Opening amount"
        name="accountOpening"
        value={account.opening}
        autocomplete="off"
        on:blur-change={() => submitButton.click()}
        {currency}
        {locale}
      />
    {:else}
      <CurrencyInput
        id={uniqueId + "-amount"}
        placeholder="Closing amount"
        name="accountClosing"
        value={account.closing}
        autocomplete="off"
        on:blur-change={() => submitButton.click()}
        {currency}
        {locale}
      />
    {/if}

    {#if isTrashVisible}
      <div class="delete-button">
        <button
          class="btn btn-outline-danger delete-button"
          transition:fade={{ duration: 100 }}
          formaction={deleteAction}
        >
          <Trash />
        </button>
      </div>
    {/if}
  </div>
</form>

<style lang="scss">
  .delete-button {
    opacity: 0.75;
    position: absolute;
    right: 0;
    transform: translateX(100%);
    button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
</style>
