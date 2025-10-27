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

export type MeterGroupItem = {
    value: number
    label?: string
    labelSnippet?: Snippet
    color?: string
    icon?: string
    meterSnippet?: MeterGroupMeterSnippet<MeterGroupItem>
}

export type MeterGroupEntry<ITEM extends MeterGroupItem> = {
    item: ITEM
    percentage: number
    totalPercent: number
    meterStyles: {
        backgroundColor?: string
        width: string
        height: string
    }
}

export interface MeterGroupLabelListSnippetProps<ITEM extends MeterGroupItem> {
    entries: MeterGroupEntry<ITEM>[]
    totalPercent: number
}

export interface MeterGroupStartOrEndSnippetProps<ITEM extends MeterGroupItem> {
    entries: MeterGroupEntry<ITEM>[]
    totalPercent: number
}

export interface MeterGroupMeterSnippetProps<ITEM extends MeterGroupItem> {
    index: number
    entry: MeterGroupEntry<ITEM>
    meterAttributes: HTMLElementAttributes
}

export type MeterGroupLabelListSnippet<ITEM extends MeterGroupItem> = Snippet<[MeterGroupLabelListSnippetProps<ITEM>]>
export type MeterGroupStartSnippet<ITEM extends MeterGroupItem> = Snippet<[MeterGroupStartOrEndSnippetProps<ITEM>]>
export type MeterGroupEndSnippet<ITEM extends MeterGroupItem> = Snippet<[MeterGroupStartOrEndSnippetProps<ITEM>]>
export type MeterGroupMeterSnippet<ITEM extends MeterGroupItem> = Snippet<[MeterGroupMeterSnippetProps<ITEM>]>

/**
 * undefined
 * @group baseProperties
 */
export interface BaseMeterGroupProps<ITEM extends MeterGroupItem> {
    /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

    /**
     * undefined
     * @default  null
     */
    endSnippet?: MeterGroupEndSnippet<ITEM> | null

    /**
     * undefined
     * @default  null
     */
    labelListSnippet?: MeterGroupLabelListSnippet<ITEM> | null

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
    meterSnippet?: MeterGroupMeterSnippet<ITEM> | null

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
    pt?: MeterGroupPassThroughOptions<ITEM> | null

    /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    ptOptions?: PassThroughOptions | null

    /**
     * undefined
     * @default  null
     */
    startSnippet?: MeterGroupStartSnippet<ITEM> | null

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
    values?: ITEM[]
}

/**
 * Defines valid properties in MeterGroup component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group properties
 */
export interface MeterGroupProps<ITEM extends MeterGroupItem>
    extends Omit<HTMLDivAttributes, 'style' | 'class'>,
        BaseMeterGroupProps<ITEM> {}

/**
 * @group ptType
 */
export declare type MeterGroupPassThroughType<T, ITEM extends MeterGroupItem> = PassThroughType<
    PassThroughHTMLAttributes<T>,
    MeterGroupPassThroughMethodOptions<ITEM>
>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface MeterGroupPassThroughMethodOptions<ITEM extends MeterGroupItem> {
    props: MeterGroupProps<ITEM>
    context: MeterGroupContext
}

export interface MeterGroupPtContext<ITEM extends MeterGroupItem> extends MeterGroupPassThroughMethodOptions<ITEM> {
    ptOptions: PassThroughOptions | null
    unstyled: boolean
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface MeterGroupPassThroughOptions<ITEM extends MeterGroupItem> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: MeterGroupPassThroughType<HTMLDivAttributes, ITEM>
    /**
     * Used to pass attributes to the label list's DOM element.
     */
    labelList?: MeterGroupPassThroughType<HTMLOlAttributes, ITEM>
    /**
     * Used to pass attributes to the label list item's DOM element.
     */
    labelListItem?: MeterGroupPassThroughType<HTMLLiAttributes, ITEM>
    /**
     * Used to pass attributes to the label list icon's DOM element.
     */
    labelListIcon?: MeterGroupPassThroughType<HTMLSpanAttributes, ITEM>
    /**
     * Used to pass attributes to the label's DOM element.
     */
    label?: MeterGroupPassThroughType<HTMLSpanAttributes, ITEM>
    /**
     * Used to pass attributes to the label icoon's DOM element.
     */
    labelIcon?: MeterGroupPassThroughType<HTMLIAttributes, ITEM>
    /**
     * Used to pass attributes to the meter container's DOM element.
     */
    meterContainer?: MeterGroupPassThroughType<HTMLDivAttributes, ITEM>
    /**
     * Used to pass attributes to the meter's DOM element.
     */
    meter?: MeterGroupPassThroughType<HTMLElementAttributes, ITEM>
}

/**
 * Defines current options in MeterGroup component.
 * @group ptContextOption
 */
export interface MeterGroupContext {}
