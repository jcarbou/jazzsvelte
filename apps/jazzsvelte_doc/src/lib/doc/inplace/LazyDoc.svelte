<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Inplace } from '@jazzsvelte/inplace'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import { MeterGroup, type MeterGroupItem } from '@jazzsvelte/meter_group'
    import { ProgressSpinner } from '@jazzsvelte/progress_spinner'

    let { docSection }: ComponentDocProps = $props()

    let values: MeterGroupItem[] | null = $state(null)

    const onOpen = () => {
        setTimeout(() => {
            values = [
                { label: 'Apps', color: '#34d399', value: 16, icon: 'pi pi-table' },
                { label: 'Messages', color: '#fbbf24', value: 8, icon: 'pi pi-inbox' },
                { label: 'Media', color: '#60a5fa', value: 24, icon: 'pi pi-image' },
                { label: 'System', color: '#c084fc', value: 10, icon: 'pi pi-cog' }
            ]
        }, 2000)
    }

    const codeBasic = `
<Inplace {onOpen}>
    {#snippet displaySnippet()}
        View Data
    {/snippet}
    {#snippet contentSnippet()}
        <div class="card flex justify-content-center">
            {#if values}
                <MeterGroup {values} max="200" />
            {:else}
                <ProgressSpinner style="width:40px;height:40px;" />
            {/if}
        </div>
    {/snippet}
</Inplace>
`
    const code = {
        basic: codeBasic,
        javascript: `
${importJS(
    ['Inplace', 'MeterGroup', 'ProgressSpinner'],
    `
    let values = $state(null)

    const onOpen = () => {
        setTimeout(() => {
            values = [
                { label: 'Apps', color: '#34d399', value: 16, icon: 'pi pi-table' },
                { label: 'Messages', color: '#fbbf24', value: 8, icon: 'pi pi-inbox' },
                { label: 'Media', color: '#60a5fa', value: 24, icon: 'pi pi-image' },
                { label: 'System', color: '#c084fc', value: 10, icon: 'pi pi-cog' }
            ]
        }, 2000)
    }
`
)}
${codeBasic}
`,
        typescript: `
${importTS(
    ['Inplace', 'MeterGroup', 'ProgressSpinner'],
    `
    let values: MeterGroupItem[] | null = $state(null)

    const onOpen = () => {
        setTimeout(() => {
            values = [
                { label: 'Apps', color: '#34d399', value: 16, icon: 'pi pi-table' },
                { label: 'Messages', color: '#fbbf24', value: 8, icon: 'pi pi-inbox' },
                { label: 'Media', color: '#60a5fa', value: 24, icon: 'pi pi-image' },
                { label: 'System', color: '#c084fc', value: 10, icon: 'pi pi-cog' }
            ]
        }, 2000)
    }
`
)}
${codeBasic}
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Using the <i>onOpen</i> event, data can be loaded in a lazy manner before displaying it in a table.
    </p>
</DocSectionText>
<div class="card">
    <Inplace {onOpen}>
        {#snippet displaySnippet()}
            View Data
        {/snippet}
        {#snippet contentSnippet()}
            <div class="card flex justify-content-center">
                {#if values}
                    <MeterGroup {values} max="200" />
                {:else}
                    <ProgressSpinner style="width:40px;height:40px;" />
                {/if}
            </div>
        {/snippet}
    </Inplace>
</div>
<DocSectionCode {code} />
