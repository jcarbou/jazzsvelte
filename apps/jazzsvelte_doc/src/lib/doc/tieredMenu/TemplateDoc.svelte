<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { TieredMenu, type TieredMenuItem, type TieredMenuItemSnippetProps } from '@jazzsvelte/tiered_menu'
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
                            shortcut: '⌘+N'
                        },
                        {
                            label: 'Image',
                            icon: 'pi pi-image',
                            shortcut: '⌘+I'
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-video',
                            shortcut: '⌘+L'
                        }
                    ]
                },
                {
                    label: 'Open',
                    icon: 'pi pi-folder-open',
                    shortcut: '⌘+O'
                },
                {
                    label: 'Print',
                    icon: 'pi pi-print',
                    shortcut: '⌘+P'
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
                    shortcut: '⌘+C'
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    shortcut: '⌘+D'
                }
            ]
        },
        {
            label: 'Search',
            icon: 'pi pi-search',
            shortcut: '⌘+S'
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
                    badge: 2
                },
                {
                    label: 'Whatsapp',
                    icon: 'pi pi-whatsapp',
                    badge: 3
                }
            ]
        }
    ]
    const codeTemplate = `
{#snippet itemSnippet({ item, index, tieredMenuOptions: { grouped }, defaultSnippet }: TieredMenuItemSnippetProps)}
    {#if grouped}
        {@render defaultSnippet({ item, index })}
    {:else}
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
    {/if}
{/snippet}
`
    const codeItems = `
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
                            
                        },
                        {
                            label: 'Image',
                            icon: 'pi pi-image',
                            shortcut: '⌘+I',
                            
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-video',
                            shortcut: '⌘+L',
                            
                        }
                    ]
                },
                {
                    label: 'Open',
                    icon: 'pi pi-folder-open',
                    shortcut: '⌘+O',
                    
                },
                {
                    label: 'Print',
                    icon: 'pi pi-print',
                    shortcut: '⌘+P',
                    
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
                    
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    shortcut: '⌘+D',
                    
                }
            ]
        },
        {
            label: 'Search',
            icon: 'pi pi-search',
            shortcut: '⌘+S',
            
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
                    
                },
                {
                    label: 'Whatsapp',
                    icon: 'pi pi-whatsapp',
                    badge: 3,
                    
                }
            ]
        }`
    const codeBasic = `
<TieredMenu model={items} {itemSnippet} breakpoint="767px" />
`

    const code = {
        basic: codeBasic,
        javascript: `
${importJS(['Badge', 'TieredMenu'], codeItems.replace(': TieredMenuItem[]', ''))}
${codeBasic}
${codeTemplate.replace(': TieredMenuItemSnippetProps', '')}
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
        TieredMenu offers item customization with <i>itemSnippet</i> property that receives the item instance and returns an element.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <TieredMenu model={items} {itemSnippet} breakpoint="767px" />
</div>
<DocSectionCode {code} />

{#snippet itemSnippet({ item, index, options: { grouped }, defaultSnippet }: TieredMenuItemSnippetProps)}
    {#if grouped}
        {@render defaultSnippet({ item, index })}
    {:else}
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
    {/if}
{/snippet}
