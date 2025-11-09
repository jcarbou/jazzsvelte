<script lang="ts">
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import { importJS, importTS } from '../common/doc.utils'
    import { showToast } from '@jazzsvelte/toast'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const codeButton = `
<Button label="Submit" onclick={() => showToast({ summary: 'Clicked', detail: 'Basic button click' })}></Button>
`
    const code = {
        basic: codeButton,
        javascript: `
${importJS('Button', `import { showToast } from '@jazzsvelte/toast'`)}

${codeButton}
`,
        typescript: `
${importTS(`Button`, `import { showToast } from '@jazzsvelte/toast'`)}

${codeButton}
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Text to display on a button is defined with the <i>label</i> property.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Button label="Submit" onclick={() => showToast({ summary: 'Clicked', detail: 'Basic button click' })}></Button>
</div>
<DocSectionCode {code} />
