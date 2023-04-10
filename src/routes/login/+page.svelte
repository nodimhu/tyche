<script lang="ts">
  import { enhance } from "$app/forms";

  import AppLogo from "$lib/components/common/app-logo.svelte";

  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<div>
  <div class="banner">
    <span class="text-primary fs-4"><AppLogo /></span>
    <span class="fs-1">Tyche</span>
  </div>

  <form method="POST" use:enhance>
    <div class="form-floating mb-4">
      <input
        id="username"
        class="form-control {form?.unauthorized && 'is-invalid'}"
        name="username"
        type="text"
        value={form?.username ?? ""}
        required={true}
        placeholder="Username"
      />
      <label for="username">Username</label>
    </div>

    <div class="form-floating mb-5">
      <input
        id="password"
        class="form-control {form?.unauthorized && 'is-invalid'}"
        name="password"
        type="password"
        value=""
        required={true}
        placeholder="Password"
      />
      <label for="password"> Password </label>
      {#if form?.unauthorized}
        <div class="invalid-feedback">The username or password is incorrect.</div>
      {/if}
    </div>

    <button class="btn btn-success">Sign In</button>
  </form>
</div>

<style lang="scss">
  .banner {
    display: flex;
    column-gap: 1em;
    justify-content: center;
    align-items: center;
    margin: 3em auto;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    padding: 15px;
    margin: 2em auto;
    .invalid-feedback {
      position: absolute;
    }
    button {
      font-size: large;
    }
  }
</style>
