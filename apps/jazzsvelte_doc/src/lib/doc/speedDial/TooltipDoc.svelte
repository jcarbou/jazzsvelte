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
            description: 'Add new item',
            icon: 'pi pi-pencil',
            command: () => {
                showToast({ severity: 'info', summary: 'Add', detail: 'Data Added' })
            }
        },
        {
            label: 'Update',
            description: 'Update current item',
            icon: 'pi pi-refresh',
            command: () => {
                showToast({ severity: 'success', summary: 'Update', detail: 'Data Updated' })
            }
        },
        {
            label: 'Delete',
            description: 'Delete current item',
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
<SpeedDial
    model={items}
    direction="up"
    class="speeddial-bottom-right right-0 bottom-0"
    buttonClass="p-button-danger"
    getTooltip="label"
    tooltipOptions={{
        position: 'left'
    }}
/>
<SpeedDial
    model={items}
    direction="up"
    class="speeddial-bottom-left left-0 bottom-0"
    buttonClass="p-button-help"
    getTooltip={({ label, description }) => description || label}
/>
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
<SpeedDial
    model={items}
    direction="up"
    class="speeddial-bottom-right right-0 bottom-0"
    buttonClass="p-button-danger"
    getTooltip="label"
    tooltipOptions={{
        position: 'left'
    }}
/>
<SpeedDial
    model={items}
    direction="up"
    class="speeddial-bottom-left left-0 bottom-0"
    buttonClass="p-button-help"
    getTooltip={({ label, description }) => description || label}
/>
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
<SpeedDial
    model={items}
    direction="up"
    class="speeddial-bottom-right right-0 bottom-0"
    buttonClass="p-button-danger"
    getTooltip="label"
    tooltipOptions={{
        position: 'left'
    }}
/>
<SpeedDial
    model={items}
    direction="up"
    class="speeddial-bottom-left left-0 bottom-0"
    buttonClass="p-button-help"
    getTooltip={({ label, description }) => description || label}
/>
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
        <SpeedDial
            model={items}
            direction="up"
            class="speeddial-bottom-right right-0 bottom-0"
            buttonClass="p-button-danger"
            getTooltip="label"
            tooltipOptions={{
                position: 'left'
            }}
        />
        <SpeedDial
            model={items}
            direction="up"
            class="speeddial-bottom-left left-0 bottom-0"
            buttonClass="p-button-help"
            getTooltip={({ label, description }) => description || label}
        />
    </div>
</div>
<DocSectionCode {code} />
