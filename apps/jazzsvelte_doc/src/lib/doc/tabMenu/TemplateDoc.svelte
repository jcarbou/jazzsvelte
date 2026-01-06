<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { TabMenu, type TabMenuItem } from '@jazzsvelte/tab_menu'
    import type { ComponentDocProps } from '../common/doc.types'
    import type { MenuItemDefaultSnippetProps } from '@jazzsvelte/api'

    let { docSection }: ComponentDocProps = $props()

    let activeIndex = $state(0)

    const items: TabMenuItem[] = [
        {
            label: 'Amy Elsner',
            badge: 'amyelsner.png'
        },
        {
            label: 'Anna Fali',
            badge: 'annafali.png'
        },
        {
            label: 'Asiya Javayant',
            badge: 'asiyajavayant.png'
        }
    ]

    const codeItems = `
    let activeIndex = $state(0)

    const items : TabMenuItem[] = [
        {
            label: 'Amy Elsner',
            badge: 'amyelsner.png',
            snippet: contentSnippet
        },
        {
            label: 'Anna Fali',
           badge: 'annafali.png',
            snippet: contentSnippet
        },
        {
            label: 'Asiya Javayant',
            badge: 'asiyajavayant.png',
            snippet: contentSnippet
        }
    ]
`
    const codeDom = `
<div class="card">
    <TabMenu model={items} bind:activeIndex />
</div>

{#snippet contentSnippet({ item, index }: MenuItemDefaultSnippetProps)}
    <button class="p-menuitem-link flex align-items-center gap-2" onclick={() => (activeIndex = index)}>
        <img alt={item.label} src={\`https://primefaces.org/cdn/primereact/images/avatar/\${item.badge}\`} style="width:32px;" />
        <span class="font-bold">{item.label}</span>
    </button>
{/snippet}
    `
    const code = {
        basic: `
<TabMenu model={items} bind:activeIndex />
        `,
        javascript: `
${importJS('TabMenu', codeItems.replace(': TabMenuItem[]', ''))}
${codeDom}
`,
        typescript: `
${importTS('TabMenu', codeItems)}
${codeDom}
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        TabMenu offers item customization with <i>itemSnippet</i> property that receives the item instance and returns an element.
    </p>
</DocSectionText>
<div class="card">
    <TabMenu model={items} {itemSnippet} bind:activeIndex />
</div>
<DocSectionCode {code} />

{#snippet itemSnippet({ item, index }: MenuItemDefaultSnippetProps)}
    <button class="p-menuitem-link flex align-items-center gap-2" onclick={() => (activeIndex = index)}>
        <img alt={item.label} src={`https://primefaces.org/cdn/primereact/images/avatar/${item.badge}`} style="width:32px;" />
        <span class="font-bold">{item.label}</span>
    </button>
{/snippet}
