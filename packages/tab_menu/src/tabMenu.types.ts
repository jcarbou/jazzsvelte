import type {
    CssObject,
    HTMLDivAttributes,
    HTMLLiAttributes,
    HTMLAnchorAttributes,
    HTMLSVGAttributes,
    HTMLSpanAttributes,
    PassThroughHTMLAttributes,
    PassThroughType,
    PassThroughOptions,
    HTMLUlAttributes,
    MenuItemSnippetProps,
    MenuItem
} from '@jazzsvelte/api'
import type { Snippet } from 'svelte'

/**
 * undefined
 * @group baseProperties
 */
export interface BaseTabMenuProps {
    /**
     * Active index of menuitem.
     * @default  0
     */
    activeIndex?: number

    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * Snippet use to render items (override default renderer)
     */
    itemSnippet?: Snippet<[TabMenuItemSnippetProps]> | null

    /**
     * An array of menuitems.
     * @default  null
     */
    model?: TabMenuItem[] | null

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: TabMenuPassThroughOptions | null

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
     * When enabled, it removes component related styles in the core.
     * @default  false
     */
    unstyled?: boolean

    /**
     * Callback to invoke when active tab changes.
     * @default 'null'
     */
    onTabChange?:
        | (({ originalEvent, item, index }: { originalEvent: MouseEvent | KeyboardEvent; item: MenuItem; index: number }) => void)
        | null
}

/**
 * Defines valid properties in TabMenu component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group properties
 */
export interface TabMenuProps extends Omit<HTMLDivAttributes, 'style' | 'class'>, BaseTabMenuProps {}

/**
 * @group ptType
 */
export declare type TabMenuPassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, TabMenuPassThroughMethodOptions>

export interface TabMenuPtContext extends TabMenuPassThroughMethodOptions {
    ptOptions: PassThroughOptions | null
    unstyled: boolean
}

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface TabMenuPassThroughMethodOptions {
    props: TabMenuProps
    context?: TabMenuContext
    state: TabMenuState
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface TabMenuPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: TabMenuPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    menu?: TabMenuPassThroughType<HTMLUlAttributes>
    /**
     * Uses to pass attributes to the list item's DOM element.
     */
    menuitem?: TabMenuPassThroughType<HTMLLiAttributes>
    /**
     * Uses to pass attributes to the action's DOM element.
     */
    action?: TabMenuPassThroughType<HTMLAnchorAttributes>
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: TabMenuPassThroughType<HTMLSpanAttributes> | TabMenuPassThroughType<HTMLSVGAttributes>
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: TabMenuPassThroughType<HTMLSpanAttributes>
    /**
     * Uses to pass attributes to the inkbar's DOM element.
     */
    inkbar?: TabMenuPassThroughType<HTMLLiAttributes>
}

/**
 * Defines current options in TabMenu component.
 * @group ptContextOption
 */
export interface TabMenuContext {
    /**
     * Current menuitem
     */
    item: MenuItem | null
    /**
     * Index of the menuitem
     */
    index: number
}

/**
 * Defines current state of TabMenu component.
 * @group state
 */
export interface TabMenuState {
    /**
     * Current active index state as a number.
     */
    activeIndex: number
}

export type TabMenuItemSnippetOptions = {
    onclick: (event: MouseEvent) => void
    class: string
    labelClass: string
    iconClass: string
    props: TabMenuProps
    active: boolean
    index: number
    disabled: boolean | undefined
}

export type TabMenuItemSnippetProps = MenuItemSnippetProps & {
    options: TabMenuItemSnippetOptions
    defaultSnippet: Snippet<[MenuItemSnippetProps]>
}

export type TabMenuItem = MenuItem & {
    snippet?: Snippet<[TabMenuItemSnippetProps]> | null
}
