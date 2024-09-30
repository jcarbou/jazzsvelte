
import type { SvelteComponent } from 'svelte'
import type {
CssObject,
   HTMLDivAttributes,
   HTMLSVGAttributes,
   HTMLSpanAttributes,
   IconComponent,
   PassThroughHTMLAttributes,
   PassThroughType
} from '@jazzsvelte/api'

/**
 * Types used by properties of the VirtualScroller component.
 * @group types
 **/
export type VirtualScrollerOrientation = 'both' | 'horizontal' | 'vertical'

/**
 * undefined
 * @group baseProperties
 */
export interface BaseVirtualScrollerProps {
   /**
     * Used to append each loaded item to top without removing any items from the DOM. Using very large data may cause the browser to crash.
     * @default  false
     */
    appendOnly?: boolean

   /**
     * Whether to dynamically change the height or width of scrollable container.
     * @default  false
     */
    autoSize?: boolean

   /**
     * CSS classes to add to root element.
     * @default  null
     */
    class?: string | null

   /**
     * Style class of the component.
     * @default  null
     */
    className?: string | null

   /**
     * Columns of the virtual scroller for vertical option.
     * @default  null
     */
    columns?: any

   /**
     * The template of item's wrapper element.
     * @default  null
     */
    contentTemplate?: typeof SvelteComponent | null

   /**
     * Delay in scroll before new data is loaded.
     * @default  0
     */
    delay?: number

   /**
     * If disabled, the VirtualScroller feature is eliminated and the content is displayed directly.
     * @default  false
     */
    disabled?: boolean

   /**
     * Unique identifier of the element.
     * @default  null
     */
    id?: string | null

   /**
     * When enabled, positions the content as inline.
     * @default  false
     */
    inline?: boolean

   /**
     * An array of objects to display.
     * @default  null
     */
    items?: null | any[] | any[][]

   /**
     * The height/width of item according to orientation.
     * @default  null
     */
    itemSize?: number | number[]

   /**
     * The template of item.
     * @default  null
     */
    itemTemplate?: typeof SvelteComponent | null

   /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @default  false
     */
    lazy?: boolean

   /**
     * Used to implement a custom loader instead of using the loader feature in the VirtualScroller.
     * @default  false
     */
    loaderDisabled?: boolean

   /**
     * The template of loader's icon.
     * @default  null
     */
    loaderIconTemplate?: typeof SvelteComponent | null

   /**
     * Whether the data is loaded.
     * @default  false
     */
    loading?: boolean

   /**
     * The icon to show while indicating data load is in progress.
     * @default  null
     */
    loadingIcon?: string | IconComponent | null

   /**
     * The template of loader.
     * @default  null
     */
    loadingTemplate?: typeof SvelteComponent | null

   /**
     * Determines how many additional elements to add to the DOM outside of the view. According to the scrolls made up and down, extra items are added in a certain algorithm in the form of multiples of this number. Default value is half the number of items shown in the view.
     * @default  null
     */
    numToleratedItems?: number

   /**
     * The orientation of scrollbar, valid values are 'vertical', 'horizontal' and 'both'.
     * @default  'vertical'
     */
    orientation?: VirtualScrollerOrientation

   /**
     * Uses to pass attributes to DOM elements inside the component.
     * @default  null
     */
    pt?: VirtualScrollerPassThroughOptions

   /**
     * Used to configure passthrough(pt) options of the component.
     * @default  null
     */
    ptOptions?: VirtualScrollerPassThroughMethodOptions

   /**
     * Delay after window's resize finishes.
     * @default  10
     */
    resizeDelay?: number

   /**
     * Height of the scroll viewport.
     * @default  null
     */
    scrollHeight?: string | null

   /**
     * Width of the scroll viewport.
     * @default  null
     */
    scrollWidth?: string | null

   /**
     * Whether to show loader.
     * @default  false
     */
    showLoader?: boolean

   /**
     * Used to implement a custom spacer instead of using the spacer feature in the VirtualScroller.
     * @default  true
     */
    showSpacer?: boolean

   /**
     * Used to specify how many items to load in each load method in lazy mode.
     * @default  0
     */
    step?: number

   /**
     * Inline style of the component.
     * @default  null
     */
    style?: string | CssObject | null

   /**
     * Index of the element in tabbing order.
     * @default  0
     */
    tabIndex?: number

}

/**
 * Defines valid properties in VirtualScroller component.
 * @group properties
 */
export interface VirtualScrollerProps extends Omit<HTMLDivAttributes, 'style'>, BaseVirtualScrollerProps {}

/**
 * @group ptType
 */
export declare type VirtualScrollerPassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, VirtualScrollerPassThroughMethodOptions>

/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface VirtualScrollerPassThroughMethodOptions {
   props: VirtualScrollerProps
   state: VirtualScrollerState
}

/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface VirtualScrollerPassThroughOptions {
   /**
     * Uses to pass attributes to the root's DOM element.
     */
   root?: VirtualScrollerPassThroughType<HTMLDivAttributes>
   /**
     * Uses to pass attributes to the content's DOM element.
     */
   content?: VirtualScrollerPassThroughType<HTMLDivAttributes>
   /**
     * Uses to pass attributes to the loader's DOM element.
     */
   loader?: VirtualScrollerPassThroughType<HTMLDivAttributes>
   /**
     * Uses to pass attributes to the loading icon's DOM element.
     */
   loadingIcon?: VirtualScrollerPassThroughType<HTMLSpanAttributes> | VirtualScrollerPassThroughType<HTMLSVGAttributes>
   /**
     * Uses to pass attributes to the spacer's DOM element.
     */
   spacer?: VirtualScrollerPassThroughType<HTMLDivAttributes>
}



/**
 * Defines current state of VirtualScroller component.
 * @group state
 */
export interface VirtualScrollerState {
    /**
     * First index of the new data range to be loaded as a number.
     */
    first: number
    /**
     * Last index of the new data range to be loaded as a number.
     */
    last: number
    /**
     * Index of the first item as a number.
     */
    page: number
    /**
     * Visible item count in the viewport as a number.
     */
    numItemsInViewport: number
    /**
     * Additional elements to add to the DOM outside of the view as a number.
     */
    numToleratedItems: number
    /**
     * Current loading state as a boolean.
     */
    loading: number
    /**
     * Loadable items array.
     */
    loaderArr: any[]
    /**
     * Number of rows to be rendered.
     */
    rows: number
    /**
     * Number of columns to be rendered.
     */
    cols: number
}

