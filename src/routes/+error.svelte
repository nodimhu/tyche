<script lang="ts">
  import { page } from "$app/stores";
  import { Alert, Heading, P } from "flowbite-svelte";
</script>

<div class="p-4">
  <Alert class="red">
    <Heading tag="h3" color="red">
      Error {$page.status}
    </Heading>
    <P size="lg" color="red">
      {$page.error?.message}
    </P>
  </Alert>
</div>
