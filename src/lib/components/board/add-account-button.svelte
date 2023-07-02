<script lang="ts">
  import PlusIcon from "$lib/components/icons/bootstrap-icons/plus-icon.svelte";
  import {
    TYCHE_USER_JWT_COOKIE_NAME,
    TYCHE_USER_JWT_HEADER_NAME,
  } from "$lib/config/common";
  import { boardStore } from "$lib/stores/board-store";

  import Tooltip from "../common/tooltip.svelte";

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
        const newAccountResult =
          await response.json<TycheDO.Board.CreateAccountResult>();
        const [newAccountId, newAccount] = Object.entries(newAccountResult)[0];
        $boardStore.accounts[newAccountId] = newAccount;
        $boardStore = $boardStore; // notify
      } catch (error) {}
    }
  };
</script>

<Tooltip contents="Add account">
  <button class="btn btn-round btn-current-color text-primary" on:click={addAccount}>
    <PlusIcon size="2.5em" />
  </button>
</Tooltip>

<style lang="scss">
  button {
    width: 2.75em;
    height: 2.75em;
  }
</style>
