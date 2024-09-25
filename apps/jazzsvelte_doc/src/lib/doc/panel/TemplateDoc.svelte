<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { Panel } from '@jazzsvelte/panel'
    import { Avatar } from '@jazzsvelte/avatar'
    import { Button } from '@jazzsvelte/button'
    //import { Menu } from '@jazzsvelte/menu'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import PanelToggler from '@jazzsvelte/panel/src/PanelToggler.svelte'

    export let docSection: DocSection

    const items = [
        {
            label: 'Refresh',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Search',
            icon: 'pi pi-search'
        },
        {
            separator: true
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        }
    ]

    /* const headerTemplate = (options) => {
        const class = `${options.class} justify-content-space-between`;
            <div class={class}>
                <div class="flex align-items-center gap-2">
                    <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" size="large" shape="circle" />
                    <span class="font-bold">Amy Elsner</span>
                </div>
                <div>
                    <Menu model={items} popup ref={configMenu} id="config_menu" />
                    <button class="p-panel-header-icon p-link mr-2" on:click={(e) => configMenu?.current?.toggle(e)}>
                        <span class="pi pi-cog" />
                    </button>
                    {options.togglerElement}
                </div>
            </div>
        );
    };

    const footerTemplate = (options) => {
        const class = `${options.class} flex flex-wrap align-items-center justify-content-between gap-3`;
            <div class={class}>
                <div class="flex align-items-center gap-2">
                    <Button icon="pi pi-user" rounded text />
                    <Button icon="pi pi-bookmark" severity="secondary" rounded text />
                </div>
                <span class="p-text-secondary">Updated 2 hours ago</span>
            </div>
        );
    };*/

    const code = {
        basic: `
<Panel headerTemplate={headerTemplate} footerTemplate={footerTemplate} toggleable>
    <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</Panel>
        `,
        javascript: `
${importJS(['Panel', 'Avatar', 'Button', 'Menu'])}

    const configMenu = useRef(null);
    const items = [
        {
            label: 'Refresh',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Search',
            icon: 'pi pi-search'
        },
        {
            separator: true
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        }
    ];

    const headerTemplate = (options) => {
        const class = \`\${options.class} justify-content-space-between\`;
            <div class={class}>
                <div class="flex align-items-center gap-2">
                    <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" size="large" shape="circle" />
                    <span class="font-bold">Amy Elsner</span>
                </div>
                <div>
                    <Menu model={items} popup ref={configMenu} id="config_menu" />
                    <button class="p-panel-header-icon p-link mr-2" on:click={(e) => configMenu?.current?.toggle(e)}>
                        <span class="pi pi-cog"></span>
                    </button>
                    {options.togglerElement}
                </div>
            </div>
        );
    };

    const footerTemplate = (options) => {
        const class = \`\${options.class} flex flex-wrap align-items-center justify-content-between gap-3\`;
            <div class={class}>
                <div class="flex align-items-center gap-2">
                    <Button icon="pi pi-user" rounded text></Button>
                    <Button icon="pi pi-bookmark" severity="secondary" rounded text></Button>
                </div>
                <span class="p-text-secondary">Updated 2 hours ago</span>
            </div>
        );
    };
        <Panel headerTemplate={headerTemplate} footerTemplate={footerTemplate} toggleable>
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </Panel>

        `,
        typescript: `
${importTS(['Panel', 'Avatar', 'Button', 'Menu'])}

    const configMenu = useRef<HTMLElement | null>(null);
    const items = [
        {
            label: 'Refresh',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Search',
            icon: 'pi pi-search'
        },
        {
            separator: true
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        }
    ];

    const headerTemplate = (options) => {
        const class = \`\${options.class} justify-content-space-between\`;
            <div class={class}>
                <div class="flex align-items-center gap-2">
                    <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" size="large" shape="circle" />
                    <span class="font-bold">Amy Elsner</span>
                </div>
                <div>
                    <Menu model={items} popup ref={configMenu} id="config_menu" />
                    <button class="p-panel-header-icon p-link mr-2" on:click={(e) => configMenu?.current?.toggle(e)}>
                        <span class="pi pi-cog"></span>
                    </button>
                    {options.togglerElement}
                </div>
            </div>
        );
    };

    const footerTemplate = (options) => {
        const class = \`\${options.class} flex flex-wrap align-items-center justify-content-between gap-3\`;
            <div class={class}>
                <div class="flex align-items-center gap-2">
                    <Button icon="pi pi-user" rounded text></Button>
                    <Button icon="pi pi-bookmark" severity="secondary" rounded text></Button>
                </div>
                <span class="p-text-secondary">Updated 2 hours ago</span>
            </div>
        );
    };
        <Panel headerTemplate={headerTemplate} footerTemplate={footerTemplate} toggleable>
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </Panel>

        `
    }
</script>

<DocSectionText {docSection}>
    <p>
        Title section is customized with the <i>headerTemplate</i> property that takes a <i>PanelHeaderTemplateOptions</i> object as
        a parameter and
    </p>
</DocSectionText>
<div class="card">
    <Panel toggleable={true}>
        <div
            slot="header"
            let:headerAttributes
            let:togglerAttributes
            let:resolvedTogglerIcon
            let:toggle
            class={headerAttributes.class + ' justify-content-space-between'}
        >
            <div class="flex align-items-center gap-2">
                <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" size="large" shape="circle" />
                <span class="font-bold">Amy Elsner</span>
            </div>
            <div>
                <!--<Menu model={items} popup ref={configMenu} id="config_menu" />-->
                <button class="p-panel-header-icon p-link mr-2">
                    <span class="pi pi-cog" />
                </button>
                <PanelToggler {togglerAttributes} {resolvedTogglerIcon} {toggle} />
            </div>
        </div>

        <div
            slot="footer"
            let:footerAttributes
            class={footerAttributes.class + ' flex flex-wrap align-items-center justify-content-between gap-3'}
        >
            <div class="flex align-items-center gap-2">
                <Button icon="pi pi-user" rounded text></Button>
                <Button icon="pi pi-bookmark" severity="secondary" rounded text></Button>
            </div>
            <span class="p-text-secondary">Updated 2 hours ago</span>
        </div>

        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </Panel>
</div>
<DocSectionCode {code} />
