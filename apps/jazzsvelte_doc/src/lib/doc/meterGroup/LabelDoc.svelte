<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { MeterGroup } from '@jazzsvelte/meter_group'

    import type { ComponentDocProps } from '../common/doc.types'

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
<MeterGroup values={values} labelPosition="start" labelOrientation="vertical" />
        `,
        javascript: `
${importJS('MeterGroup', codeValues)}

<div class="card flex justify-content-center">
    <MeterGroup values={values} labelPosition="start" labelOrientation="vertical" />
</div>
`,
        typescript: `
${importTS('MeterGroup', codeValues)}
    
<div class="card flex justify-content-center">
    <MeterGroup values={values} labelPosition="start" labelOrientation="vertical" />
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
        The position of the labels relative to the meters is defined using the <i>labelPosition</i> property. The default
        orientation of the labels is horizontal, and the vertical alternative is available through the{' '}
        <i>labelOrientation</i> option.
    </p>
</DocSectionText>
<div class="card">
    <MeterGroup {values} labelPosition="start" labelOrientation="vertical" />
</div>
<DocSectionCode {code} />
