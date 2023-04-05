<script lang="ts">
  export let title: string | undefined = undefined;
</script>

<nav class="side-nav" data-bs-theme="dark">
  {#if title}
    <div class="title fs-5">
      {title}
    </div>
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
    color: var(--bs-light);
    background-color: var(--bs-gray-700);
    .title {
      height: 64px;
      display: grid;
      justify-items: center;
      align-items: center;
      background-color: var(--bs-gray-800);
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
