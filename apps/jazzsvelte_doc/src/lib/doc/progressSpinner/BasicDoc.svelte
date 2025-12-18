<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { ProgressSpinner } from '@jazzsvelte/progress_spinner'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<ProgressSpinner />
        `,
        javascript: `
${importJS('ProgressSpinner')}

<div class="card flex justify-content-center">
    <ProgressSpinner />
</div>
`,
        typescript: `
${importTS('ProgressSpinner')}

<div class="card flex justify-content-center">
    <ProgressSpinner />
</div>
`
    }
</script>

<DocSectionText {docSection}>
    <p>An infinite spin animation is displayed by default.</p>
</DocSectionText>
<div class="card flex justify-content-center">
    <ProgressSpinner />
</div>
<DocSectionCode {code} />
