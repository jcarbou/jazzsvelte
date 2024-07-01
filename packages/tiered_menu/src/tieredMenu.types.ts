import type {
    HTMLDivAttributes,
    HTMLULAttributes,
    HTMLLIAttributes,
    HTMLAnchorAttributes,
    HTMLSVGAttributes,
    HTMLSpanAttributes,
    IconComponent,
    PassThroughHTMLAttributes,
    PassThroughType,
    MenuItem,
    CssStyle,
    AppendTo,
    PassThroughOptions
} from '@jazzsvelte/api'

export type TieredMenuTreeContext = {
    menuId: string
    popup: boolean
    hostName: string
    submenuIcon: string | IconComponent | null
    unstyled: boolean
    pt: TieredMenuPassThroughOptions | null
    ptOptions: PassThroughOptions | null
    onItemClick: (event: ProcessedItemEvent) => void
    onFocus: (ev: Event) => void
    onBlur: (ev: Event) => void
    onKeyDown: (ev: KeyboardEvent) => void
    onItemMouseEnter: (event: { originalEvent: Event; processedItem: ProcessedItem }) => void
    ariaLabel?: string
    ariaOrientation: 'horizontal' | 'vertical' | null | undefined
    modelContext: () => ModelContext
    isMobileMode: () => boolean
}

export type ProcessedItem = {
    item: MenuItem
    index: number
    level: number
    key: string
    parent: ProcessedItem | null
    parentKey: string | null
    items: ProcessedItem[] | null
    isSeparator: boolean
    isDisabled: boolean
    isVisible: boolean
    isValid: boolean
    isRoot: boolean
    isGrouped: boolean
}

export type FocusedItemInfo = {
    index: ProcessedItem['index']
    level?: ProcessedItem['level']
    parentKey: ProcessedItem['parentKey']
}

export type ProcessedItemEvent = {
    originalEvent: Event
    processedItem: ProcessedItem
    isFocus?: boolean
}

export type ModelContext = {
    activeItemPath: ProcessedItem[]
    visibleItems: ProcessedItem[]
    focusedItemInfo: FocusedItemInfo
}

/**
 * undefined
 * @group baseProperties
 */
export interface BaseTieredMenuProps {
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and 'self'. The self value is used to render a component where it is located.
     * @default document.body
     */
    appendTo?: AppendTo

    /**
     * Whether to automatically manage layering.
     * @default  true
     */
    autoZIndex?: boolean

    /**
     * Whether to automatically manage layering.
     * @default  0
     */
    baseZIndex?: number

    /**
     * The breakpoint to define the maximum width boundary when responsiveness is enabled.
     * @default  null
     */
    breakpoint?: string | null

    /**
     * CSS classes to add to root element.
     */
    class?: string | null

    /**
     * An array of menuitems.
     * @default  null
     */
    model?: MenuItem[]

    /**
     * Defines if menu would displayed as a popup.
     * @default  false
     */
    popup?: boolean

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: TieredMenuPassThroughOptions

    /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    ptOptions?: TieredMenuPassThroughMethodOptions

    /**
     * Maximum height of the options panel on responsive mode.
     * @default  400px
     */
    scrollHeight?: string | null

    /**
     * Icon of the submenu.
     * @default  null
     */
    submenuIcon?: string | IconComponent | null

    /***
     * Style to add to root element.
     */
    style?: string | CssStyle | null

    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     * @default  null
     */
    // transitionOptions?: CSSTransitionProps

    /**
     * When enabled, it removes component related styles in the core.
     * @default  false
     */
    unstyled?: boolean
}

/**
 * Defines valid properties in TieredMenu component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group properties
 */
export interface TieredMenuProps extends Omit<HTMLDivAttributes, 'style'>, BaseTieredMenuProps {}

/**
 * @group ptType
 */
export declare type TieredMenuPassThroughType<T> = PassThroughType<
    PassThroughHTMLAttributes<T>,
    TieredMenuPassThroughMethodOptions
>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface TieredMenuPassThroughMethodOptions {
    props: TieredMenuProps
    state: TieredMenuState
    context: TieredMenuContext
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface TieredMenuPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: TieredMenuPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the menu's DOM element.
     */
    menu?: TieredMenuPassThroughType<HTMLULAttributes>
    /**
     * Uses to pass attributes to the submenu's DOM element.
     */
    submenu?: TieredMenuPassThroughType<HTMLULAttributes>
    /**
     * Uses to pass attributes to the list item's DOM element.
     */
    menuitem?: TieredMenuPassThroughType<HTMLLIAttributes>
    /**
     * Uses to pass attributes to the action's DOM element.
     */
    action?: TieredMenuPassThroughType<HTMLAnchorAttributes>
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: TieredMenuPassThroughType<HTMLSpanAttributes> | TieredMenuPassThroughType<HTMLSVGAttributes>
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: TieredMenuPassThroughType<HTMLSpanAttributes>
    /**
     * Uses to pass attributes to the submenu icon's DOM element.
     */
    submenuIcon?: TieredMenuPassThroughType<HTMLSpanAttributes> | TieredMenuPassThroughType<HTMLSVGAttributes>
    /**
     * Uses to pass attributes to the separator's DOM element.
     */
    separator?: TieredMenuPassThroughType<HTMLLIAttributes>
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: TieredMenuPassThroughType<HTMLDivAttributes>
    /**
     * Used to control React Transition API.
     */
    //transition?: TieredMenuPassThroughType<HTMLTieredMenuPassThroAttributes>
}

/**
 * Defines current options in TieredMenu component.
 * @group ptContextOption
 */
export interface TieredMenuContext {
    /**
     * Current active state of menuitem as a boolean.
     */
    active: boolean
}

/**
 * Defines current state of TieredMenu component.
 * @group state
 */
export interface TieredMenuState {
    /**
     * Current attributeSelector visible state as a string.
     */
    attributeSelector: string
    /**
     * Current visible state as a boolean.
     */
    visible: boolean
}
