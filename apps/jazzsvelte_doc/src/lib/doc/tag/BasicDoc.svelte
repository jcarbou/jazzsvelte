<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Tag } from '@jazzsvelte/tag'

    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<Tag value="New"></Tag>
`,
        javascript: `
${importJS('Tag')}

<div class="card flex justify-content-center">
    <Tag value="New"></Tag>
</div>
 `,
        typescript: `
${importTS('Tag')}

<div class="card flex justify-content-center">
    <Tag value="New"></Tag>
</div>
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Label of the tag is defined with the <i>value</i> property.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Tag value="New" />
</div>
<DocSectionCode {code} />
