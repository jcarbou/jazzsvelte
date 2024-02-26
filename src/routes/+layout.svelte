<script>
    import { JAZZ_SVELTE_CONTEXT } from '$lib/components/api/JazzSvelteContext'
    import { inputStyle, ripple, news } from '$lib/layout/layoutStore'
    import NewsSection from '$lib/layout/NewsSection.svelte'
    import TopBar from '$lib/layout/TopBar.svelte'
    import '../app.css'
    import './layout.css'

    const { themePath } = JAZZ_SVELTE_CONTEXT
</script>

<svelte:head>
    <link rel="stylesheet" href="themes/{$themePath}/theme.css" />
    <link rel="stylesheet" href="/primeicons.css" />

    <title>JazzSvelte - Svelte UI Component Library</title>
    <meta charSet="UTF-8" />
    <meta name="description" content="The ultimate collection of design-agnostic, flexible and accessible Svelte UI Components." />
    <meta name="robots" content="index, follow" />
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <meta name="twitter:card" content="summary_large_image" />
    <!--
		<meta name="twitter:site" content="@primereact" />
		<meta name="twitter:title" content="PrimeReact | React UI Component Library" />
		<meta name="twitter:description" content="The ultimate collection of design-agnostic, flexible and accessible React UI Components." />
	-->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="JazzSvelte | Svelte UI Component Library" />
    <meta property="og:url" content="https://jazzSvelte.org" />
    <meta property="og:description" content="The ultimate collection of design-agnostic, flexible and accessible Svelte UI Components." />
    <!--<meta property="og:image" content="https://www.primefaces.org/static/social/primereact-preview.jpg"/>-->
    <meta property="og:ttl" content="604800" />
    <link rel="icon" href="/favicon.png" type="image/png" />
</svelte:head>

<div class:layout-news-active={$news} class:p-input-filled={$inputStyle === 'filled'} class:p-ripple-disabled={$ripple === false}>
    <NewsSection />
    <TopBar />
    <div class="layout-content">
        <div class="layout-content-slot">
            <slot />
        </div>
    </div>
</div>

<style>
    .layout-news-active .layout-topbar {
        top: 2rem;
    }

    .layout-news-active .layout-sidebar,
    .layout-news-active .doc-section-nav {
        top: 8rem;
    }

    .layout-news-active .layout-content {
        padding-top: 8rem;
    }

    .layout-news-active .doc-section-label,
    .layout-news-active .doc-table tbody td .doc-option-name,
    .layout-news-active .doc-table tbody td > i {
        scroll-margin-top: 8.5rem;
    }
</style>
