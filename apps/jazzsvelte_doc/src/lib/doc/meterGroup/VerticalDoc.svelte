<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { MeterGroup } from '@jazzsvelte/meter_group'

    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const codeValues = `
    const values = [
        { label: 'Apps', color: '#34d399', value: 24 },
        { label: 'Messages', color: '#fbbf24', value: 16 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 12 }
    ]`
    const code = {
        basic: `
<MeterGroup values={values} orientation="vertical" labelOrientation="vertical" />
        `,
        javascript: `
${importJS('MeterGroup', codeValues)}

<div class="card flex justify-content-center" style="height:360px;">
    <MeterGroup values={values} orientation="vertical" labelOrientation="vertical" />
</div>
`,
        typescript: `
${importTS('MeterGroup', codeValues)}

<div class="card flex justify-content-center" style="height:360px;">
    <MeterGroup values={values} orientation="vertical" labelOrientation="vertical" />
</div>
`
    }

    const values = [
        { label: 'Apps', color: '#34d399', value: 24 },
        { label: 'Messages', color: '#fbbf24', value: 16 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 12 }
    ]
</script>

<DocSectionText {docSection}>
    <p>
        MeterGroup requires a <i>value</i> as the data to display where each item in the collection should be a type of
        <i>MeterItem</i>.
    </p>
</DocSectionText>
<div class="card flex justify-content-center" style="height:360px;">
    <MeterGroup {values} orientation="vertical" labelOrientation="vertical" />
</div>
<DocSectionCode {code} />
