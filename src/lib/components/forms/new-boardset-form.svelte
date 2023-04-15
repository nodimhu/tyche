<script lang="ts">
  import { enhance } from "$app/forms";

  import { createEventDispatcher } from "svelte";

  export let action: string;

  const dispatch = createEventDispatcher();

  const onSubmit = () => {
    dispatch("submit");
  };
</script>

<form method="POST" {action} on:submit={onSubmit} use:enhance>
  <input
    class="form-control"
    type="text"
    name="boardsetName"
    required={true}
    placeholder="Boardset name"
  />

  <button type="submit" class="btn btn-primary"> Create </button>
</form>

<style lang="scss">
  form {
    display: flex;
    column-gap: 0.5em;
    input {
      width: 20em;
    }
    button {
      width: 5em;
    }
  }
</style>
