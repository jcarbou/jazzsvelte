<script lang="ts">
    import type { TieredMenuPassThroughMethodOptions, TieredMenuTreeContext } from './tieredMenu.types'
    import type { PassThroughOptions, HTMLLiAttributes } from '@jazzsvelte/api'

    import { resolvePT } from '@jazzsvelte/api'
    import { getContext } from 'svelte'
    import { globalTieredMenuPT as globalPt } from './tieredMenu.config'

    const { unstyled, pt, ptOptions } = getContext<TieredMenuTreeContext>('tieredMenuTree')

    $: ptContext = {
        props: $$props,
        context: {
            active: false
        },
        state: {
            attributeSelector: '',
            visible: false
        },
        ptOptions,
        unstyled
    } satisfies TieredMenuPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }

    // "separator" element
    $: separatorAttributes = resolvePT(
        {
            class: ['p-menuitem-separator'],
            'data-pc-section': 'separator',
            role: 'separator'
        },
        pt?.separator,
        globalPt?.separator,
        ptContext
    ) satisfies HTMLLiAttributes
</script>

<li {...separatorAttributes} />
