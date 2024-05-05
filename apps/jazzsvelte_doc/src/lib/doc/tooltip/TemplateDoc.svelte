<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const customContent = `
    <img
        alt="logo"
        src="https://primefaces.org/cdn/primereact/images/logo.png"
        data-pr-tooltip="PrimeReact-Logo"
        height="80px"
    />`

    const code = {
        basic: `
${importJS(['Button'], '', `const customContent= '${customContent}'`)}

<div class="card flex justify-content-center">
    <Button class="custom-tooltip-btn" type="button" label="Save" icon="pi pi-check" tooltip={customContent} />
</div>       
   `,
        javascript: `
${importJS(['Button'], '', `const customContent= '${customContent}'`)}

<div class="card flex justify-content-center">
    <Button class="custom-tooltip-btn" type="button" label="Save" icon="pi pi-check" tooltip={customContent} />
</div>
        `,
        typescript: `
${importTS(['Button'], '', `const customContent: string = '${customContent}'`)}

<div class="card flex justify-content-center">
    <Button class="custom-tooltip-btn" type="button" label="Save" icon="pi pi-check" tooltip={customContent} />
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Custom content can be placed as the tooltip value either with <i>content</i> property or nesting the content as children.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Button class="custom-tooltip-btn" type="button" label="Save" icon="pi pi-check" tooltip={customContent} />
</div>
<DocSectionCode {code} />
