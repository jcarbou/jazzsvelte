import type {
    CssObject,
    HTMLDivAttributes,
    PassThroughHTMLAttributes,
    PassThroughType,
    PassThroughOptions
} from '@jazzsvelte/api'
import { Snippet } from 'svelte'

export interface CardSnippetProps {
    props: BaseCardProps
    attributes: HTMLDivAttributes
}

/**
 * Types used by properties of the Card component.
 * @group types
 **/
export type CardFooterSnippet = Snippet<[CardSnippetProps]>
export type CardHeaderSnippet = Snippet<[CardSnippetProps]>
export type CardSubTitleSnippet = Snippet<[CardSnippetProps]>
export type CardTitleSnippet = Snippet<[CardSnippetProps]>

/**
 * undefined
 * @group baseProperties
 */
export interface BaseCardProps {
    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * Footer of the card.
     * @default  null
     */
    footerSnippet?: CardFooterSnippet | null

    /**
     * Header of the card.
     * @default  null
     */
    headerSnippet?: CardHeaderSnippet | null

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: CardPassThroughOptions | null

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
     * Secondary title of the card.
     * @default  null
     */
    subTitle?: string | null

    /**
     * Secondary title of the card.
     * @default  null
     */
    subTitleSnippet?: CardSubTitleSnippet | null

    /**
     * Title of the card.
     * @default  null
     */
    title?: string | null

    /**
     * Title of the card.
     * @default  null
     */
    titleSnippet?: CardTitleSnippet | null

    /**
     * When enabled, it removes component related styles in the core.
     * @default  false
     */
    unstyled?: boolean
}

/**
 * Defines valid properties in Card component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group properties
 */
export interface CardProps extends Omit<HTMLDivAttributes, 'style' | 'class'>, BaseCardProps {}

/**
 * @group ptType
 */
export declare type CardPassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, CardPassThroughMethodOptions>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface CardPassThroughMethodOptions {
    props: CardProps
}

export interface CardPtContext extends CardPassThroughMethodOptions {
    ptOptions: PassThroughOptions | null
    unstyled: boolean
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface CardPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: CardPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: CardPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the body's DOM element.
     */
    body?: CardPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the title's DOM element.
     */
    title?: CardPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the subtitle's DOM element.
     */
    subTitle?: CardPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: CardPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the footer's DOM element.
     */
    footer?: CardPassThroughType<HTMLDivAttributes>
}
