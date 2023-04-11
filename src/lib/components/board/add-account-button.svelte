<script lang="ts">
  import {
    TYCHE_USER_JWT_COOKIE_NAME,
    TYCHE_USER_JWT_HEADER_NAME,
  } from "$lib/config/common";
  import type { CreateAccountResult } from "$lib/server/models/objects/board/results";
  import { boardStore } from "$lib/stores/board-store";

  export let boardsetId: string;
  export let boardId: string;

  const addAccount = async () => {
    const tycheUserJwt = document.cookie
      .split(";")
      .find((cookie) => cookie.startsWith(TYCHE_USER_JWT_COOKIE_NAME))
      ?.split("=")[1]
      .trim();

    const response = await fetch(`/api/boardsets/${boardsetId}/${boardId}/account`, {
      method: "POST",
      body: JSON.stringify({ name: "New Account" }),
      headers: { [TYCHE_USER_JWT_HEADER_NAME]: tycheUserJwt ?? "" },
    });

    if (response.ok) {
      try {
        const newAccountResult = await response.json<CreateAccountResult>();
        const [newAccountId, newAccount] = Object.entries(newAccountResult)[0];
        $boardStore.accounts[newAccountId] = newAccount;
        $boardStore = $boardStore; // notify
      } catch (error) {}
    }
  };
</script>

<button class="btn btn-outline-primary" on:click={addAccount}> Add account </button>
