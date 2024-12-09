<script lang="ts">
    import { getContext } from 'svelte'
    import type { ApiTableInfo, LinkEntry, LinkTargets } from './doc.types'
    import { createLinkEntry } from './doc.utils'
    import DocApiTableTextOrLink from './DocApiTableTextOrLink.svelte'

    interface Props {
        value: string
        deprecated?: string | undefined
    }

    let { value, deprecated = undefined }: Props = $props()

    const { id } = getContext<ApiTableInfo>('apiTabelInfo')
    const linkTargets = getContext<LinkTargets>('apiDocsLinkTargets')

    let links: LinkEntry[] = $derived(value.split('|').map((sValue, index) => createLinkEntry(id, sValue, index, linkTargets)))
</script>

<span class="doc-option-type">
    {#if value}
        {#each links as link, i (i)}
            <DocApiTableTextOrLink {link} />
        {/each}
    {/if}
</span>

<style lang="scss">
    .doc-option-type {
        font-family:
            ui-monospace,
            SFMono-Regular,
            'SF Mono',
            Menlo,
            Consolas,
            Liberation Mono,
            monospace;
        color: var(--primary-500);
        font-weight: 500;

        .doc-option-type-options-container {
            display: flex;
            align-items: center;
        }

        span.doc-option-type-options {
            color: var(--primary-700);
        }

        &.doc-option-link {
            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>
