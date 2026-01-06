import type {
    CssObject,
    HTMLDivAttributes,
    HTMLAnchorAttributes,
    HTMLSVGAttributes,
    HTMLSpanAttributes,
    IconComponent,
    PassThroughHTMLAttributes,
    PassThroughType,
    PassThroughOptions,
    MenuItem,
    HTMLUlAttributes,
    HTMLLiAttributes,
    Menu
} from '@jazzsvelte/api'
import type { Snippet } from 'svelte'
import type { PanelMenu } from '.'

export type PanelMenuOpenEvent = {
    originalEvent: Event
    item: PanelMenuItem
}

/**
 * undefined
 * @group baseProperties
 */
export interface BasePanelMenuProps {
    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * A map of keys to represent the expansion state in controlled mode.
     * @default  null
     */
    expandedKeys?: string[] | null

    /**
     * Snippet use to render items (override default renderer)
     */
    itemSnippet?: Snippet<[PanelMenuItemSnippetProps]> | null

    /**
     * An array of menuitems.
     * @default  null
     */
    model?: PanelMenuItem[]

    /**
     * Whether multiple tabs can be activated at the same time or not.
     * @default  false
     */
    multiple?: boolean

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: PanelMenuPassThroughOptions | null

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
     * Icon of the submenud.
     * @default  null
     */
    submenuIcon?: string | IconComponent | null

    /**
     * Icon of the activated submenud.
     * @default  null
     */
    activeSubmenuIcon?: string | IconComponent | null

    /**
     * When enabled, it removes component related styles in the core.
     * @default  false
     */
    unstyled?: boolean

    /**
     * Callback to invoke when a panel gets collapsed.
     * @default 'null'
     */
    onHide?: ((event: any) => void) | null

    /**
     * Callback to invoke when a panel gets expanded.
     * @default 'null'
     */
    onShow?: ((event: any) => void) | null

    /**
     * Callback to invoke when a panel gets opened.
     * @default 'null'
     */
    onOpen?: ((event: PanelMenuOpenEvent) => void) | null

    /**
     * Callback to invoke when a panel gets closed.
     * @default 'null'
     */
    onClose?: ((event: PanelMenuOpenEvent) => void) | null
}

/**
 * Defines valid properties in PanelMenu component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group properties
 */
export interface PanelMenuProps extends Omit<HTMLDivAttributes, 'style' | 'class'>, BasePanelMenuProps {}

/**
 * @group ptType
 */
export declare type PanelMenuPassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, PanelMenuPassThroughMethodOptions>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface PanelMenuPassThroughMethodOptions {
    props: PanelMenuProps
    state: PanelMenuState
    context: PanelMenuContext | null
}

export interface PanelMenuPtContext extends PanelMenuPassThroughMethodOptions {
    ptOptions: PassThroughOptions | null
    unstyled: boolean
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface PanelMenuPassThroughOptions {
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: PanelMenuPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: PanelMenuPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the panel's DOM element.
     */
    panel?: PanelMenuPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: PanelMenuPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the header action's DOM element.
     */
    headerAction?: PanelMenuPassThroughType<HTMLAnchorAttributes>
    /**
     * Uses to pass attributes to the header content's DOM element.
     */
    headerContent?: PanelMenuPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the submenuIcon's DOM element.
     */
    submenuIcon?: PanelMenuPassThroughType<HTMLSpanAttributes> | PanelMenuPassThroughType<HTMLSVGAttributes>
    /**
     * Uses to pass attributes to the header icon's DOM element.
     */
    headerIcon?: PanelMenuPassThroughType<HTMLSpanAttributes> | PanelMenuPassThroughType<HTMLSVGAttributes>
    /**
     * Uses to pass attributes to the header submenu icon's DOM element.
     */
    headerSubmenuIcon?: PanelMenuPassThroughType<HTMLSpanAttributes> | PanelMenuPassThroughType<HTMLSVGAttributes>
    /**
     * Uses to pass attributes to the header label's DOM element.
     */
    headerLabel?: PanelMenuPassThroughType<HTMLSpanAttributes>
    /**
     * Uses to pass attributes to the toggleable content's DOM element.
     */
    toggleableContent?: PanelMenuPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the header toggleable content's DOM element.
     */
    headerToggleableContent?: PanelMenuPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the menu content's DOM element.
     */
    menuContent?: PanelMenuPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    menu?: PanelMenuPassThroughType<HTMLUlAttributes>
    /**
     * Uses to pass attributes to the list item's DOM element.
     */
    menuitem?: PanelMenuPassThroughType<HTMLLiAttributes>
    /**
     * Uses to pass attributes to the action's DOM element.
     */
    action?: PanelMenuPassThroughType<HTMLAnchorAttributes>
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: PanelMenuPassThroughType<HTMLSpanAttributes> | PanelMenuPassThroughType<HTMLSVGAttributes>
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: PanelMenuPassThroughType<HTMLSpanAttributes>
    /**
     * Uses to pass attributes to the separator's DOM element.
     */
    separator?: PanelMenuPassThroughType<HTMLLiAttributes>
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    submenu?: PanelMenuPassThroughType<HTMLUlAttributes>
}

/**
 * Defines current options in PanelMenu component.
 * @group ptContextOption
 */
export interface PanelMenuContext {
    /**
     * Current active state of menuitem as a boolean.
     */
    active: boolean

