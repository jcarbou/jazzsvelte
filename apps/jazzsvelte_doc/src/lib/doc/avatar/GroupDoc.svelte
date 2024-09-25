<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Avatar } from '@jazzsvelte/avatar'
    import { AvatarGroup } from '@jazzsvelte/avatar_group'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<AvatarGroup>
  <Avatar image="/images/avatar/amyelsner.png" size="large" shape="circle" />
  <Avatar image="/images/avatar/asiyajavayant.png" size="large" shape="circle" />
  <Avatar image="/images/avatar/onyamalimba.png" size="large" shape="circle" />
  <Avatar image="/images/avatar/ionibowcher.png" size="large" shape="circle" />
  <Avatar image="/images/avatar/xuxuefeng.png" size="large" shape="circle" />
  <Avatar label="+2" shape="circle" size="large"/>
</AvatarGroup>

        `,
        javascript: `
${importJS(['Avatar', 'AvatarGroup', 'Badge'])}

<div class="card flex justify-content-center">
    <AvatarGroup>
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" size="large" shape="circle" />
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png" size="large" shape="circle" />
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" size="large" shape="circle" />
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/ionibowcher.png" size="large" shape="circle" />
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png" size="large" shape="circle" />
        <Avatar label="+2" shape="circle" size="large"/>
    </AvatarGroup>
</div>
        `,
        typescript: `
${importTS(['Avatar', 'AvatarGroup', 'Badge'])}

<div class="card flex justify-content-center">
    <AvatarGroup>
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" size="large" shape="circle" />
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png" size="large" shape="circle" />
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" size="large" shape="circle" />
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/ionibowcher.png" size="large" shape="circle" />
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png" size="large" shape="circle" />
        <Avatar label="+2" shape="circle" size="large"/>
    </AvatarGroup>
</div>
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
