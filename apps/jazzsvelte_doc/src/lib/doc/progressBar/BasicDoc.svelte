<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { ProgressBar } from '@jazzsvelte/progress_bar'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<ProgressBar value={50}></ProgressBar>
        `,
        javascript: `
${importJS('ProgressBar')}

<div class="card">
    <ProgressBar value={50}></ProgressBar>
</div>
`,
        typescript: `
${importTS('ProgressBar')}

<div class="card">
    <ProgressBar value={50}></ProgressBar>
</div>
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        ProgressBar is used with the <i>value</i> property.
    </p>
</DocSectionText>
<div class="card">
    <ProgressBar value={50} />
</div>
<DocSectionCode {code} />
