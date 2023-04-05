<script lang="ts">
  import { page } from "$app/stores";

  import MainNavItemInner from "./main-nav-item/main-nav-item-inner.svelte";
  import MainNavItem from "./main-nav-item/main-nav-item.svelte";

  export let href: string | undefined = undefined;
  export let isActive: boolean | undefined = undefined;

  $: isActiveUrl = !!href && $page.url.pathname.startsWith(href);
</script>

<MainNavItem>
  <a
    class="main-nav-item btn"
    style={`color: ${isActive ? "var(--bs-dark)" : undefined}`}
    {href}
  >
    <MainNavItemInner isActive={isActive ?? isActiveUrl}>
      <slot />
    </MainNavItemInner>
  </a>
</MainNavItem>
