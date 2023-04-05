<script lang="ts">
  import { onMount } from "svelte";
  import { MoonFill, SunFill } from "svelte-bootstrap-icons";

  let theme: "light" | "dark" = "light";

  const toggleTheme = () => {
    theme = theme === "light" ? "dark" : "light";
    document.querySelector("html")?.setAttribute("data-bs-theme", theme);
    window.localStorage.setItem("theme", theme);
  };

  onMount(() => {
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme && (storedTheme === "light" || storedTheme === "dark")) {
      theme = storedTheme;
    }
  });
</script>

<div class="theme-switcher">
  <div class="light" style="opacity: {theme === 'light' ? 1 : 0.5}">
    <SunFill />
  </div>
  <div class="form-check form-switch">
    <input
      class="form-check-input"
      type="checkbox"
      role="switch"
      aria-label="Theme Switcher"
      on:change={toggleTheme}
      checked={theme === "dark"}
    />
  </div>
  <div class="dark" style="opacity: {theme === 'dark' ? 1 : 0.5}">
    <MoonFill width="0.8em" />
  </div>
</div>

<style lang="scss">
  .theme-switcher {
    display: grid;
    grid-template-columns: repeat(3, auto);
    column-gap: 2px;
    align-items: center;
    justify-items: center;
    .form-check {
      padding: 0;
      margin: 0;
      width: 1.75em;
      .form-check-input {
        margin-left: 0;
        width: 1.75em;
        cursor: pointer;
      }
    }
  }
</style>
