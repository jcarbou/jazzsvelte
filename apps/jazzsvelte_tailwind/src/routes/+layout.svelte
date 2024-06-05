<script lang="ts">
    import { JazzSvelte, classNames } from '@jazzsvelte/api'
    import { Toast } from '@jazzsvelte/toast'
    import { inputStyle, ripple } from '$lib/layout/layoutStore'
    import Sidebar from '$lib/layout/sidebar/Sidebar.svelte'
    import '../app.css'
    import '../core.css'
    import './layout.css'
    import { buttonPT } from '@jazzsvelte/button'

    buttonPT({
        root: ({ props, context }) => ({
            className: classNames(
                'items-center cursor-pointer inline-flex overflow-hidden relative select-none text-center align-bottom',
                'transition duration-200 ease-in-out',
                'focus:outline-none focus:outline-offset-0',
                {
                    'text-white dark:text-gray-900 bg-blue-500 dark:bg-blue-400 border border-blue-500 dark:border-blue-400 hover:bg-blue-600 dark:hover:bg-blue-500 hover:border-blue-600 dark:hover:border-blue-500 focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(157,193,251,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(147,197,253,0.7),0_1px_2px_0_rgba(0,0,0,0)]':
                        !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
                    'text-blue-600 bg-transparent border-transparent focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(157,193,251,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(147,197,253,0.7),0_1px_2px_0_rgba(0,0,0,0)]':
                        props.link
                },
                {
                    'focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(176,185,198,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(203,213,225,0.7),0_1px_2px_0_rgba(0,0,0,0)]':
                        props.severity === 'secondary',
                    'focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(136,234,172,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(134,239,172,0.7),0_1px_2px_0_rgba(0,0,0,0)]':
                        props.severity === 'success',
                    'focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(157,193,251,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(147,197,253,0.7),0_1px_2px_0_rgba(0,0,0,0)]':
                        props.severity === 'info',
                    'focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(250,207,133,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(252,211,77,0.7),0_1px_2px_0_rgba(0,0,0,0)]':
                        props.severity === 'warning',
                    'focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(212,170,251,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(216,180,254,0.7),0_1px_2px_0_rgba(0,0,0,0)]':
                        props.severity === 'help',
                    'focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(247,162,162,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(252,165,165,0.7),0_1px_2px_0_rgba(0,0,0,0)]':
                        props.severity === 'danger'
                },
                {
                    'text-white dark:text-gray-900 bg-gray-500 dark:bg-gray-400 border border-gray-500 dark:border-gray-400 hover:bg-gray-600 dark:hover:bg-gray-500 hover:border-gray-600 dark:hover:border-gray-500':
                        props.severity === 'secondary' && !props.text && !props.outlined && !props.plain,
                    'text-white dark:text-gray-900 bg-green-500 dark:bg-green-400 border border-green-500 dark:border-green-400 hover:bg-green-600 dark:hover:bg-green-500 hover:border-green-600 dark:hover:border-green-500':
                        props.severity === 'success' && !props.text && !props.outlined && !props.plain,
                    'text-white dark:text-gray-900 dark:bg-blue-400 bg-blue-500 dark:bg-blue-400 border border-blue-500 dark:border-blue-400 hover:bg-blue-600 hover:border-blue-600 dark:hover:bg-blue-500 dark:hover:border-blue-500':
                        props.severity === 'info' && !props.text && !props.outlined && !props.plain,
                    'text-white dark:text-gray-900 bg-orange-500 dark:bg-orange-400 border border-orange-500 dark:border-orange-400 hover:bg-orange-600 dark:hover:bg-orange-500 hover:border-orange-600 dark:hover:border-orange-500':
                        props.severity === 'warning' && !props.text && !props.outlined && !props.plain,
                    'text-white dark:text-gray-900 bg-purple-500 dark:bg-purple-400 border border-purple-500 dark:border-purple-400 hover:bg-purple-600 dark:hover:bg-purple-500 hover:border-purple-600 dark:hover:border-purple-500':
                        props.severity === 'help' && !props.text && !props.outlined && !props.plain,
                    'text-white dark:text-gray-900 bg-red-500 dark:bg-red-400 border border-red-500 dark:border-red-400 hover:bg-red-600 dark:hover:bg-red-500 hover:border-red-600 dark:hover:border-red-500':
                        props.severity === 'danger' && !props.text && !props.outlined && !props.plain
                },
                { 'shadow-lg': props.raised },
                { 'rounded-md': !props.rounded, 'rounded-full': props.rounded },
                {
                    'bg-transparent border-transparent': props.text && !props.plain,
                    'text-blue-500 dark:text-blue-400 hover:bg-blue-300/20':
                        props.text && (props.severity === null || props.severity === 'info') && !props.plain,
                    'text-gray-500 dark:text-grayy-400 hover:bg-gray-300/20':
                        props.text && props.severity === 'secondary' && !props.plain,
                    'text-green-500 dark:text-green-400 hover:bg-green-300/20':
                        props.text && props.severity === 'success' && !props.plain,
                    'text-orange-500 dark:text-orange-400 hover:bg-orange-300/20':
                        props.text && props.severity === 'warning' && !props.plain,
                    'text-purple-500 dark:text-purple-400 hover:bg-purple-300/20':
                        props.text && props.severity === 'help' && !props.plain,
                    'text-red-500 dark:text-red-400 hover:bg-red-300/20':
                        props.text && props.severity === 'danger' && !props.plain
                },
                { 'shadow-lg': props.raised && props.text },
                {
                    'text-gray-500 hover:bg-gray-300/20': props.plain && props.text,
                    'text-gray-500 border border-gray-500 hover:bg-gray-300/20': props.plain && props.outlined,
                    'text-white bg-gray-500 border border-gray-500 hover:bg-gray-600 hover:border-gray-600':
                        props.plain && !props.outlined && !props.text
                },
                {
                    'bg-transparent border': props.outlined && !props.plain,
                    'text-blue-500 dark:text-blue-400 border border-blue-500 dark:border-blue-400 hover:bg-blue-300/20':
                        props.outlined && (props.severity === null || props.severity === 'info') && !props.plain,
                    'text-gray-500 dark:text-gray-400 border border-gray-500 dark:border-gray-400 hover:bg-gray-300/20':
                        props.outlined && props.severity === 'secondary' && !props.plain,
                    'text-green-500 dark:text-green-400 border border-green-500 dark:border-green-400 hover:bg-green-300/20':
                        props.outlined && props.severity === 'success' && !props.plain,
                    'text-orange-500 dark:text-orange-400 border border-orange-500 dark:border-orange-400 hover:bg-orange-300/20':
                        props.outlined && props.severity === 'warning' && !props.plain,
                    'text-purple-500 dark:text-purple-400 border border-purple-500 dark:border-purple-400 hover:bg-purple-300/20':
                        props.outlined && props.severity === 'help' && !props.plain,
                    'text-red-500 dark:text-red-400 border border-red-500 dark:border-red-400 hover:bg-red-300/20':
                        props.outlined && props.severity === 'danger' && !props.plain
                },
                {
                    'px-4 py-3 text-base': props.size === null,
                    'text-xs py-2 px-3': props.size === 'small',
                    'text-xl py-3 px-4': props.size === 'large'
                },
                { 'flex-column': props.iconPos == 'top' || props.iconPos == 'bottom' },
                { 'opacity-60 pointer-events-none cursor-default': context.disabled }
            )
        }),
        label: ({ props }) => ({
            className: classNames(
                'flex-1',
                'duration-200',
                'font-bold',
                {
                    'hover:underline': props.link
                },
                { 'invisible w-0': props.label == null }
            )
        }),
        icon: ({ props }) => ({
            className: classNames('mx-0', {
                'mr-2': props.iconPos == 'left' && props.label != null,
                'ml-2 order-1': props.iconPos == 'right' && props.label != null,
                'mb-2': props.iconPos == 'top' && props.label != null,
                'mt-2 order-2': props.iconPos == 'bottom' && props.label != null
            })
        }),
        loadingIcon: ({ props }) => ({
            className: classNames('mx-0', {
                'mr-2': props.loading && props.iconPos == 'left' && props.label != null,
                'ml-2 order-1': props.loading && props.iconPos == 'right' && props.label != null,
                'mb-2': props.loading && props.iconPos == 'top' && props.label != null,
                'mt-2 order-2': props.loading && props.iconPos == 'bottom' && props.label != null
            })
        }),
        badge: ({ props }) => ({
            className: classNames({ 'ml-2 w-4 h-4 leading-none flex items-center justify-center': props.badge })
        })
    })
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
    <div class="layout-wrapper" class:p-input-filled={$inputStyle === 'filled'} class:p-ripple-disabled={$ripple === false}>
        <div class="layout-content">
            <Sidebar />
            <div class="layout-content-slot">
                <slot />
            </div>
        </div>
    </div>
    <Toast />
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
