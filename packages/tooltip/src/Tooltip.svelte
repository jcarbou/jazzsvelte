<script lang="ts">
    import type { TooltipLayoutActionState, TooltipPassThroughMethodOptions, TooltipPassThroughOptions } from './tooltip.types'
    import type { TooltipOptions } from './tooltipOptions.types'
    import type { JazzSvelteContext, HTMLDivAttributes, CssStyle, PassThroughOptions } from '@jazzsvelte/api'

    import { getContext } from 'svelte'
    import { fade } from 'svelte/transition'
    import { resolvePT, zIndex } from '@jazzsvelte/api'
    import { tooltipLayout } from './tooltip.actions'
    import { globalButtonPT as globalPt } from './tooltip.config'

    export let targetElement: HTMLElement
    export let tooltipLayoutState: TooltipLayoutActionState
    export let x: number | null = null
    export let y: number | null = null
    export let visible: boolean = false
    export let id: string | null = null
    export let target: string | string[] | HTMLElement | null = null
    export let content: string | null = null
    export let options: TooltipOptions | undefined = undefined
    export let pt: TooltipPassThroughOptions | null = null
    export let ptOptions: PassThroughOptions | null = null
    export let unstyled: boolean = false
    export let style: CssStyle = null
    export const displayName = 'Tooltip'

    $: positionState = options?.position || 'right'
    let classNameState = ''

    $: ptContext = {
        props: $$props,
        //TODO ? : context: { right, left, top, bottom },
        state: { visible, position: positionState, class: classNameState },
        ptOptions,
        unstyled
    } satisfies TooltipPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }

    // "root" element
    $: rootAttributes = resolvePT(
        { class: ['p-tooltip p-component', options?.class, classNameState], style },
        pt?.root,
        globalPt?.root,
        ptContext
    ) satisfies HTMLDivAttributes

    // "arrow" element
    $: arrowAttributes = resolvePT(
        { class: ['p-tooltip-arrow'] },
        pt?.arrow,
        globalPt?.arrow,
        ptContext
    ) satisfies HTMLDivAttributes

    // "text" element
    $: textAttributes = resolvePT({ class: ['p-tooltip-text'] }, pt?.text, globalPt?.text, ptContext) satisfies HTMLDivAttributes

    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
</script>

{#if visible}
    <div
        {...rootAttributes}
        transition:fade={{ duration: 300 }}
        use:tooltipLayout={{ x, y, targetElement, tooltipLayoutState, options }}
        use:zIndex={{ key: 'tooltip', jazzSvelteContext }}
    >
        <div {...arrowAttributes}></div>
        <div {...textAttributes}>
            {@html content || ''}
            <slot />
        </div>
    </div>
{/if}

<style>
    @layer primereact {
        .p-tooltip {
            position: absolute;
            padding: 0.25em 0.5rem;
            /* #3687: Tooltip prevent scrollbar flickering */
            top: -9999px;
            left: -9999px;
        }

        .p-tooltip.p-tooltip-right,
        .p-tooltip.p-tooltip-left {
            padding: 0 0.25rem;
        }

        .p-tooltip.p-tooltip-top,
        .p-tooltip.p-tooltip-bottom {
            padding: 0.25em 0;
        }

        .p-tooltip .p-tooltip-text {
            white-space: pre-line;
            word-break: break-word;
        }

        :global(.p-tooltip-arrow) {
            position: absolute;
            width: 0;
            height: 0;
            border-color: transparent;
            border-style: solid;
        }

        .p-tooltip-right :global(.p-tooltip-arrow) {
            top: 50%;
            left: 0;
            margin-top: -0.25rem;
            border-width: 0.25em 0.25em 0.25em 0;
        }

        .p-tooltip-left :global(.p-tooltip-arrow) {
            top: 50%;
            right: 0;
            margin-top: -0.25rem;
            border-width: 0.25em 0 0.25em 0.25rem;
        }

        .p-tooltip.p-tooltip-top {
            padding: 0.25em 0;
        }

        .p-tooltip-top :global(.p-tooltip-arrow) {
            bottom: 0;
            left: 50%;
            margin-left: -0.25rem;
            border-width: 0.25em 0.25em 0;
        }

        .p-tooltip-bottom :global(.p-tooltip-arrow) {
            top: 0;
            left: 50%;
            margin-left: -0.25rem;
            border-width: 0 0.25em 0.25rem;
        }

        .p-tooltip-target-wrapper {
            display: inline-flex;
        }
    }
</style>
