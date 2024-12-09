<script lang="ts">
    import type { JazzSvelteContext, JazzSvelteOptions } from './jazzSvelte.types'
    import { setContext, Snippet } from 'svelte'
    import { JAZZ_SVELTE } from './JazzSvelte'
    import './base.css'
    import './common.css'

    export const displayName = 'JazzSvelte'
    interface Props {
        config?: Partial<JazzSvelteOptions> | null
        children?: Snippet
    }

    let { config = null, children }: Props = $props()

    $effect(() => {
        JAZZ_SVELTE.config(config)
    })
    let { unstyled, themePath, ripple } = JAZZ_SVELTE
    setContext<JazzSvelteContext>('JAZZ_SVELTE', JAZZ_SVELTE)

    /*run(() => {
        JAZZ_SVELTE.config(config)
        unstyled = JAZZ_SVELTE.unstyled
        themePath = JAZZ_SVELTE.themePath
        ripple = JAZZ_SVELTE.ripple
        setContext<JazzSvelteContext>('JAZZ_SVELTE', JAZZ_SVELTE)
    })*/
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

{@render children?.()}

<div id="__JAZZ_SVELTE_TOOLTIP_ANCHOR__"></div>
