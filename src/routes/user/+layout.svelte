<script>
  import SideNavItem from "$lib/components/nav/side-nav/common/side-nav-item.svelte";
  import SideNavSeparator from "$lib/components/nav/side-nav/common/side-nav-separator.svelte";
  import SideNav from "$lib/components/nav/side-nav/side-nav.svelte";
  import PageLayout from "$lib/components/page-layout/page-layout.svelte";

  export let data;
</script>

<PageLayout>
  <SideNav title={"@" + data.username ?? ""}>
    <SideNavItem href="/user/settings">User settings</SideNavItem>
    <SideNavItem href="/user/change-password">Change password</SideNavItem>
    <SideNavSeparator />
    <SideNavItem href="/logout">Logout</SideNavItem>
  </SideNav>
  <slot />
</PageLayout>
