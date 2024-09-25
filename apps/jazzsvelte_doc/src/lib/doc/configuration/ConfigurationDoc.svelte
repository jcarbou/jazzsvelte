<script lang="ts">
    import DocPage from '../common/DocPage.svelte'
    import AppendToDoc from './AppendToDoc.svelte'
    //import CSSTransitionDoc from './CSSTransitionDoc.svelte'
    import FilterMatchModeDoc from './FilterMatchModeDoc.svelte'
    import HideOverlaysDoc from './HideOverlaysDoc.svelte'
    import InputStyleDoc from './InputStyleDoc.svelte'
    import AddLocaleDoc from './locale/AddLocaleDoc.svelte'
    import ImportDoc from './locale/ImportDoc.svelte'
    import RepositoryDoc from './locale/RepositoryDoc.svelte'
    import SetLocaleDoc from './locale/SetLocaleDoc.svelte'
    import SetupLocaleDoc from './locale/SetupLocaleDoc.svelte'
    import NonceDoc from './NonceDoc.svelte'
    import NullSortOrderDoc from './NullSortOrderDoc.svelte'
    import RippleDoc from './RippleDoc.svelte'
    // import StyleContainer from './StyleContainer.svelte'
    import ZIndexDoc from './ZIndexDoc.svelte'

    const docs = [
        {
            id: 'appendto',
            label: 'AppendTo',
            component: AppendToDoc
        },
        /*{
            id: 'stylecontainer',
            label: 'StyleContainer',
            component: StyleContainer
        },*/
        /*{
            id: 'csstransition',
            label: 'CSS Transition',
            component: CSSTransitionDoc
        },*/
        {
            id: 'filtermatchmode',
            label: 'Filter Mode',
            component: FilterMatchModeDoc
        },
        {
            id: 'hideoverlays',
            label: 'Hide Overlays on Viewport Change',
            component: HideOverlaysDoc
        },
        {
            id: 'inputstyle',
            label: 'InputStyle',
            component: InputStyleDoc
        },
        {
            id: 'nonce',
            label: 'Nonce',
            component: NonceDoc
        },
        {
            id: 'nullsortorder',
            label: 'Null Sort Order',
            component: NullSortOrderDoc
        },
        {
            id: 'ripple',
            label: 'Ripple',
            component: RippleDoc
        },
        {
            id: 'zindex',
            label: 'ZIndex',
            component: ZIndexDoc
        },
        {
            id: 'Locale',
            label: 'Locale',
            children: [
                {
                    id: 'setup',
                    label: 'Setup',
                    component: SetupLocaleDoc
                },
                {
                    id: 'import',
                    label: 'Import',
                    component: ImportDoc
                },
                {
                    id: 'setlocale',
                    label: 'Set Locale',
                    component: SetLocaleDoc
                },
                {
                    id: 'addlocale',
                    label: 'Add Locale',
                    component: AddLocaleDoc
                },
                {
                    id: 'repositorydoc',
                    label: 'Repository',
                    component: RepositoryDoc
                }
            ]
        }
    ]
</script>

<svelte:head>
    <title>Getting Started - JazzSvelte</title>
    <meta name="description" content="JazzSvelte is a rich set of open source components for Svelte." />
</svelte:head>

<DocPage {docs}>
    <svelte:fragment slot="intro">
        <h1>Configuration - JazzSvelte</h1>
        <p>Global configuration options of the components.</p>
    </svelte:fragment>
</DocPage>
