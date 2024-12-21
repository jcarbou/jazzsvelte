<script lang="ts">
    import { importJS, importTS, simpleCode } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = simpleCode(
        ['Button'],
        `
{#snippet customContent()}
    <img
        alt="logo"
        src="https://primefaces.org/cdn/primereact/images/logo.png"
        data-pr-tooltip="PrimeReact-Logo"
        height="80px"
    />
{/snippet}
<Button class="custom-tooltip-btn" type="button" label="Save" icon="pi pi-check" tooltip={customContent} />
`
    )
</script>

<DocSectionText {docSection}>
    <p>
        Custom content can be placed as the tooltip value either with <i>content</i> property or nesting the content as children.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    {#snippet customContent()}
        <img
            alt="logo"
            src="https://primefaces.org/cdn/primereact/images/logo.png"
            data-pr-tooltip="PrimeReact-Logo"
            height="80px"
        />
    {/snippet}
    <Button class="custom-tooltip-btn" type="button" label="Save" icon="pi pi-check" tooltip={customContent} />
</div>
<DocSectionCode {code} />
