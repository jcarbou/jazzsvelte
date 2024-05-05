import { FilterMatchMode } from './FilterMatchMode'
import { createBooleanStore } from '@jazzsvelte/utils'
import { derived, writable } from 'svelte/store'
import type { InputStyleType, JazzSvelte, JazzSvelteOptions } from './jazzSvelte.types'

const theme = writable('lara-light-amber')
const darkMode = createBooleanStore(false)
const themePath = derived([theme, darkMode], ([$theme, $darkMode]) => $theme.replace('light', $darkMode ? 'dark' : 'light'))

/**
 * Configuration options for the JazzSvelte components.
 * For documentation of JAZZ_SVELTE properties, see typescript interface JazzSvelte
 */
export const JAZZ_SVELTE: JazzSvelte = Object.seal({
    unstyled: false,
    appendTo: null,
    styleContainer: null,
    zIndex: {
        modal: 1100,
        overlay: 1000,
        menu: 1000,
        tooltip: 1100,
        toast: 1200
    },
    pt: undefined,
    ptOptions: {
        mergeSections: true,
        mergeProps: true
    },
    autoZIndex: false,
    cssTransition: createBooleanStore(true),
    filterMatchModeOptions: writable({
        text: [
            FilterMatchMode.STARTS_WITH,
            FilterMatchMode.CONTAINS,
            FilterMatchMode.NOT_CONTAINS,
            FilterMatchMode.ENDS_WITH,
            FilterMatchMode.EQUALS,
            FilterMatchMode.NOT_EQUALS
        ],
        numeric: [
            FilterMatchMode.EQUALS,
            FilterMatchMode.NOT_EQUALS,
            FilterMatchMode.LESS_THAN,
            FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
            FilterMatchMode.GREATER_THAN,
            FilterMatchMode.GREATER_THAN_OR_EQUAL_TO
        ],
        date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
    }),
    hideOverlaysOnDocumentScrolling: createBooleanStore(false),
    inputStyle: writable<InputStyleType>('outlined'),
    locale: writable<string>('en'),
    nonce: writable<string | null>(null),
    nullSortOrder: writable<number>(1),
    ripple: createBooleanStore(true),
    theme,
    darkMode,
    themePath,

    /**
     *  Method to configure JassSvelte on stratup
     * @param options
     */
    config: (options: Partial<JazzSvelteOptions>) => {
        // Properies set on startup then not editable
        JAZZ_SVELTE.unstyled = !!options.unstyled
        JAZZ_SVELTE.appendTo = options.appendTo
        JAZZ_SVELTE.styleContainer = options.styleContainer
        JAZZ_SVELTE.autoZIndex = !options.autoZIndex
        options.zIndex && (JAZZ_SVELTE.zIndex = options.zIndex)
        options.ptOptions !== undefined && (JAZZ_SVELTE.ptOptions = options.ptOptions)
        options.pt !== undefined && (JAZZ_SVELTE.pt = options.pt)

        // Properties set on startup and editable (svelte writable store)
        JAZZ_SVELTE.darkMode.set(!!options.darkMode)
        options.theme && JAZZ_SVELTE.theme.set(options.theme)
        JAZZ_SVELTE.ripple.set(!!options.ripple)
        options.inputStyle && JAZZ_SVELTE.inputStyle.set(options.inputStyle)
        options.locale && JAZZ_SVELTE.locale.set(options.locale)
        JAZZ_SVELTE.cssTransition.set(!!options.cssTransition)
        JAZZ_SVELTE.hideOverlaysOnDocumentScrolling.set(!!options.hideOverlaysOnDocumentScrolling)
        options.nonce !== undefined && JAZZ_SVELTE.nonce.set(options.nonce)
        options.nullSortOrder !== undefined && JAZZ_SVELTE.nullSortOrder.set(options.nullSortOrder)
        options.filterMatchModeOptions !== undefined && JAZZ_SVELTE.filterMatchModeOptions.set(options.filterMatchModeOptions)
    }
})
