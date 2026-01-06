<script lang="ts">
    import { importBrother, importJS, importObject, importTS, importType } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { TieredMenu, type TieredMenuItem } from '@jazzsvelte/tiered_menu'
    import type { DocSection } from '../common/doc.types'
    import type { MenuItemDefaultSnippetProps } from '@jazzsvelte/api'
    import { Badge } from '@jazzsvelte/badge'

    export let docSection: DocSection

    const items: TieredMenuItem[] = [
        {
            label: 'File',
            icon: 'pi pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-plus',
                    items: [
                        {
                            label: 'Document',
                            icon: 'pi pi-file',
                            shortcut: '⌘+N',
                            snippet: warnItemSnippet
                        },
                        {
                            label: 'Image',
                            icon: 'pi pi-image',
                            shortcut: '⌘+I',
                            snippet: itemSnippet
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-video',
                            shortcut: '⌘+L',
                            snippet: itemSnippet
                        }
                    ]
                },
                {
                    label: 'Open',
                    icon: 'pi pi-folder-open',
                    shortcut: '⌘+O',
                    snippet: itemSnippet
                },
                {
                    label: 'Print',
                    icon: 'pi pi-print',
                    shortcut: '⌘+P',
                    snippet: warnItemSnippet
                }
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-file-edit',
            items: [
                {
                    label: 'Copy',
                    icon: 'pi pi-copy',
                    shortcut: '⌘+C',
                    snippet: warnItemSnippet
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    shortcut: '⌘+D',
                    snippet: itemSnippet
                }
            ]
        },
        {
            label: 'Search',
            icon: 'pi pi-search',
            shortcut: '⌘+S',
            snippet: itemSnippet
        },
        {
            separator: true
        },
        {
            label: 'Share',
            icon: 'pi pi-share-alt',
            items: [
                {
                    label: 'Slack',
                    icon: 'pi pi-slack',
                    badge: 2,
                    snippet: warnItemSnippet
                },
                {
                    label: 'Whatsapp',
                    icon: 'pi pi-whatsapp',
                    badge: 3,
                    snippet: itemSnippet
                }
            ]
        }
    ]
    const codeTemplate = `
<a href="#" class="flex align-items-center p-menuitem-link">
    <span class={icon} />
    <span class="mx-2">{item.label}</span>
    {#if item.badge}
        <Badge class="ml-auto" value={item.badge} />
    {/if}
    {#if item.shortcut}
        <span class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>
    {/if}
</a>
`
    const codeItems = `
     {
            label: 'File',
            icon: 'pi pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-plus',
                    items: [
                        {
                            label: 'Document',
                            icon: 'pi pi-file',
                            shortcut: '⌘+N',
                            snippet: warnItemSnippet
                        },
                        {
                            label: 'Image',
                            icon: 'pi pi-image',
                            shortcut: '⌘+I',
                            snippet: itemSnippet
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-video',
                            shortcut: '⌘+L',
                            snippet: itemSnippet
                        }
                    ]
                },
                {
                    label: 'Open',
                    icon: 'pi pi-folder-open',
                    shortcut: '⌘+O',
                    snippet: itemSnippet
                },
                {
                    label: 'Print',
                    icon: 'pi pi-print',
                    shortcut: '⌘+P',
                    snippet: itemSnippet
                }
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-file-edit',
            items: [
                {
                    label: 'Copy',
                    icon: 'pi pi-copy',
                    shortcut: '⌘+C',
                    snippet: warnItemSnippet
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    shortcut: '⌘+D',
                    snippet: itemSnippet
                }
            ]
        },
        {
            label: 'Search',
            icon: 'pi pi-search',
            shortcut: '⌘+S',
            snippet: itemSnippet
        },
        {
            separator: true
        },
        {
            label: 'Share',
            icon: 'pi pi-share-alt',
            items: [
                {
                    label: 'Slack',
                    icon: 'pi pi-slack',
                    badge: 2,
                    snippet: warnItemSnippet
                },
                {
                    label: 'Whatsapp',
                    icon: 'pi pi-whatsapp',
                    badge: 3,
                    snippet: itemSnippet
                }
            ]
        }`
    const codeBasic = `
<TieredMenu model={items} breakpoint="767px" />
`

    const code = {
        basic: codeBasic,
        javascript: `
${importJS(['Badge', 'TieredMenu'], codeItems.replace(': TieredMenuItem[]', ''))}
${codeBasic}
${codeTemplate.replace(': MenuItemDefaultSnippetProps', '')}
`,
        typescript: `
 ${importTS(['Badge', 'TieredMenu'], codeItems)}
${codeBasic}
${codeTemplate}
`
    }
</script>

<DocSectionText {docSection}>
    <p>
        TieredMenu offers item customization with the items <i>snippet</i> property that receives the item instance and returns an
        element.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <TieredMenu model={items} breakpoint="767px" />
</div>
<DocSectionCode {code} />

{#snippet itemSnippet({ item, index }: MenuItemDefaultSnippetProps)}
    <a href="#" class="flex align-items-center p-menuitem-link">
        <span class={item.icon as string}></span>
        <span class="mx-2">{item.label}</span>
        {#if item.badge}
            <Badge class="ml-auto" value={item.badge} />
        {/if}
        {#if item.shortcut}
            <span class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>
        {/if}
    </a>
{/snippet}

{#snippet warnItemSnippet({ item, index }: MenuItemDefaultSnippetProps)}
    <a href="#" class="flex align-items-center p-menuitem-link">
        <span class={item.icon as string}></span>
        <span class="mx-2">{item.label}</span>
        {#if item.shortcut}
            <Badge class="ml-auto" severity="danger" value={item.shortcut} />
        {/if}
    </a>
{/snippet}
