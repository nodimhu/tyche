<script lang="ts" context="module">
  export type MainNavMenuSubItems = {
    header?: string;
    items: { url: string; text: string }[];
  }[];
</script>

<script lang="ts">
  import MainNavItemInner from "./main-nav-item/main-nav-item-inner.svelte";
  import MainNavItem from "./main-nav-item/main-nav-item.svelte";

  export let subItemGroups: MainNavMenuSubItems = [];
  export let isActive: boolean = false;
</script>

<MainNavItem>
  <div class="dropend">
    <button
      class="main-nav-item btn"
      style={`color: ${isActive ? "var(--bs-dark)" : undefined}`}
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <MainNavItemInner {isActive}>
        <slot />
      </MainNavItemInner>
    </button>
    <ul class="dropdown-menu mt-2">
      {#each subItemGroups as group, index}
        {#if index !== 0}
          <li><hr class="dropdown-divider" /></li>
        {/if}
        {#if group.header}
          <li><h6 class="dropdown-header">{group.header}</h6></li>
        {/if}
        {#each group.items as item}
          <li><a class="dropdown-item" href={item.url}>{item.text}</a></li>
        {/each}
      {/each}
    </ul>
  </div>
</MainNavItem>
