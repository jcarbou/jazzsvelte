<script lang="ts">
    import type { JazzSvelteContext, JazzSvelteOptions } from './jazzSvelte.types'
    import type { Readable } from 'svelte/store'
    import type { BooleanStore } from '@jazzsvelte/utils'

    import { setContext } from 'svelte'
    import { JAZZ_SVELTE } from './JazzSvelte'
    import './base.css'
    import './common.css'

    export const displayName = 'JazzSvelte'
    export let config: Partial<JazzSvelteOptions> | null = null

    let unstyled: boolean = false
    let themePath: Readable<string>
    let ripple: BooleanStore

    $: {
        JAZZ_SVELTE.config(config)
        unstyled = JAZZ_SVELTE.unstyled
        themePath = JAZZ_SVELTE.themePath
        ripple = JAZZ_SVELTE.ripple
        setContext<JazzSvelteContext>('JAZZ_SVELTE', JAZZ_SVELTE)
    }
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
