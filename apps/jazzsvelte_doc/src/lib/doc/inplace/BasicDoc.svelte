<script lang="ts">
    import { importJS, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Inplace } from '@jazzsvelte/inplace'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const code = {
        basic: `
<Inplace>
    <InplaceDisplay>View Content</InplaceDisplay>
    <InplaceContent>
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </InplaceContent>
</Inplace>
        `,
        javascript: `
${importJS('Inplace')}import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';

        <Inplace>
            <InplaceDisplay>View Content</InplaceDisplay>
            <InplaceContent>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </InplaceContent>
        </Inplace>


        `,
        typescript: `
${importTS('Inplace')}import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';

        <Inplace>
            <InplaceDisplay>View Content</InplaceDisplay>
            <InplaceContent>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </InplaceContent>
        </Inplace>


        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        <i>Inplace</i> component requires <i>InplaceDisplay</i> for display mode and <i>InplaceContent</i> to reveal as the actual
        content.
    </p>
</DocSectionText>
<div class="card">
    <Inplace>
        {#snippet displaySnippet()}
            View Content
        {/snippet}
        {#snippet contentSnippet()}
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        {/snippet}
    </Inplace>
</div>
<DocSectionCode {code} />
