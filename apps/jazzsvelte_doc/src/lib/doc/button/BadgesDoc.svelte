<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { Badge } from '@jazzsvelte/badge'
    import { importJS, importTS } from '../common/doc.utils'

    export let docSection: DocSection

    const code = {
        basic: `
<Button type="button" label="Emails" badge="8" />
<Button type="button" label="Messages" icon="pi pi-users" outlined>
    <Badge slot="badge" value="2" severity="danger" size="medium" />
</Button>
        `,
        javascript: `
${importJS('Button')}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button type="button" label="Emails" badge="8" />
    <Button type="button" label="Messages" icon="pi pi-users" outlined>
        <Badge slot="badge" value="2" severity="danger" size="medium" />
    </Button>
</div>
        `,
        typescript: `
${importTS('Button')}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button type="button" label="Emails" badge="8" />
    <Button type="button" label="Messages" icon="pi pi-users" outlined>
        <Badge slot="badge" value="2" severity="danger" size="medium" />
    </Button>
</div>
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Buttons have built-in badge support with <i>badge property</i> and <i>badge slot</i>.
    </p>
</DocSectionText>
<div class="card flex flex-wrap justify-content-center gap-3">
    <Button type="button" label="Emails" badge="8" />
    <Button type="button" label="Messages" icon="pi pi-users" outlined>
        <Badge slot="badge" value="2" severity="danger" size="medium" />
    </Button>
</div>
<DocSectionCode {code} />
