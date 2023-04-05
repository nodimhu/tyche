<script lang="ts">
  import Popover from "bootstrap/js/dist/popover";
  import { onDestroy, onMount } from "svelte";

  import MainNavItemInner from "./main-nav-item/main-nav-item-inner.svelte";
  import MainNavItem from "./main-nav-item/main-nav-item.svelte";

  export let isActive: boolean = false;
  export let title: string | undefined = undefined;

  let isOpen = false;
  let popover: Popover;

  let containerNode: HTMLElement;
  let triggerNode: HTMLElement;
  let contentNode: HTMLElement;

  const hidePopover = () => popover?.hide();

  onMount(() => {
    popover = new Popover(triggerNode, {
      container: containerNode,
      content: contentNode,
      html: true,
      // if title is given directly and 'undefined',
      // the popover doesn't show, so:
      ...(title ? { title } : {}),
    });
  });

  onDestroy(() => {
    popover?.dispose();
  });
</script>

<MainNavItem>
  <div bind:this={containerNode} class="main-nav-popover">
    <button
      bind:this={triggerNode}
      class={`main-nav-item btn ${isOpen && "open"}`}
      data-bs-toggle="popover"
      data-bs-placement="right"
      on:click={() => (isOpen = !isOpen)}
    >
      <MainNavItemInner {isActive}>
        <slot name="trigger" {hidePopover} {isOpen} />
      </MainNavItemInner>
    </button>
    <div bind:this={contentNode} class="main-nav-popover-content">
      <slot {hidePopover} {isOpen} />
    </div>
  </div>
</MainNavItem>

<style lang="scss">
  .main-nav-popover {
    .main-nav-item.open {
      :global(.main-nav-item-inner) {
        color: var(--bs-dark);
        background-color: var(--bs-primary);
        box-shadow: 0 0 0 0.25em var(--bs-primary);
      }
    }

    :global(.popover) {
      max-width: 30em;
    }

    :global(.popover-arrow) {
      display: none;
    }

    & > .main-nav-popover-content {
      display: none;
    }
  }
</style>
