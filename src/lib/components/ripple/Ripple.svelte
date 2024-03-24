<script lang="ts">
    import JAZZ_SVELTE from '../api/JazzSvelte'
    import { resolvePT } from '../utils/ptUtils'
    import { ripple } from './ripple.action'
    import type { RipplePassThroughMethodOptions, RipplePassThroughOptions, RootHTMLAttributes } from './ripple.types'

    export let style: string | null = null
    export let unstyled: boolean = false
    export let pt: RipplePassThroughOptions | null = null
    export let ptOptions: RipplePassThroughMethodOptions | null = null

    const { ripple: hasRipple } = JAZZ_SVELTE
    let rootAttributes: RootHTMLAttributes = {}

    $: {
        // "root" element
        const rootClasses = ['p-ink']
        rootAttributes = resolvePT(rootClasses, style, pt?.root, null, ptOptions, unstyled)
    }
</script>

{#if $hasRipple}
    <span {...rootAttributes} role="presentation" aria-hidden="true" use:ripple></span>
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
