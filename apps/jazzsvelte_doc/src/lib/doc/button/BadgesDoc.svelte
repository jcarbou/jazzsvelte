<script lang="ts">
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { ComponentDocProps } from '../common/doc.types'
    import { Badge } from '@jazzsvelte/badge'
    import { importJS, importTS } from '../common/doc.utils'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<Button type="button" label="Emails" badge="8" />
<Button type="button" label="Messages" {badgeSnippet} icon="pi pi-users" outlined/>

{#snippet badgeSnippet()}
    <Badge value="2" severity="danger" size="medium" />
{/snippet}
        `,
        javascript: `
${importJS('Button')}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button type="button" label="Emails" badge="8" />
    <Button type="button" label="Messages" {badgeSnippet} icon="pi pi-users" outlined/>
</div>

{#snippet badgeSnippet()}
    <Badge value="2" severity="danger" size="medium" />
{/snippet}
        `,
        typescript: `
${importTS('Button')}

<div class="card flex flex-wrap justify-content-center gap-3">
    <Button type="button" label="Emails" badge="8" />
    <Button type="button" label="Messages" {badgeSnippet} icon="pi pi-users" outlined/>
</div>

{#snippet badgeSnippet()}
    <Badge value="2" severity="danger" size="medium" />
{/snippet}
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
    <Button type="button" label="Messages" {badgeSnippet} icon="pi pi-users" outlined />
</div>
<DocSectionCode {code} />

{#snippet badgeSnippet()}
    <Badge value="2" severity="danger" size="medium" />
{/snippet}
