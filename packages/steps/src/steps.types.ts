import type {
    CssObject,
    HTMLUlAttributes,
    HTMLLiAttributes,
    HTMLAnchorAttributes,
    HTMLSpanAttributes,
    HTMLSVGAttributes,
    PassThroughHTMLAttributes,
    PassThroughType,
    PassThroughOptions,
    MenuItem,
    HTMLNavAttributes,
    MenuItemSnippetProps
} from '@jazzsvelte/api'
import type { Snippet } from 'svelte'

/**
 * undefined
 * @group baseProperties
 */
export interface BaseStepsProps {
    /**
     * Index of the active item.
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
    itemSnippet?: Snippet<[StepMenuItemSnippetProps]> | null

    /**
     * An array of menuitems.
     * @default  null
     */
    model?: null | StepMenuItem[]

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: StepsPassThroughOptions | null

    /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    ptOptions?: PassThroughOptions | null

    /**
     * Whether the items are clickable or not.
     * @default  true
     */
    readOnly?: boolean

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
     * Callback to invoke when the new step is selected.
     * @default 'null'
     */
    onSelect?:
        | (({ originalEvent, item, index }: { originalEvent: MouseEvent | KeyboardEvent; item: MenuItem; index: number }) => void)
        | null
}

/**
 * Defines valid properties in Steps component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group properties
 */
export interface StepsProps extends Omit<HTMLNavAttributes, 'style' | 'class'>, BaseStepsProps {}

/**
 * @group ptType
 */
export declare type StepsPassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, StepsPassThroughMethodOptions>

export interface StepsPtContext extends StepsPassThroughMethodOptions {
    ptOptions: PassThroughOptions | null
    unstyled: boolean
}

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface StepsPassThroughMethodOptions {
    props: StepsProps
    state: StepsState
}

/**
 * Defines current state of Steps component.
 * @group state
 */
export interface StepsState {
    /**
     * Current active index state as a number.
     */
    activeIndex: number
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface StepsPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: StepsPassThroughType<HTMLNavAttributes>
    /**
     * Uses to pass attributes to the list's DOM element.
     */
    menu?: StepsPassThroughType<HTMLUlAttributes>
    /**
     * Uses to pass attributes to the list item's DOM element.
     */
    menuitem?: StepsPassThroughType<HTMLLiAttributes>
    /**
     * Uses to pass attributes to the action's DOM element.
     */
    action?: StepsPassThroughType<HTMLAnchorAttributes>
    /**
     * Uses to pass attributes to the step's DOM element.
     */
    step?: StepsPassThroughType<HTMLSpanAttributes>
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: StepsPassThroughType<HTMLSpanAttributes>
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: StepsPassThroughType<HTMLSpanAttributes> | StepsPassThroughType<HTMLSVGAttributes>
}

export type StepMenuItemSnippetOptions = {
    onClick: (event: MouseEvent) => void
    className: string
    labelClassName: string
    numberClassName: string
    iconClassName: string | undefined
    'aria-current': boolean
    props: StepsProps
    active: boolean
    disabled: boolean
}

export type StepMenuItemSnippetProps = MenuItemSnippetProps & {
    options: StepMenuItemSnippetOptions
    defaultSnippet: Snippet<[MenuItemSnippetProps]>
}

export type StepMenuItem = MenuItem & {
    snippet?: Snippet<[StepMenuItemSnippetProps]> | null
}
