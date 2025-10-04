<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { ProgressBar } from '@jazzsvelte/progress_bar'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<ProgressBar mode="indeterminate" style="height:6px;"></ProgressBar>
        `,
        javascript: `
${importJS('ProgressBar')}

<div class="card">
    <ProgressBar mode="indeterminate" style="height:6px;"></ProgressBar>
</div>
`,
        typescript: `
${importTS('ProgressBar')}

<div class="card">
    <ProgressBar mode="indeterminate" style="height:6px;"></ProgressBar>
</div>
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        For progresses with no value to track, set the <i>mode</i> property to <i>indeterminate</i>.
    </p>
</DocSectionText>
<div class="card">
    <ProgressBar mode="indeterminate" style="height:6px;" />
</div>
<DocSectionCode {code} />
