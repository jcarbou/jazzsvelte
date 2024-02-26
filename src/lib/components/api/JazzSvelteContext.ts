import { FilterMatchMode } from './FilterMatchMode'
import { createBooleanStore } from '../utils/customStores'
import { derived, writable } from 'svelte/store'
import type { APIOptions, JazzSvelteContext } from './Api.types'

const theme = writable('lara-light-amber')
const darkMode = createBooleanStore(false)
const themePath = derived([theme, darkMode], ([$theme, $darkMode]) => $theme.replace('light', $darkMode ? 'dark' : 'light'))

export const JAZZ_SVELTE_CONTEXT: JazzSvelteContext = {
    ripple: createBooleanStore(false),
    inputStyle: writable('outlined'),
    locale: writable('en'),
    appendTo: writable(null),
    styleContainer: writable(null),
    cssTransition: createBooleanStore(true),
    autoZIndex: createBooleanStore(true),
    hideOverlaysOnDocumentScrolling: createBooleanStore(false),
    nonce: writable(null),
    nullSortOrder: writable(1),
    zIndex: writable({
        modal: 1100,
        overlay: 1000,
        menu: 1000,
        tooltip: 1100,
        toast: 1200
    }),
    ptOptions: writable({
        mergeSections: true,
        mergeProps: true
    }),
    pt: writable(undefined),
    unstyled: createBooleanStore(false),
    filterMatchModeOptions: writable({
        text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
        numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
        date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
    }),
    theme,

    darkMode,
    themePath
}

export function updateJazzSvelteContext(state: Partial<APIOptions>) {
    JAZZ_SVELTE_CONTEXT.darkMode.set(!!state.darkMode)
    JAZZ_SVELTE_CONTEXT.ripple.set(!!state.ripple)
    state.inputStyle && JAZZ_SVELTE_CONTEXT.inputStyle.set(state.inputStyle)
    state.locale && JAZZ_SVELTE_CONTEXT.locale.set(state.locale)
    state.appendTo !== undefined && JAZZ_SVELTE_CONTEXT.appendTo.set(state.appendTo)
    state.styleContainer !== undefined && JAZZ_SVELTE_CONTEXT.styleContainer.set(state.styleContainer)
    JAZZ_SVELTE_CONTEXT.cssTransition.set(!!state.cssTransition)
    JAZZ_SVELTE_CONTEXT.autoZIndex.set(!!state.autoZIndex)
    JAZZ_SVELTE_CONTEXT.hideOverlaysOnDocumentScrolling.set(!!state.hideOverlaysOnDocumentScrolling)
    state.nonce !== undefined && JAZZ_SVELTE_CONTEXT.nonce.set(state.nonce)
    state.nullSortOrder !== undefined && JAZZ_SVELTE_CONTEXT.nullSortOrder.set(state.nullSortOrder)
    state.zIndex && JAZZ_SVELTE_CONTEXT.zIndex.set(state.zIndex)
    state.ptOptions !== undefined && JAZZ_SVELTE_CONTEXT.ptOptions.set(state.ptOptions)
    state.pt !== undefined && JAZZ_SVELTE_CONTEXT.pt.set(state.pt)
    JAZZ_SVELTE_CONTEXT.unstyled.set(!!state.unstyled)
    state.filterMatchModeOptions !== undefined && JAZZ_SVELTE_CONTEXT.filterMatchModeOptions.set(state.filterMatchModeOptions)
    state.theme && JAZZ_SVELTE_CONTEXT.theme.set(state.theme)
    JAZZ_SVELTE_CONTEXT.darkMode.set(!!state.darkMode)
}
