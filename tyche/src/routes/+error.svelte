<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="error-page">
  <div class="alert alert-danger">
    <h1 class="alert-heading">Error {$page.status}</h1>
    <h3>{$page.error?.message}</h3>
  </div>
</div>
