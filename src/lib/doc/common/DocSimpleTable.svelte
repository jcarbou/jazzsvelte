<script lang="ts">
    import DocTableWrapper from './DocTableWrapper.svelte'

    export let headers: string[]
    export let rows: string[][]
</script>

<DocTableWrapper>
    <tr slot="thead">
        {#each headers as header, i (i)}
            <th>{header}</th>
        {/each}
    </tr>
    <svelte:fragment slot="tbody">
        {#each rows as row, i (i)}
            <tr>
                {#each row as value, i (i)}
                    <td>{value}</td>
                {/each}
            </tr>
        {/each}
    </svelte:fragment>
</DocTableWrapper>
