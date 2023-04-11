<script lang="ts">
  import ChevronDownIcon from "$lib/components/bootstrap-icons/chevron-down-icon.svelte";
  import ChevronRightIcon from "$lib/components/bootstrap-icons/chevron-right-icon.svelte";
  import type {
    BoardData,
    BoardsetBoardsData,
  } from "$lib/server/models/objects/boardset-boards/types";

  import SideNavItem from "../common/side-nav-item.svelte";

  export let boards: BoardsetBoardsData["boards"] | null = {};
  export let selectedBoardsetId = "";
  export let selectedYear = "";
  export let selectedBoardId = "";

  const getSortedBoardEntries = (boardsOfYear: Record<string, BoardData>) => {
    return Object.entries(boardsOfYear).sort(
      ([_A, boardDataA], [_B, boardDataB]) => boardDataA.month - boardDataB.month,
    );
  };

  $: boardYears = Object.keys(boards ?? {}).reverse();
</script>

{#each boardYears as year}
  <SideNavItem
    href={"/boardsets/" + selectedBoardsetId + "/" + year}
    active={selectedYear === year && !selectedBoardId}
  >
    {#if selectedYear === year}
      <ChevronDownIcon /> {year}
    {:else}
      <ChevronRightIcon /> {year}
    {/if}
  </SideNavItem>

  {#if selectedYear === year}
    {#each getSortedBoardEntries(boards?.[year] ?? {}) as [boardId, boardData]}
      <SideNavItem
        padding={1}
        href={`/boardsets/${selectedBoardsetId}/${year}/${boardId}`}
        color={selectedBoardId === boardId ? "dark" : undefined}
        active={selectedBoardId === boardId}
      >
        {new Date(+year, boardData.month - 1).toLocaleString("en-US", {
          month: "long",
        })}
      </SideNavItem>
    {/each}
  {/if}
{/each}
