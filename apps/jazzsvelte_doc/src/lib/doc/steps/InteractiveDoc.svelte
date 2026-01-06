<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Steps } from '@jazzsvelte/steps'
    import { showToast } from '@jazzsvelte/toast'
    import type { ComponentDocProps } from '../common/doc.types'
    import type { MenuItemCommand } from '@jazzsvelte/api'

    let { docSection }: ComponentDocProps = $props()

    const items = [
        {
            label: 'Personal',
            command: (event: MenuItemCommand) => {
                showToast({ severity: 'info', summary: 'First Step', detail: event.item.label })
            }
        },
        {
            label: 'Seat',
            command: (event: MenuItemCommand) => {
                showToast({ severity: 'info', summary: 'Second Step', detail: event.item.label })
            }
        },
        {
            label: 'Payment',
            command: (event: MenuItemCommand) => {
                showToast({ severity: 'info', summary: 'Third Step', detail: event.item.label })
            }
        },
        {
            label: 'Confirmation',
            command: (event: MenuItemCommand) => {
                showToast({ severity: 'info', summary: 'Last Step', detail: event.item.label })
            }
        }
    ]

    const codeItemsTS = `
    const items = [
        {
            label: 'Personal',
            command: (event: MenuItemCommand) => {
                showToast({ severity: 'info', summary: 'First Step', detail: event.item.label })
            }
        },
        {
            label: 'Seat',
            command: (event: MenuItemCommand) => {
                showToast({ severity: 'info', summary: 'Second Step', detail: event.item.label })
            }
        },
        {
            label: 'Payment',
            command: (event: MenuItemCommand) => {
                showToast({ severity: 'info', summary: 'Third Step', detail: event.item.label })
            }
        },
        {
            label: 'Confirmation',
            command: (event: MenuItemCommand) => {
                showToast({ severity: 'info', summary: 'Last Step', detail: event.item.label })
            }
        }
    ]
`
    const codeItemsJS = codeItemsTS.replaceAll(': MenuItemCommand', '')
    const code = {
        basic: `
<Steps model={items} readOnly={false} />
`,
        javascript: `
${importJS(['Steps', 'Toast'], codeItemsJS)}
<div class="card">
    <Steps model={items} readOnly={false} />
</div>

        `,
        typescript: `
${importTS(['Steps', 'Toast'], codeItemsTS)}
<div class="card">
    <Toast ref={toast}></Toast>
    <Steps model={items} readOnly={false} />
</div>
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        In order to add interactivity to the component, disable <i>readOnly</i> and use a binding to <i>activeIndex</i> along with
        <i>onSelect</i> to control the Steps.
    </p>
</DocSectionText>
<div class="card">
    <Steps model={items} readOnly={false} />
</div>
<DocSectionCode {code} />
