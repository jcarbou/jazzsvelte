<script lang="ts">
    import type { MenuItem } from '@jazzsvelte/api'
    import { Badge } from '@jazzsvelte/badge'

    export let item: MenuItem

    $: icon = item.icon as string
</script>

<a href="#" class="flex align-items-center p-menuitem-link">
    <span class={icon} />
    <span class="mx-2">{item.label}</span>
    {#if item.badge}
        <Badge class="ml-auto" value={item.badge} />
    {/if}
    {#if item.shortcut}
        <span class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>
    {/if}
</a>
