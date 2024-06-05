<script lang="ts">
    import { slide } from 'svelte/transition'
    import type { MenuData, MenuItemData, SubMenuData } from './Sidebar.types'
    import MenuItem from './MenuItem.svelte'

    export let data: MenuData

    let expanded: boolean = true

    const toSubMenuData = (subMenuOrItemData: MenuItemData | SubMenuData) => subMenuOrItemData as SubMenuData
    const toMenuItemData = (subMenuOrItemData: MenuItemData | SubMenuData) => subMenuOrItemData as MenuItemData
</script>

<li class="layout-menu">
    {#if data.children}
        <button class="layout-menu-content px-link" on:click={() => (expanded = !expanded)}>
            <span class="menu-icon">
                <i class={data.icon}></i>
            </span>
            <span>{data.name}</span>
            <i class="menu-toggle-icon pi pi-angle-down"></i>
        </button>
        {#if expanded}
            <div class="layout-menu-dropdown overflow-y-hidden" in:slide out:slide>
                <ol>
                    {#each data.children as subMenuOrItemData, index ('subMenuOrItemData_' + index)}
                        {@const subMenuData = toSubMenuData(subMenuOrItemData)}
                        {@const menuItemData = toMenuItemData(subMenuOrItemData)}
                        {#if subMenuData.children}
                            <span class="layout-menu-subMenu">{subMenuData?.name}</span>
                            {#each subMenuData.children as itemData, index ('itemData_' + index)}
                                <MenuItem data={itemData} />
                            {/each}
                        {:else}
                            <MenuItem data={menuItemData} />
                        {/if}
                    {/each}
                </ol>
            </div>
        {/if}
    {:else}
        <!-- No children : simple clickable menu entry -->

        <a class="layout-menu-content" target={data.href ? '_blank' : '_self'} href={data.href ?? data.to}>
            {#if data?.icon}
                <span class="menu-icon">
                    <i class={data?.icon}></i>
                </span>
            {/if}
            <span>{data?.name}</span>
        </a>
    {/if}
</li>

<style>
    .layout-menu {
        margin-bottom: 0.25rem;
        list-style: none;
    }

    .layout-menu-content {
        display: flex;
        width: 100%;
        align-items: center;
        padding: 0.5rem 0;
        color: var(--surface-900);
        font-weight: 600;
        transition: all 0.2s;
        border-radius: var(--border-radius);
    }

    .layout-menu-content:hover .menu-icon i {
        color: var(--primary-color);
    }

    .layout-menu-content .menu-icon {
        width: 2rem;
        height: 2rem;
        border-radius: var(--border-radius);
        margin-right: 0.5rem;
        border: 1px solid var(--surface-border);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
    }

    .layout-menu-content .menu-toggle-icon {
        color: var(--surface-700);
        margin-left: auto;
    }

    .layout-menu-dropdown > ol {
        margin: 0 0 0 1rem;
        padding: 0.25rem 0;
        list-style: none;
    }

    .layout-menu-subMenu {
        display: flex;
        padding: 0.5rem 0.5rem 0.5rem 0;
        font-size: 0.875rem;
        font-weight: 600;
        letter-spacing: 1px;
        color: var(--surface-900);
        margin-bottom: 0.25rem;
    }
</style>
