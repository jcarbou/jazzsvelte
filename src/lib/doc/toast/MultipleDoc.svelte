<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Button from '$lib/components/button/Button.svelte'
    import type { DocSection } from '$lib/doc/common/doc.types'
    import { showToastList } from '$lib/components/toast/toastr.store'

    export let docSection: DocSection

    function showMultiple() {
        showToastList([
            { severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000 },
            { severity: 'info', summary: 'Info', detail: 'Message Content', life: 3050 },
            { severity: 'warn', summary: 'Warning', detail: 'Message Content', life: 3100 },
            { severity: 'error', summary: 'Error', detail: 'Message Content', life: 3150 }
        ])
    }

    const code = {
        basic: `
<Toast ref={toast} />
<Button on:click={showMultiple} label="Multiple" class="p-button-warning" />
        `,
        javascript: `
${importJS('Toast')}
import { Button } from 'primereact/button';

    const toast = useRef(null);

        toast.current.show([
            { severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000 },
            { severity: 'info', summary: 'Info', detail: 'Message Content', life: 3050 },
            { severity: 'warn', summary: 'Warning', detail: 'Message Content', life: 3100 },
            { severity: 'error', summary: 'Error', detail: 'Message Content', life: 3150 }
        ]);
    };
        <div class="card flex justify-content-center gap-2">
            <Toast ref={toast} />
            <Button on:click={showMultiple} label="Multiple" severity='warning' />
        </div>

        `,
        typescript: `
${importTS('Toast')}
import { Button } from 'primereact/button';

    const toast = useRef<Toast>(null);

        toast.current?.show([
            { severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000 },
            { severity: 'info', summary: 'Info', detail: 'Message Content', life: 3050 },
            { severity: 'warn', summary: 'Warning', detail: 'Message Content', life: 3100 },
            { severity: 'error', summary: 'Error', detail: 'Message Content', life: 3150 }
        ]);
    };
        <div class="card flex justify-content-center gap-2">
            <Toast ref={toast} />
            <Button on:click={showMultiple} label="Multiple" severity='warning' />
        </div>

        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Multiple messages are displayed by passing an array to the <i>show</i> method.
    </p>
</DocSectionText>
<div class="card flex justify-content-center gap-2">
    <Button on:click={showMultiple} label="Multiple" severity="warning" />
</div>
<DocSectionCode {code} />
