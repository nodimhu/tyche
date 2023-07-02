<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import PersonCircleIcon from "$lib/components/icons/bootstrap-icons/person-circle-icon.svelte";
  import BoardsetLink from "$lib/components/nav/main-nav/items/boardset-link.svelte";
  import CreateBoardsetPopper from "$lib/components/nav/main-nav/items/create-boardset-popper.svelte";
  import MainNav from "$lib/components/nav/main-nav/main-nav.svelte";
  import PageLayout from "$lib/components/page-layout/page-layout.svelte";
  import "$lib/styles/styles.scss";

  import MainNavMenu from "$lib/components/nav/main-nav/common/main-nav-menu.svelte";

  export let data;

  let currentBoardset: TycheDO.UserBoardsets.Boardset | undefined = undefined;

  $: boardsetEntries = Object.entries(
    (data.boardsets as TycheDO.UserBoardsets.BoardsetsData) ?? {},
  );

  $: {
    currentBoardset =
      $page.data.boardsetIdParam && (data.boardsets ?? {})[$page.data.boardsetIdParam];

    if (currentBoardset && browser) {
      document.title = `Tyche | ${currentBoardset?.name}`;
    }
  }
</script>

<svelte:head>
  {#if currentBoardset}
    <title>Tyche | {currentBoardset.name}</title>
  {:else}
    <title>Tyche</title>
  {/if}
</svelte:head>

<main>
  <PageLayout>
    <MainNav>
      {#if $page.data.username}
        {#each boardsetEntries as [boardsetId, boardsetData] (boardsetId)}
          <BoardsetLink
            boardsetName={boardsetData.name}
            href={`/boardsets/${boardsetId}`}
            isActive={$page.data.boardsetIdParam === boardsetId}
          />
        {/each}
        <CreateBoardsetPopper action="/boardsets?/create-boardset" />
      {/if}

      <svelte:fragment slot="bottom">
        {#if $page.data.username}
          <MainNavMenu isActive={$page.url.pathname.startsWith("/user")} paddingless>
            <PersonCircleIcon slot="toggle" size="2em" />

            <li><h6 class="dropdown-header">@{$page.data.username}</h6></li>
            <li><a class="dropdown-item" href="/user/settings">User settings</a></li>
            <li>
              <!--
                <a class="dropdown-item" href="/user/change-password">
                  Change password
                </a>
              -->
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a
                class="dropdown-item"
                href="/logout"
                data-sveltekit-preload-data="off"
                data-sveltekit-preload-code="off"
                data-sveltekit-reload
              >
                Logout
              </a>
            </li>
          </MainNavMenu>
        {/if}
      </svelte:fragment>
    </MainNav>

    <slot />
  </PageLayout>
</main>

<style lang="scss">
  main {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
