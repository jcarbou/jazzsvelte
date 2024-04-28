<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Button from '$lib/components/button/Button.svelte'
    import Toast from '$lib/components/toast/Toast.svelte'
    import type { DocSection } from '$lib/doc/common/doc.types'
    import { showToast } from '$lib/components/toast/toastr.store'
    import type { ToastSeverity } from '$lib/components/toast/toast.types'

    export let docSection: DocSection

    function showMessage(summary: string, toastId: string, severity: ToastSeverity) {
        showToast({ toastId, severity, summary, detail: summary, life: 3000 })
    }

    const code = {
        basic: `
<Toast ref={toastTL} position="top-left" />
<Toast ref={toastBL} position="bottom-left" />
<Toast ref={toastBR} position="bottom-right" />
<Button label="Top Left" class="mr-2" on:click={showTopLeft} />
<Button label="Bottom Left" class="p-button-warning" on:click={showBottomLeft} />
<Button label="Bottom Right" class="p-button-success" on:click={showBottomRight} />
        `,
        javascript: `
${importJS('Toast')}import { Button } from 'primereact/button';


    const toastTopCenter = useRef(null);
    const toastTopLeft = useRef(null);
    const toastTopRight = useRef(null);
    const toastCenter = useRef(null);
    const toastBottomLeft = useRef(null);
    const toastBottomCenter = useRef(null);
    const toastBottomRight = useRef(null);

    
        const label = event.target.innerText;

        ref.current.show({ severity: severity, summary: label, detail: label, life: 3000 });
    };
        <div class="card flex justify-content-center">
            <Toast ref={toastTopLeft} position="top-left" />
            <Toast ref={toastTopCenter} position="top-center" />
            <Toast ref={toastTopRight} position="top-right" />
            <Toast ref={toastCenter} position="center" />
            <Toast ref={toastBottomLeft} position="bottom-left" />
            <Toast ref={toastBottomCenter} position="bottom-center" />
            <Toast ref={toastBottomRight} position="bottom-right" />
            <div class="flex flex-wrap gap-2">
                <Button label="Top Left" class="p-button-success" on:click={(e) => showMessage(e, toastTopLeft, 'success')} />
                <Button label="Top Center" on:click={(e) => showMessage(e, toastTopCenter, 'info')} />
                <Button label="Top Right" class="p-button-warning" on:click={(e) => showMessage(e, toastTopRight, 'warn')} />
                <Button label="Center" class="p-button-danger" on:click={(e) => showMessage(e, toastCenter, 'error')} />
                <Button label="Bottom Left" class="p-button-success" on:click={(e) => showMessage(e, toastBottomLeft, 'success')} />
                <Button label="Bottom Center" on:click={(e) => showMessage(e, toastBottomCenter, 'info')} />
                <Button label="Bottom Right" class="p-button-warning" on:click={(e) => showMessage(e, toastBottomRight, 'warn')} />
            </div>
        </div>

        `,
        typescript: `
${importTS('Toast')}import { Button } from 'primereact/button';
import { Toast, ToastMessage } from 'primereact/toast';

    const toastTopCenter = useRef<Toast>(null);
    const toastTopLeft = useRef<Toast>(null);
    const toastTopRight = useRef<Toast>(null);
    const toastCenter = useRef<Toast>(null);
    const toastBottomLeft = useRef<Toast>(null);
    const toastBottomCenter = useRef<Toast>(null);
    const toastBottomRight = useRef<Toast>(null);

   
        const target = event.target as HTMLButtonElement;
        const label = target.innerText;

        ref.current?.show({ severity: severity, summary: label, detail: label, life: 3000 });
    };
        <div class="card flex justify-content-center">
            <Toast ref={toastTopLeft} position="top-left" />
            <Toast ref={toastTopCenter} position="top-center" />
            <Toast ref={toastTopRight} position="top-right" />
            <Toast ref={toastCenter} position="center" />
            <Toast ref={toastBottomLeft} position="bottom-left" />
            <Toast ref={toastBottomCenter} position="bottom-center" />
            <Toast ref={toastBottomRight} position="bottom-right" />
            <div class="flex flex-wrap gap-2">
                <Button label="Top Left" class="p-button-success" on:click={(e) => showMessage(e, toastTopLeft, 'success')} />
                <Button label="Top Center" on:click={(e) => showMessage(e, toastTopCenter, 'info')} />
                <Button label="Top Right" class="p-button-warning" on:click={(e) => showMessage(e, toastTopRight, 'warn')} />
                <Button label="Center" class="p-button-danger" on:click={(e) => showMessage(e, toastCenter, 'error')} />
                <Button label="Bottom Left" class="p-button-success" on:click={(e) => showMessage(e, toastBottomLeft, 'success')} />
                <Button label="Bottom Center" on:click={(e) => showMessage(e, toastBottomCenter, 'info')} />
                <Button label="Bottom Right" class="p-button-warning" on:click={(e) => showMessage(e, toastBottomRight, 'warn')} />
            </div>
        </div>

        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Location of the messages is customized with the <i>position</i> property.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <div class="flex flex-wrap gap-2">
        <Button label="Top Left" class="p-button-success" on:click={() => showMessage('Top Left', 'topLeft', 'success')} />
        <Button label="Top Center" on:click={() => showMessage('Top Center', 'topCenter', 'info')} />
        <Button label="Top Right" class="p-button-warning" on:click={() => showMessage('Top Right', 'topRight', 'warn')} />
        <Button label="Center" class="p-button-danger" on:click={() => showMessage('Center', 'center', 'error')} />
        <Button
            label="Bottom Left"
            class="p-button-success"
            on:click={() => showMessage('Bottom Left', 'bottomLeft', 'success')}
        />
        <Button label="Bottom Center" on:click={() => showMessage('Bottom Center', 'bottomCenter', 'info')} />
        <Button
            label="Bottom Right"
            class="p-button-warning"
            on:click={() => showMessage('Bottom Right', 'bottomRight', 'warn')}
        />
    </div>
</div>
<DocSectionCode {code} />
