<script lang="ts">
    import DocSectionNav from '$lib/doc/common/DocSectionNav.svelte'
    import DocSections from '$lib/doc/common/DocSections.svelte'
    import DownloadDoc from '$lib/doc/installation/DownloadDoc.svelte'
    import ExamplesDoc from '$lib/doc/installation/ExamplesDoc.svelte'
    import StyledModeDoc from '$lib/doc/installation/StyledModeDoc.svelte'
    import UnstyledModeDoc from '$lib/doc/installation/UnstyledModeDoc.svelte'
    //import UsageDoc from '$lib/doc/installation/UsageDoc.svelte'
    import ContextDoc from '$lib/doc/installation/ContextDoc.svelte'
    import DocPage from '$lib/doc/common/DocPage.svelte'

    const docs = [
        {
            id: 'download',
            label: 'Download',
            component: DownloadDoc
        },
        {
            id: 'context',
            label: 'Context',
            component: ContextDoc
        },
        /*{
            id: 'usage',
            label: 'Usage',
            component: UsageDoc
        },*/
        {
            id: 'theming',
            label: 'Theming',
            description: 'JazzSvelte has two theming has modes; styled or unstyled.',
            children: [
                {
                    id: 'styled',
                    label: 'Styled Mode',
                    component: StyledModeDoc
                },
                {
                    id: 'unstyled',
                    label: 'Unstyled Mode',
                    component: UnstyledModeDoc
                }
            ]
        },
        {
            id: 'examples',
            label: 'Examples',
            component: ExamplesDoc
        }
    ]
</script>

<svelte:head>
    <title>Getting Started - JazzSvelte</title>
    <meta name="description" content="JazzSvelte is a rich set of open source components for Svelte." />
</svelte:head>

<DocPage {docs}>
    <svelte:fragment slot="intro">
        <h1>Installation</h1>
        <p>JazzSvelte is a rich set of open source UI components for Svelte.</p>
        <p class="text-red-600 font-bold">
            Installation is not already available. JazzSveltezsvelte is an "under construction" project not already build
        </p>
    </svelte:fragment>
</DocPage>
