import { showToast } from '@jazzsvelte/toast'

export const SPEED_DIAL_ITEMS = [
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

export const CODE_SPEED_DIAL_ITEMS = `
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
            icon: 'pi pi-refresh',
            description: 'Update current item',
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
`
