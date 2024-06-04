<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { SpeedDial } from '@jazzsvelte/speed_dial'
    import { showToast } from '@jazzsvelte/toast'

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
<SpeedDial model={items} direction="up" transitionDelay={80} showIcon="pi pi-bars" hideIcon="pi pi-times" buttonClass="p-button-outlined" />
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
        <SpeedDial model={items} direction="up" transitionDelay={80} showIcon="pi pi-bars" hideIcon="pi pi-times" buttonClass="p-button-outlined" />
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
<SpeedDial model={items} direction="up" transitionDelay={80} showIcon="pi pi-bars" hideIcon="pi pi-times" buttonClass="p-button-outlined" />
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        SpeedDial sample with an outlined button, custom icons and <i>transitionDelay</i>.
    </p>
</DocSectionText>
<div class="card">
    <div class="flex align-items-end justify-content-center" style="height:350px;">
        <SpeedDial
            model={items}
            direction="up"
            transitionDelay={80}
            showIcon="pi pi-bars"
            hideIcon="pi pi-times"
            rotateAnimation={false}
            buttonClass="p-button-outlined"
        />
    </div>
</div>
<DocSectionCode {code} />
