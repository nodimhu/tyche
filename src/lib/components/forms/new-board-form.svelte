<script lang="ts">
  import { enhance } from "$app/forms";
  import type { BoardsetBoardsData } from "$lib/server/models/objects/boardset-boards/types";

  import { createEventDispatcher } from "svelte";

  import HiddenData from "../common/hidden-data.svelte";

  export let action: string;
  export let actionText: string;
  export let boardsetId: string;
  export let boardId = "";
  export let year = new Date().getFullYear().toString();
  export let month = 1;
  export let boardsetBoards: BoardsetBoardsData["boards"] = {};

  $: existingMonths = Object.entries(boardsetBoards[year] ?? {}).reduce(
    (months, [_, boardData]) => [...months, boardData.month],
    [] as number[],
  );

  const dispatch = createEventDispatcher();

  const monthOptions = [...Array(12).keys()].map((month) => ({
    value: month + 1,
    text: new Date(0, month).toLocaleDateString("en-US", { month: "long" }),
  }));

  const onSubmit = () => {
    dispatch("submit");
  };
</script>

<form method="POST" {action} on:submit={onSubmit} use:enhance>
  <HiddenData data={{ boardsetId, boardId }} />

  <input
    class="form-control"
    type="number"
    name="year"
    required={true}
    placeholder="Year"
    bind:value={year}
    min="1900"
    max="2999"
  />

  <select class="form-select" name="month" placeholder="Select a month">
    <option selected={existingMonths.includes(month)}>Select a month</option>
    {#each monthOptions as option (option.value)}
      {#if !existingMonths.includes(option.value)}
        <option value={option.value} selected={option.value === month}>
          {option.text}
        </option>
      {:else}
        <option value={option.value} disabled>{option.text} (Exists)</option>
      {/if}
    {/each}
  </select>

  <button class="btn btn-primary">
    {actionText}
  </button>
</form>

<style lang="scss">
  form {
    display: flex;
    column-gap: 0.5em;
    input {
      width: 10em;
    }
    button {
      width: 5em;
    }
  }
</style>
