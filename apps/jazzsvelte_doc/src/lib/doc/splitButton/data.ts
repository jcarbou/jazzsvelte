import { goto } from '$app/navigation'
import { showToast } from '@jazzsvelte/toast'

export const items = [
    {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
            showToast({ severity: 'success', summary: 'Updated', detail: 'Data Updated' })
        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
            showToast({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' })
        }
    },
    {
        label: 'React Website',
        icon: 'pi pi-external-link',
        command: () => {
            window.location.href = 'https://reactjs.org/'
        }
    },
    {
        label: 'Instalation',
        icon: 'pi pi-upload',
        command: () => {
            goto('/installation')
        }
    }
]

export const save = () => {
    showToast({ severity: 'success', summary: 'Success', detail: 'Data Saved' })
}

export const importCode = `import { goto } from '$app/navigation'
   import { showToast } from '@jazzsvelte/toast'`

export const dataJsCode: string = `
   export const items = [
    {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
            showToast({ severity: 'success', summary: 'Updated', detail: 'Data Updated' })
        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
            showToast({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' })
        }
    },
    {
        label: 'React Website',
        icon: 'pi pi-external-link',
        command: () => {
            window.location.href = 'https://reactjs.org/'
        }
    },
    {
        label: 'Instalation',
        icon: 'pi pi-upload',
        command: () => {
            goto('installation')
        }
    }
]

export const save = () => {
    showToast({ severity: 'success', summary: 'Success', detail: 'Data Saved' })
}
`
export const dataTsCode: string = `
export const items : MenuItem[] = [
    {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
            showToast({ severity: 'success', summary: 'Updated', detail: 'Data Updated' })
        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
            showToast({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' })
        }
    },
    {
        label: 'React Website',
        icon: 'pi pi-external-link',
        command: () => {
            window.location.href = 'https://reactjs.org/'
        }
    },
    {
        label: 'Instalation',
        icon: 'pi pi-upload',
        command: () => {
            goto('installation')
        }
    }
]

export const save = () => {
    showToast({ severity: 'success', summary: 'Success', detail: 'Data Saved' })
}
`
