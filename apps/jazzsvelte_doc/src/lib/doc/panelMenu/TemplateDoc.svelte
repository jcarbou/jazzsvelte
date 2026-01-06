<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { PanelMenu, type PanelMenuItem, type PanelMenuItemSnippetProps } from '@jazzsvelte/panel_menu'
    import { Badge } from '@jazzsvelte/badge'

    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const items: PanelMenuItem[] = [
        {
            label: 'Mail',
            icon: 'pi pi-envelope',
            badge: 5,

            items: [
                {
                    label: 'Compose',
                    icon: 'pi pi-file-edit',
                    shortcut: '⌘+N'
                },
                {
                    label: 'Inbox',
                    icon: 'pi pi-inbox',
                    badge: 5
                },
                {
                    label: 'Sent',
                    icon: 'pi pi-send',
                    shortcut: '⌘+S'
                },
                {
                    label: 'Trash',
                    icon: 'pi pi-trash',
                    shortcut: '⌘+T'
                }
            ]
        },
        {
            label: 'Reports',
            icon: 'pi pi-chart-bar',
            shortcut: '⌘+R',

            items: [
                {
                    label: 'Sales',
                    icon: 'pi pi-chart-line',
                    badge: 3
                },
                {
                    label: 'Products',
                    icon: 'pi pi-list',
                    badge: 6
                }
            ]
        },
        {
            label: 'Profile',
            icon: 'pi pi-user',
            shortcut: '⌘+W',

            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-cog',
                    shortcut: '⌘+O'
                },
                {
                    label: 'Privacy',
                    icon: 'pi pi-shield',
                    shortcut: '⌘+P'
                }
            ]
        }
    ]

    const code = {
        basic: `
<PanelMenu model={items} class="w-full md:w-20rem" />   
`,
        javascript: `
${importJS('PanelMenu')}import { PanelMenu } from 'primereact/panelmenu';
import { Badge } from 'primereact/badge';

    const itemSnippet = (item, options) => (
        <a class="flex align-items-center px-3 py-2 cursor-pointer" on:click={options.on:click}>
            <span class={\`\${item.icon} text-primary\`} />
            <span class={\`mx-2 \${item.items && 'font-semibold'}\`}>{item.label}</span>
            {item.badge && <Badge class="ml-auto" value={item.badge} />}
            {item.shortcut && <span class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>


    const items = [
        {
            label: 'Mail',
            icon: 'pi pi-envelope',
            badge: 5,
            
            items: [
                {
                    label: 'Compose',
                    icon: 'pi pi-file-edit',
                    shortcut: '⌘+N',
                   
                },
                {
                    label: 'Inbox',
                    icon: 'pi pi-inbox',
                    badge: 5,
                   
                },
                {
                    label: 'Sent',
                    icon: 'pi pi-send',
                    shortcut: '⌘+S',
                   
                },
                {
                    label: 'Trash',
                    icon: 'pi pi-trash',
                    shortcut: '⌘+T',
                   
                }
            ]
        },
        {
            label: 'Reports',
            icon: 'pi pi-chart-bar',
            shortcut: '⌘+R',
            
            items: [
                {
                    label: 'Sales',
                    icon: 'pi pi-chart-line',
                    badge: 3,
                   
                },
                {
                    label: 'Products',
                    icon: 'pi pi-list',
                    badge: 6,
                   
                }
            ]
        },
        {
            label: 'Profile',
            icon: 'pi pi-user',
            shortcut: '⌘+W',
            
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-cog',
                    shortcut: '⌘+O',
                   
                },
                {
                    label: 'Privacy',
                    icon: 'pi pi-shield',
                    shortcut: '⌘+P',
                   
                }
            ]
        }
    ];
        <div class="card flex justify-content-center">
            <PanelMenu model={items} class="w-full md:w-20rem" />
        </div>

        `,
        typescript: `
${importTS('PanelMenu')}import { PanelMenu } from 'primereact/panelmenu';
import { MenuItem } from 'primereact/menuitem';
import { Badge } from 'primereact/badge';

    const itemSnippet = (item, options) => (
        <a class="flex align-items-center px-3 py-2 cursor-pointer" on:click={options.on:click}>
            <span class={\`\${item.icon} text-primary\`} />
            <span class={\`mx-2 \${item.items && 'font-semibold'}\`}>{item.label}</span>
            {item.badge && <Badge class="ml-auto" value={item.badge} />}
            {item.shortcut && <span class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>


    const items: MenuItem[] = [
        {
            label: 'Mail',
            icon: 'pi pi-envelope',
            badge: 5,
            
            items: [
                {
                    label: 'Compose',
                    icon: 'pi pi-file-edit',
                    shortcut: '⌘+N',
                   
                },
                {
                    label: 'Inbox',
                    icon: 'pi pi-inbox',
                    badge: 5,
                   
                },
                {
                    label: 'Sent',
                    icon: 'pi pi-send',
                    shortcut: '⌘+S',
                   
                },
                {
                    label: 'Trash',
                    icon: 'pi pi-trash',
                    shortcut: '⌘+T',
                   
                }
            ]
        },
        {
            label: 'Reports',
            icon: 'pi pi-chart-bar',
            shortcut: '⌘+R',
            
            items: [
                {
                    label: 'Sales',
                    icon: 'pi pi-chart-line',
                    badge: 3,
                   
                },
                {
                    label: 'Products',
                    icon: 'pi pi-list',
                    badge: 6,
                   
                }
            ]
        },
        {
            label: 'Profile',
            icon: 'pi pi-user',
            shortcut: '⌘+W',
            
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-cog',
                    shortcut: '⌘+O',
                   
                },
                {
                    label: 'Privacy',
                    icon: 'pi pi-shield',
                    shortcut: '⌘+P',
                   
                }
            ]
        }
    ];
        <div class="card flex justify-content-center">
            <PanelMenu model={items} class="w-full md:w-20rem" />
        </div>

        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        PanelMenu offers item customization with the <i>snippet</i> property
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <PanelMenu model={items} {itemSnippet} class="w-full md:w-20rem" />
</div>
<DocSectionCode {code} />

{#snippet itemSnippet({ item, index, options: { onclick }, defaultSnippet }: PanelMenuItemSnippetProps)}
    <a class="flex align-items-center px-3 py-2 cursor-pointer" {onclick}>
        <span class={`${item.icon} text-primary`}></span>
        <span class={`mx-2 ${item.items && 'font-semibold'}`}>{item.label}</span>
        {#if item.badge}
            <Badge class="ml-auto" value={item.badge} />
        {/if}
        {#if item.shortcut}
            <span class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>
        {/if}
    </a>
{/snippet}
