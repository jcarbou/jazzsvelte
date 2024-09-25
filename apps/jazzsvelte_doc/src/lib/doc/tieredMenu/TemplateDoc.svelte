<script lang="ts">
    import { importBrother, importJS, importObject, importTS, importType } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { TieredMenu } from '@jazzsvelte/tiered_menu'
    import { Badge } from '@jazzsvelte/badge'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import MenuItemTemplate from './MenuItemTemplate.svelte'
    import type { MenuItem } from '@jazzsvelte/api'

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
                            template: MenuItemTemplate
                        },
                        {
                            label: 'Image',
                            icon: 'pi pi-image',
                            shortcut: '⌘+I',
                            template: MenuItemTemplate
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-video',
                            shortcut: '⌘+L',
                            template: MenuItemTemplate
                        }
                    ]
                },
                {
                    label: 'Open',
                    icon: 'pi pi-folder-open',
                    shortcut: '⌘+O',
                    template: MenuItemTemplate
                },
                {
                    label: 'Print',
                    icon: 'pi pi-print',
                    shortcut: '⌘+P',
                    template: MenuItemTemplate
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
                    template: MenuItemTemplate
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    shortcut: '⌘+D',
                    template: MenuItemTemplate
                }
            ]
        },
        {
            label: 'Search',
            icon: 'pi pi-search',
            shortcut: '⌘+S',
            template: MenuItemTemplate
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
                    template: MenuItemTemplate
                },
                {
                    label: 'Whatsapp',
                    icon: 'pi pi-whatsapp',
                    badge: 3,
                    template: MenuItemTemplate
                }
            ]
        }
    ]

    const code = {
        basic: `
<TieredMenu model={items} breakpoint="767px" />
        `,
        javascript: `
 // MenuItemTemplate

${importJS(
    'Badge',
    `
    export let item

    $: icon = item.icon as string`
)}

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

// Main
${importJS(
    'Badge',
    importBrother('MenuItemTemplate'),
    `
    const items = [
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
                            template: MenuItemTemplate
                        },
                        {
                            label: 'Image',
                            icon: 'pi pi-image',
                            shortcut: '⌘+I',
                            template: MenuItemTemplate
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-video',
                            shortcut: '⌘+L',
                            template: MenuItemTemplate
                        }
                    ]
                },
                {
                    label: 'Open',
                    icon: 'pi pi-folder-open',
                    shortcut: '⌘+O',
                    template: MenuItemTemplate
                },
                {
                    label: 'Print',
                    icon: 'pi pi-print',
                    shortcut: '⌘+P',
                    template: MenuItemTemplate
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
                    template: MenuItemTemplate
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    shortcut: '⌘+D',
                    template: MenuItemTemplate
                }
            ]
        },
        {
            label: 'Search',
            icon: 'pi pi-search',
            shortcut: '⌘+S',
            template: MenuItemTemplate
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
                    template: MenuItemTemplate
                },
                {
                    label: 'Whatsapp',
                    icon: 'pi pi-whatsapp',
                    badge: 3,
                    template: MenuItemTemplate
                }
            ]
        }
    ]`
)}
<TieredMenu model={items} breakpoint="767px" />
        `,
        typescript: `
 // MenuItemTemplate

${importJS(
    'Badge',
    importObject('MenuItem', 'api'),
    `
    export let item: MenuItem

    $: icon = item.icon as string`
)}

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

// Main
${importTS(
    'Badge',
    importBrother('MenuItemTemplate'),
    importType('MenuItem', 'api'),
    `
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
                            template: MenuItemTemplate
                        },
                        {
                            label: 'Image',
                            icon: 'pi pi-image',
                            shortcut: '⌘+I',
                            template: MenuItemTemplate
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-video',
                            shortcut: '⌘+L',
                            template: MenuItemTemplate
                        }
                    ]
                },
                {
                    label: 'Open',
                    icon: 'pi pi-folder-open',
                    shortcut: '⌘+O',
                    template: MenuItemTemplate
                },
                {
                    label: 'Print',
                    icon: 'pi pi-print',
                    shortcut: '⌘+P',
                    template: MenuItemTemplate
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
                    template: MenuItemTemplate
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    shortcut: '⌘+D',
                    template: MenuItemTemplate
                }
            ]
        },
        {
            label: 'Search',
            icon: 'pi pi-search',
            shortcut: '⌘+S',
            template: MenuItemTemplate
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
                    template: MenuItemTemplate
                },
                {
                    label: 'Whatsapp',
                    icon: 'pi pi-whatsapp',
                    badge: 3,
                    template: MenuItemTemplate
                }
            ]
        }
    ]`
)}
<TieredMenu model={items} breakpoint="767px" />
        `
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
