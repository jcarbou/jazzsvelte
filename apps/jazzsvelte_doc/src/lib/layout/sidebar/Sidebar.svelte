<script lang="ts">
    import Menu from './Menu.svelte'
    import type { SidebarData } from './Sidebar.types'
    import { sideBar } from '$lib/layout/layoutStore'
    import jsonData from './sidebar.json'

    const data: SidebarData = jsonData.data
</script>

<aside class="layout-sidebar" class:sidebar-active={$sideBar}>
    <nav>
        <ol class="layout-menus">
            {#each data as menuData, index ('menu_' + index)}
                <Menu data={menuData} />
            {/each}
        </ol>
    </nav>
</aside>

<style>
    .layout-sidebar {
        position: sticky;
        left: 0;
        top: 6rem;
        height: calc(100vh - 9rem);
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition:
            transform 0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99),
            opacity 0.3s;
        display: flex;
        flex-direction: column;
        padding: 0;
        flex: 0 0 250px;
        margin-right: 4rem;
        overflow: auto;
    }

    .layout-sidebar nav {
        padding: 0 1rem 0 0;
        margin: 0;
        flex-grow: 1;
    }

    .layout-sidebar .layout-menus {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    @media screen and (max-width: 1199px) {
        .layout-sidebar {
            top: 0;
            left: 0;
            position: fixed;
            z-index: 1102;
            height: 100%;
            transform: translateX(-100%);
            background-color: var(--mobile-menu-bg);
            backdrop-filter: blur(20px);
            width: 300px;
            opacity: 0;
        }

        .layout-sidebar nav {
            padding: 1rem 1rem;
        }

        .layout-sidebar.active {
            opacity: 1;
            transform: translateX(0);
        }
    }
</style>
