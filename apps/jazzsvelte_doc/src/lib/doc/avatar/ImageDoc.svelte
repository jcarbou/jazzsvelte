<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Avatar } from '@jazzsvelte/avatar'
    import { Badge } from '@jazzsvelte/badge'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<Avatar image="/images/avatar/amyelsner.png" size="xlarge" shape="circle" />
<Avatar image="/images/avatar/asiyajavayant.png" size="large" shape="circle" />
<Avatar image="/images/avatar/onyamalimba.png" shape="circle" />

<Avatar class="p-overlay-badge" image="/images/organization/walter.jpg" size="xlarge">
    <Badge value="4" severity="danger" />
</Avatar>

<Avatar image={"https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp"} class="flex align-items-center justify-content-center mr-2" size="xlarge" />
        `,
        javascript: `
${importJS(['Avatar', 'Badge'])}

<div class="card">
    <div class="flex flex-wrap gap-5">
        <div class="flex-auto">
            <h5>Image</h5>
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" class="mr-2" size="xlarge" shape="circle" />
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png" class="mr-2" size="large" shape="circle" />
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" shape="circle" />
        </div>

        <div class="flex-auto">
            <h5>Badge</h5>
            <Avatar class="p-overlay-badge" image="https://primefaces.org/cdn/primereact/images/organization/walter.jpg" size="xlarge">
                <Badge value="4" severity="danger" />
            </Avatar>
        </div>

        <div class="flex-auto">
            <h5>Gravatar</h5>
            <Avatar image={"https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp"} class="flex align-items-center justify-content-center mr-2" size="xlarge" />
        </div>
    </div>
</div>
        `,
        typescript: `
${importTS(['Avatar', 'Badge'])}

<div class="card">
    <div class="flex flex-wrap gap-5">
        <div class="flex-auto">
            <h5>Image</h5>
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" class="mr-2" size="xlarge" shape="circle" />
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png" class="mr-2" size="large" shape="circle" />
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" shape="circle" />
        </div>

        <div class="flex-auto">
            <h5>Badge</h5>
            <Avatar class="p-overlay-badge" image="https://primefaces.org/cdn/primereact/images/organization/walter.jpg" size="xlarge">
                <Badge value="4" severity="danger" />
            </Avatar>
        </div>

        <div class="flex-auto">
            <h5>Gravatar</h5>
            <Avatar image={"https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp"} class="flex align-items-center justify-content-center mr-2" size="xlarge" />
        </div>
    </div>
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Use the <i>image</i> property to display an image as an Avatar.
    </p>
</DocSectionText>
<div class="card">
    <div class="flex flex-wrap gap-5">
        <div class="flex-auto">
            <h5>Image</h5>
            <Avatar
                image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
                class="mr-2"
                size="xlarge"
                shape="circle"
            />
            <Avatar
                image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png"
                class="mr-2"
                size="large"
                shape="circle"
            />
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" shape="circle" />
        </div>

        <div class="flex-auto">
            <h5>Badge</h5>
            <Avatar
                class="p-overlay-badge"
                image="https://primefaces.org/cdn/primereact/images/organization/walter.jpg"
                size="xlarge"
            >
                <Badge value="4" severity="danger" />
            </Avatar>
        </div>

        <div class="flex-auto">
            <h5>Gravatar</h5>
            <Avatar
                image={'https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp'}
                class="flex align-items-center justify-content-center mr-2"
                size="xlarge"
            />
        </div>
    </div>
</div>
<DocSectionCode {code} />
