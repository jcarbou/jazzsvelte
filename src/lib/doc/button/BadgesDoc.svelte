<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Button from '$lib/components/button/Button.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import Badge from '$lib/components/badge/Badge.svelte'
    import { importJS, importTS } from '../common/doc.utils'

    export let docSection: DocSection

    const code = {
        basic: `
<Button type="button" label="Emails" badge="8" />
<Button type="button" label="Messages" icon="pi pi-users" outlined>
    <Badge slot="badge" value="2" severity="danger" size="normal" />
</Button>
        `,
        javascript: `
${importJS('Button')}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button type="button" label="Emails" badge="8" />
    <Button type="button" label="Messages" icon="pi pi-users" outlined>
        <Badge slot="badge" value="2" severity="danger" size="normal" />
    </Button>
</div>
        `,
        typescript: `
${importTS('Button')}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button type="button" label="Emails" badge="8" />
    <Button type="button" label="Messages" icon="pi pi-users" outlined>
        <Badge slot="badge" value="2" severity="danger" size="normal" />
    </Button>
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Buttons have built-in badge support with <i>badge</i> and <i>badgeClass</i> properties.
    </p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-3">
    <Button type="button" label="Emails" badge="8" />
    <Button type="button" label="Messages" icon="pi pi-users" outlined>
        <Badge slot="badge" value="2" severity="danger" size="normal" />
    </Button>
</div>
<DocSectionCode {code} />
