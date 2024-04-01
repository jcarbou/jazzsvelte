<script lang="ts">
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Button from '$lib/components/button/Button.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const code = {
        basic: `
<Button type="button" label="Emails" badge="8" />
<Button type="button" label="Messages" icon="pi pi-users" outlined badge="2" badgeClass="p-badge-danger" />
        `,
        javascript: `
import React from 'react'; 
import { Button } from 'primereact/button';


        <div class="card flex flex-wrap justify-content-center gap-3">
            <Button type="button" label="Emails" badge="8" />
            <Button type="button" label="Messages" icon="pi pi-users" outlined badge="2" badgeClass="p-badge-danger" />
        </div>
    )

        `,
        typescript: `
import React from 'react'; 
import { Button } from 'primereact/button';


        <div class="card flex flex-wrap justify-content-center gap-3">
            <Button type="button" label="Emails" badge="8" />
            <Button type="button" label="Messages" icon="pi pi-users" outlined badge="2" badgeClass="p-badge-danger" />
        </div>
    )

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
    <Button type="button" label="Messages" icon="pi pi-users" outlined badge="2" badgeClass="p-badge-danger" />
</div>
<DocSectionCode {code} />
