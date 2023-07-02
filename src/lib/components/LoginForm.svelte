<script lang="ts">
  import { Button, Heading, Helper, Input, Label } from "flowbite-svelte";

  import TycheLogo from "./TycheLogo.svelte";

  export let incorrect = false;
  export let usernameValue = "";
</script>

<form method="POST" class="flex flex-col" action="/login">
  <div class="mb-8 mx-auto color-red">
    <div class="flex gap-x-3 items-center">
      <TycheLogo class="w-24 text-lime-500 dark:text-lime-400" />
      <Heading class="text-4xl font-medium">Tyche</Heading>
    </div>
  </div>

  <div class="mb-4">
    <Label class="mb-1" for="username" color={incorrect ? "red" : undefined}>
      Username
    </Label>

    <Input
      id="username"
      class="border"
      name="username"
      color={incorrect ? "red" : "base"}
      placeholder="Username"
      required={true}
      type="text"
      value={usernameValue}
    />
  </div>

  <div class="mb-8">
    <Label class="mb-1" for="password" color={incorrect ? "red" : undefined}
      >Password
    </Label>

    <Input
      id="password"
      class="border"
      name="password"
      color={incorrect ? "red" : "base"}
      placeholder="Password"
      required={true}
      type="password"
      value=""
    />

    {#if incorrect}
      <Helper class="absolute mt-1" color="red">
        The username or password is incorrect.
      </Helper>
    {/if}
  </div>

  <Button size="lg" type="submit">Sign In</Button>
</form>
