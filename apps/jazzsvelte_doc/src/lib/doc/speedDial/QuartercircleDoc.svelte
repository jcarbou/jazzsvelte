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
<SpeedDial model={items} radius={120} type="quarter-circle" direction="up-left" style="right:0;bottom:0;" />
<SpeedDial model={items} radius={120} type="quarter-circle" direction="up-right" style="left:0;bottom:0;" />
<SpeedDial model={items} radius={120} type="quarter-circle" direction="down-left" style="right:0;top:0;" />
<SpeedDial model={items} radius={120} type="quarter-circle" direction="down-right" style="left:0;top:0;" />
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
<SpeedDial model={items} radius={120} type="quarter-circle" direction="up-left" style="right:0;bottom:0;" />
<SpeedDial model={items} radius={120} type="quarter-circle" direction="up-right" style="left:0;bottom:0;" />
<SpeedDial model={items} radius={120} type="quarter-circle" direction="down-left" style="right:0;top:0;" />
<SpeedDial model={items} radius={120} type="quarter-circle" direction="down-right" style="left:0;top:0;" />
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
<SpeedDial model={items} radius={120} type="quarter-circle" direction="up-left" style="right:0;bottom:0;" />
<SpeedDial model={items} radius={120} type="quarter-circle" direction="up-right" style="left:0;bottom:0;" />
<SpeedDial model={items} radius={120} type="quarter-circle" direction="down-left" style="right:0;top:0;" />
<SpeedDial model={items} radius={120} type="quarter-circle" direction="down-right" style="left:0;top:0;" />
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Setting <i>type</i> as <i>quarter-circle</i> displays the items at one of four corners of a button based on the
        <i>direction</i>.
    </p>
</DocSectionText>
<div class="card">
    <div style="position:relative;height:500px;">
        <SpeedDial model={items} radius={120} type="quarter-circle" direction="up-left" style="right:0;bottom:0;" />
        <SpeedDial model={items} radius={120} type="quarter-circle" direction="up-right" style="left:0;bottom:0;" />
        <SpeedDial model={items} radius={120} type="quarter-circle" direction="down-left" style="right:0;top:0;" />
        <SpeedDial model={items} radius={120} type="quarter-circle" direction="down-right" style="left:0;top:0;" />
    </div>
</div>
<DocSectionCode {code} />
