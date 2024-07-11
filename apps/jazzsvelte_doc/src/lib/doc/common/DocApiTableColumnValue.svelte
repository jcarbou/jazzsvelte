<script lang="ts">
    import { page } from '$app/stores'
    import { getContext } from 'svelte'
    import type { ApiTableInfo, LinkEntry, LinkTargets } from './doc.types'
    import { JAZZ_SVELTE } from '@jazzsvelte/api'
    import { createLinkEntry, scrollToAnchor } from './doc.utils'
    import DocApiTableTextOrLink from './DocApiTableTextOrLink.svelte'

    export let value: string = 'null'
    export let deprecated: string | undefined = undefined

    const { darkMode } = JAZZ_SVELTE
    const { id } = getContext<ApiTableInfo>('apiTabelInfo')
    const linkTargets = getContext<LinkTargets>('apiDocsLinkTargets')

    $: link = createLinkEntry(id, value, 0, linkTargets) satisfies LinkEntry
</script>

<div class="doc-option-default" class:doc-option-dark={$darkMode} class:doc-option-light={!$darkMode}>
    {#if value}
        <DocApiTableTextOrLink {link} />
    {/if}
</div>

<style lang="scss">
    .doc-option-default {
        font-family:
            ui-monospace,
            SFMono-Regular,
            'SF Mono',
            Menlo,
            Consolas,
            Liberation Mono,
            monospace;
        font-weight: 400;
        font-style: normal;
        display: flex;
        border-width: 1px;
        border-style: solid;
        border-radius: 6px;
        padding: 2px 6px;
        max-width: min-content;
    }
</style>
