<script lang="ts">
  import { browser } from "$app/environment";
  import { type Instance as PopperInstance, createPopper } from "@popperjs/core";
  import type { Placement } from "@popperjs/core/lib/enums";
  import type { Options as OffsetOptions } from "@popperjs/core/lib/modifiers/offset";

  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";

  export let title: string = "";
  export let reference: HTMLElement;
  export let placement: Placement = "bottom";
  export let offset: OffsetOptions["offset"] = [0, 0];
  export let rectangle = false;
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
          {
            name: "preventOverflow",
            options: {
              padding: 5,
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
  <div bind:this={popperContainer} class="popper-container">
    {#if open}
      <div
        class:rectangle
        class:paddingless
        class:transparent
        class="popper-container-contents"
        transition:fade={{ duration: 100 }}
      >
        {#if title}
          <h6 class="popper-title">
            {title}
          </h6>
        {/if}
        <div class="popper-contents">
          <slot {open} {toggle} />
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @import "$lib/styles/variables";

  .popper-container {
    z-index: 999;
  }

  .popper-container-contents {
    &:not(.borderless) {
      border-radius: var(--bs-border-radius);
    }
    &:not(.paddingless) {
      .popper-contents {
        padding: 0.7em 0.75em;
      }
      .popper-title {
        padding: 0.5em 0.75em 0;
        margin: 0;
      }
    }
    &:not(.transparent) {
      background-color: var(--bs-gray-800);
      box-shadow: 0 3px 5px 3px rgba($dark, 0.75);
    }

    .popper-title {
      font-weight: 600;
    }
  }
</style>
