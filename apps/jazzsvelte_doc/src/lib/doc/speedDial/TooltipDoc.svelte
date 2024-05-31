<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { SpeedDial } from '@jazzsvelte/speed_dial'
    import { showToast } from '@jazzsvelte/toast'
    import { Tooltip } from '@jazzsvelte/tooltip'
    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const items = [
        {
            label: 'Add',
            icon: 'pi pi-pencil',
            command: () => {
                showToast({ severity: 'info', summary: 'Add', detail: 'Data Added' })
            }
        },
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
                showToast({ severity: 'success', summary: 'Update', detail: 'Data Updated' })
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
                showToast({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' })
            }
        },
        {
            label: 'Upload',
            icon: 'pi pi-upload',
            command: () => {
                showToast({ severity: 'info', summary: 'Add', detail: 'File Uploaded' })
            }
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link',
            command: () => {
                window.location.href = 'https://react.dev/'
            }
        }
    ]

    const code = {
        basic: `
<Toast ref={toast} />
<Tooltip target=".speeddial-bottom-right .p-speeddial-action" position="left" />
<SpeedDial model={items} direction="up" class="speeddial-bottom-right right-0 bottom-0" buttonClass="p-button-danger" />

<Tooltip target=".speeddial-bottom-left .p-speeddial-action" />
<SpeedDial model={items} direction="up" class="speeddial-bottom-left left-0 bottom-0" buttonClass="p-button-help" />
        `,
        javascript: `
        ${importJS(
            'SpeedDial',
            `import { showToast } from '@jazzsvelte/toast'`,
            `const items = [
        {
            label: 'Add',
            icon: 'pi pi-pencil',
            command: () => {
                showToast({ severity: 'info', summary: 'Add', detail: 'Data Added' })
            }
        },
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
                showToast({ severity: 'success', summary: 'Update', detail: 'Data Updated' })
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
                showToast({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' })
            }
        },
        {
            label: 'Upload',
            icon: 'pi pi-upload',
            command: () => {
                showToast({ severity: 'info', summary: 'Add', detail: 'File Uploaded' })
            }
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link',
            command: () => {
                window.location.href = 'https://react.dev/'
            }
        }
    ])`
        )}
<SpeedDial model={items} radius={80} type="circle" buttonClass="p-button-warning" />
`,
        typescript: `
${importTS(
    'SpeedDial',
    `import { showToast } from '@jazzsvelte/toast'`,
    `const items = [
        {
            label: 'Add',
            icon: 'pi pi-pencil',
            command: () => {
                showToast({ severity: 'info', summary: 'Add', detail: 'Data Added' })
            }
        },
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
                showToast({ severity: 'success', summary: 'Update', detail: 'Data Updated' })
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
                showToast({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' })
            }
        },
        {
            label: 'Upload',
            icon: 'pi pi-upload',
            command: () => {
                showToast({ severity: 'info', summary: 'Add', detail: 'File Uploaded' })
            }
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link',
            command: () => {
                window.location.href = 'https://react.dev/'
            }
        }
    ])`
)}
<SpeedDial model={items} radius={80} type="circle" buttonClass="p-button-warning" />
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Items display a tooltip on hober when a standalone <a href="/tooltip">Tooltip</a> is present with a target that matches the
        items.
    </p>
</DocSectionText>
<div class="card">
    <div style="position:relative;height:350px;">
        <Tooltip target=".speeddial-bottom-right .p-speeddial-action" position="left" />
        <SpeedDial model={items} direction="up" class="speeddial-bottom-right right-0 bottom-0" buttonClass="p-button-danger" />
        <Tooltip target=".speeddial-bottom-left .p-speeddial-action" />
        <SpeedDial model={items} direction="up" class="speeddial-bottom-left left-0 bottom-0" buttonClass="p-button-help" />
    </div>
</div>
<DocSectionCode {code} />
