<script lang="ts">
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { ComponentDocProps } from '../common/doc.types'
    import { importJS, importTS } from '../common/doc.utils'
    import { showToast } from '@jazzsvelte/toast'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<Button label="Submit" disabled />
        `,
        javascript: `
${importJS('Button')}

<div class="card flex justify-content-center">
    <Button label="Submit" disabled />
</div>
        `,
        typescript: `
${importTS('Button')}

<div class="card flex justify-content-center">
    <Button label="Submit" disabled />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        When <i>disabled</i> is present, the element cannot be edited and focused.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Button
        label="Submit"
        disabled
        onclick={() => showToast({ severity: 'error', summary: 'Error', detail: 'Disabled button must not triggr click event' })}
    />
</div>
<DocSectionCode {code} />
