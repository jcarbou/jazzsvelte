<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Chip } from '@jazzsvelte/chip'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<Chip template={content} />
        `,
        javascript: `
${importJS('Chip')}

    const content = (

            <span class="bg-primary border-circle w-2rem h-2rem flex align-items-center justify-content-center">P</span>
            <span class="ml-2 font-medium">PRIME</span>


        <div class="card">
            <Chip class="pl-0 pr-3" template={content} />
        </div>


        `,
        typescript: `
${importTS('Chip')}

    const content = (

            <span class="bg-primary border-circle w-2rem h-2rem flex align-items-center justify-content-center">P</span>
            <span class="ml-2 font-medium">PRIME</span>


        <div class="card">
            <Chip class="pl-0 pr-3" template={content} />
        </div>


        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        The <i>template</i> property allows displaying custom content inside a chip.
    </p>
</DocSectionText>
<div class="card">
    <Chip class="pl-0 pr-3">
        {#snippet contentSnippet()}
            <span class="bg-primary border-circle w-2rem h-2rem flex align-items-center justify-content-center">P</span>
            <span class="ml-2 font-medium">PRIME</span>
        {/snippet}
    </Chip>
</div>
<DocSectionCode {code} />
