<script lang="ts">
  import ConfirmForm from "$lib/components/forms/confirm-form.svelte";

  import SideNavPopper from "../common/side-nav-popper.svelte";

  export let action: string;
  export let confirmText = "Yes";
  export let cancelText = "No";
  export let data: Record<string, string> = {};
</script>

<SideNavPopper title="Are you sure?" let:toggle>
  <slot slot="icon" name="icon" />
  <slot slot="text" name="text" />

  <div class="side-nav-confirm-popper">
    <ConfirmForm {action} {confirmText} {data} on:submit={toggle}>
      <p class="confirm-text">
        <slot />
      </p>

      <button
        slot="buttons"
        class="btn btn-outline-secondary"
        on:click|preventDefault={toggle}
      >
        {cancelText}
      </button>
    </ConfirmForm>
  </div>
</SideNavPopper>

<style lang="scss">
  .side-nav-confirm-popper {
    display: flex;
    column-gap: 0.5em;
    .confirm-text {
      max-width: 25em;
    }
  }
</style>
