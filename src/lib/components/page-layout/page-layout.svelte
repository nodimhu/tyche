<script lang="ts">
  export let sections = 2;

  const renderedSections = sections <= 0 ? 1 : sections;
</script>

<section
  class="page-layout"
  style={renderedSections === 1
    ? "grid-template-columns: 1fr"
    : `grid-template-columns: repeat(${renderedSections - 1}, auto) 1fr`}
>
  <slot />
</section>

<style lang="scss">
  .page-layout {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
  }

  @media screen and (max-width: 1024px) {
    .page-layout {
      grid-template-columns: auto !important;
      grid-template-rows: auto 1fr !important;

      :global(.page-container) {
        max-height: calc(100vh - 64px);
      }
    }
  }
</style>
