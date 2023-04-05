<script lang="ts">
  import { page } from "$app/stores";

  import AppLogo from "$lib/components/common/app-logo.svelte";
  import ThemeSwitcher from "../../common/theme-switcher.svelte";
</script>

<nav class="main-nav" data-bs-theme="dark">
  <div class="logo">
    <a class="btn btn-link" href={$page.url.origin}>
      <AppLogo />
    </a>
  </div>
  <slot />
  <div class="whitespace" />
  <slot name="bottom" />
  <div class="theme-switcher">
    <ThemeSwitcher />
  </div>
</nav>

<style lang="scss">
  .main-nav {
    width: 64px;
    height: 100%;
    display: flex;
    flex-direction: column;
    column-gap: 0.5em;
    color: var(--bs-gray-200);
    background-color: var(--bs-gray-800);

    :global(.main-nav-item-wrapper) {
      width: 64px;
      height: 48px;
    }

    :global(.main-nav-item.btn) {
      color: var(--bs-gray-300);
      &:focus,
      &:hover,
      &:active {
        color: var(--bs-dark);
      }
    }
  }

  .logo,
  .theme-switcher {
    display: grid;
    align-content: center;
    justify-content: center;
  }

  .logo {
    a {
      color: var(--bs-primary);
    }
    background-color: var(--bs-dark);
    height: 64px;
    margin-bottom: 0.5em;
  }

  .theme-switcher {
    margin: 0.5em 0;
  }

  .whitespace {
    flex-grow: 1;
  }

  @media screen and (max-width: 1024px) {
    .main-nav {
      width: 100%;
      height: 64px;
      flex-direction: row;
      row-gap: 0.5em;
      :global(.main-nav-item-wrapper) {
        width: 48px;
        height: 64px;
      }
    }

    .logo {
      width: 64px;
    }

    .theme-switcher {
      margin: 0 0.5em;
    }
  }
</style>
