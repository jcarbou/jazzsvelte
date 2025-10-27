import type {
    CssObject,
    HTMLDivAttributes,
    HTMLImageAttributes,
    HTMLSVGAttributes,
    HTMLSpanAttributes,
    IconComponent,
    PassThroughHTMLAttributes,
    PassThroughType,
    PassThroughOptions
} from '@jazzsvelte/api'
import { Snippet } from 'svelte'

export type ChipRemoveEvent = {
    originalEvent: Event
    value: string
}

export type ChipContentSnippetProps = {
    props: BaseChipProps
}
export type ChipContentSnippet = Snippet<[ChipContentSnippetProps]>

/**
 * undefined
 * @group baseProperties
 */
export interface BaseChipProps {
    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * Defines the icon to display.
     * @default  null
     */
    icon?: string | IconComponent | null

    /**
     * Defines the image to display.
     * @default  null
     */
    image?: string | null

    /**
     * It specifies an alternate text for an image, if the image cannot be displayed.
     * @default  null
     */
    imageAlt?: string | null

    /**
     * Defines the text to display.
     * @default  null
     */
    label?: string | null

    /**
     * This event is triggered if an error occurs while loading an image file.
     */
    onImageError?: ((event: Event) => void) | null

    /**
     * Callback to invoke when a chip is removed.
     */
    onRemove?: ((event: ChipRemoveEvent) => void) | null

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: ChipPassThroughOptions | null

    /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    ptOptions?: PassThroughOptions | null

    /**
     * Whether to display a remove icon.
     * @default  false
     */
    removable?: boolean

    /**
     * Icon of the remove element.
     * @default  null
     */
    removeIcon?: string | IconComponent | null

    /**
     * Style to add to root element.
     * @default  null
     */
    style?: string | CssObject | null

    /**
     * Template of an item.
     * @default  null
     */
    contentSnippet?: ChipContentSnippet | null

    /**
     * When enabled, it removes component related styles in the core.
     * @default  false
     */
    unstyled?: boolean
}

/**
 * Defines valid properties in Chip component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group properties
 */
export interface ChipProps extends Omit<HTMLDivAttributes, 'style' | 'class'>, BaseChipProps {}

/**
 * @group ptType
 */
export declare type ChipPassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, ChipPassThroughMethodOptions>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface ChipPassThroughMethodOptions {
    props: ChipProps
    state: ChipState
}

export interface ChipPtContext extends ChipPassThroughMethodOptions {
    ptOptions: PassThroughOptions | null
    unstyled: boolean
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface ChipPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ChipPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the image's DOM element.
     */
    image?: ChipPassThroughType<HTMLImageAttributes>
    /**
     * Uses to pass attributes to the icon's DOM element.
     */
    icon?: ChipPassThroughType<HTMLSpanAttributes> | ChipPassThroughType<HTMLSVGAttributes>
    /**
     * Uses to pass attributes to the label' DOM element.
     */
    label?: ChipPassThroughType<HTMLSpanAttributes>
    /**
     * Uses to pass attributes to the removeIcon's DOM element.
     */
    removeIcon?: ChipPassThroughType<HTMLSpanAttributes> | ChipPassThroughType<HTMLSVGAttributes>
}

/**
 * Defines current state of Chip component.
 * @group state
 */
export interface ChipState {
    /**
     * Current visible state as a boolean.
     */
    visible: boolean
}
