<script lang="ts">
    import type { JazzSvelteContext, JazzSvelteOptions } from './JazzSvelte.types'
    import { JAZZ_SVELTE } from './JazzSvelte'
    import { setContext } from 'svelte'
    import './base.css'
    import './common.css'
    import type { Readable } from 'svelte/store'
    import type { BooleanStore } from '@jazzsvelte/utils'

    export let config: Partial<JazzSvelteOptions> | null = null

    let unstyled: boolean = false
    let themePath: Readable<string>
    let ripple: BooleanStore

    setContext<JazzSvelteContext>('JAZZ_SVELTE', JAZZ_SVELTE)
</script>

<svelte:head>
    {#if !unstyled}
        <link rel="stylesheet" href="themes/{$themePath}/theme.css" />
    {/if}
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
