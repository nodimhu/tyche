<script lang="ts">
  import { page } from "$app/stores";
  import SideNavBoardTree from "$lib/components/nav/side-nav/items/side-nav-board-tree.svelte";
  import SideNavDeleteBoardPopper from "$lib/components/nav/side-nav/items/side-nav-delete-board-popper.svelte";
  import SideNavDeleteBoardsetPopper from "$lib/components/nav/side-nav/items/side-nav-delete-boardset-popper.svelte";
  import SideNavNewBoardPopper from "$lib/components/nav/side-nav/items/side-nav-new-board-popper.svelte";
  import SideNav from "$lib/components/nav/side-nav/side-nav.svelte";
  import PageLayout from "$lib/components/page-layout/page-layout.svelte";

  import SideNavSeparator from "$lib/components/nav/side-nav/common/side-nav-separator.svelte";

  export let data;

  $: hasBoards = Object.keys(data.boards ?? {}).length > 0;
  $: currentMonth =
    data.boards?.[$page.data.yearParam]?.[$page.data.boardIdParam]?.month;
  $: existingMonths = Object.entries(data.boards?.[$page.data.yearParam] ?? {}).reduce(
    (months, [_, boardData]) => [...months, boardData.month],
    [] as number[],
  );
</script>

<PageLayout>
  {#if data.boardset && data.boardsetIdParam}
    <SideNav title={data.boardset.name}>
      <SideNavBoardTree
        boards={data.boards}
        selectedBoardsetId={data.boardsetIdParam}
        selectedYear={$page.data.yearParam}
        selectedBoardId={$page.data.boardIdParam}
      />

      {#if hasBoards}
        <SideNavSeparator />
      {/if}

      <SideNavNewBoardPopper
        title={"Add a new board"}
        action={`/boardsets/${data.boardsetIdParam}?/create-board`}
        actionText="Add"
        boardsetId={data.boardsetIdParam}
        year={$page.data.yearParam}
        month={(currentMonth ?? -1) + 1}
        {existingMonths}
      />

      {#if $page.data.boardIdParam}
        <SideNavNewBoardPopper
          title={"Copy this board"}
          action={`/boardsets/${data.boardsetIdParam}?/copy-board`}
          actionText="Copy"
          boardsetId={data.boardsetIdParam}
          boardId={$page.data.boardIdParam}
          year={$page.data.yearParam}
          {existingMonths}
        />
      {/if}

      <div slot="bottom">
        {#if $page.data.boardIdParam}
          <SideNavDeleteBoardPopper
            action={`/boardsets/${data.boardsetIdParam}?/delete-board`}
            boardsetId={data.boardsetIdParam}
            boardId={$page.data.boardIdParam}
          />
        {/if}

        <SideNavDeleteBoardsetPopper
          action={"/boardsets?/delete-boardset"}
          boardsetId={data.boardsetIdParam}
        />
      </div>
    </SideNav>
  {/if}

  <slot />
</PageLayout>
