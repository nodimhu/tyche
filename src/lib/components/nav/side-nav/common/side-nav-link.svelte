<script lang="ts">
  import { page } from "$app/stores";
  import { CaretRightFill } from "svelte-bootstrap-icons";

  export let tag: "a" | "button" = "a";

  export let href: string | undefined = undefined;
  export let text: string;
  export let color:
    | "danger"
    | "dark"
    | "info"
    | "light"
    | "primary"
    | "success"
    | "warning"
    | undefined = undefined;
  export let padding: number | undefined = undefined;
  export let isActive: boolean | undefined = undefined;

  $: isActiveUrl = !!href && $page.url.pathname.startsWith(href);
</script>

<svelte:element
  this={tag}
  class:active={isActive ?? isActiveUrl}
  class={`side-nav-link btn btn-link bg-opacity-50 ${color}`}
  style={padding ? `padding-left: ${padding * 2}em` : ""}
  aria-label={text}
  {href}
>
  {#if isActive ?? isActiveUrl}
    <CaretRightFill width="1em" height="1em" />
  {/if}
  {#if $$slots.default}
    <div class="icon">
      <slot />
    </div>
  {/if}
  <div class="text">
    {text}
  </div>
</svelte:element>

<style lang="scss">
  @import "bootstrap/scss/functions";
  @import "$lib/styles/colors";

  .side-nav-link {
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
