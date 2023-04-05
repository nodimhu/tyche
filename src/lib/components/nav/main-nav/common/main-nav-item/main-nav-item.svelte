<div class="main-nav-item-wrapper">
  <slot />
</div>

<style lang="scss">
  .main-nav-item-wrapper {
    position: relative;
    cursor: pointer;

    & > :global(*),
    :global(.main-nav-item) {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    :global(.main-nav-item) {
      display: grid;
      justify-items: center;
      align-items: center;

      border: none;
      border-radius: 0;

      &:hover :global(.main-nav-item-inner),
      &:focus :global(.main-nav-item-inner) {
        background-color: var(--bs-gray-200);
        box-shadow: 0 0 0 0.25em var(--bs-gray-200);
      }

      &:active :global(.main-nav-item-inner) {
        background-color: var(--bs-primary);
        box-shadow: 0 0 0 0.25em var(--bs-primary);
      }
    }
  }
</style>
