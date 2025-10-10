<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Chip } from '@jazzsvelte/chip'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<Chip label="Action" />
<Chip label="Comedy" />
<Chip label="Mystery" />
<Chip label="Thriller" removable />
`,
        javascript: `
${importJS('Chip')}

<div class="card flex flex-wrap gap-2">
    <Chip label="Action" />
    <Chip label="Comedy" />
    <Chip label="Mystery" />
    <Chip label="Thriller" removable />
</div>
`,
        typescript: `
${importTS('Chip')}

<div class="card flex flex-wrap gap-2">
    <Chip label="Action" />
    <Chip label="Comedy" />
    <Chip label="Mystery" />
    <Chip label="Thriller" removable />
</div>
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        A basic chip with a text is created with the <i>label</i> property. In addition when <i>removable</i> is added, a delete icon
        is displayed to remove a chip.
    </p>
</DocSectionText>
<div class="card flex flex-wrap gap-2">
    <Chip label="Action" />
    <Chip label="Comedy" />
    <Chip label="Mystery" />
    <Chip label="Thriller" removable />
</div>
<DocSectionCode {code} />
