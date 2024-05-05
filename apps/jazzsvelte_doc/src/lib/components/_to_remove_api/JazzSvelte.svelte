<script lang="ts">
    import type { JazzSvelteContext } from './JazzSvelte.types'
    import { JAZZ_SVELTE } from './JazzSvelte'
    import { setContext } from 'svelte'
    import './base.css'
    import './common.css'

    const { themePath, ripple } = JAZZ_SVELTE

    setContext<JazzSvelteContext>('JAZZ_SVELTE', JAZZ_SVELTE)
</script>

<svelte:head>
    <link rel="stylesheet" href="themes/{$themePath}/theme.css" />
    {#if $ripple}
        <style type="text/css">
            .p-ripple {
                overflow: hidden;
                position: relative;
            }
        </style>
    {/if}
</svelte:head>

<slot />

<div id="__JAZZ_SVELTE_TOOLTIP_ANCHOR__" />
