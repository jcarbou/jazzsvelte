<script lang="ts">
    import type { CssStyle, HTMLSpanAttributes, PassThroughOptions } from '@jazzsvelte/api'
    import type { RipplePassThroughMethodOptions, RipplePassThroughOptions } from './ripple.types'

    import { JAZZ_SVELTE, resolvePT } from '@jazzsvelte/api'
    import { ripple } from './ripple.action'
    import { defaultRippleProps as DEFAULT, globalRipplePT as globalPt } from './ripple.config'

    let className: string | null = DEFAULT.class
    export let pt: RipplePassThroughOptions | null = null
    export let ptOptions: PassThroughOptions | null = null
    export { className as class }
    export let style: CssStyle | null = DEFAULT.style
    export let unstyled: boolean = DEFAULT.unstyled

    export const displayName = 'Ripple'
    export function getElement(): HTMLSpanElement {
        return rootEl
    }
    let rootEl: HTMLSpanElement

    const { ripple: hasRipple } = JAZZ_SVELTE

    $: ptContext = {
        props: { ...DEFAULT, ...$$props },
        ptOptions,
        unstyled
    } satisfies RipplePassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }

    $: rootAttributes = resolvePT(
        {
            class: ['p-ink', className],
            style,
            role: 'presentation',
            'aria-hidden': 'true'
        },
        pt?.root,
        globalPt?.root,
        ptContext
    ) satisfies HTMLSpanAttributes
</script>

{#if $hasRipple}
    <span bind:this={rootEl} {...rootAttributes} use:ripple></span>
{/if}

<style>
    @layer primereact {
        .p-ink {
            display: block;
            position: absolute;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 100%;
            transform: scale(0);
        }

        .p-ink-active {
            animation: ripple 0.4s linear;
        }

        .p-ripple-disabled .p-ink {
            display: none;
        }
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
</style>
