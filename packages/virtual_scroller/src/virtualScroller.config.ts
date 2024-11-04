import { SpinnerIcon } from '@jazzsvelte/spinner_icon'
import type { BaseVirtualScrollerProps, VirtualScrollerPassThroughOptions } from './virtualScroller.types'

/**
 * Global Pass Through options (for all virtualScrollers)
 */
export let globalVirtualScrollerPT: VirtualScrollerPassThroughOptions | null

/**
 * Set global Pass Through options (for all virtualScrollers)
 * @param options
 */
export function virtualScrollerPT(options: VirtualScrollerPassThroughOptions) {
    globalVirtualScrollerPT = options
}

/**
 * Default virtualScroller  props
 */
export const defaultVirtualScrollerProps: Omit<
    Required<BaseVirtualScrollerProps>,
    'pt' | 'ptOptions' | 'itemSize' | 'onLazyLoad'
> = {
    appendOnly: false,
    autoSize: false,
    class: null,
    columns: null,
    contentTemplate: null,
    delay: 0,
    disabled: false,
    id: null,
    inline: false,
    items: null,
    itemTemplate: null,
    lazy: false,
    loaderDisabled: false,
    loaderIconTemplate: null,
    loading: false,
    loadingIcon: SpinnerIcon,
    loadingTemplate: null,
    numToleratedItems: null,
    orientation: 'vertical',
    resizeDelay: 10,
    scrollHeight: null,
    scrollWidth: null,
    showLoader: false,
    showSpacer: true,
    step: 0,
    style: null,
    tabIndex: 0
}

/**
 * Set global default props (for all virtualScrollers)
 * @param options
 */
export function virtualScrollerDefaultProps(props: Partial<Omit<BaseVirtualScrollerProps, 'pt' | 'ptOptions'>>) {
    Object.assign(defaultVirtualScrollerProps, props)
}
