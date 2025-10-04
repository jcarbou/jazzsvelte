<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { ProgressSpinner } from '@jazzsvelte/progress_spinner'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<ProgressSpinner style="width:50px;height:50px;" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
        `,
        javascript: `
${importJS('ProgressSpinner')}

<div class="card">
    <ProgressSpinner style="width:50px;height:50px;" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
</div>
`,
        typescript: `
${importTS('ProgressSpinner')}

<div class="card">
    <ProgressSpinner style="width:50px;height:50px;" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
</div>
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        ProgressSpinner can be customized with styling property like <i>style</i>, <i>strokeWidth</i> and <i>fill</i>.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <ProgressSpinner style="width:50px;height:50px;" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
</div>
<DocSectionCode {code} />
