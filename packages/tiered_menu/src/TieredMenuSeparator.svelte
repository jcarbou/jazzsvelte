<script lang="ts">
    import type { TieredMenuTreeContext } from './tieredMenu.types'

    import { resolveLiPt } from '@jazzsvelte/api'
    import { getContext } from 'svelte'
    import { globalTieredMenuPT as globalPt } from './tieredMenu.config'

    const { pt, ptContext } = getContext<TieredMenuTreeContext>('tieredMenuTree')

    // "separator" element
    let separatorAttributes = $derived(
        resolveLiPt(
            {
                class: ['p-menuitem-separator'],
                'data-pc-section': 'separator',
                role: 'separator'
            },
            pt?.separator,
            globalPt?.separator,
            ptContext
        )
    )
</script>

<li {...separatorAttributes}></li>
