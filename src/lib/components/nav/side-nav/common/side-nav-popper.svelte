<script lang="ts">
  import Popper from "$lib/components/common/popper.svelte";
  import SideNavItem from "../common/side-nav-item.svelte";

  export let title = "";

  let sideNavItemElement: HTMLElement;
</script>

<Popper
  {title}
  reference={sideNavItemElement}
  placement={"right"}
  offset={[0, 5]}
  let:open
  let:toggle
>
  <SideNavItem
    slot="toggle"
    tag={"button"}
    bind:element={sideNavItemElement}
    active={open}
    nocaret={true}
    on:click={toggle}
  >
    <slot slot="icon" name="icon" />
    <slot name="text" />
  </SideNavItem>

  <slot {open} {toggle} />
</Popper>
