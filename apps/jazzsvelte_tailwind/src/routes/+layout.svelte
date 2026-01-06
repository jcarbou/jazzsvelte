<script lang="ts">
    import { JazzSvelte } from '@jazzsvelte/api'
    import { Toast } from '@jazzsvelte/toast'
    import { inputStyle, ripple } from '$lib/layout/layoutStore'
    import Sidebar from '$lib/layout/sidebar/Sidebar.svelte'
    import '../app.css'
    import '../core.css'
    import './layout.css'

    // Import component PT
    import '$lib/pt/panelMenu.pt'
    import '$lib/pt/steps.pt'
    import '$lib/pt/toast.pt'
    import '$lib/pt/tag.pt'
    import '$lib/pt/skeleton.pt'
    import '$lib/pt/scrollTop.pt'
    import '$lib/pt/ripple.pt'
    import '$lib/pt/progressSpinner.pt'
    import '$lib/pt/progressBar.pt'
    import '$lib/pt/meterGroup.pt'
    import '$lib/pt/inplace.pt'
    import '$lib/pt/chip.pt'
    import '$lib/pt/blockUi.pt'
    import '$lib/pt/avatarGroup.pt'
    import '$lib/pt/avatar.pt'
    import '$lib/pt/messages.pt'
    import '$lib/pt/message.pt'
    import '$lib/pt/tieredMenu.pt'
    import '$lib/pt/tabMenu.pt'
    import '$lib/pt/tooltip.pt'
    import '$lib/pt/panel.pt'
    import '$lib/pt/card.pt'
    import '$lib/pt/virtualScroller.pt'
    import '$lib/pt/splitButton.pt'
    import '$lib/pt/speedDial.pt'
    import '$lib/pt/inputText.pt'
    import '$lib/pt/button.pt'
    import '$lib/pt/badge.pt'
</script>

<svelte:head>
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
    <meta property="og:type" content="website" />
    <meta property="og:title" content="JazzSvelte | Svelte UI Component Library" />
    <meta property="og:url" content="https://jazzSvelte.org" />
    <meta
        property="og:description"
        content="The ultimate collection of design-agnostic, flexible and accessible Svelte UI Components."
    />
    <meta property="og:ttl" content="604800" />
    <link rel="icon" href="/favicon.png" type="image/png" />
</svelte:head>

<JazzSvelte
    config={{
        unstyled: true
    }}
>
    <div
        class="layout-wrapper layout-light"
        class:p-input-filled={$inputStyle === 'filled'}
        class:p-ripple-disabled={$ripple === false}
    >
        <div class="layout-content">
            <Sidebar />
            <div class="layout-content-slot">
                <slot />
            </div>
        </div>
    </div>
    <Toast />
    <Toast id="topLeft" position="top-left" />
    <Toast id="topCenter" position="top-center" />
    <Toast id="topRight" position="top-right" />
    <Toast id="center" position="center" />
    <Toast id="bottomLeft" position="bottom-left" />
    <Toast id="bottomCenter" position="bottom-center" />
    <Toast id="bottomRight" position="bottom-right" />
</JazzSvelte>

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
    .layout-content-slot {
        flex: 1 1 auto;
        width: 1%;
        padding-top: 0.5rem;
    }
    .layout-wrapper {
        background-color: var(--surface-ground);
    }
</style>
