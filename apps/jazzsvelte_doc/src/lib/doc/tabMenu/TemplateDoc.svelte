<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { TabMenu } from '@jazzsvelte/tab_menu'
    import type { ComponentDocProps } from '../common/doc.types'
    import type { MenuItemDefaultSnippetProps } from '@jazzsvelte/api'

    let { docSection }: ComponentDocProps = $props()

    let activeIndex = $state(0)

    const items = [
        {
            name: 'Amy Elsner',
            image: 'amyelsner.png',
            snippet: contentSnippet
        },
        {
            name: 'Anna Fali',
            image: 'annafali.png',
            snippet: contentSnippet
        },
        {
            name: 'Asiya Javayant',
            image: 'asiyajavayant.png',
            snippet: contentSnippet
        }
    ]

    const codeItems = `
    let activeIndex = $state(0)

    const items = [
        {
            name: 'Amy Elsner',
            image: 'amyelsner.png',
            snippet: contentSnippet
        },
        {
            name: 'Anna Fali',
            image: 'annafali.png',
            snippet: contentSnippet
        },
        {
            name: 'Asiya Javayant',
            image: 'asiyajavayant.png',
            snippet: contentSnippet
        }
    ]
`
    const codeDom = `
<div class="card">
    <TabMenu model={items} bind:activeIndex />
</div>

{#snippet contentSnippet({ item, index }: MenuItemDefaultSnippetProps)}
    <a class="p-menuitem-link flex align-items-center gap-2" onclick={() => (activeIndex = index)}>
        <img alt={item.name} src={\`https://primefaces.org/cdn/primereact/images/avatar/\${item.image}\`} style="width:32px;" />
        <span class="font-bold">{item.name}</span>
    </a>
{/snippet}
    `
    const code = {
        basic: `
<TabMenu model={items} bind:activeIndex />
        `,
        javascript: `
${importJS('TabMenu', codeItems)}
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
        TabMenu offers item customization with the items <i>template</i> property that receives the item instance and
    </p>
</DocSectionText>
<div class="card">
    <TabMenu model={items} bind:activeIndex />
</div>
<DocSectionCode {code} />

{#snippet contentSnippet({ item, index }: MenuItemDefaultSnippetProps)}
    <a class="p-menuitem-link flex align-items-center gap-2" onclick={() => (activeIndex = index)}>
        <img alt={item.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${item.image}`} style="width:32px;" />
        <span class="font-bold">{item.name}</span>
    </a>
{/snippet}
