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
                        {:else if key === 'default'}
                            <div class="doc-option-default" class:doc-option-dark={$darkMode} class:doc-option-light={!$darkMode}>
                                {#if !isEmpty(value)}
                                    <DocApiTableContext value={'' + value} deprecated={item['deprecated']} />
                                {/if}
                            </div>
                        {:else if key === 'type'}
                            <span class="doc-option-type">
                                <DocApiTableContext value={'' + value} deprecated={item['deprecated']} />
                            </span>
                        {:else if key === 'returnType'}
                            <div class="doc-option-returnType" class:doc-option-dark={$darkMode} class:doc-option-light={!$darkMode}>
                                <DocApiTableContext value={'' + value} deprecated={item['deprecated']} />
                            </div>
                        {:else if key === 'description' || key === 'values'}
                            <span class="doc-option-description">{value}</span>
                        {:else}
                            <DocApiTableContext value={'' + value} isLinkableOption={key === 'name'} deprecated={item['deprecated']} />
                        {/if}
                    </td>
                {/if}
            {/each}
        </tr>
    {/if}
{/each}
