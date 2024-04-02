<script lang="ts">
    import { JAZZ_SVELTE } from '$lib/components/api/JazzSvelte'
    import JazzSvelte from '$lib/components/api/JazzSvelte.svelte'
    import { inputStyle, ripple, news } from '$lib/layout/layoutStore'
    import NewsSection from '$lib/layout/newsSection/NewsSection.svelte'
    import Sidebar from '$lib/layout/sidebar/Sidebar.svelte'
    import TopBar from '$lib/layout/topbar/TopBar.svelte'
    import '../app.css'
    import '../core.css'
    import './layout.css'

    const { darkMode } = JAZZ_SVELTE
</script>

<JazzSvelte />

<svelte:head>
    <link rel="stylesheet" href="https://unpkg.com/primeflex@latest/primeflex.css" />
    <link rel="stylesheet" href="/primeicons.css" />

    <title>JazzSvelte - Svelte UI Component Library</title>
    <meta charSet="UTF-8" />
    <meta
        name="description"
        content="The ultimate collection of design-agnostic, flexible and accessible Svelte UI Components."
    />
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
    <meta
        property="og:description"
        content="The ultimate collection of design-agnostic, flexible and accessible Svelte UI Components."
    />
    <!--<meta property="og:image" content="https://www.primefaces.org/static/social/primereact-preview.jpg"/>-->
    <meta property="og:ttl" content="604800" />
    <link rel="icon" href="/favicon.png" type="image/png" />
</svelte:head>

<div
    class="layout-wrapper"
    class:layout-light={!$darkMode}
    class:layout-darkt={$darkMode}
    class:p-input-filled={$inputStyle === 'filled'}
    class:p-ripple-disabled={$ripple === false}
>
    <NewsSection />
    <TopBar />
    <div class="layout-content" class:layout-news-active={$news}>
        <Sidebar />
        <div class="layout-content-slot">
            <slot />
        </div>
    </div>
</div>

<style>
    :global(html) {
        font-size: 14px;
    }
    :global(body) {
        background-color: var(--surface-ground);
    }
    .layout-content {
        padding: 6rem 4rem 0;
        display: flex;
    }
    :global(.card) {
        background: var(--surface-card);
        border: var(--card-border);
        padding: 2rem;
        border-radius: 10px;
        margin-bottom: 1rem;
    }
    .layout-content.layout-news-active {
        padding-top: 6.5rem;
    }
    .layout-content-slot {
        flex: 1 1 auto;
        width: 1%;
        padding-top: 0.5rem;
    }
    .layout-wrapper {
        background-color: var(--surface-ground);
    }
</style>
