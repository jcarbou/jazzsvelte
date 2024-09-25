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
<Avatar icon="pi pi-user" size="xlarge" />
<Avatar icon="pi pi-user" size="large" style="background-color:#2196F3;color:#ffffff;" />
<Avatar icon="pi pi-user" style="background-color:#9c27b0;color:#ffffff;" />

<Avatar icon="pi pi-user" size="xlarge" shape="circle" />
<Avatar icon="pi pi-user" size="large" style="background-color:#2196F3;color:#ffffff;" shape="circle" />
<Avatar icon="pi pi-user" style="background-color:#9c27b0;color:#ffffff;" shape="circle" />

<Avatar class="p-overlay-badge" icon="pi pi-user" size="xlarge">
    <Badge value="4" />
</Avatar>
        `,
        javascript: `
${importJS(['Avatar', 'Badge'])}

<div class="card">
    <div class="flex flex-wrap gap-5">
        <div class="flex-auto">
            <h5>Icon</h5>
            <Avatar icon="pi pi-user" class="mr-2" size="xlarge" />
            <Avatar icon="pi pi-user" class="mr-2" size="large" style="background-color:#2196F3;color:#ffffff;" />
            <Avatar icon="pi pi-user" style="background-color:#9c27b0;color:#ffffff;" />
        </div>

        <div class="flex-auto">
            <h5>Circle</h5>
            <Avatar icon="pi pi-user" class="mr-2" size="xlarge" shape="circle" />
            <Avatar icon="pi pi-user" class="mr-2" size="large" style="background-color:#2196F3;color:#ffffff;" shape="circle" />
            <Avatar icon="pi pi-user" style="background-color:#9c27b0;color:#ffffff;" shape="circle" />
        </div>

        <div class="flex-auto">
            <h5>Badge</h5>
            <Avatar class="p-overlay-badge" icon="pi pi-user" size="xlarge">
                <Badge value="4" />
            </Avatar>
        </div>
    </div>
</div>
        `,
        typescript: `
${importTS(['Avatar', 'Badge'])}

<div class="card">
    <div class="flex flex-wrap gap-5">
        <div class="flex-auto">
            <h5>Icon</h5>
            <Avatar icon="pi pi-user" class="mr-2" size="xlarge" />
            <Avatar icon="pi pi-user" class="mr-2" size="large" style="background-color:#2196F3;color:#ffffff;" />
            <Avatar icon="pi pi-user" style="background-color:#9c27b0;color:#ffffff;" />
        </div>

        <div class="flex-auto">
            <h5>Circle</h5>
            <Avatar icon="pi pi-user" class="mr-2" size="xlarge" shape="circle" />
            <Avatar icon="pi pi-user" class="mr-2" size="large" style="background-color:#2196F3;color:#ffffff;" shape="circle" />
            <Avatar icon="pi pi-user" style="background-color:#9c27b0;color:#ffffff;" shape="circle" />
        </div>

        <div class="flex-auto">
            <h5>Badge</h5>
            <Avatar class="p-overlay-badge" icon="pi pi-user" size="xlarge">
                <Badge value="4" />
            </Avatar>
        </div>
    </div>
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        A font icon is displayed as an Avatar with the <i>icon</i> property.
    </p>
</DocSectionText>
<div class="card">
    <div class="flex flex-wrap gap-5">
        <div class="flex-auto">
            <h5>Icon</h5>
            <Avatar icon="pi pi-user" class="mr-2" size="xlarge" />
            <Avatar icon="pi pi-user" class="mr-2" size="large" style="background-color:#2196F3;color:#ffffff;" />
            <Avatar icon="pi pi-user" style="background-color:#9c27b0;color:#ffffff;" />
        </div>

        <div class="flex-auto">
            <h5>Circle</h5>
            <Avatar icon="pi pi-user" class="mr-2" size="xlarge" shape="circle" />
            <Avatar icon="pi pi-user" class="mr-2" size="large" style="background-color:#2196F3;color:#ffffff;" shape="circle" />
            <Avatar icon="pi pi-user" style="background-color:#9c27b0;color:#ffffff;" shape="circle" />
        </div>

        <div class="flex-auto">
            <h5>Badge</h5>
            <Avatar class="p-overlay-badge" icon="pi pi-user" size="xlarge">
                <Badge value="4" />
            </Avatar>
        </div>
    </div>
</div>
<DocSectionCode {code} />
