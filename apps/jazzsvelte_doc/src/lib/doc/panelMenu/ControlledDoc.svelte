<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { Button } from '@jazzsvelte/button'
    import { PanelMenu, type PanelMenuItem } from '@jazzsvelte/panel_menu'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    let panelMenu: PanelMenu
    let expandedKeys: string[] = $state([])

    const items = [
        {
            key: '0',
            label: 'Users',
            icon: 'pi pi-users',
            items: [
                {
                    key: '0_1',
                    label: 'New',
                    items: [
                        {
                            key: '0_1_0',
                            label: 'Member'
                        },
                        {
                            key: '0_1_1',
                            label: 'Group'
                        }
                    ]
                },
                {
                    key: '0_2',
                    label: 'Search'
                }
            ]
        },
        {
            key: '1',
            label: 'Tasks',
            icon: 'pi pi-server',
            items: [
                {
                    key: '1_0',
                    label: 'Add New'
                },
                {
                    key: '1_1',
                    label: 'Pending'
                },
                {
                    key: '1_2',
                    label: 'Overdue'
                }
            ]
        },
        {
            key: '2',
            label: 'Calendar',
            icon: 'pi pi-calendar',

            items: [
                {
                    key: '2_0',
                    label: 'New Event'
                },
                {
                    key: '2_1',
                    label: 'Today'
                },
                {
                    key: '2_2',
                    label: 'This Week'
                }
            ]
        }
    ]

    function toggleAll() {
        panelMenu.toggleAll()
    }

    function expendFirst() {
        panelMenu.setExpand([items[0]])
    }

    function expandAll() {
        const list: string[] = []
        items.forEach((item) => expandNode(list, item))
        expandedKeys = list
    }

    function collapseAll() {
        expandedKeys = []
    }

    function expandNode(list: string[], menuItem: PanelMenuItem) {
        if (menuItem.items?.length) {
            if (menuItem.key) list.push(menuItem.key)
            menuItem.items.forEach((item) => expandNode(list, item))
        }
    }

    const code = {
        basic: `
<div class="card flex flex-column align-items-center gap-3">
    <Button type="button" label="Toggle All" text on:click={() => toggleAll()} />
    <PanelMenu model={items} expandedKeys={expandedKeys} onExpandedKeysChange={setExpandedKeys} class="w-full md:w-20rem" multiple />
</div>  
`,
        javascript: `
${importJS('PanelMenu')}import { PanelMenu } from 'primereact/panelmenu';
import { Button } from 'primereact/button';

    const items = [
        {
            key: '0',
            label: 'Users',
            icon: 'pi pi-users',
            items: [
                {
                    key: '0_1',
                    label: 'New',
                    items: [
                        {
                            key: '0_1_0',
                            label: 'Member',
                        },
                        {
                            key: '0_1_1',
                            label: 'Group',
                        }
                    ]
                },
                {
                    key: '0_2',
                    label: 'Search',
                }
            ]
        },
        {
            key: '1',
            label: 'Tasks',
            icon: 'pi pi-server',
            items: [
                {
                    key: '1_0',
                    label: 'Add New',
                },
                {
                    key: '1_1',
                    label: 'Pending',
                },
                {
                    key: '1_2',
                    label: 'Overdue',
                }
            ]
        },
        {
            key: '2',
            label: 'Calendar',
            icon: 'pi pi-calendar',

            items: [
                {
                    key: '2_0',
                    label: 'New Event',
                },
                {
                    key: '2_1',
                    label: 'Today',
                },
                {
                    key: '2_2',
                    label: 'This Week',
                }
            ]
        }
    ];

    

    const toggleAll = () => {
        if (Object.keys(expandedKeys).length) {
            collapseAll();
        } else {
            expandAll();
        }
    };

    const expandAll = () => {
        items.forEach(expandNode);
        setExpandedKeys({ ...expandedKeys });
    };

    const collapseAll = () => {
        setExpandedKeys({});
    };

    const expandNode = (node) => {
        if (node.items && node.items.length) {
            expandedKeys[node.key] = true;

            node.items.forEach(expandNode);
        }
    };
        <div class="card flex flex-column align-items-center gap-3">
            <Button type="button" label="Toggle All" text on:click={() => toggleAll()} />
            <PanelMenu model={items} expandedKeys={expandedKeys} onExpandedKeysChange={setExpandedKeys} class="w-full md:w-20rem" multiple />
        </div>

        `,
        typescript: `
${importTS('PanelMenu')}import { PanelMenu } from 'primereact/panelmenu';
import { Button } from 'primereact/button';

    const items = [
        {
            key: '0',
            label: 'Users',
            icon: 'pi pi-users',
            items: [
                {
                    key: '0_1',
                    label: 'New',
                    items: [
                        {
                            key: '0_1_0',
                            label: 'Member',
                        },
                        {
                            key: '0_1_1',
                            label: 'Group',
                        }
                    ]
                },
                {
                    key: '0_2',
                    label: 'Search',
                }
            ]
        },
        {
            key: '1',
            label: 'Tasks',
            icon: 'pi pi-server',
            items: [
                {
                    key: '1_0',
                    label: 'Add New',
                },
                {
                    key: '1_1',
                    label: 'Pending',
                },
                {
                    key: '1_2',
                    label: 'Overdue',
                }
            ]
        },
        {
            key: '2',
            label: 'Calendar',
            icon: 'pi pi-calendar',
            items: [
                {
                    key: '2_0',
                    label: 'New Event',
                },
                {
                    key: '2_1',
                    label: 'Today',
                },
                {
                    key: '2_2',
                    label: 'This Week',
                }
            ]
        }
    ];

    

    const toggleAll = () => {
        if (Object.keys(expandedKeys).length) {
            collapseAll();
        } else {
            expandAll();
        }
    };

    const expandAll = () => {
        items.forEach(expandNode);
        setExpandedKeys({ ...expandedKeys });
    };

    const collapseAll = () => {
        setExpandedKeys({});
    };

    const expandNode = (node) => {
        if (node.items && node.items.length) {
            expandedKeys[node.key] = true;

            node.items.forEach(expandNode);
        }
    };
        <div class="card flex flex-column align-items-center gap-3">
            <Button type="button" label="Toggle All" text on:click={() => toggleAll()} />
            <PanelMenu model={items} expandedKeys={expandedKeys} onExpandedKeysChange={setExpandedKeys} class="w-full md:w-20rem" multiple />
            </div>

        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        If the menuitem has a <i>key</i> defined, PanelMenu state can be controlled programmatically with the <i>expandedKeys</i> property
        that defines the keys that are expanded. This property is a Map instance whose key is the key of a node and value is a boolean.
    </p>
</DocSectionText>
<div class="card flex flex-column align-items-center gap-3">
    <Button type="button" label="Toggle All" text onclick={() => toggleAll()} />
    <Button type="button" label="Expande first" text onclick={() => expendFirst()} />
    <PanelMenu bind:this={panelMenu} model={items} {expandedKeys} class="w-full md:w-20rem" multiple />
</div>
<DocSectionCode {code} />
