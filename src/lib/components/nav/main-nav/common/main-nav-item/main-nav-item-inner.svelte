<script lang="ts">
  export let isActive = false;
</script>

<div class={`main-nav-item-inner ${isActive ? "active" : ""}`}>
  <slot />
</div>

<style lang="scss">
  .main-nav-item-inner {
    display: grid;
    justify-items: center;
    align-items: center;

    border-radius: 50%;

    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    & > :global(*) {
      grid-column: 1;
      grid-row: 1;
    }

    &.active {
      background-color: var(--bs-gray-100);
      box-shadow: 0 0 0 0.25em var(--bs-gray-100);
    }
  }
</style>
