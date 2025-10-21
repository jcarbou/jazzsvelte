<script lang="ts">
    import { importBrother, importJS, importObject, importTS, importType } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { TieredMenu } from '@jazzsvelte/tiered_menu'
    import type { DocSection } from '$lib/doc/common/doc.types'
    import type { MenuItem, MenuItemDefaultSnippetProps } from '@jazzsvelte/api'
    import { Badge } from '@jazzsvelte/badge'

    export let docSection: DocSection

    const items: MenuItem[] = [
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
                            snippet: menuItemSnippet
                        },
                        {
                            label: 'Image',
                            icon: 'pi pi-image',
                            shortcut: '⌘+I',
                            snippet: menuItemSnippet
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-video',
                            shortcut: '⌘+L',
                            snippet: menuItemSnippet
                        }
                    ]
                },
                {
                    label: 'Open',
                    icon: 'pi pi-folder-open',
                    shortcut: '⌘+O',
                    snippet: menuItemSnippet
                },
                {
                    label: 'Print',
                    icon: 'pi pi-print',
                    shortcut: '⌘+P',
                    snippet: menuItemSnippet
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
                    snippet: menuItemSnippet
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    shortcut: '⌘+D',
                    snippet: menuItemSnippet
                }
            ]
        },
        {
            label: 'Search',
            icon: 'pi pi-search',
            shortcut: '⌘+S',
            snippet: menuItemSnippet
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
                    snippet: menuItemSnippet
                },
                {
                    label: 'Whatsapp',
                    icon: 'pi pi-whatsapp',
                    badge: 3,
                    snippet: menuItemSnippet
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
                            snippet: menuItemSnippet
                        },
                        {
                            label: 'Image',
                            icon: 'pi pi-image',
                            shortcut: '⌘+I',
                            snippet: menuItemSnippet
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-video',
                            shortcut: '⌘+L',
                            snippet: menuItemSnippet
                        }
                    ]
                },
                {
                    label: 'Open',
                    icon: 'pi pi-folder-open',
                    shortcut: '⌘+O',
                    snippet: menuItemSnippet
                },
                {
                    label: 'Print',
                    icon: 'pi pi-print',
                    shortcut: '⌘+P',
                    snippet: menuItemSnippet
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
                    snippet: menuItemSnippet
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    shortcut: '⌘+D',
                    snippet: menuItemSnippet
                }
            ]
        },
        {
            label: 'Search',
            icon: 'pi pi-search',
            shortcut: '⌘+S',
            snippet: menuItemSnippet
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
                    snippet: menuItemSnippet
                },
                {
                    label: 'Whatsapp',
                    icon: 'pi pi-whatsapp',
                    badge: 3,
                    snippet: menuItemSnippet
                }
            ]
        }`
    const codeBasic = `
<TieredMenu model={items} breakpoint="767px" />
`

    const code = {
        basic: codeBasic,
        javascript: `
 // MenuItemTemplate

${importJS(
    'Badge',
    `
    export let item

    $: icon = item.icon`
)}
${codeTemplate}

// Main
${importJS(
    'Badge',
    importBrother('MenuItemTemplate'),
    `
    const items = [${codeItems}]`
)}
${codeBasic}`,
        typescript: `
 // MenuItemTemplate

${importJS(
    'Badge',
    importObject('MenuItem', 'api'),
    `
    export let item: MenuItem

    $: icon = item.icon as string`
)}
${codeTemplate}

// Main
${importTS(
    'Badge',
    importBrother('MenuItemTemplate'),
    importType('MenuItem', 'api'),
    `
    const items: MenuItem[] = [${codeItems}}]`
)}
${codeBasic}`
    }
</script>

<DocSectionText {docSection}>
    <p>
        TieredMenu offers item customization with the items <i>template</i> property that receives the item instance and
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <TieredMenu model={items} breakpoint="767px" />
</div>
<DocSectionCode {code} />

{#snippet menuItemSnippet({ item, index }: MenuItemDefaultSnippetProps)}
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
