<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import type {
        MeterGroupStartOrEndSnippetProps,
        MeterGroupLabelListSnippetProps,
        MeterGroupMeterSnippetProps
    } from '@jazzsvelte/meter_group'
    import { MeterGroup } from '@jazzsvelte/meter_group'
    import { Button } from '@jazzsvelte/button'
    import { Card } from '@jazzsvelte/card'

    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const codeValues = `
    const values = [
        { label: 'Apps', color1: '#34d399', color2: '#fbbf24', value: 25, icon: 'pi pi-table' },
        { label: 'Messages', color1: '#fbbf24', color2: '#60a5fa', value: 15, icon: 'pi pi-inbox' },
        { label: 'Media', color1: '#60a5fa', color2: '#c084fc', value: 20, icon: 'pi pi-image' },
        { label: 'System', color1: '#c084fc', color2: '#c084fc', value: 10, icon: 'pi pi-cog', meterSnippet }
    ]`
    const code = {
        basic: `
<MeterGroup labelPosition="start" {values} {meterSnippet}>
    {#snippet startSnippet({ totalPercent })}
       ...
    {/snippet}

    {#snippet labelListSnippet({ entries })}
        ..
    {/snippet}

    {#snippet endSnippet()}
        ...
    {/snippet}
</MeterGroup>

{#snippet meterSnippet({ meterAttributes, entry }: MeterGroupMeterSnippetProps)}
    ...
{/snippet}

        `,
        javascript: `
${importJS(['MeterGroup', 'Card'], codeValues)}
<div class="card">
    <MeterGroup labelPosition="start" {values} {meterSnippet}>
        {#snippet startSnippet({ totalPercent })}
            <div class="flex justify-content-between mt-3 mb-2 relative">
                <span>Storage</span>
                <span style="width:{totalPercent}%" class="absolute text-right">
                    {totalPercent}%
                </span>
                <span class="font-medium">1TB</span>
            </div>
        {/snippet}

        {#snippet labelListSnippet({ entries })}
            <div class="flex flex-wrap gap-3">
                {#each entries as { item }}
                    <Card class="flex-1">
                        <div class="flex justify-content-between gap-5">
                            <div class="flex flex-column gap-1">
                                <span class="text-secondary text-sm">{item.label}</span>
                                <span class="font-bold text-lg">{item.value}%</span>
                            </div>
                            <span
                                class="w-2rem h-2rem border-circle inline-flex justify-content-center align-items-center text-center"
                                style="background-color:{item.color1};color:#ffffff"
                            >
                                <i class={item.icon}></i>
                            </span>
                        </div>
                    </Card>
                {/each}
            </div>
        {/snippet}

        {#snippet endSnippet()}
            <div class="flex justify-content-between mt-3">
                <Button label="Manage Storage" outlined size="small" />
                <Button label="Update Plan" size="small" />
            </div>
        {/snippet}
    </MeterGroup>
</div>

{#snippet meterSnippet({ meterAttributes, entry })}
    <span
        {...meterAttributes}
        style="background:linear-gradient(to right, {entry.item.color1}, {entry.item.color2}); width:{entry.percentage}%"
    ></span>
{/snippet}
`,
        typescript: `
${importTS(['MeterGroup', 'Card'], codeValues)}

<div class="card">
    <MeterGroup labelPosition="start" {values} {meterSnippet}>
        {#snippet startSnippet({ totalPercent }: MeterGroupStartOrEndSnippetProps)}
            <div class="flex justify-content-between mt-3 mb-2 relative">
                <span>Storage</span>
                <span style="width:{totalPercent}%" class="absolute text-right">
                    {totalPercent}%
                </span>
                <span class="font-medium">1TB</span>
            </div>
        {/snippet}

        {#snippet labelListSnippet({ entries }: MeterGroupLabelListSnippetProps)}
            <div class="flex flex-wrap gap-3">
                {#each entries as { item }}
                    <Card class="flex-1">
                        <div class="flex justify-content-between gap-5">
                            <div class="flex flex-column gap-1">
                                <span class="text-secondary text-sm">{item.label}</span>
                                <span class="font-bold text-lg">{item.value}%</span>
                            </div>
                            <span
                                class="w-2rem h-2rem border-circle inline-flex justify-content-center align-items-center text-center"
                                style="background-color:{item.color1};color:#ffffff"
                            >
                                <i class={item.icon}></i>
                            </span>
                        </div>
                    </Card>
                {/each}
            </div>
        {/snippet}

        {#snippet endSnippet()}
            <div class="flex justify-content-between mt-3">
                <Button label="Manage Storage" outlined size="small" />
                <Button label="Update Plan" size="small" />
            </div>
        {/snippet}
    </MeterGroup>
</div>

{#snippet meterSnippet({ meterAttributes, entry }: MeterGroupMeterSnippetProps)}
    <span
        {...meterAttributes}
        style="background:linear-gradient(to right, {entry.item.color1}, {entry.item.color2}); width:{entry.percentage}%"
    ></span>
{/snippet}
`
    }

    const values = [
        { label: 'Apps', color1: '#34d399', color2: '#fbbf24', value: 25, icon: 'pi pi-table' },
        { label: 'Messages', color1: '#fbbf24', color2: '#60a5fa', value: 15, icon: 'pi pi-inbox' },
        { label: 'Media', color1: '#60a5fa', color2: '#c084fc', value: 20, icon: 'pi pi-image' },
        { label: 'System', color1: '#c084fc', color2: '#c084fc', value: 10, icon: 'pi pi-cog', meterSnippet }
    ]
</script>

<DocSectionText {docSection}>
    <p>
        MeterGroup requires a <i>value</i> as the data to display where each item in the collection should be a type of
        <i>MeterItem</i>.
    </p>
</DocSectionText>
<div class="card">
    <MeterGroup labelPosition="start" {values} {meterSnippet}>
        {#snippet startSnippet({ totalPercent }: MeterGroupStartOrEndSnippetProps)}
            <div class="flex justify-content-between mt-3 mb-2 relative">
                <span>Storage</span>
                <span style="width:{totalPercent}%" class="absolute text-right">
                    {totalPercent}%
                </span>
                <span class="font-medium">1TB</span>
            </div>
        {/snippet}

        {#snippet labelListSnippet({ entries }: MeterGroupLabelListSnippetProps)}
            <div class="flex flex-wrap gap-3">
                {#each entries as { item }}
                    <Card class="flex-1">
                        <div class="flex justify-content-between gap-5">
                            <div class="flex flex-column gap-1">
                                <span class="text-secondary text-sm">{item.label}</span>
                                <span class="font-bold text-lg">{item.value}%</span>
                            </div>
                            <span
                                class="w-2rem h-2rem border-circle inline-flex justify-content-center align-items-center text-center"
                                style="background-color:{item.color1};color:#ffffff"
                            >
                                <i class={item.icon}></i>
                            </span>
                        </div>
                    </Card>
                {/each}
            </div>
        {/snippet}

        {#snippet endSnippet()}
            <div class="flex justify-content-between mt-3">
                <Button label="Manage Storage" outlined size="small" />
                <Button label="Update Plan" size="small" />
            </div>
        {/snippet}
    </MeterGroup>
</div>
<DocSectionCode {code} />

{#snippet meterSnippet({ meterAttributes, entry }: MeterGroupMeterSnippetProps)}
    <span
        {...meterAttributes}
        style="background:linear-gradient(to right, {entry.item.color1}, {entry.item.color2}); width:{entry.percentage}%"
    ></span>
{/snippet}
