<script lang="ts">
    import { importJS, importTS } from '../../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { SpeedDial } from '@jazzsvelte/speed_dial'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import { mergeCssClasses } from '@jazzsvelte/api'

    export let docSection: DocSection

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

    const code = {
        basic: `
<SpeedDial
    pt={{
        menu: ({ state }) => ({
            class: classs("mt-2", { "border-1 border-primary surface-border border-round surface-ground": state.visible })
        })
    }}
    model={items}
    radius={80}
    direction='down'
/>
        `,
        javascript: `
${importJS('SpeedDial')}import { SpeedDial } from 'primereact/speeddial';

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
    ];
        <div class="card">
            <div style="height:500px;" class="flex align-items-center justify-content-center">
                <SpeedDial
                    pt={{
                        menu: ({ state }) => ({
                            class: classs("mt-2", { "border-1 border-primary surface-border border-round surface-ground": state.visible })
                        })
                    }}
                    model={items}
                    radius={80}
                    direction='down'

                />
            </div>
        </div>

        `,
        typescript: `
${importTS('SpeedDial')}import { SpeedDial } from 'primereact/speeddial';
import { MenuItem } from 'primereact/menuitem';

    const items: MenuItem[] = [
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
    ];
        <div class="card">
            <div style="height:500px;" class="flex align-items-center justify-content-center">
                <SpeedDial
                    pt={{
                        menu: ({ state }) => ({
                            class: classs("mt-2", { "border-1 border-primary surface-border border-round surface-ground": state.visible })
                        })
                    }}
                    model={items}
                    radius={80}
                    direction='down'

                />
            </div>
        </div>

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
