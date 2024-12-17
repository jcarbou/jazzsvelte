<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Avatar } from '@jazzsvelte/avatar'
    import { AvatarGroup } from '@jazzsvelte/avatar_group'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props();

    const codeItems = `<AvatarGroup>
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" size="large" shape="circle" />
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png" size="large" shape="circle" />
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" size="large" shape="circle" />
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/ionibowcher.png" size="large" shape="circle" />
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png" size="large" shape="circle" />
        <Avatar label="+2" shape="circle" size="large"/>
    </AvatarGroup>`

    const code = {
        basic: `
${codeItems}
`,
        javascript: `
${importJS(['Avatar', 'AvatarGroup', 'Badge'])}

${codeItems}
`,
        typescript: `
${importTS(['Avatar', 'AvatarGroup', 'Badge'])}

${codeItems}
`
    }
</script>

<DocSectionText {docSection}>
    <p>Grouping is available by wrapping multiple Avatar components inside an AvatarGroup.</p>
</DocSectionText>
<div class="card flex justify-content-center">
    <AvatarGroup>
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" size="large" shape="circle" />
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png" size="large" shape="circle" />
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" size="large" shape="circle" />
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/ionibowcher.png" size="large" shape="circle" />
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png" size="large" shape="circle" />
        <Avatar label="+2" shape="circle" size="large" />
    </AvatarGroup>
</div>
<DocSectionCode {code} />
