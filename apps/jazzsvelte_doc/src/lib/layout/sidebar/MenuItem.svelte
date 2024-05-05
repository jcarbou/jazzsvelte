<script lang="ts">
    import type { MenuItemData } from './Sidebar.types'

    export let data: MenuItemData
</script>

<li class="layout-sidebar-menuItem">
    <a target={data.href ? '_blank' : '_self'} href={data.href ?? data.to}>
        <span>{data?.name}</span>
        <!-- {menuItem?.badge && <Badge value={menuItem?.badge} className="ml-auto"></Badge>} -->
    </a>
</li>

<style>
    .layout-sidebar-menuItem a {
        border-left: 1px solid var(--surface-border);
        font-weight: 450;
        display: flex;
        padding: 0.5rem 0.5rem 0.5rem 1rem;
        color: var(--surface-700);
        transition: all 0.2s;
        cursor: pointer;
    }

    .layout-sidebar-menuItem a:hover {
        color: var(--surface-900);
        border-left-color: var(--surface-500);
    }
</style>
