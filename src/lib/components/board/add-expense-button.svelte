<script lang="ts">
  import {
    TYCHE_USER_JWT_COOKIE_NAME,
    TYCHE_USER_JWT_HEADER_NAME,
  } from "$lib/config/common";
  import { boardStore } from "$lib/stores/board-store";

  import Tooltip from "../common/tooltip.svelte";

  import PlusIcon from "../icons/bootstrap-icons/plus-icon.svelte";
  import RepeatIcon from "../icons/bootstrap-icons/repeat-icon.svelte";

  export let boardsetId: string;
  export let boardId: string;
  export let cadence: "recurring" | "occasional";

  const addExpense = async () => {
    const tycheUserJwt = document.cookie
      .split(";")
      .find((cookie) => cookie.startsWith(TYCHE_USER_JWT_COOKIE_NAME))
      ?.split("=")[1]
      .trim();

    const response = await fetch(
      `/api/boardsets/${boardsetId}/${boardId}/transaction`,
      {
        method: "POST",
        body: JSON.stringify({ description: "New Expense", type: "expense", cadence }),
        headers: { [TYCHE_USER_JWT_HEADER_NAME]: tycheUserJwt ?? "" },
      },
    );

    if (response.ok) {
      try {
        const newTransactionResult =
          await response.json<TycheDO.Board.CreateTransactionResult>();
        const [newTransactionId, newTransaction] =
          Object.entries(newTransactionResult)[0];
        $boardStore.transactions[newTransactionId] = newTransaction;
        $boardStore = $boardStore; // notify
      } catch (error) {}
    }
  };
</script>

<Tooltip contents={`Add ${cadence} expense`}>
  <button class="btn btn-round btn-current-color text-danger" on:click={addExpense}>
    {#if cadence === "recurring"}
      <RepeatIcon size="2em" />
    {/if}
    <PlusIcon size={cadence === "occasional" ? "2.5em" : "1.5em"} />
  </button>
</Tooltip>

<style lang="scss">
  button {
    width: 2.75em;
    height: 2.75em;
  }
</style>
