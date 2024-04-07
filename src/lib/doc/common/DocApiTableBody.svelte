<script lang="ts">
    import type { ApiTableInfo, DataItem } from './doc.types'
    import { isEmpty } from '$lib/components/utils/ObjectUtils'
    import { JAZZ_SVELTE } from '$lib/components/api/JazzSvelte'
    import { getContext } from 'svelte'
    import DocApiTableContext from './DocApiTableContext.svelte'

    const { darkMode } = JAZZ_SVELTE
    const { data, isPT } = getContext<ApiTableInfo>('apiTabelInfo')
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
            {#each Object.entries(item) as [key, value], index (index)}
                {#if key !== 'readonly' && key !== 'optional' && key !== 'deprecated'}
                    <td>
                        {#if key === 'parameters' && Array.isArray(value)}
                            {#each value as subValue, index (index)}
                                <div class="doc-option-params">
                                    <span class="doc-option-parameter-name">{subValue.name}: </span>
                                    <span class="doc-option-parameter-type">
                                        <DocApiTableContext value={subValue.type} />
                                    </span>
                                    <br />
                                </div>
                            {/each}
                        {:else if key === 'default' && typeof value === 'string'}
                            <div class="doc-option-default" class:doc-option-dark={$darkMode} class:doc-option-light={!$darkMode}>
                                <DocApiTableContext value={value || 'null'} deprecated={item['deprecated']} />
                            </div>
                        {:else if key === 'type' && typeof value === 'string'}
                            <span class="doc-option-type">
                                <DocApiTableContext {value} deprecated={item['deprecated']} />
                            </span>
                        {:else if key === 'returnType' && typeof value === 'string'}
                            <div
                                class="doc-option-returnType"
                                class:doc-option-dark={$darkMode}
                                class:doc-option-light={!$darkMode}
                            >
                                <DocApiTableContext {value} deprecated={item['deprecated']} />
                            </div>
                        {:else if key === 'description' || key === 'values'}
                            <span class="doc-option-description">{value}</span>
                        {:else if typeof value === 'string'}
                            <DocApiTableContext {value} isLinkableOption={key === 'name'} deprecated={item['deprecated']} />
                        {/if}
                    </td>
                {/if}
            {/each}
        </tr>
    {/if}
{/each}

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

    .doc-option-default,
    .doc-option-returnType {
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

    .doc-option-light {
        background: var(--bluegray-50);
        border-color: var(--bluegray-100);
    }

    .doc-option-dark {
        background: var(--bluegray-800);
        border-color: var(--bluegray-800);
    }
</style>
