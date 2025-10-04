<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { ProgressBar, type ProgressBarLabelSnippetProps } from '@jazzsvelte/progress_bar'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<ProgressBar value={40} {labelSnippet}></ProgressBar>
        `,
        javascript: `
${importJS('ProgressBar')}

<div class="card">
    <ProgressBar value={40}  {labelSnippet}></ProgressBar>
</div>

{#snippet labelSnippet({props})}
    {props.value}/<b>100</b>
{/snippet}
`,
        typescript: `
${importTS('ProgressBar')}
    
<div class="card">
    <ProgressBar value={40} {labelSnippet}></ProgressBar>
</div>

{#snippet labelSnippet({props}: ProgressBarLabelSnippetProps)}
    {props.value}/<b>100</b>
{/snippet}
 `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Custom content inside the ProgressBar is defined with the <i>displayValueTemplate</i> property.
    </p>
</DocSectionText>
<div class="card">
    <ProgressBar value={40} {labelSnippet} />
</div>
<DocSectionCode {code} />

{#snippet labelSnippet({ props }: ProgressBarLabelSnippetProps)}
    {props.value}/<b>100</b>
{/snippet}
