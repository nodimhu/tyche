<script lang="ts">
  import NewBoardsetForm from "$lib/components/forms/new-boardset-form.svelte";
  import PlusCircleIcon from "$lib/components/icons/bootstrap-icons/plus-circle-icon.svelte";

  import { createEventDispatcher } from "svelte";

  import MainNavPopper from "../common/main-nav-popper.svelte";

  export let action: string;

  const dispatch = createEventDispatcher();

  const onSubmit = (toggle: () => void) => {
    toggle();
    dispatch("submit");
  };
</script>

<MainNavPopper title="Create a new boardset" let:open let:toggle>
  <div slot="toggle" class="create-boardset-popper-toggle" class:open>
    <PlusCircleIcon size="2em" />
  </div>

  <div class="create-boardset-popper">
    <NewBoardsetForm {action} on:submit={toggle} />

    <button class="btn btn-outline-secondary" on:click={toggle}>Cancel</button>
  </div>
</MainNavPopper>

<style lang="scss">
  .create-boardset-popper-toggle {
    :global(svg) {
      opacity: 0.5;
    }

    &.open {
      :global(svg) {
        opacity: 1;
      }
    }
  }

  .create-boardset-popper {
    display: flex;
    column-gap: 0.5em;
  }
</style>
