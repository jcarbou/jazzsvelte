<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'
    import { ButtonGroup } from '@jazzsvelte/button_group'
    import { importJS, importTS } from '../common/doc.utils'

    let { docSection }: ComponentDocProps = $props();
const codeBasic = `
<ButtonGroup>
    <Button label="Save" icon="pi pi-check" />
    <Button label="Delete" icon="pi pi-trash" />
    <Button label="Cancel" icon="pi pi-times" />
</ButtonGroup>

<ButtonGroup rounded={true} iconPos="right" size="small">
    <Button label="Save" icon="pi pi-check" />
    <Button label="Delete" icon="pi pi-trash" />
    <Button label="Cancel" icon="pi pi-times" />
</ButtonGroup>
`
const code = {
        basic: codeBasic,
        javascript: `
${importJS('Button','ButtonGroup')}
${codeBasic}
`,
        typescript: `
${importTS('Button','ButtonGroup')}
${codeBasic}
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Multiple buttons are grouped when wrapped inside an element with <i>ButtonGroup</i> component.
    </p>
</DocSectionText>
<div class="card flex flex-column gap-3 justify-content-center">
    <ButtonGroup>
        <Button label="Save" icon="pi pi-check" />
        <Button label="Delete" icon="pi pi-trash" />
        <Button label="Cancel" icon="pi pi-times" />
    </ButtonGroup>

    <ButtonGroup rounded={true} iconPos="right" size="small">
        <Button label="Save" icon="pi pi-check" />
        <Button label="Delete" icon="pi pi-trash" />
        <Button label="Cancel" icon="pi pi-times" />
    </ButtonGroup>
</div>
<DocSectionCode {code} />
