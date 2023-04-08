<script lang="ts">
  import AddBoardForm from "$lib/components/forms/add-board-form.svelte";

  import { PlusCircle } from "svelte-bootstrap-icons";

  import SideNavPopper from "../common/side-nav-popper.svelte";

  export let title: string;
  export let action: string;
  export let actionText: string;
  export let year = "";
  export let boardsetId: string;
  export let boardId = "";
</script>

<SideNavPopper {title} let:toggle>
  <PlusCircle slot="icon" width="1.25em" height="1.25em" />
  <span slot="text">{title}</span>

  <div class="new-board-popper">
    <AddBoardForm
      {action}
      {actionText}
      {year}
      {boardsetId}
      {boardId}
      on:submit={toggle}
    />
    <button class="btn btn-link text-secondary-emphasis" on:click={toggle}>
      Cancel
    </button>
  </div>
</SideNavPopper>

<style lang="scss">
  .new-board-popper {
    display: flex;
    column-gap: 0.5em;
  }
</style>
