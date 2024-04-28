<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Button from '$lib/components/button/Button.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { showToast } from '$lib/components/toast/toastr.store'
    import type { ToastSeverity } from '$lib/components/toast/toast.types'

    export let docSection: DocSection

    function showMessage(severity: ToastSeverity) {
        showToast({ severity, summary: severity[0].toUpperCase() + severity.substring(1), detail: 'Message Content', life: 3000 })
    }

    const code = {
        basic: `
<Toast ref={toast} />
<Button label="Success" class="p-button-success" on:click={showSuccess} />
<Button label="Info" class="p-button-info" on:click={showInfo} />
<Button label="Warn" class="p-button-warning" on:click={showWarn} />
<Button label="Error" class="p-button-danger" on:click={showError} />
        `,
        javascript: `
${importJS('Toast')}import { Button } from 'primereact/button';


    const toast = useRef(null);

        toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
    }

        toast.current.show({severity:'info', summary: 'Info', detail:'Message Content', life: 3000});
    }

        toast.current.show({severity:'warn', summary: 'Warning', detail:'Message Content', life: 3000});
    }

        toast.current.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
    }
        <div class="card flex justify-content-center">
            <Toast ref={toast} />
            <div class="flex flex-wrap gap-2">
                <Button label="Success" class="p-button-success" on:click={showSuccess} />
                <Button label="Info" class="p-button-info" on:click={showInfo} />
                <Button label="Warn" class="p-button-warning" on:click={showWarn} />
                <Button label="Error" class="p-button-danger" on:click={showError} />
            </div>
        </div>

        `,
        typescript: `
${importTS('Toast')}import { Button } from 'primereact/button';


    const toast = useRef<Toast>(null);

        toast.current?.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
    }

        toast.current?.show({severity:'info', summary: 'Info', detail:'Message Content', life: 3000});
    }

        toast.current?.show({severity:'warn', summary: 'Warning', detail:'Message Content', life: 3000});
    }

        toast.current?.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
    }
        <div class="card flex justify-content-center">
            <Toast ref={toast} />
            <div class="flex flex-wrap gap-2">
                <Button label="Success" class="p-button-success" on:click={showSuccess} />
                <Button label="Info" class="p-button-info" on:click={showInfo} />
                <Button label="Warn" class="p-button-warning" on:click={showWarn} />
                <Button label="Error" class="p-button-danger" on:click={showError} />
            </div>
        </div>

        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        The <i>severity</i> option specifies the type of the message.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <div class="flex flex-wrap gap-2">
        <Button label="Success" class="p-button-success" on:click={() => showMessage('success')} />
        <Button label="Info" class="p-button-info" on:click={() => showMessage('info')} />
        <Button label="Warn" class="p-button-warning" on:click={() => showMessage('warn')} />
        <Button label="Error" class="p-button-danger" on:click={() => showMessage('error')} />
    </div>
</div>
<DocSectionCode {code} />
