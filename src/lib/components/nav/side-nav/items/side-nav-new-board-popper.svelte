<script lang="ts">
  import NewBoardForm from "$lib/components/forms/new-board-form.svelte";
  import PlusCircleIcon from "$lib/components/icons/bootstrap-icons/plus-circle-icon.svelte";

  import SideNavPopper from "../common/side-nav-popper.svelte";

  export let title: string;
  export let action: string;
  export let actionText: string;
  export let boardsetId: string;
  export let boardId = "";
  export let year: string | undefined = undefined;
  export let month: number | undefined = undefined;
  export let boardsetBoards: TycheDO.BoardsetBoards.BoardsetBoardsData["boards"] = {};
</script>

<SideNavPopper {title} let:toggle>
  <PlusCircleIcon slot="icon" size="1.25em" />
  <span slot="text">{title}</span>

  <div class="new-board-popper">
    <NewBoardForm
      {action}
      {actionText}
      {boardsetId}
      {boardId}
      {year}
      {month}
      {boardsetBoards}
      on:submit={toggle}
    />
    <button class="btn btn-outline-secondary" on:click={toggle}> Cancel </button>
  </div>
</SideNavPopper>

<style lang="scss">
  .new-board-popper {
    display: flex;
    column-gap: 0.5em;
  }
</style>
