<script lang="ts">
  import { type Instance as PopperInstance, createPopper } from "@popperjs/core";
  import type { Placement } from "@popperjs/core/lib/enums";
  import type { Options as OffsetOptions } from "@popperjs/core/lib/modifiers/offset";

  import { onDestroy, onMount } from "svelte";

  export let tag: string = "div";
  let className = "";
  export { className as class };
  export let placement: Placement = "top";
  export let offset: OffsetOptions["offset"] = [0, 0];
  export let contents = "";
  export let delayMs = 500;

  let timeoutId: number | NodeJS.Timeout | undefined;
  let reference: HTMLElement;
  let popperInstance: PopperInstance;
  let popperContainer: HTMLElement;
  let open = false;

  const scheduleTooltip = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      open = true;
      popperInstance?.update();
    }, delayMs);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutId);
    open = false;
  };

  onMount(() => {
    popperInstance = createPopper(reference, popperContainer, {
      placement,
      strategy: "absolute",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: offset,
          },
        },
      ],
    });
  });

  onDestroy(() => {
    hideTooltip();
    popperInstance?.destroy();
  });
</script>

<svelte:element
  this={tag}
  bind:this={reference}
  class={`popper-tooltip ${className}`}
  on:mouseover={scheduleTooltip}
  on:focus={scheduleTooltip}
  on:mouseout={hideTooltip}
  on:blur={hideTooltip}
>
  <slot />
  <div
    bind:this={popperContainer}
    class:show={open}
    class="popper-tooltip-contents px-2 py-1"
  >
    <slot name="contents" />
    {contents}
  </div>
</svelte:element>

<style lang="scss">
  .popper-tooltip {
    position: relative;
    width: max-content;
    height: max-content;
  }

  .popper-tooltip-contents {
    z-index: 999;
    color: var(--bs-dark);
    background-color: var(--bs-gray-200);
    border-radius: 5px;

    width: max-content;
    max-width: 15em;

    &:not(.show) {
      display: none;
    }
  }
</style>
