<script lang="ts">
    import { importJS, importTS, importType } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { TieredMenu } from '@jazzsvelte/tiered_menu'
    import { showToast } from '@jazzsvelte/toast'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection

    const items = [
        {
            label: 'File',
            icon: 'pi pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-plus',
                    command: () => {
                        showToast({ severity: 'success', summary: 'Success', detail: 'File created', life: 3000 })
                    }
                },
                {
                    label: 'Print',
                    icon: 'pi pi-print',
                    command: () => {
                        showToast({ severity: 'error', summary: 'Error', detail: 'No printer connected', life: 3000 })
                    }
                }
            ]
        },
        {
            label: 'Search',
            icon: 'pi pi-search',
            command: () => {
                showToast({ severity: 'warn', summary: 'Search Results', detail: 'No results found', life: 3000 })
            }
        },
        {
            separator: true
        },
        {
            label: 'Sync',
            icon: 'pi pi-cloud',
            items: [
                {
                    label: 'Import',
                    icon: 'pi pi-cloud-download',
                    command: () => {
                        showToast({
                            severity: 'info',
                            summary: 'Downloads',
                            detail: 'Downloaded from cloud',
                            life: 3000
                        })
                    }
                },
                {
                    label: 'Export',
                    icon: 'pi pi-cloud-upload',
                    command: () => {
                        showToast({ severity: 'info', summary: 'Shared', detail: 'Exported to cloud', life: 3000 })
                    }
                }
            ]
        }
    ]

    const code = {
        basic: `
<TieredMenu model={items} breakpoint="767px" />
        `,
        javascript: `
${importJS(
    'TieredMenu',
    importType('showToast', 'toast'),
    `

    const items = [
        {
            label: 'File',
            icon: 'pi pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-plus',
                    command: () => {
                        showToast({ severity: 'success', summary: 'Success', detail: 'File created', life: 3000 });
                    }
                },
                {
                    label: 'Print',
                    icon: 'pi pi-print',
                    command: () => {
                        showToast({ severity: 'error', summary: 'Error', detail: 'No printer connected', life: 3000 });
                    }
                }
            ]
        },
        {
            label: 'Search',
            icon: 'pi pi-search',
            command: () => {
                showToast({ severity: 'warn', summary: 'Search Results', detail: 'No results found', life: 3000 });
            }
        },
        {
            separator: true
        },
        {
            label: 'Sync',
            icon: 'pi pi-cloud',
            items: [
                {
                    label: 'Import',
                    icon: 'pi pi-cloud-download',
                    command: () => {
                        showToast({ severity: 'info', summary: 'Downloads', detail: 'Downloaded from cloud', life: 3000 });
                    }
                },
                {
                    label: 'Export',
                    icon: 'pi pi-cloud-upload',
                    command: () => {
                        showToast({ severity: 'info', summary: 'Shared', detail: 'Exported to cloud', life: 3000 });
                    }
                }
            ]
        }
    ]`
)}

<TieredMenu model={items} breakpoint="767px" />
        `,
        typescript: `
${importTS(
    'TieredMenu',
    importType('MenuItem', 'api'),
    importType('showToast', 'toast'),
    `

    const items = [
        {
            label: 'File',
            icon: 'pi pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-plus',
                    command: () => {
                        showToast({ severity: 'success', summary: 'Success', detail: 'File created', life: 3000 });
                    }
                },
                {
                    label: 'Print',
                    icon: 'pi pi-print',
                    command: () => {
                        showToast({ severity: 'error', summary: 'Error', detail: 'No printer connected', life: 3000 });
                    }
                }
            ]
        },
        {
            label: 'Search',
            icon: 'pi pi-search',
            command: () => {
                showToast({ severity: 'warn', summary: 'Search Results', detail: 'No results found', life: 3000 });
            }
        },
        {
            separator: true
        },
        {
            label: 'Sync',
            icon: 'pi pi-cloud',
            items: [
                {
                    label: 'Import',
                    icon: 'pi pi-cloud-download',
                    command: () => {
                        showToast({ severity: 'info', summary: 'Downloads', detail: 'Downloaded from cloud', life: 3000 });
                    }
                },
                {
                    label: 'Export',
                    icon: 'pi pi-cloud-upload',
                    command: () => {
                        showToast({ severity: 'info', summary: 'Shared', detail: 'Exported to cloud', life: 3000 });
                    }
                }
            ]
        }
    ]`
)}

<TieredMenu model={items} breakpoint="767px" />
        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        The <i>command</i> property defines the callback to run when an item is activated by click or a key event.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <TieredMenu model={items} breakpoint="767px" />
</div>
<DocSectionCode {code} />
