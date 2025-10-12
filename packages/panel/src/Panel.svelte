<script lang="ts">
    import type { PanelPassThroughMethodOptions, PanelProps } from './panel.types'
    import type { ResolvedIconPT, PassThroughOptions } from '@jazzsvelte/api'

    import { resolveButtonPt, resolveDivPt, resolveIconPT, resolveSpanPt } from '@jazzsvelte/api'
    import { defaultPanelProps as DEFAULT, globalPanelPT as globalPt } from './panel.config'
    import { uniqueId } from '../../utils/src'
    import PanelToggler from './PanelToggler.svelte'
    import { slide } from 'svelte/transition'

    let {
        class: className = DEFAULT.class,
        collapsed = $bindable(DEFAULT.collapsed),
        collapseIcon = DEFAULT.collapseIcon,
        expandIcon = DEFAULT.expandIcon,
        footer = DEFAULT.footer,
        footerSnippet = DEFAULT.footerSnippet,
        footerContainerSnippet = null,
        header = DEFAULT.header,
        headerSnippet = DEFAULT.headerSnippet,
        headerContainerSnippet = null,
        icons = null,
        onCollapse = DEFAULT.onCollapse,
        onExpand = DEFAULT.onExpand,
        onToggle = DEFAULT.onToggle,
        toggleable = DEFAULT.toggleable,
        unstyled = DEFAULT.unstyled,
        pt = null,
        ptOptions = null,
        style = DEFAULT.style,
        children,
        ..._restProps
    }: PanelProps = $props()

    let _props: PanelProps = $derived({
        class: className,
        collapsed,
        collapseIcon,
        expandIcon,
        footer,
        header,
        onCollapse,
        onExpand,
        onToggle,
        toggleable,
        unstyled,
        pt,
        ptOptions,
        style
    })

    export const displayName = 'Panel'

    const id = uniqueId('panel_')
    const headerId = `${id}_header`
    const titleId = `${id}_title`
    const contentId = `${id}_content`
    const buttonId = `${id}_label`

    let panelEl: HTMLDivElement
    let contentEl: HTMLDivElement

    export function getElement(): HTMLDivElement {
        return panelEl
    }
    export function getContent(): HTMLDivElement {
        return contentEl
    }
    export function toggle(event?: Event): void {
        _toggle(event)
    }

    export function expand(event?: Event): void {
        _expand(event)
    }

    export function collapse(event?: Event): void {
        _collapse(event)
    }

    function _expand(event?: Event): void {
        collapsed = false
        event && onExpand?.(event)
    }

    function _collapse(event?: Event): void {
        collapsed = true
        event && onCollapse?.(event)
    }

    function _toggle(event?: Event): void {
        if (!toggleable) {
            return
        }

        collapsed ? _expand(event) : _collapse(event)

        if (event) {
            onToggle?.({
                originalEvent: event,
                value: !collapsed
            })

            event.preventDefault()
        }
    }

    let ptContext = $derived({
        props: _props,
        state: {
            id,
            collapsed
        },
        ptOptions,
        unstyled
    } satisfies PanelPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    })

    // "root element"
    let rootAttributes = $derived(
        resolveDivPt(
            {
                class: [
                    'p-panel p-component',
                    className,
                    {
                        'p-panel-toggleable': toggleable
                    }
                ],
                style,
                'data-pc-name': 'panel',
                'data-pc-section': 'root',
                id
            },
            pt?.root,
            globalPt?.root,
            ptContext
        )
    )

    // "header" element
    let headerAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-panel-header'],
                'data-pc-section': 'header',
                id: headerId
            },
            pt?.header,
            globalPt?.header,
            ptContext
        )
    )

    // "title" element
    let titleAttributes = $derived(
        resolveSpanPt(
            {
                class: ['p-panel-title'],
                'data-pc-section': 'title',
                id: titleId
            },
            pt?.title,
            globalPt?.title,
            ptContext
        )
    )

    // "icons" element
    let iconsAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-panel-icons'],
                'data-pc-section': 'icons'
            },
            pt?.icons,
            globalPt?.icons,
            ptContext
        )
    )

    // "toggler" element
    let togglerAttributes = $derived(
        resolveButtonPt(
            {
                class: ['p-panel-header-icon p-panel-toggler p-link'],
                'data-pc-section': 'toggler',
                id: buttonId,
                'aria-controls': contentId,
                'aria-expanded': !collapsed,
                role: 'button',
                'aria-label': typeof header === 'string' ? header : null
            },
            pt?.toggler,
            globalPt?.toggler,
            ptContext
        )
    )

    // "toggleableContent" element
    let toggleableContentAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-toggleable-content'],
                'data-pc-section': 'toggleableContent',
                'aria-hidden': collapsed,
                role: 'region',
                id: contentId,
                'aria-labelledby': headerId
            },
            pt?.toggleableContent,
            globalPt?.toggleableContent,
            ptContext
        )
    )

    // "content" element
    let contentAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-panel-content'],
                'data-pc-section': 'content'
            },
            pt?.content,
            globalPt?.content,
            ptContext
        )
    )

    // "footer" element
    let footerAttributes = $derived(
        resolveDivPt(
            {
                class: ['p-panel-footer'],
                'data-pc-section': 'footer'
            },
            pt?.footer,
            globalPt?.footer,
            ptContext
        )
    )

    // "togglerIcon" element
    let resolvedExpandIcon = $derived(
        resolveIconPT(
            expandIcon,
            {
                class: ['p-icon']
            },
            pt?.togglerIcon,
            globalPt?.togglerIcon,
            ptContext
        )
    )

    // "togglerIcon" element
    let resolvedCollapseIcon = $derived(
        resolveIconPT(
            collapseIcon,
            {
                class: ['p-icon']
            },
            pt?.togglerIcon,
            globalPt?.togglerIcon,
            ptContext
        )
    )

    let _headerContainerSnippet = $derived(headerContainerSnippet || defaultHeaderContainerSnipppet)
    let _footerContainerSnippet = $derived(footerContainerSnippet || defaultFooterContainerSnippet)

    let resolvedTogglerIcon: ResolvedIconPT = $derived(collapsed ? resolvedExpandIcon : resolvedCollapseIcon)
