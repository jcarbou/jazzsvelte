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
<Avatar label="P" size="xlarge" />
<Avatar label="V" size="large" style="background-color:#2196F3;color:#ffffff;" />
<Avatar label="U" style="background-color:#9c27b0;color:#ffffff;" />

<Avatar label="P" size="xlarge" shape="circle" />
<Avatar label="V" size="large" style="background-color:#2196F3;color:#ffffff;" shape="circle" />
<Avatar label="U" style="background-color:#9c27b0;color:#ffffff;" shape="circle" />

<Avatar label="U" size="xlarge" class="p-overlay-badge">
<Badge value="4" />
        `,
        javascript: `
${importJS(['Avatar', 'Badge'])}

<div class="flex flex-wrap gap-5">
    <div class="flex-auto">
        <h5>Label</h5>
        <Avatar label="P" class="mr-2" size="xlarge" />
        <Avatar label="V" class="mr-2" size="large" style="background-color:#2196F3;color:#ffffff;" />
        <Avatar label="U" style="background-color:#9c27b0;color:#ffffff;" />
    </div>

    <div class="flex-auto">
        <h5>Circle</h5>
        <Avatar label="P" class="mr-2" size="xlarge" shape="circle" />
        <Avatar label="V" class="mr-2" size="large" style="background-color:#2196F3;color:#ffffff;" shape="circle" />
        <Avatar label="U" style="background-color:#9c27b0;color:#ffffff;" shape="circle" />
    </div>

    <div class="flex-auto">
        <h5>Badge</h5>
        <Avatar label="U" size="xlarge" class="p-overlay-badge">
            <Badge value="4" />
        </Avatar>
    </div>
</div>
        `,
        typescript: `
${importTS(['Avatar', 'Badge'])}

<div class="flex flex-wrap gap-5">
    <div class="flex-auto">
        <h5>Label</h5>
        <Avatar label="P" class="mr-2" size="xlarge" />
        <Avatar label="V" class="mr-2" size="large" style="background-color:#2196F3;color:#ffffff;" />
        <Avatar label="U" style="background-color:#9c27b0;color:#ffffff;" />
    </div>

    <div class="flex-auto">
        <h5>Circle</h5>
        <Avatar label="P" class="mr-2" size="xlarge" shape="circle" />
        <Avatar label="V" class="mr-2" size="large" style="background-color:#2196F3;color:#ffffff;" shape="circle" />
        <Avatar label="U" style="background-color:#9c27b0;color:#ffffff;" shape="circle" />
    </div>

    <div class="flex-auto">
        <h5>Badge</h5>
        <Avatar label="U" size="xlarge" class="p-overlay-badge">
            <Badge value="4" />
        </Avatar>
    </div>
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        A letter Avatar is defined with the <i>label</i> property.
    </p>
</DocSectionText>
<div class="card">
    <div class="flex flex-wrap gap-5">
        <div class="flex-auto">
            <h5>Label</h5>
            <Avatar label="P" class="mr-2" size="xlarge" />
            <Avatar label="V" class="mr-2" size="large" style="background-color:#2196F3;color:#ffffff;" />
            <Avatar label="U" style="background-color:#9c27b0;color:#ffffff;" />
        </div>

        <div class="flex-auto">
            <h5>Circle</h5>
            <Avatar label="P" class="mr-2" size="xlarge" shape="circle" />
            <Avatar label="V" class="mr-2" size="large" style="background-color:#2196F3;color:#ffffff;" shape="circle" />
            <Avatar label="U" style="background-color:#9c27b0;color:#ffffff;" shape="circle" />
        </div>

        <div class="flex-auto">
            <h5>Badge</h5>
            <Avatar label="U" size="xlarge" class="p-overlay-badge">
                <Badge value="4" />
            </Avatar>
        </div>
    </div>
</div>
<DocSectionCode {code} />
