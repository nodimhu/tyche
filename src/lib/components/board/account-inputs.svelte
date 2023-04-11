<script lang="ts">
  import CurrencyInput from "$lib/components/controls/currency-input.svelte";
  import TextInput from "$lib/components/controls/text-input.svelte";
  import {
    TYCHE_USER_JWT_COOKIE_NAME,
    TYCHE_USER_JWT_HEADER_NAME,
  } from "$lib/config/common";
  import type { UpdateAccountResult } from "$lib/server/models/objects/board/results";
  import type { Account } from "$lib/server/models/objects/board/types";
  import { boardStore } from "$lib/stores/board-store";
  import { v4 as uuidv4 } from "uuid";

  import { fade } from "svelte/transition";

  import TrashIcon from "../bootstrap-icons/trash-icon.svelte";

  export let boardsetId: string;
  export let boardId: string;
  export let accountId: string;
  export let account: Account;
  export let balance: "opening" | "closing" = "opening";

  export let currency = "USD";
  export let labels = true;
  export let locale = "en-US";

  const onChangeName = async (
    event: CustomEvent<{ target: HTMLInputElement; value: string }>,
  ) => {
    const tycheUserJwt = document.cookie
      .split(";")
      .find((cookie) => cookie.startsWith(TYCHE_USER_JWT_COOKIE_NAME))
      ?.split("=")[1]
      .trim();

    const response = await fetch(
      `/api/boardsets/${boardsetId}/${boardId}/account` + `?accountId=${accountId}`,
      {
        method: "PUT",
        body: JSON.stringify({ name: event.detail.value }),
        headers: { [TYCHE_USER_JWT_HEADER_NAME]: tycheUserJwt ?? "" },
      },
    );

    try {
      if (response.ok) {
        const updatedAccount = await response.json<UpdateAccountResult>();
        $boardStore.accounts[accountId] = updatedAccount;
      }
    } catch (error) {}
  };

  const onChangeAmount = async (
    event: CustomEvent<{ target: HTMLInputElement; value: number }>,
  ) => {
    const tycheUserJwt = document.cookie
      .split(";")
      .find((cookie) => cookie.startsWith(TYCHE_USER_JWT_COOKIE_NAME))
      ?.split("=")[1]
      .trim();

    const response = await fetch(
      `/api/boardsets/${boardsetId}/${boardId}/account` + `?accountId=${accountId}`,
      {
        method: "PUT",
        body: JSON.stringify({ [balance]: event.detail.value }),
        headers: { [TYCHE_USER_JWT_HEADER_NAME]: tycheUserJwt ?? "" },
      },
    );

    try {
      if (response.ok) {
        const updatedAccount = await response.json<UpdateAccountResult>();
        $boardStore.accounts[accountId] = updatedAccount;
      }
    } catch (error) {}
  };

  const onDelete = async () => {
    const tycheUserJwt = document.cookie
      .split(";")
      .find((cookie) => cookie.startsWith(TYCHE_USER_JWT_COOKIE_NAME))
      ?.split("=")[1]
      .trim();

    const response = await fetch(
      `/api/boardsets/${boardsetId}/${boardId}/account` + `?accountId=${accountId}`,
      {
        method: "DELETE",
        headers: { [TYCHE_USER_JWT_HEADER_NAME]: tycheUserJwt ?? "" },
      },
    );

    try {
      if (response.ok) {
        delete $boardStore.accounts[accountId];
        $boardStore = $boardStore; // notify
      }
    } catch (error) {}
  };

  const uniqueId = uuidv4();

  let isTrashVisible = false;
</script>

<div
  class="account-inputs"
  on:mouseenter={() => (isTrashVisible = true)}
  on:mouseleave={() => (isTrashVisible = false)}
>
  {#if labels}
    <div class="row gx-0">
      <label class="form-label col" for={uniqueId + "-name"}> Account </label>
      <label class="form-label col" for={uniqueId + "-amount"}> Balance </label>
    </div>
  {/if}

  <div class="input-group">
    <TextInput
      id={uniqueId + "-name"}
      name="accountName"
      value={account.name}
      required={true}
      placeholder="Account name"
      autocomplete="off"
      on:blur-change={onChangeName}
    />

    {#if balance === "opening"}
      <CurrencyInput
        {locale}
        {currency}
        id={uniqueId + "-amount"}
        name="accountOpening"
        value={account.opening}
        required={true}
        placeholder="Opening amount"
        autocomplete="off"
        on:blur-change={onChangeAmount}
      />
    {:else}
      <CurrencyInput
        {locale}
        {currency}
        id={uniqueId + "-amount"}
        name="accountClosing"
        value={account.closing}
        required={true}
        placeholder="Closing amount"
        autocomplete="off"
        on:blur-change={onChangeAmount}
      />
    {/if}
  </div>

  {#if isTrashVisible}
    <button
      class="btn btn-outline-danger delete-button"
      transition:fade={{ duration: 250 }}
      on:click={onDelete}
    >
      <TrashIcon />
    </button>
  {/if}
</div>

<style lang="scss">
  .account-inputs {
    position: relative;

    .delete-button {
      border: 1px solid transparent;
      z-index: 1;
      opacity: 1;
      position: absolute;
      bottom: 0;
      right: calc(0.5 * var(--bs-gutter-x));

      &:hover {
        border: 1px solid var(--bs-danger);
      }
    }
  }
</style>