    /**
     * Current focused state of menuitem as a boolean.
     */
    focused: boolean

    /**
     * Current disabled state of menuitem as a boolean.
     */
    disabled: boolean

    /**
     * Menuitem index
     */
    index: number
}

/**
 * Defines current state of PanelMenu component.
 * @group state
 */
export interface PanelMenuState {
    /**
     * Current id state as a string.
     */
    id: string
    /**
     * Active item path.
     */
    activeItems: PanelMenuItem[]
    /**
     * Whether the menu is visible or not.
     */
    //animationDisabled: boolean
}

export interface PanelMenuItemProps {
    menuSubId: string
    //processedItem: ProcessedItem
    index: number
    //model?: ProcessedItem[]
    menuProps: PanelMenuProps
    level: number
    focusedItemId: string | null
}

export type PanelMenuItemSnippetOptions = {
    onclick: (event: MouseEvent) => void
    className: string
    labelClassName: string
    iconClassName: string
    submenuIconClassName: string
    props: PanelMenuProps
    leaf: boolean
    active: boolean
}

export type PanelMenuItemSnippetProps = {
    item: PanelMenuItem
    index: number
    options: PanelMenuItemSnippetOptions
    defaultSnippet: Snippet<[{ processedItem: ProcessedItem }]>
}

export type PanelMenuItem = Menu<
    MenuItem & {
        snippet?: Snippet<[PanelMenuItemSnippetProps]> | null
        key?: string | null
    }
>

// From tieredMenu
export type ProcessedItem = {
    item: PanelMenuItem
    index: number
    level: number
    key: string
    parent: ProcessedItem | null
    parentKey: string | null
    items?: ProcessedItem[] | null
    isSeparator: boolean
    isDisabled: boolean
    isVisible: boolean
    isValid: boolean
    isRoot: boolean
    isGrouped: boolean
}

export type PanelMenuFocusContext = {
    originalEvent: KeyboardEvent | FocusEvent
    focusOnNext: boolean
    selfCheck?: boolean | undefined
}

export type PanelMenuListProps = {
    panelId: string
    onToggle: (item: ProcessedItem, isExpanded: boolean) => void
    onHeaderFocus: (event: PanelMenuFocusContext) => void
    level: number
    modelWrapper: ProcessedItem[]
    class: string
}

export type PanelMenuSubProps = {
    class?: string
    id: string
    role: string
    tabIndex?: number
    ariaActivedescendant?: string | null
    panelId: string
    focusedItemId: string | null
    modelWrapper: ProcessedItem[]
    activeItemPath: ProcessedItem[]
    onFocus?: (event: FocusEvent) => void
    onBlur?: () => void
    onKeyDown?: (event: KeyboardEvent) => void
    onItemToggle: (event: { processedItem: ProcessedItem; expanded: boolean }) => void
    level: number
    root: boolean
}

export type PanelMenuTreeContext = {
    pt: PanelMenuPassThroughOptions | null
    ptContext: PanelMenuPtContext
    menuProps: PanelMenuProps
    expandedKeys: string[] | null
    submenuIcon: string | IconComponent | null
    activeSubmenuIcon: string | IconComponent | null
    panelMenuId: string
    itemSnippet: Snippet<[PanelMenuItemSnippetProps]> | null
}
