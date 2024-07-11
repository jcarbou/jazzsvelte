<script lang="ts">
    import type { ApiTableInfo, DataItem } from './doc.types'
    import { getContext } from 'svelte'
    import DocApiTableColumName from './DocApiTableColumName.svelte'
    import DocApiTableColumnType from './DocApiTableColumnType.svelte'
    import DocApiTableColumText from './DocApiTableColumText.svelte'
    import DocApiTableColumnValue from './DocApiTableColumnValue.svelte'
    import DocApiTableColumnParameters from './DocApiTableColumnParameters.svelte'

    const { data, isPT, headers } = getContext<ApiTableInfo>('apiTabelInfo')
</script>

{#each data as item, index (index)}
    {#if isPT}
        <tr>
            <td>{item.value}</td>
            <td>{item.label}</td>
            <td>{item.description}</td>
        </tr>
    {:else}
        <tr>
            {#each headers as key, index (index)}
                {@const value = item[key]}
                <td>
                    {#if key === 'parameters' && Array.isArray(value)}
                        <DocApiTableColumnParameters {value} deprecated={item['deprecated']} />
                    {:else if key === 'default' && typeof value === 'string'}
                        <DocApiTableColumnValue value={'' + value} deprecated={item['deprecated']} />
                    {:else if key === 'returnType' && typeof value === 'string'}
                        <DocApiTableColumnValue value={'' + value} deprecated={item['deprecated']} />
                    {:else if key === 'type'}
                        <DocApiTableColumnType value={'' + value} />
                    {:else if key === 'value'}
                        <DocApiTableColumnType value={'' + value} />
                    {:else if key === 'description' || key === 'values'}
                        <DocApiTableColumText value={'' + value} deprecated={item['deprecated']} />
                    {:else if key === 'name'}
                        <DocApiTableColumName value={'' + value} deprecated={item['deprecated']} />
                    {:else if typeof value === 'string'}
                        <DocApiTableColumText value={'' + value} deprecated={item['deprecated']} />
                    {/if}
                </td>
            {/each}
        </tr>
    {/if}
{/each}

<style lang="scss">
    :global(.doc-option-name),
    td > i:not(.pi) {
        font-family:
            ui-monospace,
            SFMono-Regular,
            'SF Mono',
            Menlo,
            Consolas,
            Liberation Mono,
            monospace;
        position: relative;
        scroll-margin-top: 6.5rem;
        background-color: var(--doc-highlight-text-bg);
        color: var(--doc-highlight-text-color);
        border-radius: 6px;
        padding: 2px 6px;
        font-weight: 600;
        font-style: normal;
        white-space: nowrap;

        :global(.doc-option-link) {
            position: absolute;
            top: 0;
            right: -1.5rem;
            color: var(--primary-color);
            opacity: 0.7;
            display: none;
            transition:
                opacity 0.3s,
                colors 0.3s;
        }
    }

    td:hover {
        :global(.doc-option-name) {
            :global(.doc-option-link) {
                display: inline;

                &:hover {
                    opacity: 1;
                }
            }
        }
    }

    :global(.doc-option-light) {
        background: var(--bluegray-50);
        border-color: var(--bluegray-100);
    }

    :global(.doc-option-dark) {
        background: var(--bluegray-800);
        border-color: var(--bluegray-800);
    }
</style>
