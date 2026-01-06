<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSectionCode from '../common/DocSectionCode.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import { PanelMenu, type PanelMenuItem } from '@jazzsvelte/panel_menu'
    import { goto } from '$app/navigation'

    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()

    const items: PanelMenuItem[] = [
        {
            label: 'Router',
            icon: 'pi pi-palette',
            items: [
                {
                    label: 'Styled',
                    icon: 'pi pi-eraser',
                    url: '/theming'
                },
                {
                    label: 'Unstyled',
                    icon: 'pi pi-heart',
                    url: '/unstyled'
                }
            ]
        },
        {
            label: 'Programmatic',
            icon: 'pi pi-link',
            command: () => {
                goto('/installation')
            }
        },
        {
            label: 'External',
            icon: 'pi pi-home',
            items: [
                {
                    label: 'React.js',
                    icon: 'pi pi-star',
                    url: 'https://react.dev/'
                },
                {
                    label: 'Vite.js',
                    icon: 'pi pi-bookmark',
                    url: 'https://vite.dev/'
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
import { useRouter } from 'next/router';

    const router = useRouter();
    const items = [
        {
            label: 'Router',
            icon: 'pi pi-palette',
            items: [
                {
                    label: 'Styled',
                    icon: 'pi pi-eraser',
                    url: '/theming'
                },
                {
                    label: 'Unstyled',
                    icon: 'pi pi-heart',
                    url: '/unstyled'
                }
            ]
        },
        {
            label: 'Programmatic',
            icon: 'pi pi-link',
            command: () => {
                router.push('/installation');
            }
        },
        {
            label: 'External',
            icon: 'pi pi-home',
            items: [
                {
                    label: 'React.js',
                    icon: 'pi pi-star',
                    url: 'https://react.dev/'
                },
                {
                    label: 'Vite.js',
                    icon: 'pi pi-bookmark',
                    url: 'https://vite.dev/'
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
import { useRouter } from 'next/router';

    const router = useRouter();
    const items: MenuItem[] = [
        {
            label: 'Router',
            icon: 'pi pi-palette',
            items: [
                {
                    label: 'Styled',
                    icon: 'pi pi-eraser',
                    url: '/theming'
                },
                {
                    label: 'Unstyled',
                    icon: 'pi pi-heart',
                    url: '/unstyled'
                }
            ]
        },
        {
            label: 'Programmatic',
            icon: 'pi pi-link',
            command: () => {
                router.push('/installation');
            }
        },
        {
            label: 'External',
            icon: 'pi pi-home',
            items: [
                {
                    label: 'React.js',
                    icon: 'pi pi-star',
                    url: 'https://react.dev/'
                },
                {
                    label: 'Vite.js',
                    icon: 'pi pi-bookmark',
                    url: 'https://vite.dev/'
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
        Items with navigation are defined with <i>command</i> and <i>url</i> property to be able to use a router link component, an
        external link or programmatic navigation.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <PanelMenu model={items} class="w-full md:w-20rem" />
</div>
<DocSectionCode {code} />
