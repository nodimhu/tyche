<script>
  import PageContainer from "$lib/components/page-layout/page-container.svelte";

  export let data;
</script>

<PageContainer>
  <p>User settings page.</p>
  <code>
    <pre>{JSON.stringify(data.settings, null, 2)}</pre>
  </code>
</PageContainer>
