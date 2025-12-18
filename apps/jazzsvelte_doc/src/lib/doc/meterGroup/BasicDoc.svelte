<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { MeterGroup } from '@jazzsvelte/meter_group'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<MeterGroup values={values} />
        `,
        javascript: `
${importJS('MeterGroup', `const values = [{ label: 'Space used', value: 15 }]`)}

<div class="card flex justify-content-center">
    <MeterGroup values={values} />
</div>
`,
        typescript: `
${importTS('MeterGroup', `const values = [{ label: 'Space used', value: 15 }]`)}

<div class="card flex justify-content-center">
    <MeterGroup values={values} />
</div>
 `
    }

    const values = [{ label: 'Space used', value: 15 }]
</script>

<DocSectionText {docSection}>
    <p>
        MeterGroup requires a <i>value</i> as the data to display where each item in the collection should be a type of
        <i>MeterItem</i>.
    </p>
</DocSectionText>
<div class="card">
    <MeterGroup {values} />
</div>
<DocSectionCode {code} />
