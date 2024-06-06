/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Readable, Writable } from 'svelte/store'
import type { BooleanStore } from '@jazzsvelte/utils'
import type { PassThroughOptions } from './pt.types'

/**
 * Value (of type S) or function with current value as argument and returning new value
 */
export type SetStateAction<S> = S | ((prevState: S) => S)

/**
 * Takes an action as a parameter and returns nothing meaningful (void).
 */
export type Dispatch<A> = (action: A) => void

export type InputStyleType = 'outlined' | 'filled'

export type AppendToType = 'self' | HTMLElement | undefined | null | (() => HTMLElement)

export type StyleContainerType = ShadowRoot | HTMLElement | undefined | null

/**
 * ZIndex configuration options.
 */
export interface ZIndexOptions {
    /**
     * Sets the base index value for Dialog and Sidebar components.
     * @defaultValue 1100
     */
    modal: number
    /**
     * Sets the base index value for Overlay components such as Dropdown and OverlayPanel.
     * @defaultValue 1000
     */
    overlay: number
    /**
     * Sets the base index value for Overlay menus.
     * @defaultValue 1000
     */
    menu: number
    /**
     * Sets the base index value for Tooltip.
     * @defaultValue 1100
     */
    tooltip: number
    /**
     * Sets the base index value for Toast.
     * @defaultValue 1200
     */
    toast: number
}

/**
 * Filter match modes for DataTable filter menus.
 */
export interface FilterMatchModeOptions {
    /**
     * Array of filter match modes for text filtering.
     */
    text: any[]
    /**
     * Array of filter match modes for numeric filtering.
     */
    numeric: any[]
    /**
     * Array of filter match modes for date filtering.
     */
    date: any[]
}

/**
 * Configuration options for the JazzSvelte components.
 */
export interface JazzSvelteConfig {
    /**
     * When enabled, it removes all of components styles in the core.
     * @defaultValue false
     */
    unstyled: boolean

    /**
     * This option allows components with overlays like dropdowns or popups to be mounted into either the component or any DOM element, such as document body and self.
     */
    appendTo: AppendToType

    /**
     * This option allows `useStyle` to insert dynamic CSS styles into a specific container. This is useful when styles need to be scoped such as in a Shadow DOM.
     * @defaultValue document.head
     */
    styleContainer: StyleContainerType

    /**
     * ZIndexes are managed automatically to make sure layering of overlay components work seamlessly when combining multiple components. When autoZIndex is false, each group increments its zIndex within itself. Each property is optional, so when autoZIndex is enabled you can set the z-index for any component type, and the rest will be calculated automatically.
     * @defaultValue { modal: 1100, overlay: 1000, menu: 1000, tooltip: 1100, toast: 1200}
     */
    zIndex: Partial<ZIndexOptions>

    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions: PassThroughOptions

    /**
     * ZIndexes are managed automatically to make sure layering of overlay components work seamlessly when combining multiple components. When autoZIndex is false, each group increments its zIndex within itself.
     */
    autoZIndex: boolean
    /**
     * JazzSvelte components utilize "react-transition-group" internally to implement animations.
     * Setting "cssTransition" to "false" disables all animations.
     * @defaultValue true
     */
    cssTransition: BooleanStore
    /**
     * Default filter modes to display on DataTable filter menus.
     */
    filterMatchModeOptions: Writable<FilterMatchModeOptions>
    /**
     * Define behavior if the browser window is scrolled while displaying an overlay panel like a Dropdown or Calendar. Depending on your organization's accessibility needs some prefer panels to be closed on scrolling and some prefer the overlay follow the scroll.
     * @defaultValue false
     */
    hideOverlaysOnDocumentScrolling: BooleanStore
    /**
     * Input fields have two styles: default (outlined with borders) and filled (background-colored).
     * Applying 'p-input-filled' to an input's ancestor enables the filled style.
     */
    inputStyle: Writable<InputStyleType>
    /**
     * The locale configuration sets up the language and region specific preferences.
     * @defaultValue 'en'
     */
    locale: Writable<string>
    /**
     * The nonce value to use on dynamically generated style elements.
     */
    nonce: Writable<string | null>
    /**
     * Determines how null values are sorted.
     * @defaultValue 1
     */
    nullSortOrder: Writable<number>
    /**
     * Ripple is an optional animation for the supported components such as buttons.
     * @defaultValue false
     */
    ripple: BooleanStore
    /**
     * Current theme.
     * @defaultValue 'lara-light-amber'
     */
    theme: Writable<string>

