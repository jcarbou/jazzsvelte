import { isFunction } from '@jazzsvelte/object'

export type AppendTo = null | HTMLElement | 'self' | 'body' | (() => HTMLElement | 'self' | 'body')

/**
 * Test if OS is Android
 * @returns
 */
export function isAndroid(): boolean {
    if (typeof window !== 'undefined') {
        return /(android)/i.test(navigator.userAgent)
    }
    return false
}

/**
 * Test if OS is Android
 * @returns
 */
export function isIOS(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

/**
 * Get html element height (without padding)
 * @param el
 * @returns
 */
export function getHeight(el: HTMLElement | null): number {
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
export function getWidth(el: HTMLElement | null): number {
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
export function getOuterWidth(el: HTMLElement | null, margin?: boolean): number {
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
export function getOuterHeight(el: HTMLElement | null, margin?: boolean): number {
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

export function getHiddenElementOuterHeight(element: HTMLElement): number {
    if (element) {
        element.style.visibility = 'hidden'
        element.style.display = 'block'
        const elementHeight = element.offsetHeight
        element.style.display = 'none'
        element.style.visibility = 'visible'
        return elementHeight
    }
    return 0
}

export function getHiddenElementOuterWidth(element: HTMLElement): number {
    if (element) {
        element.style.visibility = 'hidden'
        element.style.display = 'block'
        const elementWidth = element.offsetWidth
        element.style.display = 'none'
        element.style.visibility = 'visible'
        return elementWidth
    }
    return 0
}

/**
 * Get element offset
 */
export function getOffsetNumbers(el: HTMLElement): { top: number; left: number } {
    const rect = el.getBoundingClientRect()
    return {
        top: rect.top + (document.documentElement.scrollTop || document.body.scrollTop || 0),
        left: rect.left + (document.documentElement.scrollLeft || document.body.scrollLeft || 0)
    }
}

/**
 * Get element offset
 */
export function getOffset(el: HTMLElement | null): { top: number; left: number } | { top: 'auto'; left: 'auto' } {
    if (el) return getOffsetNumbers(el)

    return {
        top: 'auto',
        left: 'auto'
    }
}

/**
 * Compute viewport size
 * @returns
 */
export function getViewport(): { width: number; height: number } {
    const win = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        w = win.innerWidth || e.clientWidth || g.clientWidth,
        h = win.innerHeight || e.clientHeight || g.clientHeight
    return { width: w, height: h }
}

/**
 * Get Window Scroll Left
 * @returns
 */
export function getWindowScrollLeft(): number {
    const doc = document.documentElement
    return doc.scrollLeft - (doc.clientLeft || 0)
}

/**
 * Get Window Scroll Top
 * @returns
 */
export function getWindowScrollTop(): number {
    const doc = document.documentElement
    return doc.scrollTop - (doc.clientTop || 0)
}

let calculatedScrollbarWidth: null | number = null

export function calculateScrollbarWidth(el?: HTMLElement): number {
    if (el) {
        const style = getComputedStyle(el)
        return el.offsetWidth - el.clientWidth - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth)
    } else {
        if (calculatedScrollbarWidth != null) return calculatedScrollbarWidth
        const scrollDiv = document.createElement('div')
        scrollDiv.className = 'p-scrollbar-measure'
        document.body.appendChild(scrollDiv)
        const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
        document.body.removeChild(scrollDiv)
        calculatedScrollbarWidth = scrollbarWidth
        return scrollbarWidth
    }
}

/**
 * Add event listener. If the element already have the same listener, it isn't added
 * @param element - element
 * @param eventName - event name
 * @param listener - listener
 */
export function setSingleEventListener(element: HTMLElement, eventName: string, listener: EventListenerOrEventListenerObject) {
    element.removeEventListener(eventName, listener)
    element.addEventListener(eventName, listener)
}

/**
 * Focus an input element if it does not already have focus.
 *
 * @param {HTMLElement} el a HTML element
 * @param {boolean} scrollTo flag to control whether to scroll to the element, false by default
 */
export function focusEl(el: HTMLElement, scrollTo?: boolean): void {
    const preventScroll = scrollTo === undefined ? true : !scrollTo
    el && document.activeElement !== el && el.focus({ preventScroll })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addStyles(element: any, styles: { [key: string]: string } = {}): void {
    if (element) {
        Object.entries(styles).forEach(([key, value]) => (element.style[key] = value))
    }
}

/**
 * Get element matching  given selector
 * @param el a HTML element
 * @param selector
 * @returns
 */
export function findSingleEl(el: HTMLElement, selector: string): HTMLElement | null {
    return el ? el.querySelector(selector) : null
}

/**
 * Find Collision Position for tooltip and his container element
 * @param position
 * @returns
 */
export function findCollisionPosition(
    position: 'top' | 'bottom' | 'left' | 'right'
): { axis: 'x' | 'y'; my: string; at: string } | undefined {
    if (position) {
        const isAxisY = position === 'top' || position === 'bottom'
        const myXPosition = position === 'left' ? 'right' : 'left'
        const myYPosition = position === 'top' ? 'bottom' : 'top'
        if (isAxisY) {
            return {
                axis: 'y',
                my: `center ${myYPosition}`,
                at: `center ${position}`
            }
        }
        return {
            axis: 'x',
            my: `${myXPosition} center`,
            at: `${position} center`
        }
    }
}

type PositionX = 'left' | 'right' | 'center'
type PositionY = 'top' | 'bottom' | 'center'

type PositionOffset = {
    x: PositionX
    y: PositionY
    offsetX: number
    offsetY: number
}

type PositionMyAt = {
    my: PositionOffset
    at: PositionOffset
}

export function flipfitCollision(
    element: HTMLElement,
    target: HTMLElement,
    my: string = 'left top',
    at: string = 'left bottom',
    callback?: (position: PositionMyAt) => void
): void {
    if (!element || !target) return
    const targetOffset = target.getBoundingClientRect()
    const viewport = getViewport()
    const myArr = my.split(' ')
    const atArr = at.split(' ')
    const getStringValue = (arr: string): string => arr.substring(0, arr.search(/(\+|-)/g)) || arr
    const getNumberValue = (arr: string): number => +arr.substring(arr.search(/(\+|-)/g)) || 0
    const position: PositionMyAt = {
        my: {
            x: getStringValue(myArr[0]) as PositionX,
            y: getStringValue(myArr[1] || myArr[0]) as PositionY,
            offsetX: getNumberValue(myArr[0]),
            offsetY: getNumberValue(myArr[1] || myArr[0])
        },
        at: {
            x: getStringValue(atArr[0]) as PositionX,
            y: getStringValue(atArr[1] || atArr[0]) as PositionY,
            offsetX: getNumberValue(atArr[0]),
            offsetY: getNumberValue(atArr[1] || atArr[0])
        }
    }
    const myOffset = {
        left: (): number => {
            const totalOffset = position.my.offsetX + position.at.offsetX
            return (
                totalOffset +
                targetOffset.left +
                (position.my.x === 'left'
                    ? 0
                    : -1 * (position.my.x === 'center' ? getOuterWidth(element) / 2 : getOuterWidth(element)))
            )
        },
        top: (): number => {
            const totalOffset = position.my.offsetY + position.at.offsetY
            return (
                totalOffset +
                targetOffset.top +
                (position.my.y === 'top'
                    ? 0
                    : -1 * (position.my.y === 'center' ? getOuterHeight(element) / 2 : getOuterHeight(element)))
            )
        }
    }
    const alignWithAt = {
        count: {
            x: 0,
            y: 0
        },
        left: function (): void {
            const left = myOffset.left()
            const scrollLeft = getWindowScrollLeft()
            element.style.left = left + scrollLeft + 'px'
            if (this.count.x === 2) {
                element.style.left = scrollLeft + 'px'
                this.count.x = 0
            } else if (left < 0) {
                this.count.x++
                position.my.x = 'left'
                position.at.x = 'right'
                position.my.offsetX *= -1
                position.at.offsetX *= -1
                this.right()
            }
        },
        right: function (): void {
            const left = myOffset.left() + getOuterWidth(target)
            const scrollLeft = getWindowScrollLeft()
            element.style.left = left + scrollLeft + 'px'
            if (this.count.x === 2) {
                element.style.left = viewport.width - getOuterWidth(element) + scrollLeft + 'px'
                this.count.x = 0
            } else if (left + getOuterWidth(element) > viewport.width) {
                this.count.x++
                position.my.x = 'right'
                position.at.x = 'left'
                position.my.offsetX *= -1
                position.at.offsetX *= -1
                this.left()
            }
        },
        top: function (): void {
            const top = myOffset.top()
            const scrollTop = getWindowScrollTop()
            element.style.top = top + scrollTop + 'px'
            if (this.count.y === 2) {
                element.style.left = scrollTop + 'px'
                this.count.y = 0
            } else if (top < 0) {
                this.count.y++
                position.my.y = 'top'
                position.at.y = 'bottom'
                position.my.offsetY *= -1
                position.at.offsetY *= -1
                this.bottom()
            }
        },
        bottom: function (): void {
            const top = myOffset.top() + getOuterHeight(target)
            const scrollTop = getWindowScrollTop()
            element.style.top = top + scrollTop + 'px'
            if (this.count.y === 2) {
                element.style.left = viewport.height - getOuterHeight(element) + scrollTop + 'px'
                this.count.y = 0
            } else if (top + getOuterHeight(target) > viewport.height) {
                this.count.y++
                position.my.y = 'bottom'
                position.at.y = 'top'
                position.my.offsetY *= -1
                position.at.offsetY *= -1
                this.top()
            }
        },
        center: function (axis: string): void {
            if (axis === 'y') {
                const top = myOffset.top() + getOuterHeight(target) / 2
                element.style.top = top + getWindowScrollTop() + 'px'
                if (top < 0) {
                    this.bottom()
                } else if (top + getOuterHeight(target) > viewport.height) {
                    this.top()
                }
            } else {
                const left = myOffset.left() + getOuterWidth(target) / 2
                element.style.left = left + getWindowScrollLeft() + 'px'
                if (left < 0) {
                    this.left()
                } else if (left + getOuterWidth(element) > viewport.width) {
                    this.right()
                }
            }
        }
    }
    alignWithAt[position.at.x]('x')
    alignWithAt[position.at.y]('y')
    if (callback && isFunction(callback)) {
        callback(position)
    }
}

export function alignOverlay(overlay: HTMLElement, target: HTMLElement, appendTo: AppendTo, calculateMinWidth = true) {
    if (overlay && target) {
        if (appendTo === 'self') {
            relativePosition(overlay, target)
        } else {
            calculateMinWidth && (overlay.style.minWidth = getOuterWidth(target) + 'px')
            absolutePosition(overlay, target)
        }
    }
}

export function relativePosition(element: HTMLElement, target: HTMLElement) {
    if (element && target) {
        const elementDimensions = getElementDimensions(element)
        const targetHeight = target.offsetHeight
        const targetOffset = target.getBoundingClientRect()
        const viewport = getViewport()
        let top
        let left

        if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
            top = -1 * elementDimensions.height

            if (targetOffset.top + top < 0) {
                top = -1 * targetOffset.top
            }

            element.style.transformOrigin = 'bottom'
        } else {
            top = targetHeight
            element.style.transformOrigin = 'top'
        }

        if (elementDimensions.width > viewport.width) {
            // element wider then viewport and cannot fit on screen (align at left side of viewport)
            left = targetOffset.left * -1
        } else if (targetOffset.left + elementDimensions.width > viewport.width) {
            // element wider then viewport but can be fit on screen (align at right side of viewport)
            left = (targetOffset.left + elementDimensions.width - viewport.width) * -1
        } else {
            // element fits on screen (align with target)
            left = 0
        }

        element.style.top = top + 'px'
        element.style.left = left + 'px'
    }
}

export function getHiddenElementDimensions(element: HTMLElement) {
    const dimensions: { width?: number; height?: number } = {}

    if (element) {
        element.style.visibility = 'hidden'
        element.style.display = 'block'
        dimensions.width = element.offsetWidth
        dimensions.height = element.offsetHeight
        element.style.display = 'none'
        element.style.visibility = 'visible'
    }

    return dimensions
}

export function getElementDimensions(element: HTMLElement): { width: number; height: number } {
    const dimensions = element.offsetParent
        ? { width: element.offsetWidth, height: element.offsetHeight }
        : getHiddenElementDimensions(element)

    return { width: dimensions.width || 0, height: dimensions.width || 0 }
}

export function absolutePosition(element: HTMLElement, target: HTMLElement, align = 'left') {
    if (element && target) {
        const elementDimensions = getElementDimensions(element)
        const elementOuterHeight = elementDimensions.height
        const elementOuterWidth = elementDimensions.width
        const targetOuterHeight = target.offsetHeight
        const targetOuterWidth = target.offsetWidth
        const targetOffset = target.getBoundingClientRect()
        const windowScrollTop = getWindowScrollTop()
        const windowScrollLeft = getWindowScrollLeft()
        const viewport = getViewport()
        let top
        let left

        if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
            top = targetOffset.top + windowScrollTop - elementOuterHeight

            if (top < 0) {
                top = windowScrollTop
            }

            element.style.transformOrigin = 'bottom'
        } else {
            top = targetOuterHeight + targetOffset.top + windowScrollTop
            element.style.transformOrigin = 'top'
        }

        const targetOffsetPx = targetOffset.left
        const alignOffset = align === 'left' ? 0 : elementOuterWidth - targetOuterWidth

        if (targetOffsetPx + targetOuterWidth + elementOuterWidth > viewport.width) {
            left = Math.max(0, targetOffsetPx + windowScrollLeft + targetOuterWidth - elementOuterWidth)
        } else {
            left = targetOffsetPx - alignOffset + windowScrollLeft
        }

        element.style.top = top + 'px'
        element.style.left = left + 'px'
    }
}
