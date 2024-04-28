<script lang="ts">
    import { importJS, importTS } from '../../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Button from '$lib/components/button/Button.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { showToast } from '$lib/components/toast/toastr.store'

    export let docSection: DocSection

    function showMessage() {
        showToast({
            severity: 'info',
            summary: 'Info',
            detail: 'Message Content',
            pt: {
                root: { class: `bg-yellow-100` }
            }
        })
    }

    const code = {
        basic: `
<Toast 
    ref={toast} 
    pt={{ 
        message: ({ index }) => ({ class: \`bg-yellow-\${((index > 5 && 5) || index || 1) * 100}\` }) 
        }} 
    />
<Button on:click={show} label="Show" />
        `,
        javascript: `
${importJS('Toast')}import { Button } from 'primereact/button';


    const toast = useRef(null);

         toast.current.show({ severity: 'info', summary: 'Info', detail: 'Message Content' });
    };
        <div class="card flex justify-content-center">
            <Toast 
            ref={toast} 
            pt={{ 
                message: ({ index }) => ({ class: \`bg-yellow-\${((index > 5 && 5) || index || 1) * 100}\` }) 
                }} 
            />
            <Button on:click={show} label="Show" />
        </div>

        `,
        typescript: `
${importTS('Toast')}import { Button } from 'primereact/button';


    const toast = useRef(null);

        toast.current.show({ severity: 'info', summary: 'Info', detail: 'Message Content' });
    };
        <div class="card flex justify-content-center">
            <Toast 
            ref={toast} 
            pt={{ 
                message: ({ index }) => ({ class: \`bg-yellow-\${((index > 5 && 5) || index || 1) * 100}\` }) 
                }} 
            />
            <Button on:click={show} label="Show" />
        </div>

        `
    }
</script>

<DocSectionText {docSection} />
<div class="card flex justify-content-center">
    <Button on:click={showMessage} label="Show" />
</div>
<DocSectionCode {code} />
