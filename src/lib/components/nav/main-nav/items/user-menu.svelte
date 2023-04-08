<script lang="ts">
  import { PersonCircle } from "svelte-bootstrap-icons";

  import MainNavMenu, {
    type MainNavMenuSubItems,
  } from "../common/main-nav-menu.svelte";

  export let subItems: MainNavMenuSubItems;
  export let isActive: boolean = false;
</script>

<MainNavMenu subItemGroups={subItems} {isActive}>
  <PersonCircle width="2em" height="2em" />
</MainNavMenu>
