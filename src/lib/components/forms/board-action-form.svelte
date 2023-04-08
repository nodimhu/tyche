<script lang="ts">
  import { enhance } from "$app/forms";

  import HiddenData from "../common/hidden-data.svelte";

  export let action: string;
  export let actionText: string;
  export let boardsetId: string;
  export let boardId: string;
</script>

<form method="POST" {action} use:enhance>
  <HiddenData data={{ boardsetId, boardId }} />
  <button class="btn btn-primary">{actionText}</button>
</form>
