<script lang="ts">
  import Popper from "$lib/components/common/popper.svelte";

  import MainNavItemInner from "./main-nav-item/main-nav-item-inner.svelte";
  import MainNavItem from "./main-nav-item/main-nav-item.svelte";

  export let isActive: boolean = false;
  export let title: string | undefined = undefined;

  let reference: HTMLElement;
</script>

<MainNavItem>
  <div class="main-nav-popper" bind:this={reference}>
    <Popper {reference} {title} placement="right" offset={[0, 5]} let:open let:toggle>
      <button slot="toggle" class="main-nav-item btn" class:open on:click={toggle}>
        <MainNavItemInner {isActive}>
          <slot name="toggle" {toggle} {open} />
        </MainNavItemInner>
      </button>

      <slot {open} {toggle} />
    </Popper>
  </div>
</MainNavItem>

<style lang="scss">
  .main-nav-popper {
    .main-nav-item.open {
      :global(.main-nav-item-inner) {
        color: var(--bs-dark);
        background-color: var(--bs-primary);
        box-shadow: 0 0 0 0.25em var(--bs-primary);
      }
    }
  }
</style>
