<script lang="ts">
    import type { PanelPassThroughMethodOptions, PanelPassThroughOptions } from './panel.types'

    import type {
        HTMLDivAttributes,
        HTMLSpanAttributes,
        HTMLButtonAttributes,
        IconComponent,
        CssStyle,
        ResolvedIconPT,
        PassThroughOptions
    } from '@jazzsvelte/api'

    import { resolveIconPT, resolvePT } from '@jazzsvelte/api'
    import { defaultPanelProps as DEFAULT, globalPanelPT as globalPt } from './panel.config'
    import { uniqueId } from '../../utils/src'
    import PanelHeader from './PanelHeader.svelte'
    import PanelFooter from './PanelFooter.svelte'
    import { slide } from 'svelte/transition'

    export let collapsed: boolean = DEFAULT.collapsed
    export let collapseIcon: string | IconComponent | null = DEFAULT.collapseIcon
    export let expandIcon: string | IconComponent | null = DEFAULT.expandIcon
    export let footer: string | null = DEFAULT.footer
    //export let footerTemplate: typeof SvelteComponent | null = DEFAULT.footerTemplate
    export let header: string | null = DEFAULT.header
    //export let headerTemplate: typeof SvelteComponent | null = DEFAULT.headerTemplate
    //export let icons: typeof SvelteComponent | null = DEFAULT.icons
    export let onCollapse: ((event: Event) => void) | null = DEFAULT.onCollapse
    export let onExpand: ((event: Event) => void) | null = DEFAULT.onExpand
    export let onToggle: ((event: { originalEvent: Event; value: boolean }) => void) | null = DEFAULT.onToggle
    export let toggleable: boolean = DEFAULT.toggleable
    // export let togglerIcon: string | IconComponent | null = DEFAULT.togglerIcon
    export let unstyled: boolean = DEFAULT.unstyled
    export let pt: PanelPassThroughOptions | null = null
    export let ptOptions: PassThroughOptions | null = null
    export let style: CssStyle | null = DEFAULT.style
    let className: string | null = DEFAULT.class
    export { className as class }

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

    $: ptContext = {
        props: $$props,
        state: {
            id,
            collapsed
        },
        ptOptions,
        unstyled
    } satisfies PanelPassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }

    // "root element"
    $: rootAttributes = resolvePT(
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
    ) satisfies HTMLDivAttributes

    // "header" element
    $: headerAttributes = resolvePT(
        {
            class: ['p-panel-header'],
            'data-pc-section': 'header',
            id: headerId
        },
        pt?.header,
        globalPt?.header,
        ptContext
    ) satisfies HTMLDivAttributes

    // "title" element
    $: titleAttributes = resolvePT(
        {
            class: ['p-panel-title'],
            'data-pc-section': 'title',
            id: titleId
        },
        pt?.title,
        globalPt?.title,
        ptContext
    ) satisfies HTMLSpanAttributes

    // "icons" element
    $: iconsAttributes = resolvePT(
        {
            class: ['p-panel-icons'],
            'data-pc-section': 'icons'
        },
        pt?.icons,
        globalPt?.icons,
        ptContext
    ) satisfies HTMLDivAttributes

    // "toggler" element
    $: togglerAttributes = resolvePT(
        {
            class: ['p-panel-header-icon p-panel-toggler p-link'],
            'data-pc-section': 'toggler',
            id: buttonId,
            'aria-controls': contentId,
            'aria-expanded': !collapsed,
            role: 'button',
            'aria-label': header
        },
        pt?.toggler,
        globalPt?.toggler,
        ptContext
    ) satisfies HTMLButtonAttributes

    // "toggleableContent" element
    $: toggleableContentAttributes = resolvePT(
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
    ) satisfies HTMLDivAttributes

    // "content" element
    $: contentAttributes = resolvePT(
        {
            class: ['p-panel-content'],
            'data-pc-section': 'content'
        },
        pt?.content,
        globalPt?.content,
        ptContext
    ) satisfies HTMLDivAttributes

    // "footer" element
    $: footerAttributes = resolvePT(
        {
            class: ['p-panel-footer'],
            'data-pc-section': 'footer'
        },
        pt?.footer,
        globalPt?.footer,
        ptContext
    ) satisfies HTMLDivAttributes

    // "togglerIcon" element
    $: resolvedExpandIcon = resolveIconPT(
        expandIcon,
        {
            class: ['p-icon']
        },
        pt?.togglerIcon,
        globalPt?.togglerIcon,
        ptContext
    ) satisfies ResolvedIconPT

    // "togglerIcon" element
    $: resolvedCollapseIcon = resolveIconPT(
        collapseIcon,
        {
            class: ['p-icon']
        },
        pt?.togglerIcon,
        globalPt?.togglerIcon,
        ptContext
    ) satisfies ResolvedIconPT

    $: resolvedTogglerIcon = collapsed ? resolvedExpandIcon : (resolvedCollapseIcon satisfies ResolvedIconPT)
</script>

<div bind:this={panelEl} {...rootAttributes} {...$$restProps}>
    <!-- Header  -->

    {#if $$slots.header}
        <slot
            name="header"
            {headerAttributes}
            {titleAttributes}
            {iconsAttributes}
            {togglerAttributes}
            {resolvedTogglerIcon}
            {header}
            {toggle}
            {toggleable}
            {collapsed}
        >
            <slot name="header_content" target="header_content" {titleAttributes} />
            <slot name="header_icons" target="header_icons" {iconsAttributes} />
            <slot name="header_toggler" target="header_toggler" {togglerAttributes} {resolvedTogglerIcon} />
        </slot>
    {:else}
        <PanelHeader
            {headerAttributes}
            {titleAttributes}
            {iconsAttributes}
            {togglerAttributes}
            {resolvedTogglerIcon}
            {header}
            {toggle}
            {toggleable}
            {collapsed}
        >
            <slot name="header_content" target="header_content" {titleAttributes} />
            <slot name="header_icons" target="header_icons" {iconsAttributes} />
            <slot name="header_toggler" target="header_toggler" {togglerAttributes} {resolvedTogglerIcon} />
        </PanelHeader>
    {/if}

    <!-- Content  -->

    {#if !collapsed}
        <div bind:this={contentEl} transition:slide={{ duration: 300 }} {...toggleableContentAttributes}>
            <div {...contentAttributes}><slot /></div>
        </div>
    {/if}

    <!-- Footer  -->

    {#if $$slots.footer}
        <slot name="footer" {footerAttributes} {footer}>
            <slot name="footer_content" target="footer_content" />
        </slot>
    {:else if footer}
        <PanelFooter {footerAttributes} {footer} />
    {/if}
</div>

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
