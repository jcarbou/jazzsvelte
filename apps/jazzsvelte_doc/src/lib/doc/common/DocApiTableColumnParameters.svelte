<script lang="ts">
    import { getContext } from 'svelte'
    import type { ApiTableInfo, LinkEntry, LinkTargets } from './doc.types'
    import { createLinkEntry } from './doc.utils'
    import DocApiTableTextOrLink from './DocApiTableTextOrLink.svelte'
    import type { ApiDocParameter, ApiDocValue } from '@jazzsvelte/api'

    export let value: ApiDocParameter[]
    export let deprecated: string | undefined = undefined

    const { id } = getContext<ApiTableInfo>('apiTabelInfo')
    const linkTargets = getContext<LinkTargets>('apiDocsLinkTargets')
</script>

{#each value as parameter, index (index)}
    <div class="doc-option-params">
        <span class="doc-option-parameter-name">{parameter.name}: </span>
        <span class="doc-option-parameter-type">
            <DocApiTableTextOrLink link={createLinkEntry(id, parameter.type, index, linkTargets)} />
        </span>
        <br />
    </div>
{/each}

<style lang="scss">
    .doc-option-parameter-name {
        font-family:
            ui-monospace,
            SFMono-Regular,
            'SF Mono',
            Menlo,
            Consolas,
            Liberation Mono,
            monospace;
        color: var(--primary-700);
    }

    .doc-option-parameter-type {
        font-family:
            ui-monospace,
            SFMono-Regular,
            'SF Mono',
            Menlo,
            Consolas,
            Liberation Mono,
            monospace;
        color: var(--primary-500);
    }

    .doc-option-params {
        font-family:
            ui-monospace,
            SFMono-Regular,
            'SF Mono',
            Menlo,
            Consolas,
            Liberation Mono,
            monospace;
    }
</style>
