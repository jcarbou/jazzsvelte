<script lang="ts">
    import { importExt, importJS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { TabMenu } from '@jazzsvelte/tab_menu'
    import type { ComponentDocProps } from '../common/doc.types'
    import { goto } from '$app/navigation'

    let { docSection }: ComponentDocProps = $props()

    const items = [
        { label: 'Router Link', icon: 'pi pi-home', url: '/tabmenu' },
        {
            label: 'Programmatic',
            icon: 'pi pi-palette',
            command: () => {
                goto('/unstyled')
            }
        },
        { label: 'External', icon: 'pi pi-link', url: 'https://react.dev/' }
    ]

    const codeItems = `
    const items = [
        { label: 'Router Link', icon: 'pi pi-home', url: '/tabmenu' },
        {
            label: 'Programmatic',
            icon: 'pi pi-palette',
            command: () => {
                goto('/unstyled')
            }
        },
        { label: 'External', icon: 'pi pi-link', url: 'https://react.dev/' }
    ]
    `
    const codeDom = `
<div class="card">
    <TabMenu model={items} />
</div>
`
    const code = {
        basic: `
<TabMenu model={items} />
        `,
        javascript: `
${(importJS('TabMenu', importExt('goto', '$app/navigation')), codeItems)}
${codeDom}
`,
        typescript: `
${(importJS('TabMenu', importExt('goto', '$app/navigation')), codeItems)}
${codeDom}
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        Items with navigation are defined with <i>command</i> property to be able to use a router link component, an external link
        or programmatic navigation.{' '}
    </p>
</DocSectionText>
<div class="card">
    <TabMenu model={items} />
</div>
<DocSectionCode {code} />
