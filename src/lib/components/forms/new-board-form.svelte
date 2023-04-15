<script lang="ts">
  import { enhance } from "$app/forms";

  import { createEventDispatcher } from "svelte";

  import HiddenData from "../common/hidden-data.svelte";

  export let action: string;
  export let actionText: string;
  export let sourceBoardId = "";
  export let year = "";
  export let month = "";
  export let boardsetId: string;
  export let boardId: string;

  const dispatch = createEventDispatcher();

  const onSubmit = () => {
    dispatch("submit");
  };
</script>

<form method="POST" {action} on:submit={onSubmit} use:enhance>
  <HiddenData data={{ boardsetId, boardId, sourceBoardId }} />

  <input
    class="form-control"
    type="number"
    name="year"
    required={true}
    placeholder="Year"
    value={year}
    min="1900"
    max="2999"
  />

  <input
    class="form-control"
    type="number"
    name="month"
    required={true}
    placeholder="Month number"
    value={month}
    min="1"
    max="12"
  />

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
