<script lang="ts">
  import TextInput from "$lib/components/controls/text-input.svelte";
  import { TYCHE_USER_JWT_HEADER_NAME } from "$lib/config/common";
  import type { UpdateAccountResult } from "$lib/server/models/objects/board/results";
  import type { Account } from "$lib/server/models/objects/board/types";
  import { boardStore } from "$lib/stores/board-store";
  import { v4 as uuidv4 } from "uuid";

  import InlineTrash from "../common/inline-trash.svelte";

  import { getTycheUserJWT } from "$lib/utils/cookie";
  import CurrencyValueInput from "../controls/currency-value-input.svelte";

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
    const tycheUserJwt = getTycheUserJWT();

    const response = await fetch(
      `/api/boardsets/${boardsetId}/${boardId}/account` + `?accountId=${accountId}`,
      {
        method: "PUT",
        body: JSON.stringify({ name: event.detail.value }),
        headers: { [TYCHE_USER_JWT_HEADER_NAME]: tycheUserJwt },
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
    const tycheUserJwt = getTycheUserJWT();

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
    const tycheUserJwt = getTycheUserJWT();

    const response = await fetch(
      `/api/boardsets/${boardsetId}/${boardId}/account` + `?accountId=${accountId}`,
      {
        method: "DELETE",
        headers: { [TYCHE_USER_JWT_HEADER_NAME]: tycheUserJwt },
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
      <CurrencyValueInput
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
      <CurrencyValueInput
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
    <InlineTrash on:delete={onDelete} />
  {/if}
</div>

<style lang="scss">
  .account-inputs {
    position: relative;
  }
</style>
