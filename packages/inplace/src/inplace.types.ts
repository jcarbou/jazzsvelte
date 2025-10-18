import type {
    CssObject,
    HTMLDivAttributes,
    IconComponent,
    PassThroughHTMLAttributes,
    PassThroughType,
    PassThroughOptions
} from '@jazzsvelte/api'
import { Snippet } from 'svelte'

export type InplaceToggleEvent = {
    originalEvent: MouseEvent | KeyboardEvent | undefined
    value: boolean
}

/**
 * undefined
 * @group baseProperties
 */
export interface BaseInplaceProps {
    /**
     * Whether the content is displayed or not.
     * @default  false
     */
    active?: boolean

    /**
     * Used to define a string that labels the component.
     * @default  null
     */
    ariaLabel?: string | null

    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * Content snippet
     */
    contentSnippet: Snippet<[]>

    /**
     * Display snippet
     */
    displaySnippet: Snippet<[]>

    /**
     * Displays a button to switch back to display mode.
     * @default  false
     */
    closable?: boolean

    /**
     * Icon of the close button.
     * @default  null
     */
    closeIcon?: string | IconComponent | null

    /**
     * When present, it specifies that the element should be disabled.
     * @default  false
     */
    disabled?: boolean

    /**
     * Callback to invoke when inplace is closed.
     */
    onClose?: ((ev?: MouseEvent) => void) | null

    /**
     * Callback to invoke when inplace is opened.
     */
    onOpen?: ((ev: KeyboardEvent | MouseEvent) => void) | null

    /**
     * Callback to invoke when inplace is opened or closed.
     */
    onToggle?: ((ev: InplaceToggleEvent) => void) | null

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: InplacePassThroughOptions | null

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
}

/**
 * Defines valid properties in Inplace component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group properties
 */
export interface InplaceProps extends Omit<HTMLDivAttributes, 'style'>, BaseInplaceProps {}

/**
 * @group ptType
 */
export declare type InplacePassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, InplacePassThroughMethodOptions>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface InplacePassThroughMethodOptions {
    props: InplaceProps
    state: InplaceState
}

export interface InplacePtContext extends InplacePassThroughMethodOptions {
    ptOptions: PassThroughOptions | null
    unstyled: boolean
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface InplacePassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: InplacePassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the display's DOM element.
     */
    display?: InplacePassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: InplacePassThroughType<HTMLDivAttributes>
}

/**
 * Defines current state of Inplace component.
 * @group state
 */
export interface InplaceState {
    /**
     * Current active state as a boolean.
     */
    active: boolean
}
