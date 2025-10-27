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
    MenuItem,
    HTMLUlAttributes
} from '@jazzsvelte/api'

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
     * An array of menuitems.
     * @default  null
     */
    model?: MenuItem[] | null

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
        | (({
              originalEvent,
              value,
              index
          }: {
              originalEvent: MouseEvent | KeyboardEvent
              value: MenuItem
              index: number
          }) => void)
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
    context: TabMenuContext
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
