<script lang="ts">
  import { page } from "$app/stores";

  import { createEventDispatcher } from "svelte";

  export let tag: "a" | "button" = "a";
  export let element: HTMLElement | undefined = undefined;
  export let href: string | undefined = undefined;
  export let color:
    | "default"
    | "danger"
    | "dark"
    | "info"
    | "light"
    | "primary"
    | "success"
    | "warning" = "default";
  export let padding = 0;
  export let active: boolean | undefined = undefined;

  const dispatch = createEventDispatcher();

  $: activeUrl = !!href && $page.url.pathname.startsWith(href);
</script>

<svelte:element
  this={tag}
  bind:this={element}
  class:active={active ?? activeUrl}
  class={`side-nav-link btn btn-link bg-opacity-50 ${color}`}
  style={padding ? `padding-left: ${padding * 2}em` : ""}
  on:click={() => dispatch("click")}
  on:blur={() => dispatch("blur")}
  {href}
>
  {#if $$slots.icon}
    <span class="icon" aria-hidden="true">
      <slot name="icon" />
    </span>
  {/if}
  {#if $$slots.default}
    <span class="text">
      <slot />
    </span>
  {/if}
</svelte:element>

<style lang="scss">
  @import "$lib/styles/colors";

  .side-nav-link {
    width: 100%;
    height: 2.75em;
    border-block: none;

    display: flex;
    align-items: center;
    column-gap: 0.5em;
    text-align: left;

    text-decoration: none;
    border-radius: 0;

    color: $light;

    &:hover,
    &:focus {
      color: $light;
      background-color: rgba($gray-800, 0.5);
    }

    &:active {
      color: $primary;
    }

    &.active {
      color: $primary;
      border-left: 3px solid $primary;
      font-weight: 600;
    }
  }

  .danger {
    color: $light;
    background-color: rgba($danger, 0.3);

    &:hover,
    &:focus {
      color: $dark;
      background-color: rgba($danger, 0.75);
    }

    &:active {
      color: $light;
    }
  }

  .dark {
    color: $light;
    background-color: rgba($dark, 0.3);

    &:hover,
    &:focus {
      background-color: rgba($dark, 0.75);
    }

    &:active {
      color: $primary;
    }
  }

  .info {
    color: $dark;
    background-color: rgba($info, 0.3);

    &:hover,
    &:focus {
      color: $dark;
      background-color: rgba($info, 0.75);
    }

    &:active {
      color: $gray-700;
    }
  }

  .light {
    color: $dark;
    background-color: rgba($gray-200, 0.3);

    &:hover,
    &:focus {
      color: $dark;
      background-color: rgba($gray-200, 0.75);
    }

    &:active {
      color: $gray-700;
    }
  }

  .primary {
    color: $light;
    background-color: rgba($primary, 0.3);

    &:hover,
    &:focus {
      color: $dark;
      background-color: rgba($primary, 0.75);
    }

    &:active {
      color: $gray-800;
    }
  }

  .success {
    color: $light;
    background-color: rgba($success, 0.3);

    &:hover,
    &:focus {
      color: $dark;
      background-color: rgba($success, 0.75);
    }

    &:active {
      color: $gray-800;
    }
  }

  .warning {
    color: $light;
    background-color: rgba($warning, 0.3);

    &:hover,
    &:focus {
      color: $dark;
      background-color: rgba($warning, 0.75);
    }

    &:active {
      color: $gray-800;
    }
  }
</style>
