import type {
    CssObject,
    HTMLDivAttributes,
    HTMLOlAttributes,
    HTMLLiAttributes,
    HTMLSpanAttributes,
    PassThroughHTMLAttributes,
    PassThroughType,
    PassThroughOptions,
    HTMLIAttributes,
    HTMLElementAttributes
} from '@jazzsvelte/api'
import { Snippet } from 'svelte'

/**
 * Types used by properties of the MeterGroup component.
 * @group types
 **/
export type MeterGroupOrientation = 'horizontal' | 'vertical'
export type MeterGroupLabelPosition = 'start' | 'end'

export type MeterGroupValue = {
    value: number
    label?: string
    labelSnippet?: Snippet
    color?: string
    icon?: string
    meterSnippet?: MeterGroupMeterSnippet
}

export type MeterGroupEntry = {
    item: MeterGroupValue
    percentage: number
    totalPercent: number
    meterStyles: {
        backgroundColor?: string
        width: string
        height: string
    }
}

export interface MeterGroupLabelListProps {
    entries: MeterGroupEntry[]
    totalPercent: number
}

export interface MeterGroupStartEndProps {
    entries: MeterGroupEntry[]
    totalPercent: number
}

export interface MeterGroupMeterProps {
    index: number
    entry: MeterGroupEntry
    meterAttributes: HTMLElementAttributes
}

export type MeterGroupLabelListSnippet = Snippet<[MeterGroupLabelListProps]>
export type MeterGroupStartSnippet = Snippet<[MeterGroupStartEndProps]>
export type MeterGroupEndSnippet = Snippet<[MeterGroupStartEndProps]>
export type MeterGroupMeterSnippet = Snippet<[MeterGroupMeterProps]>

/**
 * undefined
 * @group baseProperties
 */
export interface BaseMeterGroupProps {
    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * undefined
     * @default  null
     */
    endSnippet?: MeterGroupEndSnippet | null

    /**
     * undefined
     * @default  null
     */
    labelListSnippet?: MeterGroupLabelListSnippet | null

    /**
     * The orientation of the label. Can be either 'horizontal' or 'vertical'.
     * @default  'horizontal'
     */
    labelOrientation?: MeterGroupOrientation

    /**
     * The position of the label. Can be either 'start' or 'end'.
     * @default  'end'
     */
    labelPosition?: MeterGroupLabelPosition

    /**
     * The maximum value for the MeterGroup.
     * @default  100
     */
    max?: number

    /**
     * undefined
     * @default  null
     */
    meterSnippet?: MeterGroupMeterSnippet | null

    /**
     * The minimum value for the MeterGroup.
     * @default  0
     */
    min?: number

    /**
     * The orientation of the MeterGroup. Can be either 'horizontal' or 'vertical'.
     * @default  'horizontal'
     */
    orientation?: MeterGroupOrientation

    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: MeterGroupPassThroughOptions | null

    /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    ptOptions?: PassThroughOptions | null

    /**
     * undefined
     * @default  null
     */
    startSnippet?: MeterGroupStartSnippet | null

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
     * An array of values to be represented by the MeterGroup.
     * @default  null
     */
    values?: MeterGroupValue[]
}

/**
 * Defines valid properties in MeterGroup component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group properties
 */
export interface MeterGroupProps extends Omit<HTMLDivAttributes, 'style'>, BaseMeterGroupProps {}

/**
 * @group ptType
 */
export declare type MeterGroupPassThroughType<T> = PassThroughType<
    PassThroughHTMLAttributes<T>,
    MeterGroupPassThroughMethodOptions
>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface MeterGroupPassThroughMethodOptions {
    props: MeterGroupProps
    context: MeterGroupContext
}

export interface MeterGroupPtContext extends MeterGroupPassThroughMethodOptions {
    ptOptions: PassThroughOptions | null
    unstyled: boolean
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface MeterGroupPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: MeterGroupPassThroughType<HTMLDivAttributes>
    /**
     * Used to pass attributes to the label list's DOM element.
     */
    labelList?: MeterGroupPassThroughType<HTMLOlAttributes>
    /**
     * Used to pass attributes to the label list item's DOM element.
     */
    labelListItem?: MeterGroupPassThroughType<HTMLLiAttributes>
    /**
     * Used to pass attributes to the label list icon's DOM element.
     */
    labelListIcon?: MeterGroupPassThroughType<HTMLSpanAttributes>
    /**
     * Used to pass attributes to the label's DOM element.
     */
    label?: MeterGroupPassThroughType<HTMLSpanAttributes>
    /**
     * Used to pass attributes to the label icoon's DOM element.
     */
    labelIcon?: MeterGroupPassThroughType<HTMLIAttributes>
    /**
     * Used to pass attributes to the meter container's DOM element.
     */
    meterContainer?: MeterGroupPassThroughType<HTMLDivAttributes>
    /**
     * Used to pass attributes to the meter's DOM element.
     */
    meter?: MeterGroupPassThroughType<HTMLElementAttributes>
}

/**
 * Defines current options in MeterGroup component.
 * @group ptContextOption
 */
export interface MeterGroupContext {}
