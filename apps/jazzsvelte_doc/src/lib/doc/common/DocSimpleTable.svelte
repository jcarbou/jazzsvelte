<script lang="ts">
    import DocTableWrapper from './DocTableWrapper.svelte'

    interface Props {
        headers: string[]
        rows: string[][]
    }

    let { headers, rows }: Props = $props()
</script>

{#snippet theadContent()}
    <tr>
        {#each headers as header, i (i)}
            <th>{@html header}</th>
        {/each}
    </tr>
{/snippet}
{#snippet tBodyContent()}
    {#each rows as row, i (i)}
        <tr>
            {#each row as value, i (i)}
                <td>{@html value}</td>
            {/each}
        </tr>
    {/each}
{/snippet}

<DocTableWrapper {tBodyContent} {theadContent} />
