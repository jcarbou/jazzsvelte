/**
 * Get html element height (without padding)
 * @param el
 * @returns
 */
function getHeight(el: HTMLElement | null): number {
    if (el) {
        let height = el.offsetHeight
        const style = getComputedStyle(el)
        height -=
            parseFloat(style.paddingTop) +
            parseFloat(style.paddingBottom) +
            parseFloat(style.borderTopWidth) +
            parseFloat(style.borderBottomWidth)
        return height
    }
    return 0
}

/**
 * Get html element width (without padding)
 * @param el
 * @returns
 */
function getWidth(el: HTMLElement | null): number {
    if (el) {
        let width = el.offsetWidth
        const style = getComputedStyle(el)
        width -=
            parseFloat(style.paddingLeft) +
            parseFloat(style.paddingRight) +
            parseFloat(style.borderLeftWidth) +
            parseFloat(style.borderRightWidth)
        return width
    }
    return 0
}

/**
 * Get elemnt outer width (inluding margin or not)
 * @param el
 * @param margin
 * @returns
 */
function getOuterWidth(el: HTMLElement | null, margin?: boolean): number {
    if (el) {
        let width = el.getBoundingClientRect().width || el.offsetWidth
        if (margin) {
            const style = getComputedStyle(el)
            width += parseFloat(style.marginLeft) + parseFloat(style.marginRight)
        }
        return width
    }
    return 0
}

/**
 * Get elemnt outer height (inluding margin or not)
 * @param el
 * @param margin
 * @returns
 */
function getOuterHeight(el: HTMLElement | null, margin?: boolean): number {
    if (el) {
        let height = el.getBoundingClientRect().height || el.offsetHeight
        if (margin) {
            const style = getComputedStyle(el)
            height += parseFloat(style.marginTop) + parseFloat(style.marginBottom)
        }
        return height
    }
    return 0
}

/**
 * Get element offset
 */
function getOffset(el: HTMLElement | null): { top: number | 'auto'; left: number | 'auto' } {
    if (el) {
        const rect = el.getBoundingClientRect()
        return {
            top: rect.top + (document.documentElement.scrollTop || document.body.scrollTop || 0),
            left: rect.left + (document.documentElement.scrollLeft || document.body.scrollLeft || 0)
        }
    }
    return {
        top: 'auto',
        left: 'auto'
    }
}

export default {
    getHeight,
    getWidth,
    getOuterHeight,
    getOuterWidth,
    getOffset
}
