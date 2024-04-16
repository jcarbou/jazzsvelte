<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Badge from '$lib/components/badge/Badge.svelte'
    import Tooltip from '$lib/components/tooltip/Tooltip.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { tooltip } from '$lib/components/tooltip/tooltip.actions'

    export let docSection: DocSection

    const code = {
        basic: `
<i
    class="custom-target-icon pi pi-envelope p-text-secondary p-overlay-badge"
    style="font-size:2rem;cursor:pointer;"
    use:tooltip={{
        content: 'No notifications',
        options: {
            position: 'right',
            at: 'right+5 top',
            my: 'left center-2'
        }
    }}
>
    <Badge severity="danger"></Badge>
</i>
        `,
        javascript: `
${importJS(['Badge'])}

<div class="card flex justify-content-center">
    <i
        class="custom-target-icon pi pi-envelope p-text-secondary p-overlay-badge"
        style="font-size:2rem;cursor:pointer;"
        use:tooltip={{
            content: 'No notifications',
            options: {
                position: 'right',
                at: 'right+5 top',
                my: 'left center-2'
            }
        }}
    >
        <Badge severity="danger"></Badge>
    </i>
</div>
        `,
        typescript: `
${importTS(['Badge'])}

<div class="card flex justify-content-center">
    <i
        class="custom-target-icon pi pi-envelope p-text-secondary p-overlay-badge"
        style="font-size:2rem;cursor:pointer;"
        use:tooltip={{
            content: 'No notifications',
            options: {
                position: 'right',
                at: 'right+5 top',
                my: 'left center-2'
            }
        }}
    >
        <Badge severity="danger"></Badge>
    </i>
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Standalone <i>Tooltip</i> component can attach to any element using the <i>tooltip</i> svelte action. In this case, content
        and options need to be defined using action properties.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <i
        class="custom-target-icon pi pi-envelope p-text-secondary p-overlay-badge"
        style="font-size:2rem;cursor:pointer;"
        use:tooltip={{
            content: 'No notifications',
            options: {
                position: 'right',
                at: 'right+5 top',
                my: 'left center-2'
            }
        }}
    >
        <Badge severity="danger"></Badge>
    </i>
</div>
<DocSectionCode {code} />
