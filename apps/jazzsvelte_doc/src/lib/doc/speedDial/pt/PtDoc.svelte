<script lang="ts">
    import { importJS, importTS } from '../../common/doc.utils'
    import DocSectionCode from '../../common/DocSectionCode.svelte'
    import DocSectionText from '../../common/DocSectionText.svelte'
    import { SpeedDial } from '@jazzsvelte/speed_dial'
    import type { ComponentDocProps } from '../../common/doc.types'
    import { mergeCssClasses } from '@jazzsvelte/api'

    let { docSection }: ComponentDocProps = $props()

    const items = [
        {
            label: 'Add',
            icon: 'pi pi-pencil'
        },
        {
            label: 'Update',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash'
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link'
        }
    ]

    const codeBasic = `
<SpeedDial
            pt={{
                menu: ({ state }) => ({
                    class: mergeCssClasses([
                        'mt-2',
                        { 'border-1 border-primary surface-border border-round surface-ground': state.visible }
                    ])
                })
            }}
            model={items}
            radius={80}
            direction="down"
        />
`

    const codeItems = `
    const items = [
        {
            label: 'Add',
            icon: 'pi pi-pencil'
        },
        {
            label: 'Update',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash'
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link'
        }
    ]
`
    const code = {
        basic: codeBasic,
        javascript: `
${importJS('SpeedDial', codeItems)}
${codeItems}
`,
        typescript: `
${importTS('SpeedDial', codeItems)}
${codeItems}
`
    }
</script>

<DocSectionText {docSection} />
<div class="card">
    <div style="height:500px;" class="flex align-items-center justify-content-center">
        <SpeedDial
            pt={{
                menu: ({ state }) => ({
                    class: mergeCssClasses([
                        'mt-2',
                        { 'border-1 border-primary surface-border border-round surface-ground': state.visible }
                    ])
                })
            }}
            model={items}
            radius={80}
            direction="down"
        />
    </div>
</div>
<DocSectionCode {code} />
