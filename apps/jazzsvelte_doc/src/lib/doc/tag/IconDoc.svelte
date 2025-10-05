<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Tag } from '@jazzsvelte/tag'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<Tag class="mr-2" icon="pi pi-user" value="Primary"></Tag>
<Tag class="mr-2" icon="pi pi-check" severity="success" value="Success"></Tag>
<Tag class="mr-2" icon="pi pi-info-circle" severity="info" value="Info"></Tag>
<Tag class="mr-2" icon="pi pi-exclamation-triangle" severity="warning" value="Warning"></Tag>
<Tag icon="pi pi-times" severity="danger" value="Danger"></Tag>
        `,
        javascript: `
${importJS('Tag')}

<div class="card">
    <Tag class="mr-2" icon="pi pi-user" value="Primary"></Tag>
    <Tag class="mr-2" icon="pi pi-check" severity="success" value="Success"></Tag>
    <Tag class="mr-2" icon="pi pi-info-circle" severity="info" value="Info"></Tag>
    <Tag class="mr-2" icon="pi pi-exclamation-triangle" severity="warning" value="Warning"></Tag>
    <Tag icon="pi pi-times" severity="danger" value="Danger"></Tag>
</div>
`,
        typescript: `
${importTS('Tag')}

<div class="card">
    <Tag class="mr-2" icon="pi pi-user" value="Primary"></Tag>
    <Tag class="mr-2" icon="pi pi-check" severity="success" value="Success"></Tag>
    <Tag class="mr-2" icon="pi pi-info-circle" severity="info" value="Info"></Tag>
    <Tag class="mr-2" icon="pi pi-exclamation-triangle" severity="warning" value="Warning"></Tag>
    <Tag icon="pi pi-times" severity="danger" value="Danger"></Tag>
</div>
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        A font icon next to the value can be displayed with the <i>icon</i> property.
    </p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-2">
    <Tag icon="pi pi-user" value="Primary" />
    <Tag icon="pi pi-check" severity="success" value="Success" />
    <Tag icon="pi pi-info-circle" severity="info" value="Info" />
    <Tag icon="pi pi-exclamation-triangle" severity="warning" value="Warning" />
    <Tag icon="pi pi-times" severity="danger" value="Danger" />
</div>
<DocSectionCode {code} />
