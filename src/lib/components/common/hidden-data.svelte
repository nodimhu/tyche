<script lang="ts">
  export let data: Record<string, string>;
</script>

{#each Object.entries(data) as [name, value]}
  <input type="hidden" {name} {value} />
{/each}
