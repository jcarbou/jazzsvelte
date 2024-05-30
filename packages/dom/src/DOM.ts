import { isFunction } from '@jazzsvelte/object'

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

/**
 * Get element offset
 */
export function getOffset(el: HTMLElement | null): { top: number | 'auto'; left: number | 'auto' } {
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