</script>

<div bind:this={panelEl} {...rootAttributes} {..._restProps}>
    <!-- Header  -->

    {@render _headerContainerSnippet({
        headerAttributes,
        titleAttributes,
        iconsAttributes,
        togglerAttributes,
        resolvedTogglerIcon,
        header,
        headerSnippet,
        toggle,
        icons,
        toggleable,
        collapsed
    })}

    <!-- Content  -->

    {#if !collapsed}
        <div bind:this={contentEl} transition:slide={{ duration: 300 }} {...toggleableContentAttributes}>
            <div {...contentAttributes}>{@render children?.()}</div>
        </div>
    {/if}

    <!-- Footer  -->

    {#if footerContainerSnippet || footerSnippet || footer}
        {@render _footerContainerSnippet({
            footerAttributes,
            footer,
            footerSnippet
        })}
    {/if}
</div>

{#snippet defaultHeaderContainerSnipppet()}
    {#if headerSnippet || header || toggleable}
        <div {...headerAttributes}>
            <span {...titleAttributes}>
                {#if headerSnippet}
                    {@render headerSnippet({ toggle, collapsed })}
                {:else}
                    {header}
                {/if}
            </span>
            <div {...iconsAttributes}>
                {#if icons}
                    {@render icons?.({ toggle, collapsed })}
                {/if}
                {#if toggleable}
                    <PanelToggler {togglerAttributes} {toggle} {resolvedTogglerIcon} />
                {/if}
            </div>
        </div>
    {/if}
{/snippet}

{#snippet defaultFooterContainerSnippet()}
    <div {...footerAttributes}>
        {#if footerSnippet}
            {@render footerSnippet()}
        {:else}
            {footer}
        {/if}
    </div>
{/snippet}

<style>
    @layer primereact {
        :global(.p-panel-header) {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        :global(.p-panel-title) {
            line-height: 1;
        }

        :global(.p-panel-header-icon) {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            text-decoration: none;
            overflow: hidden;
            position: relative;
        }
    }
</style>
