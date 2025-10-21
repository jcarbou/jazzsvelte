<script lang="ts">
    import { importJS, importObject, importTS } from '$lib/doc/common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { TabMenu } from '@jazzsvelte/tab_menu'
    import { showToast } from '@jazzsvelte/toast'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const items = [
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            command: () => {
                showToast({ severity: 'success', summary: 'Selected', detail: 'Dashboard', life: 3000 })
            }
        },
        {
            label: 'Transactions',
            icon: 'pi pi-chart-line',
            command: () => {
                showToast({ severity: 'success', summary: 'Selected', detail: 'Transactions', life: 3000 })
            }
        },
        {
            label: 'Products',
            icon: 'pi pi-list',
            command: () => {
                showToast({ severity: 'success', summary: 'Selected', detail: 'Products', life: 3000 })
            }
        },
        {
            label: 'Messages',
            icon: 'pi pi-inbox',
            command: () => {
                showToast({ severity: 'success', summary: 'Selected', detail: 'Messages', life: 3000 })
            }
        }
    ]

    const codeItems = `
    const items = [
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            command: () => {
                showToast({ severity: 'success', summary: 'Selected', detail: 'Dashboard', life: 3000 })
            }
        },
        {
            label: 'Transactions',
            icon: 'pi pi-chart-line',
            command: () => {
                showToast({ severity: 'success', summary: 'Selected', detail: 'Transactions', life: 3000 })
            }
        },
        {
            label: 'Products',
            icon: 'pi pi-list',
            command: () => {
                showToast({ severity: 'success', summary: 'Selected', detail: 'Products', life: 3000 })
            }
        },
        {
            label: 'Messages',
            icon: 'pi pi-inbox',
            command: () => {
                showToast({ severity: 'success', summary: 'Selected', detail: 'Messages', life: 3000 })
            }
        }
    ]
`
    const code = {
        basic: `
<TabMenu model={items} />
        `,
        javascript: `
${importJS('TabMenu', importObject('showToast', 'toast'), codeItems)}
   
<div class="card">
    <TabMenu model={items} />
</div>
`,
        typescript: `
${importTS('TabMenu', importObject('showToast', 'toast'), codeItems)}

<div class="card">
    <TabMenu model={items} />
</div>
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        The <i>command</i> property defines the callback to run when an item is activated by click or a key event.
    </p>
</DocSectionText>
<div class="card">
    <TabMenu model={items} />
</div>
<DocSectionCode {code} />
