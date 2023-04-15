<script lang="ts">
  import InboxIcon from "$lib/components/icons/bootstrap-icons/inbox-icon.svelte";

  export let message = "";
</script>

<div class="row text-secondary-emphasis mt-2">
  <InboxIcon size="4em" />
</div>
<div class="row text-center text-secondary-emphasis mb-2">
  <em> {message} </em>
</div>
