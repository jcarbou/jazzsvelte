<script lang="ts">
    import type { CssStyle, MenuItem, PassThroughOptions } from '@jazzsvelte/api'
    import type { SpeedDialPassThroughMethodOptions, SpeedDialPassThroughOptions } from './speedDial.types'
    import { resolveLiPt } from '@jazzsvelte/api'
    import { globalSpeedDialPT as globalPt } from './speedDial.config'
    import SpeedDialAction from './SpeedDialAction.svelte'

    interface Props {
        id: string
        item: MenuItem
        active?: boolean
        style: CssStyle
        pt?: SpeedDialPassThroughOptions | null
        ptContext: SpeedDialPassThroughMethodOptions & {
            ptOptions: PassThroughOptions | null
            unstyled: boolean
        }
        unstyled?: boolean
    }

    let { id, item, active = false, style, pt = null, ptContext, unstyled = false }: Props = $props()

    // "menuitem" element
    let menuitemAttributes = $derived(
        resolveLiPt(
            {
                id,
                class: ['p-speeddial-item', { 'p-focus': active }],
                style,
                'aria-controls': id + '_item',
                role: 'menuitem',
                'data-pc-section': 'menuitem'
            },
            pt?.menuitem,
            globalPt?.menuitem,
            ptContext
        )
    )
</script>

<li {...menuitemAttributes}>
    <SpeedDialAction {item} {ptContext} {unstyled} />
</li>
