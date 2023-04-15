<script lang="ts">
  import MainNavPopper from "./main-nav-popper.svelte";

  export let isActive = false;
  export let paddingless = false;
  export let transparent = false;
</script>

<MainNavPopper {isActive} {paddingless} {transparent} let:toggle>
  <div slot="toggle" style={`color: ${isActive ? "var(--bs-dark)" : undefined}`}>
    <slot name="toggle" />
  </div>

  <ul
    class="dropdown-menu"
    on:click={toggle}
    on:keydown={(event) => event.key === "Enter" && toggle}
  >
    <slot />
  </ul>
</MainNavPopper>

<style lang="scss">
  .dropdown-menu {
    display: block;
    position: relative;
    border: none;
    background-color: transparent;

    :global(.dropdown-header) {
      font-weight: 600;
      font-size: 1rem;
    }
  }
</style>
