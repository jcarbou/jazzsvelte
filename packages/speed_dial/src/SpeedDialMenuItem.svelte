<script lang="ts">
    import type { CssStyle, HTMLLIAttributes, MenuItem, PassThroughOptions } from '@jazzsvelte/api'
    import type { SpeedDialPassThroughMethodOptions, SpeedDialPassThroughOptions } from './speedDial.types'
    import { resolvePT } from '@jazzsvelte/api'
    import { globalSpeedDialPT as globalPt } from './speedDial.config'
    import SpeedDialAction from './SpeedDialAction.svelte'

    export let id: string
    export let item: MenuItem
    export let active: boolean = false
    export let style: CssStyle
    export let pt: SpeedDialPassThroughOptions | null = null
    export let ptContext: SpeedDialPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }
    export let unstyled: boolean = false

    // "menuitem" element
    $: menuitemAttributes = resolvePT(
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
    ) satisfies HTMLLIAttributes
</script>

<li {...menuitemAttributes}>
    <SpeedDialAction {item} {ptContext} {unstyled} />
</li>
