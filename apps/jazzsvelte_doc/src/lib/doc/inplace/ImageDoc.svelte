<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Inplace } from '@jazzsvelte/inplace'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<Inplace>
    <InplaceDisplay>
        <span class="inline-flex align-items-center">
            <span class="pi pi-image"></span>
            <span class="ml-2">View Picture</span>
        </span>
    </InplaceDisplay>
    <InplaceContent>
        <img class="w-full" alt="Nature" src="/images/nature/nature1.jpg" />
    </InplaceContent>
</Inplace>
        `,
        javascript: `
${importJS('Inplace')}import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';

        <Inplace>
            <InplaceDisplay>
                <span class="inline-flex align-items-center">
                    <span class="pi pi-image"></span>
                    <span class="ml-2">View Picture</span>
                </span>
            </InplaceDisplay>
            <InplaceContent>
                <img class="w-full" alt="Nature" src="https://primefaces.org/cdn/primereact/images/nature/nature1.jpg" />
            </InplaceContent>
        </Inplace>


        `,
        typescript: `
${importTS('Inplace')}import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';

        <Inplace>
            <InplaceDisplay>
                <span class="inline-flex align-items-center">
                    <span class="pi pi-image"></span>
                    <span class="ml-2">View Picture</span>
                </span>
            </InplaceDisplay>
            <InplaceContent>
                <img class="w-full" alt="Nature" src="https://primefaces.org/cdn/primereact/images/nature/nature1.jpg" />
            </InplaceContent>
        </Inplace>


        `
    }
</script>

<DocSectionText {docSection}>
    <p>Any content such as an image can be placed inside an Inplace.</p>
</DocSectionText>
<div class="card">
    <Inplace>
        {#snippet displaySnippet()}
            <span class="inline-flex align-items-center">
                <span class="pi pi-image"></span>
                <span class="ml-2">View Picture</span>
            </span>
        {/snippet}
        {#snippet contentSnippet()}
            <img class="w-full" alt="Nature" src="https://primefaces.org/cdn/primereact/images/nature/nature1.jpg" />
        {/snippet}
    </Inplace>
</div>
<DocSectionCode {code} />
