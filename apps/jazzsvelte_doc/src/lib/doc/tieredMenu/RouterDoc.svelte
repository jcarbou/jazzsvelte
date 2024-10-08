<script lang="ts">
    import { goto } from '$app/navigation'
    import { importExt, importJS, importObject, importTS } from '../common/doc.utils'
    import DocSectionCode from '$lib/doc/common/DocSectionCode.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import { TieredMenu } from '@jazzsvelte/tiered_menu'

    import type { DocSection } from '$lib/doc/common/doc.types'
    import type { MenuItem } from '@jazzsvelte/api'

    export let docSection: DocSection

    const items: MenuItem[] = [
        {
            label: 'Router',
            icon: 'pi pi-palette',
            items: [
                {
                    label: 'Styled',
                    url: '/theming'
                },
                {
                    label: 'Unstyled',
                    url: '/unstyled'
                }
            ]
        },
        {
            label: 'Programmatic',
            icon: 'pi pi-link',
            command: () => goto('/installation')
        },
        {
            label: 'External',
            icon: 'pi pi-home',
            items: [
                {
                    label: 'Svelte',
                    url: 'https://svelte.dev//'
                },
                {
                    label: 'Vite.js',
                    url: 'https://vitejs.dev/'
                }
            ]
        }
    ]

    const code = {
        basic: `
<TieredMenu model={items} breakpoint="767px" />
        `,
        javascript: `
${importJS(
    'TieredMenu',
    importExt('goto', '$app/navigation'),
    `
    const items = [
        {
            label: 'Router',
            icon: 'pi pi-palette',
            items: [
                {
                    label: 'Styled',
                    url: '/theming'
                },
                {
                    label: 'Unstyled',
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
                    url: 'https://react.dev/'
                },
                {
                    label: 'Vite.js',
                    url: 'https://vitejs.dev/'
                }
            ]
        }
    ]`
)}
        
<TieredMenu model={items} breakpoint="767px" />
        `,
        typescript: `
${importTS(
    'TieredMenu',
    importObject('MenuItem', 'api'),
    importExt('goto', '$app/navigation'),
    `
    const items: MenuItem = [
        {
            label: 'Router',
            icon: 'pi pi-palette',
            items: [
                {
                    label: 'Styled',
                    url: '/theming'
                },
                {
                    label: 'Unstyled',
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
                    url: 'https://react.dev/'
                },
                {
                    label: 'Vite.js',
                    url: 'https://vitejs.dev/'
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
        Items with navigation are defined with <i>command</i> and <i>url</i> property to be able to use a router link component, an
        external link or programmatic navigation.
    </p>
</DocSectionText>
<div class="card flex justify-content-center">
    <TieredMenu model={items} breakpoint="767px" />
</div>
<DocSectionCode {code} />
