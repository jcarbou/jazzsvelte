import DOM from '../utils/DOM'

export function ripple(element: HTMLElement) {
    const targetElement = element.parentElement

    const onPointerDown = (event: MouseEvent) => {
        if (!element || getComputedStyle(element, null).display === 'none') {
            return
        }

        const offset = DOM.getOffset(targetElement)
        if (offset.left === 'auto') {
            offset.left = 0
        }
        if (offset.top === 'auto') {
            offset.top = 0
        }
        setDimensions()
        const offsetX = event.pageX - offset.left + document.body.scrollTop - DOM.getWidth(element) / 2
        const offsetY = event.pageY - offset.top + document.body.scrollLeft - DOM.getHeight(element) / 2

        element.classList.toggle('p-ink-active', false)
        element.style.top = offsetY + 'px'
        element.style.left = offsetX + 'px'
        element.classList.toggle('p-ink-active', true)
    }

    const onAnimationEnd = () => element.classList.toggle('p-ink-active', false)

    const setDimensions = () => {
        if (element && !DOM.getHeight(element) && !DOM.getWidth(element)) {
            const size = Math.max(DOM.getOuterWidth(targetElement), DOM.getOuterHeight(targetElement))

            element.style.height = size + 'px'
            element.style.width = size + 'px'
        }
    }

    element.addEventListener('animationend', onAnimationEnd)
    if (targetElement) {
        targetElement.classList.toggle('p-ripple', true)
        targetElement.addEventListener('pointerdown', onPointerDown)
    }

    return {
        destroy() {
            element.removeEventListener('animationend', onAnimationEnd)
            if (targetElement) {
                targetElement.removeEventListener('pointerdown', onPointerDown)
            }
        }
    }
}
