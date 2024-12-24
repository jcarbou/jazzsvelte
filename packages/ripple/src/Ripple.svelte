<script lang="ts">
    import type { CssStyle, PassThroughOptions } from '@jazzsvelte/api'
    import type { RipplePassThroughMethodOptions, RipplePassThroughOptions } from './ripple.types'

    import { JAZZ_SVELTE, resolveSpanPt } from '@jazzsvelte/api'
    import { ripple } from './ripple.action'
    import { defaultRippleProps as DEFAULT, globalRipplePT as globalPt } from './ripple.config'

    export const displayName = 'Ripple'
    export function getElement(): HTMLSpanElement {
        return rootEl
    }

    interface Props {
        pt?: RipplePassThroughOptions | null
        ptOptions?: PassThroughOptions | null
        class?: string | null
        style?: CssStyle | null
        unstyled?: boolean
    }

    let props = $props()
    let {
        pt = null,
        ptOptions = null,
        style = DEFAULT.style,
        class: className = DEFAULT.class,
        unstyled = DEFAULT.unstyled
    }: Props = props

    // svelte-ignore non_reactive_update
    let rootEl: HTMLSpanElement

    const { ripple: hasRipple } = JAZZ_SVELTE

    let ptContext: RipplePassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    } = $derived({
        props: { ...DEFAULT, ...props },
        ptOptions,
        unstyled
    })

    let rootAttributes = $derived(
        resolveSpanPt(
            {
                class: ['p-ink', className],
                style,
                role: 'presentation',
                'aria-hidden': 'true'
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )
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
