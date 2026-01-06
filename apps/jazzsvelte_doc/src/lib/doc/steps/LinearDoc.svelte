<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Steps } from '@jazzsvelte/steps'

    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const items = [{ label: 'Personal Info' }, { label: 'Reservation' }, { label: 'Review' }]

    const codeItems = `
    const items = [{ label: 'Personal Info' }, { label: 'Reservation' }, { label: 'Review' }]
`

    const code = {
        basic: `
<Steps readOnly={true} model={items} />
`,
        javascript: `
${importJS('Steps', codeItems)}
<div class="card">
    <Steps readOnly={true} model={items} />
</div>
`,
        typescript: `
${importTS('Steps', codeItems)}
<div class="card">
    <Steps readOnly={true} model={items} />
</div>
 `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Steps is linear by default to enforce completion of a previus step to proceed, set <i>readOnly</i> as false for non-linear
        mode.
    </p>
</DocSectionText>
<div class="card">
    <Steps readOnly={true} model={items} />
</div>
<DocSectionCode {code} />
