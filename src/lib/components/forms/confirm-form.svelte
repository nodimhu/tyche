<script lang="ts">
  import { enhance } from "$app/forms";

  import { createEventDispatcher } from "svelte";

  import HiddenData from "../common/hidden-data.svelte";

  export let action: string;
  export let confirmText: string = "Yes";
  export let data: Record<string, string> = {};

  const dispatch = createEventDispatcher();
</script>

<form method="POST" {action} on:submit={() => dispatch("submit")} use:enhance>
  <HiddenData {data} />

  <slot />

  <div class="buttons">
    <button class="btn btn-danger">
      {confirmText}
    </button>
    <slot name="buttons" />
  </div>
</form>

<style lang="scss">
  form {
    .buttons {
      display: flex;
      column-gap: 0.5em;
      justify-content: center;
    }
    button {
      min-width: 5em;
      transition: width 0.25s ease;
    }
  }
</style>
