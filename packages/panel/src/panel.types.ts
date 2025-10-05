import type { Snippet } from 'svelte'
import type {
    CssObject,
    HTMLDivAttributes,
    HTMLSpanAttributes,
    HTMLButtonAttributes,
    HTMLSVGAttributes,
    IconComponent,
    PassThroughHTMLAttributes,
    PassThroughType,
    ResolvedIconPT,
    PassThroughOptions
} from '@jazzsvelte/api'

export interface PanelContext {
    globalPt: PanelPassThroughOptions | null
    pt: PanelPassThroughOptions | null
}

/**
 * Base Panel Props
 * @group baseProperties
 */
export interface BasePanelProps {
    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * Defines the initial state of panel content, supports one or two-way binding as well.
     * @default  false
     */
    collapsed?: boolean

    /**
     * Icon of a collapsed tab.
     * @default  null
     */
    collapseIcon?: string | IconComponent | null

    /**
     * Icon of a expanded tab.
     * @default  null
     */
    expandIcon?: string | IconComponent | null

    /**
     * Custom header of the panel.
     * @default  null
     */
    footer?: string | null

    /**
     * Custom header snippet of the panel.
     * @default  null
     */
    footerSnippet?: PanelFooterContentSnippet | null

    /**
     * Footer template of the panel to customize more.
     * @default  null
     */
    footerContainerSnippet?: PanelFooterContainerSnippet | null

    /**
     * Custom header of the panel.
     * @default  null
     */
    header?: string | null

    /**
     * Custom header snippet of the panel.
     * @default  null
     */
    headerSnippet?: PanelHeaderContentSnippet | null

    /**
     * Header template of the panel to customize more.
     * @default  null
     */
    headerContainerSnippet?: PanelHeaderContainerSnippet | null

    /**
     * Custom icons template for the header.
     * @default  null
     */
    icons?: PanelHeaderIconsSnippet | null

    /**
     * Callback to invoke when an active tab is collapsed by clicking on the header.
     * @param event
     * @param value
     * @returns
     */
    onCollapse?: ((event: Event) => void) | null
    /**
     * Callback to invoke when a tab gets expanded.
     * @param event
     * @param value
     * @returns
     */
    onExpand?: ((event: Event) => void) | null
    /**
     * Callback to invoke when a tab gets expanded.
     * @param event
     * @param value
     * @returns
     */
    onToggle?: ((event: { originalEvent: Event; value: boolean }) => void) | null

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: PanelPassThroughOptions | null

    /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    ptOptions?: PassThroughOptions | null

    /**
     * Style to add to root element.
     * @default  null
     */
    style?: string | CssObject | null

    /**
     * Defines if content of panel can be expanded and collapsed.
     * @default  false
     */
    toggleable?: boolean

    /**
     * When enabled, it removes component related styles in the core.
     * @default  false
     */
    unstyled?: boolean
}

/**
 * Defines valid properties in Panel component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group properties
 */
export interface PanelProps extends Omit<HTMLDivAttributes, 'style'>, BasePanelProps {}

/**
 * @group ptType
 */
export declare type PanelPassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, PanelPassThroughMethodOptions>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface PanelPassThroughMethodOptions {
    props: PanelProps
    state: PanelState
}

/**
 * Panel header props
 */
export interface PanelHeaderProps {
    headerAttributes: HTMLDivAttributes
    titleAttributes: HTMLSpanAttributes
    iconsAttributes: HTMLDivAttributes
    togglerAttributes: HTMLButtonAttributes
    resolvedTogglerIcon: ResolvedIconPT
    toggle: (event?: Event) => void
    toggleable: boolean
    collapsed: boolean
    header?: string | null
    headerSnippet?: PanelHeaderContentSnippet | null
    icons?: PanelHeaderIconsSnippet | null
}

/**
 * Panel header snippet to customize header content
 */
export type PanelHeaderContentSnippet = Snippet<
    [
        {
            toggle: PanelHeaderProps['toggle']
            collapsed: PanelHeaderProps['collapsed']
        }
    ]
>

/**
 * Panel header snippet to customize header icons
 */
export type PanelHeaderIconsSnippet = Snippet<
    [
        {
            toggle: PanelHeaderProps['toggle']
            collapsed: PanelHeaderProps['collapsed']
        }
    ]
>

/**
 * Panel header snippet to customize header
 */
export type PanelHeaderContainerSnippet = Snippet<[PanelHeaderProps]>

/**
 * Panel footer props
 */
export interface PanelFooterProps {
    footerAttributes: HTMLDivAttributes
    footer?: string | null
    footerSnippet?: PanelFooterContentSnippet | null
}

/**
 * Panel footer snippet to customize footer content
 */
export type PanelFooterContentSnippet = Snippet<[]>

/**
 * Panel footer snippet to customize footer
 */
export type PanelFooterContainerSnippet = Snippet<[PanelFooterProps]>

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface PanelPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: PanelPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: PanelPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the title's DOM element.
     */
    title?: PanelPassThroughType<HTMLSpanAttributes>
    /**
     * Uses to pass attributes to the icons' DOM element.
     */
    icons?: PanelPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the toggler's DOM element.
     */
    toggler?: PanelPassThroughType<HTMLButtonAttributes>
    /**
     * Uses to pass attributes to the togglericon's DOM element.
     */
    togglerIcon?: PanelPassThroughType<HTMLSpanAttributes> | PanelPassThroughType<HTMLSVGAttributes>
    /**
     * Uses to pass attributes to the toggleablecontent's DOM element.
     */
    toggleableContent?: PanelPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: PanelPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the footer's DOM element.
     */
    footer?: PanelPassThroughType<HTMLDivAttributes>
}

/**
 * Defines current state of Panel component.
 * @group state
 */
export interface PanelState {
    /**
     * Current id state.
     */
    id: string
    /**
     * Current collapsed state as a boolean.
     */
    collapsed: boolean
}
