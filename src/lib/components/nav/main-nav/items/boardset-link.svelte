<script lang="ts">
  import { Circle } from "svelte-bootstrap-icons";

  import MainNavLink from "../common/main-nav-link.svelte";

  export let boardsetName: string;
  export let href: string;
  export let isActive: boolean | undefined = undefined;

  const boarsetInitials = boardsetName
    .split(" ")
    .slice(0, 2)
    .reduce((prev, word) => prev + word[0].toUpperCase(), "");
</script>

<MainNavLink {href} {isActive}>
  <Circle width="2em" height="2em" />
  <div class="boardset-initials">
    <small>
      {boarsetInitials}
    </small>
  </div>
</MainNavLink>
