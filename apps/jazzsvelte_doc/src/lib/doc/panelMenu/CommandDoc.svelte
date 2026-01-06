<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { PanelMenu } from '@jazzsvelte/panel_menu'
    import { showToast } from '@jazzsvelte/toast'

    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const items = [
        {
            label: 'Files',
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
                    label: 'Search',
                    icon: 'pi pi-search',
                    command: () => {
                        showToast({
                            severity: 'warn',
                            summary: 'Search Results',
                            detail: 'No results found',
                            life: 3000
                        })
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
        },
        {
            label: 'Sign Out',
            icon: 'pi pi-sign-out',
            command: () => {
                showToast({ severity: 'info', summary: 'Signed out', detail: 'User logged out', life: 3000 })
            }
        }
    ]
    const code = {
        basic: `
<PanelMenu model={items} class="w-full md:w-20rem" />   
<Toast ref={toast} />
`,
        javascript: `
${importJS('PanelMenu')}import { PanelMenu } from 'primereact/panelmenu';
import { Toast } from 'primereact/toast';

    const toast = useRef(null);

    const items = [
        {
            label: 'Files',
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
                    label: 'Search',
                    icon: 'pi pi-search',
                    command: () => {
                        showToast({ severity: 'warn', summary: 'Search Results', detail: 'No results found', life: 3000 });
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
        },
        {
            label: 'Sign Out',
            icon: 'pi pi-sign-out',
            command: () => {
                showToast({ severity: 'info', summary: 'Signed out', detail: 'User logged out', life: 3000 });
            }
        }
    ];
        <div class="card flex justify-content-center">
            <PanelMenu model={items} class="w-full md:w-20rem" />
            <Toast ref={toast} />
        </div>

        `,
        typescript: `
${importTS('PanelMenu')}import { PanelMenu } from 'primereact/panelmenu';
import { MenuItem } from 'primereact/menuitem';
import { Toast } from 'primereact/toast';

    const toast = useRef<Toast>(null);

    const items: MenuItem[] = [
        {
            label: 'Files',
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
                    label: 'Search',
                    icon: 'pi pi-search',
                    command: () => {
                        showToast({ severity: 'warn', summary: 'Search Results', detail: 'No results found', life: 3000 });
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
        },
        {
            label: 'Sign Out',
            icon: 'pi pi-sign-out',
            command: () => {
                showToast({ severity: 'info', summary: 'Signed out', detail: 'User logged out', life: 3000 });
            }
        }
    ];
        <div class="card flex justify-content-center">
            <PanelMenu model={items} class="w-full md:w-20rem" />
            <Toast ref={toast} />
        </div>

        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        The <i>command</i> property defines the callback to run when an item is activated by click or a key event.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <PanelMenu model={items} class="w-full md:w-20rem" />
</div>
<DocSectionCode {code} />
