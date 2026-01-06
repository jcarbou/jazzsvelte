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
<Steps model={items} />
`,
        javascript: `
${importJS('Steps', codeItems)}
<div class="card">
    <Steps model={items} />
</div>
`,
        typescript: `
${importTS('Steps', codeItems)}
<div class="card">
    <Steps model={items} />
</div>
 `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Steps requires a collection of menuitems as its <i>model</i>.
    </p>
</DocSectionText>
<div class="card">
    <Steps model={items} />
</div>
<DocSectionCode {code} />
