<script lang="ts">
    import JAZZ_SVELTE from '../api/JazzSvelte'
    import { isEmpty, isNotEmpty } from '../utils/Utils'
    import type { CssStyle } from '../utils/cssStyles'
    import { resolvePT } from '../utils/ptUtils'
    import type { TooltipPassThroughMethodOptions, TooltipPassThroughOptions, TooltipPosition } from './tooltip.types'
    import type { TooltipEvent } from './tooltipOptions.types'

    export let id: string | null = null
    export let target: string | string[] | HTMLElement | null = null
    export let appendTo: 'self' | HTMLElement | null | (() => HTMLElement) = null
    export let at: string | null = null
    export let autoHide: boolean | null = null
    export let autoZIndex: boolean | null = null
    export let baseZIndex: number | null = null
    export let className: string | null = null
    export let disabled: boolean | null = null
    export let event: 'hover' | 'focus' | 'both' | null = null
    export let hideDelay: number | null = null
    export let hideEvent: string | null = null
    export let mouseTrack: boolean | null = null
    export let mouseTrackLeft: number | null = null
    export let mouseTrackTop: number | null = null
    export let my: string | null = null
    export let position: TooltipPosition = null
    export let showDelay: number | null = null
    export let showEvent: string | null = null
    export let showOnDisabled: boolean | null = null
    export let updateDelay: number | null = null
    export let onBeforeShow: ((event: TooltipEvent) => void) | null = null
    export let onBeforeHide: ((event: TooltipEvent) => void) | null = null
    export let onShow: ((event: TooltipEvent) => void) | null = null
    export let onHide: ((event: TooltipEvent) => void) | null = null
    export let pt: TooltipPassThroughOptions | null = null
    export let ptOptions: TooltipPassThroughMethodOptions | null = null
    export let unstyled: boolean = false
    export let style: CssStyle = null

    let visible: boolean = false
    $: positionState = position
    let classNameState = ''

    let rootAttributes: RootHTMLAttributes = {}

    $: {
        // "root" element
        const rootClasses = [
            'p-badge p-component',
            {
                'p-badge-no-gutter': isNotEmpty(value) && String(value).length === 1,
                'p-badge-dot': isEmpty(value),
                'p-badge-lg': size === 'large',
                'p-badge-xl': size === 'xlarge',
                [`p-badge-${severity}`]: severity !== null
            }
        ]
        rootAttributes = resolvePT(rootClasses, style, pt?.root, JAZZ_SVELTE.pt?.tooltip?.root, ptOptions, unstyled)
    }
</script>
