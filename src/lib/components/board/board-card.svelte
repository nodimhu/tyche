<script lang="ts">
  export let title = "";
  export let appearance:
    | "primary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "default" = "default";
</script>

<div
  class="board-card card"
  style={appearance !== "default" ? `border-color: var(--bs-${appearance})` : undefined}
>
  <div class="card-body">
    {#if title}
      <h5 class="card-title fw-semibold">{title}</h5>
    {/if}

    <div class="board-card-actions m-2">
      <slot name="actions" />
    </div>

    <div class="board-card-content card-text">
      <slot />
    </div>

    <div class="board-card-whitespace" />

    <div class="board-card-content card-text mt-2">
      <slot name="bottom" />
    </div>
  </div>
</div>

<style lang="scss">
  @import "$lib/styles/variables";

  .board-card {
    border-top: 3px solid transparent;
    height: 100%;
    background-color: var(--bs-gray-700);
    box-shadow: 0 3px 5px 3px rgba($dark, 0.75);

    .card-body {
      display: flex;
      flex-direction: column;
    }

    .board-card-whitespace {
      flex-grow: 1;
    }

    .board-card-actions {
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      column-gap: 0.5em;
    }
  }
</style>
