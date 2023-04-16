<script lang="ts">
  import UserSettingsForm from "$lib/components/forms/user-settings-form.svelte";
  import PageContainer from "$lib/components/page-layout/page-container.svelte";

  export let data;
  export let form;
</script>

<PageContainer>
  <div class="user-settings">
    <h4 class="title">User settings</h4>

    <UserSettingsForm
      saved={form?.saved}
      locale={data.settings?.locale}
      defaultCurrency={data.settings?.defaultCurrency}
    />
  </div>
</PageContainer>

<style lang="scss">
  .user-settings {
    max-width: 25em;

    .title {
      margin-bottom: 1em;
    }
  }
</style>
