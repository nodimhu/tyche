<script lang="ts">
  import { TYCHE_USER_JWT_HEADER_NAME } from "$lib/config/common";
  import type { CreateTransactionResult } from "$lib/server/models/objects/board/results";
  import { boardStore } from "$lib/stores/board-store";
  import { getTycheUserJWT } from "$lib/utils/cookie";

  import Tooltip from "../common/tooltip.svelte";

  import PlusIcon from "../icons/bootstrap-icons/plus-icon.svelte";
  import RepeatIcon from "../icons/bootstrap-icons/repeat-icon.svelte";

  export let boardsetId: string;
  export let boardId: string;
  export let cadence: "recurring" | "occasional" = "occasional";

  const addIncome = async () => {
    const tycheUserJwt = getTycheUserJWT();

    const response = await fetch(
      `/api/boardsets/${boardsetId}/${boardId}/transaction`,
      {
        method: "POST",
        body: JSON.stringify({ description: "New Income", type: "income", cadence }),
        headers: { [TYCHE_USER_JWT_HEADER_NAME]: tycheUserJwt },
      },
    );

    if (response.ok) {
      try {
        const newTransactionResult = await response.json<CreateTransactionResult>();
        const [newTransactionId, newTransaction] =
          Object.entries(newTransactionResult)[0];
        $boardStore.transactions[newTransactionId] = newTransaction;
        $boardStore = $boardStore; // notify
      } catch (error) {}
    }
  };
</script>

<Tooltip contents={`Add ${cadence} income`}>
  <button class="btn btn-round btn-current-color text-success" on:click={addIncome}>
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
