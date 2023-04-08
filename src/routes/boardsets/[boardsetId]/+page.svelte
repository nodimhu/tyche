<script>
  import PageContainer from "$lib/components/page-layout/page-container.svelte";

  export let data;
</script>

<PageContainer>
  {#if !data.boardset}
    The boardset cannot be found.
  {:else}
    The boardset is empty, start by adding a board.
  {/if}
</PageContainer>
