<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import { Toast } from '@jazzsvelte/toast'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { closeToast, showToast } from '@jazzsvelte/toast'

    export let docSection: DocSection

    let toastMessageId: string | null = null

    function showMessage() {
        toastMessageId = showToast({ severity: 'info', summary: 'Sticky', detail: 'Message Content', sticky: true })
    }

    function closeMessage() {
        closeToast(toastMessageId)
        toastMessageId = null
    }

    const code = {
        basic: `
<Toast ref={toast} />
<Button on:click={showSticky} label="Sticky" severity="success" />
<Button on:click={clear} label="Clear" />
        `,
        javascript: `
${importJS('Toast')}import { Button } from 'primereact/button';


    const toast = useRef(null);

        toast.current.show({ severity: 'info', summary: 'Sticky', detail: 'Message Content', sticky: true });
    };

        toast.current.clear();
    };
        <div class="card flex justify-content-center">
            <Toast ref={toast} />
            <div class="flex flex-wrap gap-2">
                <Button on:click={showSticky} label="Sticky" severity="success" />
                <Button on:click={clear} label="Clear" />
            </div>
        </div>

        `,
        typescript: `
${importTS('Toast')}import { Button } from 'primereact/button';


    const toast = useRef<Toast>(null);

        toast.current?.show({ severity: 'info', summary: 'Sticky', detail: 'Message Content', sticky: true });
    };

       toast.current?.clear();
    };
        <div class="card flex justify-content-center">
            <Toast ref={toast} />
            <div class="flex flex-wrap gap-2">
                <Button on:click={showSticky} label="Sticky" severity="success" />
                <Button on:click={clear} label="Clear" />
            </div>
        </div>

        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        A message disappears after 3000ms defined the <i>life</i> option, set <i>sticky</i> option to display messages that do not
        hide automatically.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <div class="flex flex-wrap gap-2">
        <Button on:click={showMessage} label="Sticky" />
        <Button on:click={closeMessage} label="Clear" severity="secondary" />
    </div>
</div>
<DocSectionCode {code} />
