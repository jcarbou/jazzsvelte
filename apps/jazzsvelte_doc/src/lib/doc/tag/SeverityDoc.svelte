<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Tag } from '@jazzsvelte/tag'

    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<Tag value="Primary"></Tag>
<Tag severity="success" value="Success"></Tag>
<Tag severity="info" value="Info"></Tag>
<Tag severity="warning" value="Warning"></Tag>
<Tag severity="danger" value="Danger"></Tag>
<Tag severity="secondary" value="Secondary"></Tag>
<Tag severity="contrast" value="Contrast"></Tag>
        `,
        javascript: `
${importJS('Tag')}

<div class="card flex flex-wrap justify-content-center gap-2">
    <Tag value="Primary"></Tag>
    <Tag severity="success" value="Success"></Tag>
    <Tag severity="info" value="Info"></Tag>
    <Tag severity="warning" value="Warning"></Tag>
    <Tag severity="danger" value="Danger"></Tag>
    <Tag severity="secondary" value="Secondary"></Tag>
    <Tag severity="contrast" value="Contrast"></Tag>
</div>
`,
        typescript: `
${importTS('Tag')}

<div class="card flex flex-wrap justify-content-center gap-2">
    <Tag value="Primary"></Tag>
    <Tag severity="success" value="Success"></Tag>
    <Tag severity="info" value="Info"></Tag>
    <Tag severity="warning" value="Warning"></Tag>
    <Tag severity="danger" value="Danger"></Tag>
    <Tag severity="secondary" value="Secondary"></Tag>
    <Tag severity="contrast" value="Contrast"></Tag>
</div>
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Severity defines the color of the tag, possible values are <i>success</i>, <i>info</i>, <i>warning</i> and <i>danger</i> in
        addition to the default theme color.
    </p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-2">
    <Tag value="Primary" />
    <Tag severity="success" value="Success" />
    <Tag severity="info" value="Info" />
    <Tag severity="warning" value="Warning" />
    <Tag severity="danger" value="Danger" />
    <Tag severity="secondary" value="Secondary" />
    <Tag severity="contrast" value="Contrast" />
</div>
<DocSectionCode {code} />
