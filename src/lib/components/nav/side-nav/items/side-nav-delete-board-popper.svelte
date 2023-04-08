<script lang="ts">
  import { Trash } from "svelte-bootstrap-icons";

  import SideNavConfirmPopper from "../common/side-nav-confirm-popper.svelte";

  export let action: string;
  export let boardsetId: string;
  export let boardId: string;
</script>

<SideNavConfirmPopper
  {action}
  confirmText="Yes, delete this board"
  cancelText="No, keep this board"
  data={{ boardsetId, boardId }}
>
  <Trash slot="icon" width="1.25em" height="1.25em" />
  <span slot="text"> Delete this board </span>

  This action is irreversible and will result in the deletion of the currently open
  board.
</SideNavConfirmPopper>
