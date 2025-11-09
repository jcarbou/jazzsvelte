import type {
    CssObject,
    HTMLDivAttributes,
    PassThroughHTMLAttributes,
    PassThroughType,
    PassThroughOptions
} from '@jazzsvelte/api'
import type { Snippet } from 'svelte'

/**
 * Types used by properties of the ProgressBar component.
 * @group types
 **/
export type ProgressBarMode = 'determinate' | 'indeterminate'

export type ProgressBarLabelSnippetProps = {
    props: BaseProgressBarProps
}
export type ProgressBarLabelSnippet = Snippet<[ProgressBarLabelSnippetProps]>

/**
 * undefined
 * @group baseProperties
 */
export interface BaseProgressBarProps {
    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * Color for the background of the progress.
     * @default  null
     */
    color?: string | null

    labelSnippet?: ProgressBarLabelSnippet | null

    /**
     * Defines the mode of the progress, valid values are "determinate" and "indeterminate".
     * @default  determinate
     */
    mode?: ProgressBarMode

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: ProgressBarPassThroughOptions | null

    /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    ptOptions?: PassThroughOptions | null

    /**
     * Show or hide progress bar value.
     * @default  true
     */
    showValue?: boolean

    /**
     * Style to add to root element.
     * @default  null
     */
    style?: string | CssObject | null

    /**
     * Unit sign appended to the value.
     * @default  %
     */
    unit?: string | null

    /**
     * When enabled, it removes component related styles in the core.
     * @default  false
     */
    unstyled?: boolean

    /**
     * Current value of the progress.
     * @default  null
     */
    value?: null | string | number
}

/**
 * Defines valid properties in ProgressBar component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group properties
 */
export interface ProgressBarProps extends Omit<HTMLDivAttributes, 'style' | 'class'>, BaseProgressBarProps {}

/**
 * @group ptType
 */
export declare type ProgressBarPassThroughType<T> = PassThroughType<
    PassThroughHTMLAttributes<T>,
    ProgressBarPassThroughMethodOptions
>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface ProgressBarPassThroughMethodOptions {
    props: ProgressBarProps
}

export interface ProgressBarPtContext extends ProgressBarPassThroughMethodOptions {
    ptOptions: PassThroughOptions | null
    unstyled: boolean
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface ProgressBarPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ProgressBarPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the container's DOM element.
     */
    container?: ProgressBarPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the value's DOM element.
     */
    value?: ProgressBarPassThroughType<HTMLDivAttributes>
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: ProgressBarPassThroughType<HTMLDivAttributes>
}
