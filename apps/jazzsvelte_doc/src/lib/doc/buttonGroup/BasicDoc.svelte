<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { ButtonGroup } from '@jazzsvelte/button_group'
    import { importJS, importTS } from '../common/doc.utils'

    export let docSection: DocSection

    const code = {
        basic: `
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
        `,
        javascript: `
 ${importJS(['Button', 'ButtonGroup'])}

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
        `,
        typescript: `
        ${importTS(['Button', 'ButtonGroup'])}

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
