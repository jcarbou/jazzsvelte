<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import Button from '$lib/components/button/Button.svelte'
    // NOT_IMPLEMETED import Avatar from '$lib/components/avatar/Avatar.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import TemplateToastMessage from './TemplateToastMessage.svelte'
    import { closeToast, isToastMessageAlive, showToast } from '$lib/components/toast/toastr.store'

    export let docSection: DocSection

    let toastMessageId: string | null = null

    function showMessage() {
        if (!isToastMessageAlive(toastMessageId)) {
            toastMessageId = showToast({
                severity: 'success',
                summary: 'Can you send me the report?',
                sticky: true,
                content: TemplateToastMessage,
                reply: () => {
                    closeToast(toastMessageId)
                }
            })
        }
    }

    const code = {
        basic: `
toastBC.current.show({
    severity: 'success',
    summary: 'Can you send me the report?',
    sticky: true,
    content: (props) => (
        <div class="flex flex-column align-items-left" style="flex:1;">
            <div class="flex align-items-center gap-2">
                <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
                <span class="font-bold text-900">Amy Elsner</span>
            </div>
            <div class="font-medium text-lg my-3 text-900">{props.message.summary}</div>
            <Button class="p-button-sm flex" label="Reply" severity="success" on:click={clear}></Button>
        </div>

});`,
        javascript: `
${importJS('Toast')}import { Button } from 'primereact/button';
    import Avatar from '$lib/components/avatar/Avatar.svelte'


    
    const toastBC = useRef(null);

         toastBC.current.clear();
        setVisible(false);
    };

        if (!visible) {
            setVisible(true);
            toastBC.current.clear();
            toastBC.current.show({
                severity: 'success',
                summary: 'Can you send me the report?',
                sticky: true,
                content: (props) => (
                    <div class="flex flex-column align-items-left" style="flex:1;">
                        <div class="flex align-items-center gap-2">
                            <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
                            <span class="font-bold text-900">Amy Elsner</span>
                        </div>
                        <div class="font-medium text-lg my-3 text-900">{props.message.summary}</div>
                        <Button class="p-button-sm flex" label="Reply" severity="success" on:click={clear}></Button>
                    </div>

            });
        }
    };
        <div class="card flex justify-content-center">
            <Toast ref={toastBC} position="bottom-center" onRemove={clear} />
            <Button on:click={confirm} label="Confirm" />
        </div>

        `,
        typescript: `
${importTS('Toast')}import { Button } from 'primereact/button';
    import Avatar from '$lib/components/avatar/Avatar.svelte'


    
    const toastBC = useRef<Toast>(null);

        toastBC.current?.clear();
        setVisible(false);
    };

         if (!visible) {
            setVisible(true);
            toastBC.current?.clear();
            toastBC.current.show({
                severity: 'success',
                summary: 'Can you send me the report?',
                sticky: true,
                content: (props) => (
                    <div class="flex flex-column align-items-left" style="flex:1;">
                        <div class="flex align-items-center gap-2">
                            <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
                            <span class="font-bold text-900">Amy Elsner</span>
                        </div>
                        <div class="font-medium text-lg my-3 text-900">{props.message.summary}</div>
                        <Button class="p-button-sm flex" label="Reply" severity="success" on:click={clear}></Button>
                    </div>

            });
        }
    };
        <div class="card flex justify-content-center">
            <Toast ref={toastBC} position="bottom-center" onRemove={clear} />
            <Button on:click={confirm} label="Confirm" />
        </div>

        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Custom content inside a message is defined with the <i>content</i> option.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <Button on:click={showMessage} label="Confirm" />
</div>
<DocSectionCode {code} />
