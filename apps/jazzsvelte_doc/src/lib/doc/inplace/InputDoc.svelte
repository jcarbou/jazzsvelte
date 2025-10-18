<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Inplace } from '@jazzsvelte/inplace'
    import { InputText } from '@jazzsvelte/input_text'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()
    let text: string = $state('')

    const code = {
        basic: `
 <Inplace closable>
    <InplaceDisplay>{text || 'Click to Edit'}</InplaceDisplay>
    <InplaceContent>
        <InputText value={text} onChange={(e) => setText(e.target.value)} autoFocus />
    </InplaceContent>
</Inplace>
        `,
        javascript: `
${importJS('Inplace')}import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { InputText } from 'primereact/inputtext';

    
        <div class="card">
            <Inplace closable>
                <InplaceDisplay>{text || 'Click to Edit'}</InplaceDisplay>
                <InplaceContent>
                    <InputText value={text} onChange={(e) => setText(e.target.value)} autoFocus />
                </InplaceContent>
            </Inplace>
        </div>


        `,
        typescript: `
${importTS('Inplace')}import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { InputText } from 'primereact/inputtext';

    
        <div class="card">
            <Inplace closable>
                <InplaceDisplay>{text || 'Click to Edit'}</InplaceDisplay>
                <InplaceContent>
                    <InputText value={text} onChange={(e) => setText(e.target.value)} autoFocus />
                </InplaceContent>
            </Inplace>
        </div>


        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Inplace can be used within a form to display a value as read only before making it editable. The <i>closable</i> property adds
        a close button next to the content to switch back to read only mode.
    </p>
</DocSectionText>
<div class="card">
    <Inplace closable>
        {#snippet displaySnippet()}
            {text || 'Click to Edit'}
        {/snippet}
        {#snippet contentSnippet()}
            <InputText bind:value={text} autofocus />
        {/snippet}
    </Inplace>
</div>
<DocSectionCode {code} />
