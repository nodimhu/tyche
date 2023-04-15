<script lang="ts">
  import CircleIcon from "$lib/components/icons/bootstrap-icons/circle-icon.svelte";

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
  <CircleIcon size="2em" />
  <div class="boardset-initials">
    <small class="fw-semibold">
      {boarsetInitials}
    </small>
  </div>
</MainNavLink>
