<script lang="ts">
  import { enhance } from "$app/forms";

  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<form method="POST" action="?/login" use:enhance>
  <div class="form-floating mb-4">
    <input
      class="form-control {(form?.usernameMissing || form?.unauthorized) &&
        'is-invalid'}"
      id="username"
      placeholder="Username"
      name="username"
      value={form?.username ?? ""}
    />
    <label for="username">Username</label>
    {#if form?.usernameMissing}
      <div class="invalid-feedback">Please enter a username.</div>
    {/if}
  </div>

  <div class="form-floating mb-5">
    <input
      class="form-control {(form?.passwordMissing || form?.unauthorized) &&
        'is-invalid'}"
      id="password"
      placeholder="Password"
      name="password"
      type="password"
    />
    <label for="password"> Password </label>
    {#if form?.unauthorized}
      <div class="invalid-feedback">The username or password is incorrect.</div>
    {/if}
    {#if form?.passwordMissing}
      <div class="invalid-feedback">Please enter a password.</div>
    {/if}
  </div>

  <button class="btn btn-success">Sign In</button>
</form>

<style lang="scss">
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    padding: 15px;
    margin: 5rem auto;
    .invalid-feedback {
      position: absolute;
    }
    button {
      font-size: large;
    }
  }
</style>
