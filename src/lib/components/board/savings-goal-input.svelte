<script lang="ts">
  import {
    TYCHE_USER_JWT_COOKIE_NAME,
    TYCHE_USER_JWT_HEADER_NAME,
  } from "$lib/config/common";
  import type { UpdateParametersResult } from "$lib/server/models/objects/board/results";
  import { boardStore } from "$lib/stores/board-store";

  import PercentageInput from "../controls/percentage-input.svelte";

  export let boardsetId: string;
  export let boardId: string;
  export let savingsGoalPercentage = 0;

  const onChangeSavingsGoalPercentage = async (
    event: CustomEvent<{ value: number }>,
  ) => {
    const tycheUserJwt = document.cookie
      .split(";")
      .find((cookie) => cookie.startsWith(TYCHE_USER_JWT_COOKIE_NAME))
      ?.split("=")[1]
      .trim();

    const response = await fetch(`/api/boardsets/${boardsetId}/${boardId}/parameters`, {
      method: "PUT",
      body: JSON.stringify({ savingsGoalPercentage: event.detail.value }),
      headers: { [TYCHE_USER_JWT_HEADER_NAME]: tycheUserJwt ?? "" },
    });

    try {
      if (response.ok) {
        const updatedParameters = await response.json<UpdateParametersResult>();
        $boardStore.parameters = updatedParameters;
      }
    } catch (error) {}
  };
</script>

<PercentageInput
  value={savingsGoalPercentage}
  on:blur-change={onChangeSavingsGoalPercentage}
  required
/>
