/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
type HTMLElement$Attr = HTMLElement & { $attrs?: { [key: string]: any } }

export default class DomHandler {
    /**
     * All data- properties like data-test-id
     */
    static DATA_PROPS: string[] = ['data-']
    /**
     * All ARIA properties like aria-label and focus-target for https://www.npmjs.com/package/@q42/floating-focus-a11y
     */
    static ARIA_PROPS: string[] = ['aria', 'focus-target']

    static calculatedScrollbarWidth: number | null = null

    static browser: { [key: string]: string | boolean } | null

    static width(el: HTMLElement | null): number {
        if (el) {
            let width = el.offsetWidth
            const style = getComputedStyle(el)
            width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
            return width
        }
        return 0
    }

    static getBrowserLanguage(): string {
        return (navigator.languages && navigator.languages.length && navigator.languages[0]) || navigator.language || 'en'
    }

    static getWindowScrollTop(): number {
        const doc = document.documentElement
        return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
    }

    static getWindowScrollLeft(): number {
        const doc = document.documentElement
        return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
    }

    static getOuterWidth(el: HTMLElement | null, margin?: boolean): number {
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

    static getOuterHeight(el: HTMLElement | null, margin?: boolean): number {
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

    static getClientHeight(el: HTMLElement | null, margin?: boolean): number {
        if (el) {
            let height = el.clientHeight
            if (margin) {
                const style = getComputedStyle(el)
                height += parseFloat(style.marginTop) + parseFloat(style.marginBottom)
            }
            return height
        }
        return 0
    }

    static getClientWidth(el: HTMLElement | null, margin?: boolean): number {
        if (el) {
            let width = el.clientWidth
            if (margin) {
                const style = getComputedStyle(el)
                width += parseFloat(style.marginLeft) + parseFloat(style.marginRight)
            }
            return width
        }
        return 0
    }

    static getViewport(): { width: number; height: number } {
        const win = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            w = win.innerWidth || e.clientWidth || g.clientWidth,
            h = win.innerHeight || e.clientHeight || g.clientHeight
        return { width: w, height: h }
    }

    static getOffset(el: HTMLElement | null): { top: number | 'auto'; left: number | 'auto' } {
        if (el) {
            const rect = el.getBoundingClientRect()
            return {
                top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
                left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0)
            }
        }
        return {
            top: 'auto',
            left: 'auto'
        }
    }

    static index(element: HTMLElement | null): number {
        const children = element?.parentNode?.childNodes

        if (!children || children.length === 0) {
            return -1
        }
        let num = 0
        for (let i = 0; i < children.length; i++) {
            if (children[i] === element) return num
            if (children[i].nodeType === 1) num++
        }
        return -1
    }

    static addMultipleClasses(element: HTMLElement | null, className: string): void {
        if (element && className) {
            if (element.classList) {
                const styles = className.split(' ')
                for (let i = 0; i < styles.length; i++) {
                    element.classList.add(styles[i])
                }
            } else {
                const styles = className.split(' ')
                for (let i = 0; i < styles.length; i++) {
                    element.className += ' ' + styles[i]
                }
            }
        }
    }

    static removeMultipleClasses(element: HTMLElement | null, className: string): void {
        if (element && className) {
            if (element.classList) {
                const styles = className.split(' ')
                for (let i = 0; i < styles.length; i++) {
                    element.classList.remove(styles[i])
                }
            } else {
                const styles = className.split(' ')
                for (let i = 0; i < styles.length; i++) {
                    element.className = element.className.replace(new RegExp('(^|\\b)' + styles[i].split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
                }
            }
        }
    }

    static addClass(element: HTMLElement | null, className: string): void {
        if (element && className) {
            if (element.classList) element.classList.add(className)
            else element.className += ' ' + className
        }
    }

    static removeClass(element: HTMLElement | null, className: string): void {
        if (element && className) {
            if (element.classList) element.classList.remove(className)
            else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
        }
    }

    static hasClass(element: HTMLElement | null, className: string): boolean {
        if (element) {
            if (element.classList) return element.classList.contains(className)
            else return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className)
        }
        return false
    }

    static addStyles(element: HTMLElement | null, styles: { [key: string]: string }): void {
        if (element) {
            Object.entries(styles).forEach(([key, value]) => (element.style[key as any] = value))
        }
    }

    static find(element: HTMLElement | null, selector: string): HTMLElement[] {
        return element ? Array.from(element.querySelectorAll(selector)) : []
    }

    static findSingle(element: HTMLElement | null, selector: string): HTMLElement | null {
        if (element) {
            return element.querySelector(selector)
        }
        return null
    }

    static setAttributes(element: HTMLElement$Attr, attributes: { [key: string]: any }): void {
        if (element) {
            const computedStyles = (rule: string, value: any): string[] => {
                const styles = element?.$attrs?.[rule] ? [element?.$attrs?.[rule]] : []
                return [value].flat().reduce((cv: string[], v: any) => {
                    if (v !== null && v !== undefined) {
                        const type = typeof v
                        if (type === 'string' || type === 'number') {
                            cv.push(v)
                        } else if (type === 'object') {
                            const _cv = Array.isArray(v) ? computedStyles(rule, v) : Object.entries(v).map(([_k, _v]) => (rule === 'style' && (!!_v || _v === 0) ? `${_k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}:${_v}` : _v ? _k : undefined))
                            cv = _cv.length ? cv.concat((_cv as any).filter((c: any) => !!c)) : cv
                        }
                    }
                    return cv
                }, styles)
            }
            Object.entries(attributes).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    const matchedEvent = key.match(/^on(.+)/)
                    if (matchedEvent) {
                        element.addEventListener(matchedEvent[1].toLowerCase(), value)
                    } else if (key === 'p-bind') {
                        this.setAttributes(element, value)
                    } else {
                        value = key === 'class' ? [...new Set(computedStyles('class', value))].join(' ').trim() : key === 'style' ? computedStyles('style', value).join(';').trim() : value
                        ;(element.$attrs = element.$attrs || {}) && (element.$attrs[key] = value)
                        element.setAttribute(key, value)
                    }
                }
            })
        }
    }
    static getAttribute(element: HTMLElement | null, name: string): string | number | boolean | null | undefined {
        if (element) {
            const value = element.getAttribute(name)
            if (!isNaN(Number(value))) {
                return value === null ? 0 : +value
            }
            if (value === 'true' || value === 'false') {
                return value === 'true'
            }
            return value
        }
        return undefined
    }
    static isAttributeEquals(element: HTMLElement | null, name: string, value: string | number | boolean): boolean {
        return element ? this.getAttribute(element, name) === value : false
    }
    static isAttributeNotEquals(element: HTMLElement | null, name: string, value: string | number | boolean): boolean {
        return !this.isAttributeEquals(element, name, value)
    }
    static getHeight(el: HTMLElement | null): number {
        if (el) {
            let height = el.offsetHeight
            const style = getComputedStyle(el)
            height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
            return height
        }
        return 0
    }
    static getWidth(el: HTMLElement | null): number {
        if (el) {
            let width = el.offsetWidth
            const style = getComputedStyle(el)
            width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth)
            return width
        }
        return 0
    }
    static alignOverlay(overlay: HTMLElement | null, target: HTMLElement | null, appendTo: 'self' | 'body', calculateMinWidth: boolean = true): void {
        if (overlay && target) {
            if (appendTo === 'self') {
                this.relativePosition(overlay, target)
            } else {
                calculateMinWidth && (overlay.style.minWidth = DomHandler.getOuterWidth(target) + 'px')
                this.absolutePosition(overlay, target)
            }
        }
    }
    static absolutePosition(element: HTMLElement | null, target: HTMLElement | null, align: 'left' | 'right' = 'left'): void {
        if (element && target) {
            const elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element)
            const elementOuterHeight = elementDimensions.height || 0
            const elementOuterWidth = elementDimensions.width || 0
            const targetOuterHeight = target.offsetHeight
            const targetOuterWidth = target.offsetWidth
            const targetOffset = target.getBoundingClientRect()
            const windowScrollTop = this.getWindowScrollTop()
            const windowScrollLeft = this.getWindowScrollLeft()
            const viewport = this.getViewport()
            let top, left
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
            if (targetOffsetPx + targetOuterWidth + elementOuterWidth > viewport.width) left = Math.max(0, targetOffsetPx + windowScrollLeft + targetOuterWidth - elementOuterWidth)
            else left = targetOffsetPx - alignOffset + windowScrollLeft
            element.style.top = top + 'px'
            element.style.left = left + 'px'
        }
    }

    static relativePosition(element: HTMLElement | null, target: HTMLElement | null): void {
        if (element && target) {
            const elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element)
            const targetHeight = target.offsetHeight
            const targetOffset = target.getBoundingClientRect()
            const viewport = this.getViewport()
            const elHeight = elementDimensions?.height || 0
            const elWidth = elementDimensions?.height || 0
            let top, left
            if (targetOffset.top + targetHeight + elHeight > viewport.height) {
                top = -1 * elWidth
                if (targetOffset.top + top < 0) {
                    top = -1 * targetOffset.top
                }
                element.style.transformOrigin = 'bottom'
            } else {
                top = targetHeight
                element.style.transformOrigin = 'top'
            }
            if (elWidth > viewport.width) {
                // element wider then viewport and cannot fit on screen (align at left side of viewport)
                left = targetOffset.left * -1
            } else if (targetOffset.left + elWidth > viewport.width) {
                // element wider then viewport but can be fit on screen (align at right side of viewport)
                left = (targetOffset.left + elWidth - viewport.width) * -1
            } else {
                // element fits on screen (align with target)
                left = 0
            }
            element.style.top = top + 'px'
            element.style.left = left + 'px'
        }
    }
    static flipfitCollision(element: HTMLElement, target: HTMLElement, my: string = 'left top', at: string = 'left bottom', callback?: (position: any) => void): void {
        if (element && target) {
            const targetOffset = target.getBoundingClientRect()
            const viewport = this.getViewport()
            const myArr = my.split(' ')
            const atArr = at.split(' ')
            const getStringValue = (arr: string): string => arr.substring(0, arr.search(/(\+|-)/g)) || arr
            const getNumberValue = (arr: string): number => +arr.substring(arr.search(/(\+|-)/g)) || 0
            const position = {
                my: {
                    x: getStringValue(myArr[0]),
                    y: getStringValue(myArr[1] || myArr[0]),
                    offsetX: getNumberValue(myArr[0]),
                    offsetY: getNumberValue(myArr[1] || myArr[0])
                },
                at: {
                    x: getStringValue(atArr[0]),
                    y: getStringValue(atArr[1] || atArr[0]),
                    offsetX: getNumberValue(atArr[0]),
                    offsetY: getNumberValue(atArr[1] || atArr[0])
                }
            }
            const myOffset = {
                left: (): number => {
                    const totalOffset = position.my.offsetX + position.at.offsetX
                    return totalOffset + targetOffset.left + (position.my.x === 'left' ? 0 : -1 * (position.my.x === 'center' ? this.getOuterWidth(element) / 2 : this.getOuterWidth(element)))
                },
                top: (): number => {
                    const totalOffset = position.my.offsetY + position.at.offsetY
                    return totalOffset + targetOffset.top + (position.my.y === 'top' ? 0 : -1 * (position.my.y === 'center' ? this.getOuterHeight(element) / 2 : this.getOuterHeight(element)))
                }
            }
            const alignWithAt = {
                count: {
                    x: 0,
                    y: 0
                },
                left: function (): void {
                    const left = myOffset.left()
                    const scrollLeft = DomHandler.getWindowScrollLeft()
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
                    const left = myOffset.left() + DomHandler.getOuterWidth(target)
                    const scrollLeft = DomHandler.getWindowScrollLeft()
                    element.style.left = left + scrollLeft + 'px'
                    if (this.count.x === 2) {
                        element.style.left = viewport.width - DomHandler.getOuterWidth(element) + scrollLeft + 'px'
                        this.count.x = 0
                    } else if (left + DomHandler.getOuterWidth(element) > viewport.width) {
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
                    const scrollTop = DomHandler.getWindowScrollTop()
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
                    const top = myOffset.top() + DomHandler.getOuterHeight(target)
                    const scrollTop = DomHandler.getWindowScrollTop()
                    element.style.top = top + scrollTop + 'px'
                    if (this.count.y === 2) {
                        element.style.left = viewport.height - DomHandler.getOuterHeight(element) + scrollTop + 'px'
                        this.count.y = 0
                    } else if (top + DomHandler.getOuterHeight(target) > viewport.height) {
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
                        const top = myOffset.top() + DomHandler.getOuterHeight(target) / 2
                        element.style.top = top + DomHandler.getWindowScrollTop() + 'px'
                        if (top < 0) {
                            this.bottom()
                        } else if (top + DomHandler.getOuterHeight(target) > viewport.height) {
                            this.top()
                        }
                    } else {
                        const left = myOffset.left() + DomHandler.getOuterWidth(target) / 2
                        element.style.left = left + DomHandler.getWindowScrollLeft() + 'px'
                        if (left < 0) {
                            this.left()
                        } else if (left + DomHandler.getOuterWidth(element) > viewport.width) {
                            this.right()
                        }
                    }
                }
            }
            ;(alignWithAt as any)[position.at.x]('x')
            ;(alignWithAt as any)[position.at.y]('y')
            if (callback && this.isFunction(callback)) {
                callback(position)
            }
        }
    }

    static findCollisionPosition(position: string): { axis: string; my: string; at: string } | undefined {
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
    static getParents(element: HTMLElement, parents: HTMLElement[] = []): HTMLElement[] {
        return element.parentNode === null ? parents : this.getParents(element.parentNode as HTMLElement, parents.concat([element.parentNode as HTMLElement]))
    }
    static getScrollableParents(element: HTMLElement, hideOverlaysOnDocumentScrolling: boolean = false): (HTMLElement | Window)[] {
        const scrollableParents: (HTMLElement | Window)[] = []
        if (element) {
            const parents = this.getParents(element)
            const overflowRegex = /(auto|scroll)/
            const overflowCheck = (node: HTMLElement | null): boolean => {
                const styleDeclaration = node ? getComputedStyle(node) : null
                return !!(
                    styleDeclaration &&
                    (overflowRegex.test(styleDeclaration.getPropertyValue('overflow')) || overflowRegex.test(styleDeclaration.getPropertyValue('overflowX')) || overflowRegex.test(styleDeclaration.getPropertyValue('overflowY')))
                )
            }
            const addScrollableParent = (node: HTMLElement): void => {
                if (hideOverlaysOnDocumentScrolling) {
                    // nodeType 9 is for document element
                    scrollableParents.push(node.nodeName === 'BODY' || node.nodeName === 'HTML' || node.nodeType === 9 ? window : node)
                } else {
                    scrollableParents.push(node)
                }
            }
            for (const parent of parents) {
                const scrollSelectors = parent.nodeType === 1 && (parent as HTMLElement).dataset['scrollselectors']
                if (scrollSelectors) {
                    const selectors = scrollSelectors.split(',')
                    for (const selector of selectors) {
                        const el = this.findSingle(parent, selector)
                        if (el && overflowCheck(el)) {
                            addScrollableParent(el)
                        }
                    }
                }
                // BODY
                if (parent.nodeType === 1 && overflowCheck(parent as HTMLElement)) {
                    addScrollableParent(parent as HTMLElement)
                }
            }
        }
        // we should always at least have the body or window
        if (!scrollableParents.some((node) => node === document.body || node === window)) {
            scrollableParents.push(window)
        }
        return scrollableParents
    }
    static getHiddenElementOuterHeight(element: HTMLElement): number {
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
    static getHiddenElementOuterWidth(element: HTMLElement): number {
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
    static getHiddenElementDimensions(element: HTMLElement): { width?: number; height?: number } {
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
    static fadeIn(element: HTMLElement, duration: number): void {
        if (element) {
            element.style.opacity = '0'
            let last = +new Date()
            let opacity = 0
            const tick = (): void => {
                opacity = +element.style.opacity + (new Date().getTime() - last) / duration
                element.style.opacity = opacity.toString()
                last = +new Date()
                if (+opacity < 1) {
                    requestAnimationFrame(tick) || setTimeout(tick, 16)
                }
            }
            tick()
        }
    }
    static fadeOut(element: HTMLElement, duration: number): void {
        if (element) {
            let opacity = 1
            const interval = 50,
                gap = interval / duration
            const fading = setInterval(() => {
                opacity -= gap
                if (opacity <= 0) {
                    opacity = 0
                    clearInterval(fading)
                }
                element.style.opacity = opacity.toString()
            }, interval)
        }
    }
    static getUserAgent(): string {
        return navigator.userAgent
    }
    static isIOS(): boolean {
        return /iPad|iPhone|iPod/.test(navigator.userAgent)
    }
    static isAndroid(): boolean {
        return /(android)/i.test(navigator.userAgent)
    }
    static isChrome(): boolean {
        return /(chrome)/i.test(navigator.userAgent)
    }
    static isClient(): boolean {
        return !!(typeof window !== 'undefined' && window.document && window.document.createElement)
    }
    static isTouchDevice(): boolean {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0
    }
    static isFunction(obj: any): boolean {
        return !!(obj && obj.constructor && obj.call && obj.apply)
    }
    static appendChild(element: HTMLElement, target: any): void {
        if (this.isElement(target)) target.appendChild(element)
        else if (target.el && target.el.nativeElement) target.el.nativeElement.appendChild(element)
        else throw new Error('Cannot append ' + target + ' to ' + element)
    }
    static removeChild(element: HTMLElement, target: any): void {
        if (this.isElement(target)) target.removeChild(element)
        else if (target.el && target.el.nativeElement) target.el.nativeElement.removeChild(element)
        else throw new Error('Cannot remove ' + element + ' from ' + target)
    }
    static isElement(obj: any): boolean {
        return typeof HTMLElement === 'object' ? obj instanceof HTMLElement : obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string'
    }
    static scrollInView(container: HTMLElement, item: HTMLElement): void {
        const borderTopValue = getComputedStyle(container).getPropertyValue('borderTopWidth')
        const borderTop = borderTopValue ? parseFloat(borderTopValue) : 0
        const paddingTopValue = getComputedStyle(container).getPropertyValue('paddingTop')
        const paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0
        const containerRect = container.getBoundingClientRect()
        const itemRect = item.getBoundingClientRect()
        const offset = itemRect.top + document.body.scrollTop - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop
        const scroll = container.scrollTop
        const elementHeight = container.clientHeight
        const itemHeight = this.getOuterHeight(item)
        if (offset < 0) {
            container.scrollTop = scroll + offset
        } else if (offset + itemHeight > elementHeight) {
            container.scrollTop = scroll + offset - elementHeight + itemHeight
        }
    }
    static clearSelection(): void {
        if (window.getSelection) {
            const selection = window.getSelection()
            if (!selection) return
            if (selection.empty) {
                selection.empty()
            } else if (selection?.removeAllRanges && selection?.rangeCount > 0 && selection.getRangeAt(0).getClientRects().length > 0) {
                selection.removeAllRanges()
            }
        }
    }
    static calculateScrollbarWidth(el?: HTMLElement): number {
        if (el) {
            const style = getComputedStyle(el)
            return el.offsetWidth - el.clientWidth - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth)
        } else {
            if (this.calculatedScrollbarWidth != null) return this.calculatedScrollbarWidth
            const scrollDiv = document.createElement('div')
            scrollDiv.className = 'p-scrollbar-measure'
            document.body.appendChild(scrollDiv)
            const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
            document.body.removeChild(scrollDiv)
            this.calculatedScrollbarWidth = scrollbarWidth
            return scrollbarWidth
        }
    }
    static calculateBodyScrollbarWidth(): number {
        return window.innerWidth - document.documentElement.offsetWidth
    }
    static getBrowser(): { [key: string]: boolean | string } {
        if (!this.browser) {
            const matched = this.resolveUserAgent()
            this.browser = {}
            if (matched.browser) {
                this.browser[matched.browser] = true
                this.browser['version'] = matched.version
            }
            if (this.browser['chrome']) {
                this.browser['webkit'] = true
            } else if (this.browser['webkit']) {
                this.browser['safari'] = true
            }
        }
        return this.browser
    }
    static resolveUserAgent(): { browser: string; version: string } {
        const ua = navigator.userAgent.toLowerCase()
        const match = /(chrome)[ ]([\w.]+)/.exec(ua) || /(webkit)[ ]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || (ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)) || []
        return {
            browser: match[1] || '',
            version: match[2] || '0'
        }
    }
    static blockBodyScroll(className: string = 'p-overflow-hidden'): void {
        /* PR Ref: https://github.com/primefaces/primereact/pull/4976
         * @todo This method is called several times after this PR. Refactors will be made to prevent this in future releases.
         */
        const hasScrollbarWidth = !!document.body.style.getPropertyValue('--scrollbar-width')
        !hasScrollbarWidth && document.body.style.setProperty('--scrollbar-width', this.calculateBodyScrollbarWidth() + 'px')
        this.addClass(document.body, className)
    }
    static unblockBodyScroll(className: string = 'p-overflow-hidden'): void {
        document.body.style.removeProperty('--scrollbar-width')
        this.removeClass(document.body, className)
    }
    static isVisible(element: HTMLElement): boolean {
        // https://stackoverflow.com/a/59096915/502366 (in future use IntersectionObserver)
        return element && (element.clientHeight !== 0 || element.getClientRects().length !== 0 || getComputedStyle(element).display !== 'none')
    }
    static isExist(element: HTMLElement): boolean {
        return !!(element !== null && typeof element !== 'undefined' && element.nodeName && element.parentNode)
    }
    static getFocusableElements(element: HTMLElement, selector: string = ''): HTMLElement[] {
        const focusableElements: HTMLElement[] = DomHandler.find(
            element,
            `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector}`
        )
        const visibleFocusableElements: HTMLElement[] = []
        for (const focusableElement of focusableElements) {
            if (getComputedStyle(focusableElement).display !== 'none' && getComputedStyle(focusableElement).visibility !== 'hidden') visibleFocusableElements.push(focusableElement)
        }
        return visibleFocusableElements
    }
    static getFirstFocusableElement(element: HTMLElement, selector?: string): HTMLElement | null {
        const focusableElements = DomHandler.getFocusableElements(element, selector)
        return focusableElements.length > 0 ? focusableElements[0] : null
    }
    static getLastFocusableElement(element: HTMLElement, selector: string): HTMLElement | null {
        const focusableElements = DomHandler.getFocusableElements(element, selector)
        return focusableElements.length > 0 ? focusableElements[focusableElements.length - 1] : null
    }
    /**
     * Focus an input element if it does not already have focus.
     *
     * @param {HTMLElement} el a HTML element
     * @param {boolean} scrollTo flag to control whether to scroll to the element, false by default
     */
    static focus(el: HTMLElement, scrollTo?: boolean): void {
        const preventScroll = scrollTo === undefined ? true : !scrollTo
        el && document.activeElement !== el && el.focus({ preventScroll })
    }
    /**
     * Focus the first focusable element if it does not already have focus.
     *
     * @param {HTMLElement} el a HTML element
     * @param {boolean} scrollTo flag to control whether to scroll to the element, false by default
     * @return {HTMLElement | null} the first focusable HTML element found
     */
    static focusFirstElement(el: HTMLElement, scrollTo?: boolean): HTMLElement | null {
        if (!el) return null
        const firstFocusableElement = DomHandler.getFirstFocusableElement(el)
        firstFocusableElement && DomHandler.focus(firstFocusableElement, scrollTo)
        return firstFocusableElement
    }
    static getCursorOffset(el: HTMLElement, prevText: string, nextText: string, currentText: string): { left: number; top: number } | { top: string; left: string } {
        if (el) {
            const style = getComputedStyle(el)
            const ghostDiv = document.createElement('div')
            ghostDiv.style.position = 'absolute'
            ghostDiv.style.top = '0px'
            ghostDiv.style.left = '0px'
            ghostDiv.style.visibility = 'hidden'
            ghostDiv.style.pointerEvents = 'none'
            ghostDiv.style.overflow = style.overflow
            ghostDiv.style.width = style.width
            ghostDiv.style.height = style.height
            ghostDiv.style.padding = style.padding
            ghostDiv.style.border = style.border
            ghostDiv.style.overflowWrap = style.overflowWrap
            ghostDiv.style.whiteSpace = style.whiteSpace
            ghostDiv.style.lineHeight = style.lineHeight
            ghostDiv.innerHTML = prevText.replace(/\r\n|\r|\n/g, '<br />')
            const ghostSpan = document.createElement('span')
            ghostSpan.textContent = currentText
            ghostDiv.appendChild(ghostSpan)
            const text = document.createTextNode(nextText)
            ghostDiv.appendChild(text)
            document.body.appendChild(ghostDiv)
            const { offsetLeft, offsetTop, clientHeight } = ghostSpan
            document.body.removeChild(ghostDiv)
            return {
                left: Math.abs(offsetLeft - el.scrollLeft),
                top: Math.abs(offsetTop - el.scrollTop) + clientHeight
            }
        }
        return {
            top: 'auto',
            left: 'auto'
        }
    }
    static invokeElementMethod(element: HTMLElement, methodName: string, args: any[]): void {
        ;(element as any)[methodName].apply(element, args)
    }
    static isClickable(element: HTMLElement): boolean {
        const targetNode = element.nodeName
        const parentNode = element.parentElement && element.parentElement.nodeName
        return (
            targetNode === 'INPUT' ||
            targetNode === 'TEXTAREA' ||
            targetNode === 'BUTTON' ||
            targetNode === 'A' ||
            parentNode === 'INPUT' ||
            parentNode === 'TEXTAREA' ||
            parentNode === 'BUTTON' ||
            parentNode === 'A' ||
            this.hasClass(element, 'p-button') ||
            this.hasClass(element.parentElement, 'p-button') ||
            this.hasClass(element.parentElement, 'p-checkbox') ||
            this.hasClass(element.parentElement, 'p-radiobutton')
        )
    }
    static applyStyle(element: HTMLElement, style: string | CSSStyleDeclaration): void {
        if (typeof style === 'string') {
            element.style.cssText = style
        } else {
            for (const prop in style) {
                ;(element.style as any)[prop] = style[prop]
            }
        }
    }
    static exportCSV(csv: string, filename: string): void {
        const blob = new Blob([csv], {
            type: 'application/csv;charset=utf-8;'
        })
        if ((window.navigator as any).msSaveOrOpenBlob) {
            ;(navigator as any).msSaveOrOpenBlob(blob, filename + '.csv')
        } else {
            const isDownloaded = DomHandler.saveAs({ name: filename + '.csv', src: URL.createObjectURL(blob) })
            if (!isDownloaded) {
                csv = 'data:text/csv;charset=utf-8,' + csv
                window.open(encodeURI(csv))
            }
        }
    }
    static saveAs(file: { name: string; src: string }): boolean {
        if (file) {
            const link = document.createElement('a')
            if (link.download !== undefined) {
                const { name, src } = file
                link.setAttribute('href', src)
                link.setAttribute('download', name)
                link.style.display = 'none'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                return true
            }
        }
        return false
    }
    static createInlineStyle(nonce: string, styleContainer?: HTMLElement): HTMLStyleElement {
        const styleElement = document.createElement('style')
        DomHandler.addNonce(styleElement, nonce)
        if (!styleContainer) {
            styleContainer = document.head
        }
        styleContainer.appendChild(styleElement)
        return styleElement
    }
    static removeInlineStyle(styleElement: HTMLStyleElement): HTMLStyleElement | null {
        if (this.isExist(styleElement)) {
            try {
                styleElement.parentNode?.removeChild(styleElement)
            } catch (error) {
                // style element may have already been removed in a fast refresh
            }
            return null
        }
        return styleElement
    }
    static addNonce(styleElement: HTMLStyleElement, nonce: string): void {
        let _nonce: string | undefined = nonce
        try {
            if (!_nonce) {
                _nonce = process.env.REACT_APP_CSS_NONCE
            }
        } catch (error) {
            // NOOP
        }
        _nonce && styleElement.setAttribute('nonce', _nonce)
    }
    static getTargetElement(target: string | HTMLElement | { current: HTMLElement }): HTMLElement | Document | Window | null {
        if (!target) return null
        if (target === 'document') {
            return document
        } else if (target === 'window') {
            return window
        } else if (typeof target === 'object' && (target as any).hasOwnProperty('current')) {
            return this.isExist((target as any).current) ? (target as any).current : null
        } else {
            const isFunction = (obj: any) => !!(obj && obj.constructor && obj.call && obj.apply)
            const element = isFunction(target) ? (target as any)() : target
            return (element && element.nodeType === 9) || this.isExist(element) ? element : null
        }
    }
    /**
     * Get the attribute names for an element and sorts them alpha for comparison
     */
    static getAttributeNames(node: HTMLElement): string[] {
        let index
        const rv = []
        const attrs = node.attributes
        for (index = 0; index < attrs.length; ++index) {
            rv.push(attrs[index].nodeName)
        }
        rv.sort()
        return rv
    }
    /**
     * Compare two elements for equality.  Even will compare if the style element
     * is out of order for example:
     *
     * elem1 = style="color: red; font-size: 28px"
     * elem2 = style="font-size: 28px; color: red"
     */
    static isEqualElement(elm1: HTMLElement, elm2: HTMLElement): boolean {
        let name, node1, node2
        // Compare attributes without order sensitivity
        const attrs1 = DomHandler.getAttributeNames(elm1)
        const attrs2 = DomHandler.getAttributeNames(elm2)
        if (attrs1.join(',') !== attrs2.join(',')) {
            // console.log("Found nodes with different sets of attributes; not equiv");
            return false
        }
        // ...and values
        // unless you want to compare DOM0 event handlers
        // (onclick="...")
        for (let index = 0; index < attrs1.length; ++index) {
            name = attrs1[index]
            if (name === 'style') {
                const astyle = elm1.style
                const bstyle = elm2.style
                const rexDigitsOnly = /^\d+$/
                for (const key of Object.keys(astyle)) {
                    if (!rexDigitsOnly.test(key) && (astyle as any)[key] !== (bstyle as any)[key]) {
                        // Not equivalent, stop
                        //console.log("Found nodes with mis-matched values for attribute '" + name + "'; not equiv");
                        return false
                    }
                }
            } else {
                if (elm1.getAttribute(name) !== elm2.getAttribute(name)) {
                    // console.log("Found nodes with mis-matched values for attribute '" + name + "'; not equiv");
                    return false
                }
            }
        }
        // Walk the children
        for (node1 = elm1.firstChild, node2 = elm2.firstChild; node1 && node2; node1 = node1.nextSibling, node2 = node2.nextSibling) {
            if (node1.nodeType !== node2.nodeType) {
                // display("Found nodes of different types; not equiv");
                return false
            }
            if (node1.nodeType === 1) {
                // Element
                if (!DomHandler.isEqualElement(node1 as HTMLElement, node2 as HTMLElement)) {
                    return false
                }
            } else if (node1.nodeValue !== node2.nodeValue) {
                // console.log("Found nodes with mis-matched nodeValues; not equiv");
                return false
            }
        }
        if (node1 || node2) {
            // One of the elements had more nodes than the other
            // console.log("Found more children of one element than the other; not equivalent");
            return false
        }
        // Seem the same
        return true
    }
    static hasCSSAnimation(element: HTMLElement): boolean {
        if (element) {
            const style = getComputedStyle(element)
            const animationDuration = parseFloat(style.getPropertyValue('animation-duration') || '0')
            return animationDuration > 0
        }
        return false
    }
    static hasCSSTransition(element: HTMLElement): boolean {
        if (element) {
            const style = getComputedStyle(element)
            const transitionDuration = parseFloat(style.getPropertyValue('transition-duration') || '0')
            return transitionDuration > 0
        }
        return false
    }
}
