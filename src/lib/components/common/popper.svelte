<script lang="ts">
  import { browser } from "$app/environment";
  import { type Instance as PopperInstance, createPopper } from "@popperjs/core";
  import type { Placement } from "@popperjs/core/lib/enums";
  import type { Options as OffsetOptions } from "@popperjs/core/lib/modifiers/offset";

  import { onDestroy, onMount } from "svelte";

  export let title: string = "";
  export let reference: HTMLElement;
  export let placement: Placement = "bottom";
  export let offset: OffsetOptions["offset"] = [0, 0];
  export let borderless = false;
  export let paddingless = false;
  export let transparent = false;

  let popperInstance: PopperInstance;
  let popperContainer: HTMLElement;
  let open = false;

  const toggle = () => {
    open = !open;
    popperInstance?.update();
  };

  const hideOnClickOutside = (event: MouseEvent | FocusEvent) => {
    if (!open) {
      return;
    }

    if (
      !reference.contains(event.target as HTMLElement) &&
      !popperContainer.contains(event.target as HTMLElement)
    ) {
      open = false;
    }
  };

  $: {
    if (reference && popperContainer && !popperInstance) {
      popperInstance = createPopper(reference, popperContainer, {
        placement,
        strategy: "fixed",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: offset,
            },
          },
        ],
      });
    }
  }

  onMount(() => {
    browser && document.addEventListener("click", hideOnClickOutside);
  });

  onDestroy(() => {
    popperInstance?.destroy();
    browser && document.removeEventListener("click", hideOnClickOutside);
  });
</script>

<div class="popper">
  <slot name="toggle" />
  <div
    bind:this={popperContainer}
    class:borderless
    class:paddingless
    class:transparent
    class:show={open}
    class="popper-container"
  >
    {#if title}
      <div class="popper-title">
        {title}
      </div>
    {/if}
    <div class="popper-contents">
      <slot {open} {toggle} />
    </div>
  </div>
</div>

<style lang="scss">
  .popper-container {
    z-index: 999;

    &:not(.show) {
      display: none;
    }
    &:not(.borderless) {
      border: 1px solid var(--bs-border-color-translucent);
      border-radius: var(--bs-border-radius);
    }
    &:not(.paddingless) {
      .popper-contents {
        padding: 0.7em 0.75em;
      }
      .popper-title {
        padding: 0.5em 0.75em;
      }
    }
    &:not(.transparent) {
      background-color: var(--bs-body-bg);
    }

    .popper-title {
      font-weight: 600;
      border-bottom: 1px solid var(--bs-border-color-translucent);
      background-color: var(--bs-secondary-bg);
    }
  }
</style>
