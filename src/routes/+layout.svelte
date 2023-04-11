<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import BoardsetLink from "$lib/components/nav/main-nav/items/boardset-link.svelte";
  import CreateBoardsetPopper from "$lib/components/nav/main-nav/items/create-boardset-popper.svelte";
  import UserMenu from "$lib/components/nav/main-nav/items/user-menu.svelte";
  import MainNav from "$lib/components/nav/main-nav/main-nav.svelte";
  import PageLayout from "$lib/components/page-layout/page-layout.svelte";
  import "$lib/styles/base.scss";

  export let data;

  $: boardsets = Object.entries(data.boardsets ?? {});
</script>

<svelte:head>
  <title>Tyche</title>
</svelte:head>

<main>
  <PageLayout>
    <MainNav>
      {#if $page.data.username}
        {#each boardsets as [boardsetId, boardsetData]}
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
          <UserMenu
            subItems={[
              {
                header: "@" + data.username ?? "",
                items: [
                  { url: "/user/settings", text: "User settings" },
                  { url: "/user/change-password", text: "Change password" },
                ],
              },
              {
                items: [{ url: "/logout", text: "Logout" }],
              },
            ]}
            isActive={$page.url.pathname.startsWith("/user")}
          />
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
