<script lang="ts">
  export let title: string | undefined = undefined;
</script>

<nav class="side-nav" data-bs-theme="dark">
  {#if title}
    <h5 class="title fw-semibold">
      {title}
    </h5>
  {/if}
  <slot />
  <div class="whitespace" />
  <slot name="bottom" />
</nav>

<style lang="scss">
  .side-nav {
    width: 250px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--bs-gray-700);
    .title {
      height: 64px;
      display: grid;
      align-items: center;
      padding: 0.375rem 0.75rem;
      margin: 0;
    }
    .whitespace {
      flex-grow: 1;
    }
  }

  @media screen and (max-width: 1024px) {
    .side-nav {
      // TODO: Make it responsive
      display: none;
    }
  }
</style>
