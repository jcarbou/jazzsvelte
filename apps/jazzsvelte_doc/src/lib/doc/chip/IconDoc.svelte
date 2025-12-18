<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Chip } from '@jazzsvelte/chip'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<Chip label="Apple" icon="pi pi-apple" />
<Chip label="Facebook" icon="pi pi-facebook" />
<Chip label="Google" icon="pi pi-google" />
<Chip label="Microsoft" icon="pi pi-microsoft" removable />
        `,
        javascript: `
${importJS('Chip')}

<div class="card flex flex-wrap gap-2">
    <Chip label="Apple" icon="pi pi-apple" />
    <Chip label="Facebook" icon="pi pi-facebook" />
    <Chip label="Google" icon="pi pi-google" />
    <Chip label="Microsoft" icon="pi pi-microsoft" removable />
</div>
`,
        typescript: `
${importTS('Chip')}

<div class="card flex flex-wrap gap-2">
    <Chip label="Apple" icon="pi pi-apple" />
    <Chip label="Facebook" icon="pi pi-facebook" />
    <Chip label="Google" icon="pi pi-google" />
    <Chip label="Microsoft" icon="pi pi-microsoft" removable />
</div>
 `
    }
</script>

<DocSectionText {docSection}>
    <p>
        A font icon next to the label can be displayed with the <i>icon</i> property.
    </p>
</DocSectionText>
<div class="card flex flex-wrap gap-2">
    <Chip label="Apple" icon="pi pi-apple" />
    <Chip label="Facebook" icon="pi pi-facebook" />
    <Chip label="Google" icon="pi pi-google" />
    <Chip label="Microsoft" icon="pi pi-microsoft" removable />
</div>
<DocSectionCode {code} />
