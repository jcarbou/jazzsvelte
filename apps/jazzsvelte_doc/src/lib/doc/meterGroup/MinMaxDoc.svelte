<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { MeterGroup } from '@jazzsvelte/meter_group'

    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const codeValues = `
    const values = [
        { label: 'Apps', color: '#34d399', value: 16 },
        { label: 'Messages', color: '#fbbf24', value: 8 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 10 }
    ]`
    const code = {
        basic: `
<MeterGroup values={values} max="200" />
        `,
        javascript: `
${importJS('MeterGroup', codeValues)}

<div class="card flex justify-content-center">
    <MeterGroup values={values} max="200" />
</div>
`,
        typescript: `
${importTS('MeterGroup', codeValues)}

<div class="card flex justify-content-center">
    <MeterGroup values={values} max="200" />
</div>
`
    }

    const values = [
        { label: 'Apps', color: '#34d399', value: 16 },
        { label: 'Messages', color: '#fbbf24', value: 8 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 10 }
    ]
</script>

<DocSectionText {docSection}>
    <p>
        Boundaries are configured with the <i>min</i> and <i>max</i> values whose defaults are 0 and 100 respectively.
    </p>
</DocSectionText>
<div class="card">
    <MeterGroup {values} max={200} />
</div>
<DocSectionCode {code} />
