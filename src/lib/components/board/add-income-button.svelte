<script lang="ts">
  import {
    TYCHE_USER_JWT_COOKIE_NAME,
    TYCHE_USER_JWT_HEADER_NAME,
  } from "$lib/config/common";
  import type { CreateTransactionResult } from "$lib/server/models/objects/board/results";
  import { boardStore } from "$lib/stores/board-store";

  export let boardsetId: string;
  export let boardId: string;

  const addIncome = async () => {
    const tycheUserJwt = document.cookie
      .split(";")
      .find((cookie) => cookie.startsWith(TYCHE_USER_JWT_COOKIE_NAME))
      ?.split("=")[1]
      .trim();

    const response = await fetch(
      `/api/boardsets/${boardsetId}/${boardId}/transaction`,
      {
        method: "POST",
        body: JSON.stringify({ description: "New Income", type: "income" }),
        headers: { [TYCHE_USER_JWT_HEADER_NAME]: tycheUserJwt ?? "" },
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

<button class="btn btn-outline-primary" on:click={addIncome}> Add income </button>
