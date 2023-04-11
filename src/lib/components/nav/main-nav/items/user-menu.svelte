<script lang="ts">
  import PersonCircleIcon from "$lib/components/bootstrap-icons/person-circle-icon.svelte";

  import MainNavMenu, {
    type MainNavMenuSubItems,
  } from "../common/main-nav-menu.svelte";

  export let subItems: MainNavMenuSubItems;
  export let isActive: boolean = false;
</script>

<MainNavMenu subItemGroups={subItems} {isActive}>
  <PersonCircleIcon size="2em" />
</MainNavMenu>
