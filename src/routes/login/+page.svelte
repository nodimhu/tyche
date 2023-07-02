<script lang="ts">
  import LoginForm from "$lib/components/LoginForm.svelte";
  import { Card } from "flowbite-svelte";

  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<div class="m-4">
  <Card class="mx-auto">
    <LoginForm incorrect={form?.unauthorized} usernameValue={form?.username} />
  </Card>
</div>
