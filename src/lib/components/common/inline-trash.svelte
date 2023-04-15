<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  import TrashIcon from "../icons/bootstrap-icons/trash-icon.svelte";

  import Popper from "./popper.svelte";

  export let confirm = true;

  let buttonElement: HTMLElement;

  const dispatch = createEventDispatcher();

  const onDelete = () => {
    dispatch("delete");
  };
</script>

{#if confirm}
  <Popper
    reference={buttonElement}
    placement="right"
    paddingless
    offset={[0, 5]}
    let:toggle
  >
    <button
      slot="toggle"
      bind:this={buttonElement}
      class="btn btn-outline-danger delete-button"
      transition:fade={{ duration: 250 }}
      on:click={toggle}
    >
      <TrashIcon size="1.25em" />
    </button>

    <button class="btn btn-danger" on:click={onDelete}> Confirm </button>
  </Popper>
{:else}
  <button
    class="btn btn-outline-danger delete-button"
    transition:fade={{ duration: 250 }}
    on:click={onDelete}
  >
    <TrashIcon size="1.25em" />
  </button>
{/if}

<style lang="scss">
  .delete-button {
    border: 1px solid transparent;
    z-index: 1;
    opacity: 0.5;
    position: absolute;
    bottom: 0;
    right: 0;

    &:hover {
      opacity: 1;
      border: 1px solid var(--bs-danger);
    }
  }
</style>
