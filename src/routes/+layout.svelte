<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import BoardsetLink from "$lib/components/nav/main-nav/items/boardset-link.svelte";
  import CreateBoardsetPopper from "$lib/components/nav/main-nav/items/create-boardset-popper.svelte";
  import UserMenu from "$lib/components/nav/main-nav/items/user-menu.svelte";
  import MainNav from "$lib/components/nav/main-nav/main-nav.svelte";
  import PageLayout from "$lib/components/page-layout/page-layout.svelte";
  import { focusStore } from "$lib/stores/focus-store.js";
  import "$lib/styles/base.scss";

  import { onDestroy, onMount } from "svelte";

  export let data;

  const onDocumentFocus = (event: FocusEvent) => {
    if (event.target !== document.body) {
      $focusStore.lastActiveElement = event.target as HTMLElement;
    }
    $focusStore.isClicked = false;
  };

  const onDocumentClick = (event: MouseEvent) => {
    $focusStore.isClicked = true;
  };

  onMount(() => {
    if (browser) {
      document.addEventListener("focusin", onDocumentFocus);
      document.addEventListener("click", onDocumentClick);
    }
  });

  onDestroy(() => {
    if (browser) {
      document.removeEventListener("focusin", onDocumentFocus);
      document.removeEventListener("click", onDocumentClick);
    }
  });

  $: {
    if ($page.form) {
      setTimeout(() => {
        if ($focusStore.isClicked) {
          return;
        }

        $focusStore.lastActiveElement?.focus(); // re-focus last element
        if (
          $focusStore.lastActiveElement && // @ts-ignore
          $focusStore.lastActiveElement.setSelectionRange && //@ts-ignore
          $focusStore.lastActiveElement.value
        ) {
          // @ts-ignore
          $focusStore.lastActiveElement?.setSelectionRange(
            0,
            // @ts-ignore
            $focusStore.lastActiveElement?.value.length,
          );
        }
      });
    }
  }

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
