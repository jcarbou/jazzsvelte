<script lang="ts">
    import { run } from 'svelte/legacy'

    import { setContext } from 'svelte'
    import type { LinkTargets, ApiDocs, Doc } from './doc.types'
    import { apiDataToDocs } from '$lib/doc/common/doc.utils'
    import DocApiSection from './DocApiSection.svelte'
    import DocSectionNav from './DocSectionNav.svelte'
    import DocSections from './DocSections.svelte'
    import type { ApiDocData } from '@jazzsvelte/api'

    interface Props {
        className?: string
        title: string
        description: string
        hideTabMenu?: boolean
        header: string
        themingDocs?: Doc[]
        apiDocData?: ApiDocData[] | null
        apiExclude?: { [key: string]: string } | null
        ptDescription?: string | null
        ptDocs?: Doc[] | null
        docs?: Doc[]
        ptConfigDoc?: Doc | null
    }

    let {
        className = '',
        title,
        description,
        hideTabMenu = false,
        header,
        themingDocs = [],
        apiDocData = null,
        apiExclude = null,
        ptDescription = null,
        ptDocs = null,
        docs = [],
        ptConfigDoc = null
    }: Props = $props()

    let mainTitle = $derived(
        header.startsWith('use') ? 'HOOK' : header === 'PassThrough' || header === 'Configuration' ? 'OVERVIEW' : 'FEATURES'
    )
    let componentDocs: Doc[] = $derived(ptConfigDoc ? [ptConfigDoc, ...docs] : docs)
    let apiDocs: ApiDocs[] | null = $derived(apiDocData?.map((data) => apiDataToDocs(data)) || null)
    let _apiDocs: Doc[] | null = $derived(apiDocs ? apiDocs.map((apiDoc) => apiDoc.doc) : null)

    let tab: number = $state(0)

    setContext('apiData', apiDocData)

    const activateTab = (i: number) => {
        tab = i
    }

    $effect(() => {
        if (_apiDocs && apiDocs) {
            setContext<Doc[]>('apiDocs', _apiDocs)
            setContext<LinkTargets>(
                'apiDocsLinkTargets',
                apiDocs.reduce((targets, apiDoc) => ({ ...targets, ...apiDoc.linkTargets }), {})
            )
        }
    })
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
</svelte:head>

<div class="doc-component {className}">
    {#if !hideTabMenu}
        <ul class="doc-tabmenu">
            <li class:doc-tabmenu-active={tab === 0}>
                <button type="button" onclick={() => activateTab(0)}>
                    {mainTitle}
                </button>
            </li>
            <li class:doc-tabmenu-active={tab === 1}>
                <button type="button" onclick={() => activateTab(1)}> API </button>
            </li>
            {#if themingDocs}
                <li class:doc-tabmenu-active={tab === 2}>
                    <button type="button" onclick={() => activateTab(2)}> THEMING </button>
                </li>
            {/if}
            {#if ptDocs}
                <li class:doc-tabmenu-active={tab === 3}>
                    <button type="button" onclick={() => activateTab(3)}> PASS THROUGH </button>
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
                {#if _apiDocs}
                    <DocApiSection {header} docs={_apiDocs} />
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
                            {#if ptDescription}
                                <p>{ptDescription}</p>
                            {/if}
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

    @media screen and (max-width: 575px) {
        .doc-tabmenu {
            li {
                flex: 1 1 0;

                button {
                    width: 100%;
                    min-width: auto;
                }
            }
        }
    }
</style>
