<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { MeterGroup } from '@jazzsvelte/meter_group'

    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()
    const codeValues = `const values = [
        { label: 'Apps', color: '#34d399', value: 16, icon: 'pi pi-table' },
        { label: 'Messages', color: '#fbbf24', value: 8, icon: 'pi pi-inbox' },
        { label: 'Media', color: '#60a5fa', value: 24, icon: 'pi pi-image' },
        { label: 'System', color: '#c084fc', value: 10, icon: 'pi pi-cog' }
    ];`
    const code = {
        basic: `
<MeterGroup values={values} />
        `,
        javascript: `
${importJS('MeterGroup', codeValues)}

<div class="card flex justify-content-center">
    <MeterGroup values={values} />
</div>
`,
        typescript: `
${importTS('MeterGroup', codeValues)}

<div class="card flex justify-content-center">
    <MeterGroup values={values} />
</div>
`
    }

    const values = [
        { label: 'Apps', color: '#34d399', value: 16, icon: 'pi pi-table' },
        { label: 'Messages', color: '#fbbf24', value: 8, icon: 'pi pi-inbox' },
        { label: 'Media', color: '#60a5fa', value: 24, icon: 'pi pi-image' },
        { label: 'System', color: '#c084fc', value: 10, icon: 'pi pi-cog' }
    ]
</script>

<DocSectionText {docSection}>
    <p>Icons can be displayed next to the labels instead of the default marker.</p>
</DocSectionText>
<div class="card">
    <MeterGroup {values} />
</div>
<DocSectionCode {code} />