    /**
     * Theme dark mode enabled (if available).
     * @defaultValue false
     */
    darkMode: BooleanStore

    /**
     * Computed  theme path
     * @defaultValue 'lara-light-amber'
     */
    themePath: Readable<string>

    /**
     * Method to configure JassSvelte on stratup
     * @param options options
     */
    config: (options: Partial<JazzSvelteOptions> | null) => void
}

/**
 * Configuration options for the JazzSvelte components.
 */
export interface JazzSvelteOptions {
    /**
     * When enabled, it removes all of components styles in the core.
     * @defaultValue false
     */
    unstyled?: boolean

    /**
     * This option allows components with overlays like dropdowns or popups to be mounted into either the component or any DOM element, such as document body and self.
     */
    appendTo?: AppendToType

    /**
     * This option allows `useStyle` to insert dynamic CSS styles into a specific container. This is useful when styles need to be scoped such as in a Shadow DOM.
     * @defaultValue document.head
     */
    styleContainer?: StyleContainerType

    /**
     * ZIndexes are managed automatically to make sure layering of overlay components work seamlessly when combining multiple components. When autoZIndex is false, each group increments its zIndex within itself. Each property is optional, so when autoZIndex is enabled you can set the z-index for any component type, and the rest will be calculated automatically.
     * @defaultValue { modal: 1100, overlay: 1000, menu: 1000, tooltip: 1100, toast: 1200}
     */
    zIndex?: Partial<ZIndexOptions>

    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions

    /**
     * ZIndexes are managed automatically to make sure layering of overlay components work seamlessly when combining multiple components. When autoZIndex is false, each group increments its zIndex within itself.
     */
    autoZIndex?: boolean
    /**
     * JazzSvelte components utilize "react-transition-group" internally to implement animations.
     * Setting "cssTransition" to "false" disables all animations.
     * @defaultValue true
     */
    cssTransition?: boolean
    /**
     * Default filter modes to display on DataTable filter menus.
     */
    filterMatchModeOptions?: FilterMatchModeOptions
    /**
     * Define behavior if the browser window is scrolled while displaying an overlay panel like a Dropdown or Calendar. Depending on your organization's accessibility needs some prefer panels to be closed on scrolling and some prefer the overlay follow the scroll.
     * @defaultValue false
     */
    hideOverlaysOnDocumentScrolling?: boolean
    /**
     * Input fields have two styles: default (outlined with borders) and filled (background-colored).
     * Applying 'p-input-filled' to an input's ancestor enables the filled style.
     */
    inputStyle?: InputStyleType
    /**
     * The locale configuration sets up the language and region specific preferences.
     * @defaultValue 'en'
     */
    locale?: string
    /**
     * The nonce value to use on dynamically generated style elements.
     */
    nonce?: string
    /**
     * Determines how null values are sorted.
     * @defaultValue 1
     */
    nullSortOrder?: number
    /**
     * Ripple is an optional animation for the supported components such as buttons.
     * @defaultValue false
     */
    ripple?: boolean
    /**
     * Current theme.
     * @defaultValue 'lara-light-amber'
     */
    theme?: string

    /**
     * Theme dark mode enabled (if available).
     * @defaultValue false
     */
    darkMode?: boolean
}

export interface JazzSvelteContext {
    //    unstyled?: boolean
    appendTo?: AppendToType
    styleContainer?: StyleContainerType
    zIndex?: Partial<ZIndexOptions>
    autoZIndex?: boolean
    cssTransition?: BooleanStore
    //filterMatchModeOptions?: FilterMatchModeOptions
    hideOverlaysOnDocumentScrolling?: BooleanStore
    inputStyle?: Writable<InputStyleType>
    //nonce?: string
    //nullSortOrder?: number
    ripple?: BooleanStore
}
