<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Tag } from '@jazzsvelte/tag'

    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<Tag value="Primary" rounded></Tag>
<Tag severity="success" value="Success" rounded></Tag>
<Tag severity="info" value="Info" rounded></Tag>
<Tag severity="warning" value="Warning" rounded></Tag>
<Tag severity="danger" value="Danger" rounded></Tag>
<Tag severity="secondary" value="Secondary" rounded></Tag>
<Tag severity="contrast" value="Contrast" rounded></Tag>
        `,
        javascript: `
${importJS('Tag')}

<div class="card flex flex-wrap justify-content-center gap-2">
    <Tag value="Primary" rounded></Tag>
    <Tag severity="success" value="Success" rounded></Tag>
    <Tag severity="info" value="Info" rounded></Tag>
    <Tag severity="warning" value="Warning" rounded></Tag>
    <Tag severity="danger" value="Danger" rounded></Tag>
    <Tag severity="secondary" value="Secondary" rounded></Tag>
    <Tag severity="contrast" value="Contrast" rounded></Tag>
</div>
`,
        typescript: `
${importTS('Tag')}

<div class="card flex flex-wrap justify-content-center gap-2">
    <Tag value="Primary" rounded></Tag>
    <Tag severity="success" value="Success" rounded></Tag>
    <Tag severity="info" value="Info" rounded></Tag>
    <Tag severity="warning" value="Warning" rounded></Tag>
    <Tag severity="danger" value="Danger" rounded></Tag>
    <Tag severity="secondary" value="Secondary" rounded></Tag>
    <Tag severity="contrast" value="Contrast" rounded></Tag>
</div>
 `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Enabling <i>rounded</i>, displays a tag as a pill.
    </p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-2">
    <Tag value="Primary" rounded />
    <Tag severity="success" value="Success" rounded />
    <Tag severity="info" value="Info" rounded />
    <Tag severity="warning" value="Warning" rounded />
    <Tag severity="danger" value="Danger" rounded />
    <Tag severity="secondary" value="Secondary" rounded />
    <Tag severity="contrast" value="Contrast" rounded />
</div>
<DocSectionCode {code} />
