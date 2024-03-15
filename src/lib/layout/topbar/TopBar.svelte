<script lang="ts">
    import { JAZZ_SVELTE } from '$lib/components/api/JazzSvelte'
    import { news, configButton, config, sideBarButton, sideBar } from '$lib/layout/layoutStore'
    import TopBarButton from './TopBarButton.svelte'
    import TopBarLinkButton from './TopBarLinkButton.svelte'
    import VersionDropdown from './VersionDropdown.svelte'

    const { darkMode } = JAZZ_SVELTE

    let scrolled = false
</script>

<svelte:window on:scroll={() => (scrolled = window.scrollY > 0)} />

<div class="layout-topbar" class:layout-topbar-sticky={scrolled} class:layout-news-active={$news}>
    <div class="layout-topbar-inner">
        <div class="layout-topbar-logo-container">
            <a href="/" class="layout-topbar-logo" aria-label="PrimeReact logo">
                <img src="/logo.svg" height="35" alt="JazzSvelte" />
            </a>
        </div>

        <ul class="flex list-none m-0 p-0 gap-2 items-center">
            <li>
                <!--<DocSearch appId="SCRI13XXZO" apiKey="ea9e6c8a983c5646d6b9079921d4aed7" indexName="primereact" container="" debug={false} transformItems={handleDocSearchTransformItems} />-->
                TODO : Doc search
            </li>
            <li>
                <TopBarLinkButton icon="github" href="https://github.com/jcarbou/jazzsvelte" />
            </li>
            <li>
                <TopBarLinkButton icon="discord" href="https://discord.gg" />
            </li>
            <li>
                <TopBarLinkButton icon="comments" href="https://github.com/jcarbou/jazzsvelte/discussions" />
            </li>
            <li>
                <TopBarButton icon={$darkMode ? 'sun' : 'moon'} on:click={() => darkMode.toggle()} />
            </li>
            {#if $configButton}
                <li>
                    <TopBarButton icon="palette" on:click={() => config.show()} />
                </li>
            {/if}

            <li class="relative">
                <VersionDropdown />
            </li>
            {#if sideBarButton}
                <li class="menu-button">
                    <TopBarButton icon="bars" on:click={() => sideBar.show()} />
                </li>
            {/if}
        </ul>
    </div>
</div>

<style>
    .layout-topbar {
        position: fixed;
        top: 0;
        left: 0;
        width: calc(100% - var(--scrollbar-width, 0px));
        z-index: 1100;
        transition:
            background-color 0.5s,
            border-color 0.5s;
        border-bottom: 1px solid transparent;
    }

    .layout-topbar.layout-news-active {
        top: 2rem;
    }

    .layout-topbar.layout-topbar-sticky {
        border-bottom: 1px solid var(--surface-border);
        background-color: var(--topbar-sticky-bg);
        backdrop-filter: blur(8px);
    }

    .layout-topbar-inner {
        height: 4rem;
        padding: 0 4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .layout-topbar-inner .layout-topbar-logo-container {
        width: 250px;
        margin-right: 4rem;
    }

    .layout-topbar-inner .layout-topbar-logo,
    .layout-topbar-inner .layout-topbar-icon {
        border-radius: var(--border-radius);
    }

    .layout-topbar-inner .layout-topbar-logo:focus-visible,
    .layout-topbar-inner .layout-topbar-icon:focus-visible {
        outline: 0 none;
        outline-offset: 0;
        box-shadow: var(--focus-ring);
    }

    .layout-topbar-inner .layout-topbar-logo {
        display: inline-flex;
    }

    .layout-topbar-inner .layout-topbar-logo svg {
        width: 165px;
    }

    .layout-topbar-inner .layout-topbar-icon {
        display: none;
    }

    .layout-topbar-inner .layout-topbar-icon svg {
        width: 36px;
    }
</style>
