<script lang="ts">
    import DocSectionNav from '$lib/doc/common/DocSectionNav.svelte'
    import DocSections from '$lib/doc/common/DocSections.svelte'
    import DownloadDoc from '$lib/doc/installation/DownloadDoc.svelte'
    import ExamplesDoc from '$lib/doc/installation/ExamplesDoc.svelte'
    import StyledModeDoc from '$lib/doc/installation/StyledModeDoc.svelte'
    import UnstyledModeDoc from '$lib/doc/installation/UnstyledModeDoc.svelte'
    //import UsageDoc from '$lib/doc/installation/UsageDoc.svelte'
    import ContextDoc from '$lib/doc/installation/ContextDoc.svelte'

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
            description: 'PrimeReact has two theming has modes; styled or unstyled.',
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
    <title>Getting Started - PrimeReact</title>
    <meta name="description" content="PrimeReact is a rich set of open source components for React." />
</svelte:head>
<div class="doc">
    <div class="doc-main">
        <div class="doc-intro">
            <h1>Installation</h1>
            <p>PrimeReact is a rich set of open source UI components for React.</p>
        </div>
        <DocSections {docs} />
    </div>
    <DocSectionNav {docs} />
</div>
