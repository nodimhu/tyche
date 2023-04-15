<script lang="ts">
  import CurrencyInput from "$lib/components/controls/currency-input.svelte";
  import TextInput from "$lib/components/controls/text-input.svelte";
  import {
    TYCHE_USER_JWT_COOKIE_NAME,
    TYCHE_USER_JWT_HEADER_NAME,
  } from "$lib/config/common";
  import type { UpdateTransactionResult } from "$lib/server/models/objects/board/results";
  import type { Transaction } from "$lib/server/models/objects/board/types";
  import { boardStore } from "$lib/stores/board-store";
  import { v4 as uuidv4 } from "uuid";

  import InlineTrash from "../common/inline-trash.svelte";
  import Tooltip from "../common/tooltip.svelte";

  import RepeatIcon from "../icons/bootstrap-icons/repeat-icon.svelte";

  export let boardsetId: string;
  export let boardId: string;
  export let transactionId: string;
  export let transaction: Transaction;

  export let currency = "USD";
  export let labels = true;
  export let locale = "en-US";

  const onChangeDescription = async (
    event: CustomEvent<{ target: HTMLInputElement; value: string }>,
  ) => {
    const tycheUserJwt = document.cookie
      .split(";")
      .find((cookie) => cookie.startsWith(TYCHE_USER_JWT_COOKIE_NAME))
      ?.split("=")[1]
      .trim();

    const response = await fetch(
      `/api/boardsets/${boardsetId}/${boardId}/transaction` +
        `?transactionId=${transactionId}`,
      {
        method: "PUT",
        body: JSON.stringify({ description: event.detail.value }),
        headers: { [TYCHE_USER_JWT_HEADER_NAME]: tycheUserJwt ?? "" },
      },
    );

    try {
      if (response.ok) {
        const updatedTransaction = await response.json<UpdateTransactionResult>();
        $boardStore.transactions[transactionId] = updatedTransaction;
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
      `/api/boardsets/${boardsetId}/${boardId}/transaction` +
        `?transactionId=${transactionId}`,
      {
        method: "PUT",
        body: JSON.stringify({ amount: event.detail.value }),
        headers: { [TYCHE_USER_JWT_HEADER_NAME]: tycheUserJwt ?? "" },
      },
    );

    try {
      if (response.ok) {
        const updatedTransaction = await response.json<UpdateTransactionResult>();
        $boardStore.transactions[transactionId] = updatedTransaction;
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
      `/api/boardsets/${boardsetId}/${boardId}/transaction` +
        `?transactionId=${transactionId}`,
      {
        method: "DELETE",
        headers: { [TYCHE_USER_JWT_HEADER_NAME]: tycheUserJwt ?? "" },
      },
    );

    try {
      if (response.ok) {
        delete $boardStore.transactions[transactionId];
        $boardStore = $boardStore; // notify
      }
    } catch (error) {}
  };

  const uniqueId = uuidv4();

  let isTrashVisible = false;
</script>

<div
  class="transaction-inputs"
  class:recurring={transaction.cadence === "recurring"}
  on:mouseenter={() => (isTrashVisible = true)}
  on:mouseleave={() => (isTrashVisible = false)}
>
  {#if labels}
    <div class="row gx-0">
      <label class="form-label col" for={uniqueId + "-description"}>
        Description
      </label>
      <label class="form-label col" for={uniqueId + "-amount"}> Amount </label>
    </div>
  {/if}

  {#if transaction.cadence === "recurring"}
    <div class="recurring-icon">
      <Tooltip contents="Recurring">
        <RepeatIcon size="1em" />
      </Tooltip>
    </div>
  {/if}

  <div class="input-group">
    <TextInput
      id={uniqueId + "-description"}
      name="accountName"
      class="description"
      value={transaction.description}
      required={true}
      placeholder="Account name"
      autocomplete="off"
      on:blur-change={onChangeDescription}
    />
    <CurrencyInput
      {locale}
      {currency}
      id={uniqueId + "-amount"}
      style="min-width: 10em;"
      name="accountOpening"
      value={transaction.amount}
      required={true}
      placeholder="Opening amount"
      autocomplete="off"
      on:blur-change={onChangeAmount}
    />
  </div>

  {#if isTrashVisible}
    <InlineTrash on:delete={onDelete} />
  {/if}
</div>

<style lang="scss">
  .transaction-inputs {
    position: relative;

    &.recurring :global(.description) {
      text-indent: 1.5em;
    }

    .recurring-icon {
      color: var(--bs-primary);
      position: absolute;
      bottom: 0.5em;
      left: 0.75em;
      transform: translate(0, 0);
      z-index: 6;
    }
  }
</style>
