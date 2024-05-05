<script lang="ts">
    import type { HTMLSpanAttributes } from '@jazzsvelte/api'
    import type { RipplePassThroughMethodOptions, RipplePassThroughOptions } from './ripple.types'

    import { JAZZ_SVELTE, resolvePT } from '@jazzsvelte/api'
    import { ripple } from './ripple.action'

    export let style: string | null = null
    let className: string | null = null
    export { className as class }
    export let unstyled: boolean = false
    export let pt: RipplePassThroughOptions | null = null
    export let ptOptions: RipplePassThroughMethodOptions | null = null

    const { ripple: hasRipple } = JAZZ_SVELTE

    $: rootAttributes = resolvePT(
        {
            class: ['p-ink', className],
            style,
            role: 'presentation',
            'aria-hidden': 'true'
        },
        pt?.root,
        null,
        ptOptions,
        unstyled
    ) satisfies HTMLSpanAttributes
</script>

{#if $hasRipple}
    <span {...rootAttributes} use:ripple></span>
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
