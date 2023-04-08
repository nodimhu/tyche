<script lang="ts">
  import { Trash } from "svelte-bootstrap-icons";

  import SideNavConfirmPopper from "../common/side-nav-confirm-popper.svelte";

  export let action: string;
  export let boardsetId: string;
</script>

<SideNavConfirmPopper
  {action}
  confirmText="Yes, delete this boardset"
  cancelText="No, keep this boardset"
  data={{ boardsetId }}
>
  <Trash slot="icon" width="1.25em" height="1.25em" />
  <span slot="text"> Delete this boardset </span>

  This action is irreversible and will result in the deletion of the currently open
  boardset and all of its boards.
</SideNavConfirmPopper>
