<script lang="ts">
    import type { Doc } from './doc.types'
    import DocApiSection from './DocApiSection.svelte'
    import DocSectionNav from './DocSectionNav.svelte'
    import DocSections from './DocSections.svelte'

    export let className: string = ''
    export let title: string
    export let description: string
    export let hideTabMenu: boolean = false
    export let header: string
    export let themingDocs: Doc[] = []
    export let apiDocs: string[]
    export let apiExclude: { [key: string]: string } | null = null
    export let ptDescription: string | null = null
    export let ptDocs: Doc[] | null = null
    export let componentDocs: Doc[] = []

    let tab: number = 0
    let mainTitle = ''

    const activateTab = (i: number) => {
        tab = i
    }

    $: {
        if (header.startsWith('use')) mainTitle = 'HOOK'
        else if (header === 'PassThrough' || header === 'Configuration') mainTitle = 'OVERVIEW'
        else mainTitle = 'FEATURES'
    }
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
</svelte:head>

<div class="doc-component {className}">
    {#if !hideTabMenu}
        <ul class="doc-tabmenu">
            <li class:doc-tabmenu-active={tab === 0}>
                <button type="button" on:click={() => activateTab(0)}>
                    {mainTitle}
                </button>
            </li>
            <li class:doc-tabmenu-active={tab === 1}>
                <button type="button" on:click={() => activateTab(1)}> API </button>
            </li>
            {#if themingDocs}
                <li class:doc-tabmenu-active={tab === 2}>
                    <button type="button" on:click={() => activateTab(2)}> THEMING </button>
                </li>
            {/if}
            {#if ptDocs}
                <li class:doc-tabmenu-active={tab === 3}>
                    <button type="button" on:click={() => activateTab(3)}> PASS THROUGH </button>
                </li>
            {/if}
        </ul>
    {/if}
    <div class="doc-tabpanels">
        {#if tab === 0}
            <div class="doc-tabpanel">
                <div class="doc-main">
                    <div class="doc-intro">
                        <h1>{header}</h1>
                        <p>{@html description}</p>
                    </div>
                    <DocSections docs={componentDocs} />
                </div>
                <DocSectionNav docs={componentDocs} />
            </div>
        {:else if tab === 1}
            <div class="doc-tabpanel">
                {#if apiDocs}
                    <DocApiSection {header} docNames={apiDocs} exclude={apiExclude} />
                {:else}
                    <div class="doc-main">
                        <div class="doc-intro">
                            <h1>{header} API</h1>
                            <p>{header} is a CSS feature so does not provide a Javascript API</p>
                        </div>
                    </div>
                {/if}
            </div>
        {:else if tab === 2}
            {#if themingDocs}
                <div class="doc-tabpanel">
                    <div class="doc-main">
                        <div class="doc-intro">
                            <h1>{header} Theming</h1>
                        </div>
                        <DocSections docs={themingDocs} />
                    </div>
                    <DocSectionNav docs={themingDocs} />
                </div>
            {/if}
        {:else if tab === 3}
            {#if ptDocs}
                <div class="doc-tabpanel">
                    <div class="doc-main">
                        <div class="doc-intro">
                            <h1>{header} Pass Through</h1>
                            <p>{ptDescription}</p>
                        </div>
                        <DocSections docs={ptDocs} />
                    </div>
                    <DocSectionNav docs={ptDocs} />
                </div>
            {/if}
        {/if}
    </div>
</div>

<style lang="scss">
    .doc-tabpanel {
        display: flex;
    }
    .doc-main {
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0;
        min-width: 0;
    }
    .doc-intro {
        margin-bottom: 1.5rem;

        :global(p) {
            font-size: 1.125rem;
            color: var(--surface-900);
            margin: 0;
        }
    }
    .doc-tabmenu {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        margin-bottom: 2rem;
        overflow: auto;
        position: relative;

        &:after {
            display: block;
            position: absolute;
            bottom: 0;
            width: 100%;
            border-bottom: 1px solid var(--surface-border);
            content: '';
        }

        li {
            position: relative;
            z-index: 1;

            button {
                background-color: transparent;
                border: 0 none;
                display: block;
                padding: 0 2rem 1rem 2rem;
                text-align: center;
                color: var(--surface-700);
                font-size: 1rem;
                letter-spacing: 1px;
                cursor: pointer;
                margin: 0;
                transition: all 0.2s;
                border-bottom: 1px solid transparent;
                border-top-right-radius: var(--border-round);
                border-top-left-radius: var(--border-round);
                white-space: nowrap;

                &:hover {
                    border-bottom-color: var(--surface-500);
                }

                &:focus {
                    outline: 0 none;
                }

                &:focus-visible {
                    outline: 0 none;
                    outline-offset: 0;
                    box-shadow: var(--focus-ring);
                }
            }

            &.doc-tabmenu-active {
                button {
                    border-bottom-color: var(--primary-color);
                    color: var(--primary-color);
                }
            }
        }

        &::-webkit-scrollbar {
            display: none;
        }
    }
</style>
