import type { Snippet } from 'svelte'
import type {
    CssObject,
    HTMLDivAttributes,
    PassThroughHTMLAttributes,
    PassThroughType,
    PassThroughOptions
} from '@jazzsvelte/api'

/**
 * Types used by properties of the BlockUI component.
 * @group types
 **/
export type BlockUISnippet = Snippet<[]>

/**
 * undefined
 * @group baseProperties
 */
export interface BaseBlockUIProps {
    /**
     * Whether to automatically manage layering.
     * @default  true
     */
    autoZIndex?: boolean

    /**
     * Base zIndex value to use in layering.
     * @default  0
     */
    baseZIndex?: number

    /**
     * Controls the blocked state.
     * @default  false
     */
    blocked?: boolean

    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * Style class of the container element.
     * @default  null
     */
    containerClass?: string | null

    /**
     * Inline style of the container element.
     * @default  null
     */
    containerStyle?: string | CssObject | null

    /**
     * When enabled, the whole document gets blocked.
     * @default  false
     */
    fullScreen?: boolean

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: BlockUIPassThroughOptions | null

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
     * Template of mask.
     * @default  null
     */
    snippet?: BlockUISnippet | null

    /**
     * When enabled, it removes component related styles in the core.
     * @default  false
     */
    unstyled?: boolean

    /**
     * Fired when the element gets blocked.
     * @default 'null'
     */
    onBlocked?: (() => void) | null

    /**
     * Fired when the element gets unblocked.
     * @default 'null'
     */
    onUnblocked?: (() => void) | null
}

/**
 * Defines valid properties in BlockUI component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group properties
 */
export interface BlockUIProps extends Omit<HTMLDivAttributes, 'style' | 'class'>, BaseBlockUIProps {}

/**
 * @group ptType
 */
export declare type BlockUIPassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, BlockUIPassThroughMethodOptions>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface BlockUIPassThroughMethodOptions {
    props: BlockUIProps
    state: BlockUIState
}

export interface BlockUIPtContext extends BlockUIPassThroughMethodOptions {
    ptOptions: PassThroughOptions | null
    unstyled: boolean
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface BlockUIPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: BlockUIPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the mask's DOM element.
     */
    mask?: BlockUIPassThroughType<HTMLDivAttributes>
}

/**
 * Defines current state of BlockUI component.
 * @group state
 */
export interface BlockUIState {
    /**
     * Current blocked state as a boolean.
     */
    blocked: boolean
}
