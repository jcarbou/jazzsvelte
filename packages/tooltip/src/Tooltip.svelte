<script lang="ts">
    import type {
        TooltipLayoutActionState,
        TooltipOptions,
        TooltipPassThroughMethodOptions,
        TooltipPassThroughOptions,
        TooltipPosition
    } from './tooltip.types'
    import type { JazzSvelteContext, HTMLDivAttributes, CssStyle, PassThroughOptions } from '@jazzsvelte/api'

    import { getContext, tick } from 'svelte'
    import { fade } from 'svelte/transition'
    import { resolvePT, zIndex } from '@jazzsvelte/api'
    import { escape, ESC_KEY_HANDLING_PRIORITIES } from '@jazzsvelte/escape_action'
    import { tooltipLayout } from './tooltip.actions'
    import { globalButtonPT as globalPt } from './tooltip.config'

    interface Props {
        targetElement: HTMLElement
        tooltipLayoutState: TooltipLayoutActionState
        content?: string | null
        options?: TooltipOptions | undefined
        children?: import('svelte').Snippet
    }

    let _props = $props()
    let {
        targetElement, // force prettier align
        tooltipLayoutState,
        content = null,
        options = undefined,
        children
    }: Props = _props

    export const displayName = 'Tooltip'

    export function isVisible() {
        return visible
    }

    export async function hide(event?: Event) {
        if (!visible) return
        event && options?.onBeforeHide?.({ target: targetElement, originalEvent: event })
        visible = false
        if (event && options?.onHide) {
            await tick()
            options.onHide({ target: targetElement, originalEvent: event })
        }
    }

    export async function show(event: Event) {
        if (visible) return
        options?.onBeforeShow?.({ target: targetElement, originalEvent: event })
        visible = true
        if (options?.onShow) {
            await tick()
            options.onShow({ target: targetElement, originalEvent: event })
        }
    }

    export function move({ x: newX, y: newY }: { x: number | null; y: number | null }) {
        x = newX
        y = newY
    }

    export function updateContent(newContent: string | null) {
        _content = newContent
    }

    let visible: boolean = $state(true)
    let x: number | null = $state(null)
    let y: number | null = $state(null)

    let pt: TooltipPassThroughOptions | null = $derived(options?.pt || null)
    let ptOptions: PassThroughOptions | null = $derived(options?.ptOptions || null)
    let _position: TooltipPosition = $derived(options?.position || 'right')
    let unstyled: boolean = $derived(options?.unstyled ?? false)
    let style: CssStyle = $derived(options?.style || null)
    let _content: string | null = $derived(content)

    const { autoZIndex, baseZIndex, closeOnEscape } = options || {}
    let classNameState = ''

    let ptContext: TooltipPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    } = $derived({
        props: _props,
        context: {
            right: _position === 'right',
            left: _position === 'left',
            top: _position === 'top',
            bottom: _position === 'bottom'
        },
        state: { visible, position: _position, class: classNameState },
        ptOptions,
        unstyled
    })

    // "root" element
    let rootAttributes: HTMLDivAttributes = $derived(
        resolvePT(
            { class: ['p-tooltip p-component', options?.class, classNameState], style },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )

    // "arrow" element
    let arrowAttributes: HTMLDivAttributes = $derived(
        resolvePT({ class: ['p-tooltip-arrow'] }, pt?.arrow, globalPt?.arrow, ptContext)
    )

    // "text" element
    let textAttributes: HTMLDivAttributes = $derived(
        resolvePT({ class: ['p-tooltip-text'] }, pt?.text, globalPt?.text, ptContext)
    )

    let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
</script>

{#if visible}
    <div
        {...rootAttributes}
        transition:fade={{ duration: 300 }}
        use:escape={{ when: !!closeOnEscape, handler: hide, priority: [ESC_KEY_HANDLING_PRIORITIES.TOOLTIP, 0] }}
        use:tooltipLayout={{ x, y, targetElement, tooltipLayoutState, options }}
        use:zIndex={{ key: 'tooltip', jazzSvelteContext, autoZIndex, baseZIndex }}
    >
        <div {...arrowAttributes}></div>
        <div {...textAttributes}>
            {@html _content || ''}
            {@render children?.()}
        </div>
    </div>
{/if}

<style>
    @layer primereact {
        :global(.p-tooltip) {
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
