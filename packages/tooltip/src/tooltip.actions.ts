import type { ActionReturn } from 'svelte/action'
import type { TooltipActionOptions, TooltipLayoutActionOptions, TooltipLayoutActionState } from './tooltip.types'

import { getOuterWidth, getOuterHeight, findCollisionPosition, flipfitCollision, setSingleEventListener } from '@jazzsvelte/dom'
import Tooltip from './Tooltip.svelte'

/**
 * Action on element that declare the tooltip
 * @param element
 * @param actionOptions
 * @returns
 */
export function tooltip(element: HTMLElement, actionOptions: TooltipActionOptions): ActionReturn<TooltipActionOptions> {
    let tooltipComponent: Tooltip
    let mouseOverTooltip: boolean = false
    let mouseOverTarget: boolean = false
    let targetFocus: boolean = false

    const tooltipLayoutState: TooltipLayoutActionState = {
        setMouseOverTooltip: (state: boolean) => {
            mouseOverTooltip = state
            if (!state) hide()
        }
    }

    const { tooltipContent, showOnDisabled, jazzSvelteContext, tooltipAttributes } = actionOptions

    if (!tooltipContent || showOnDisabled) return {}

    const options = actionOptions.tooltipOptions || {}
    const autoHide = options.autoHide ?? true
    const showDelay = options.showDelay ?? 0
    const hideDelay = options.hideDelay ?? 0
    const mouseTrack = !!options.mouseTrack
    const position = options.position || 'right'
    const mouseTracked = mouseTrack || position === 'mouse'
    const eventOption = options.event || 'hover'
    const listenFocus = eventOption === 'focus' || eventOption === 'both'
    const listenMouse = eventOption === 'hover' || eventOption === 'both'
    let showTimeout: ReturnType<typeof setTimeout> | null = null
    let hideTimeout: ReturnType<typeof setTimeout> | null = null

    //console.log(`Tooltip on ${eventOption} show ${options.position || 'right'} "${content}"`)

    function show({ x, y }: { x?: number; y?: number }) {
        // showDelay implementation
        if (!mouseTracked && showDelay > 0) {
            if (showTimeout) {
                clearTimeout(showTimeout)
            }
            showTimeout = setTimeout(() => {
                showTimeout = null
                if ((eventOption === 'hover' && mouseOverTarget) || (eventOption === 'focus' && targetFocus)) {
                    _show({})
                }
            }, showDelay)
            return
        }

        // No showDelay
        _show({ x, y })
    }

    function _show({ x, y }: { x?: number; y?: number }) {
        if (tooltipComponent) {
            tooltipComponent.$set({ visible: true, x, y })
            return
        }
        const tooltipAnchorEl = document.getElementById('__JAZZ_SVELTE_TOOLTIP_ANCHOR__')
        if (!tooltipAnchorEl || !tooltipAnchorEl.parentElement) return
        const contextMap = new Map()
        contextMap.set('JAZZ_SVELTE', jazzSvelteContext)
        tooltipComponent = new Tooltip({
            props: {
                targetElement: element,
                tooltipLayoutState,
                content: tooltipContent,
                options,
                visible: true,
                x,
                y
            },
            context: contextMap,
            target: tooltipAnchorEl.parentElement,
            anchor: tooltipAnchorEl
        })
    }

    function hide() {
        // hideDelay implementation
        if (!mouseTracked && hideDelay > 0) {
            if (hideTimeout) {
                clearTimeout(hideTimeout)
            }
            hideTimeout = setTimeout(() => {
                hideTimeout = null
                if ((eventOption === 'hover' && !mouseOverTarget) || (eventOption === 'focus' && !targetFocus)) {
                    _hide()
                }
            }, hideDelay)
            return
        }

        // No showDelay
        _hide()
    }

    function _hide() {
        if (!autoHide && (mouseOverTarget || mouseOverTooltip)) return
        if (!tooltipComponent) return // The showDelay can generate this uuse case
        tooltipComponent.$set({
            visible: false
        })
    }

    function mouseEnter(event: MouseEvent) {
        mouseOverTarget = true
        show({ x: event.pageX, y: event.pageY })
    }

    function focus() {
        targetFocus = true
        show({})
    }

    function mouseLeave() {
        mouseOverTarget = false
        setTimeout(() => hide(), 50) // delay required if autoHide = false
    }

    function blur() {
        targetFocus = false
        hide()
    }

    function mouseMove(event: MouseEvent) {
        if (!tooltipComponent || !actionOptions.tooltipOptions?.mouseTrack) return

        tooltipComponent.$set({
            visible: true,
            x: event.pageX,
            y: event.pageY
        })
    }

    function updateTooltipContent(actionOptions: TooltipActionOptions) {
        if (!tooltipComponent || tooltipContent === actionOptions?.tooltipContent) return

        tooltipComponent.$set({
            content: actionOptions?.tooltipContent
        })
    }

    listenMouse && element.addEventListener('mouseenter', mouseEnter)
    listenMouse && element.addEventListener('mouseleave', mouseLeave)
    listenMouse && element.addEventListener('mousemove', mouseMove)
    listenFocus && element.addEventListener('focus', focus)
    listenFocus && element.addEventListener('blur', blur)

    return {
        destroy() {
            tooltipComponent?.$destroy()
            listenMouse && element.removeEventListener('mouseover', mouseEnter)
            listenMouse && element.removeEventListener('mouseleave', mouseLeave)
            listenMouse && element.removeEventListener('mousemove', mouseMove)
            listenFocus && element.removeEventListener('focus', focus)
            listenFocus && element.removeEventListener('blur', blur)
        },
        update(actionOptions: TooltipActionOptions) {
            updateTooltipContent(actionOptions)
        }
    }
}

/**
 * Action on tooltip element
 */
export function tooltipLayout(
    element: HTMLElement,
    actionOptions: TooltipLayoutActionOptions
): ActionReturn<TooltipLayoutActionOptions> {
    function mouseEnter() {
        actionOptions.tooltipLayoutState.setMouseOverTooltip(true)
    }

    function mouseLeave() {
        actionOptions.tooltipLayoutState.setMouseOverTooltip(false)
    }

    /**
     * Compute the tooltip position and behavior
     * @param param0
     * @returns
     */
    function layout({ x, y, targetElement, options }: TooltipLayoutActionOptions) {
        const width = getOuterWidth(element),
            height = getOuterHeight(element)
        const { my, at } = options ?? {}
        let { mouseTrack, mouseTrackTop, mouseTrackLeft, position, autoHide } = options ?? {}

        position = position || 'right'
        mouseTrack = !!mouseTrack
        autoHide = autoHide ?? true
        mouseTrackLeft = mouseTrackLeft ?? 5
        mouseTrackTop = mouseTrackTop ?? 5

        !autoHide && setSingleEventListener(element, 'mouseenter', mouseEnter)
        !autoHide && setSingleEventListener(element, 'mouseleave', mouseLeave)

        //element.classList.toggle('p-tooltip-active', false)
        //element.dispatchEvent(new CustomEvent<{visible:boolean}>("visibilitychange", {detail: {visible: false}}))

        if (mouseTrack || position === 'mouse') {
            if (x == null || y == null) {
                element.style.top = 'unset'
                element.style.left = 'unset'
                return
            }

            switch (position) {
                case 'left':
                    x -= width + mouseTrackLeft
                    y -= height / 2 - mouseTrackTop
                    break
                case 'right':
                case 'mouse':
                    x += mouseTrackLeft
                    y -= height / 2 - mouseTrackTop
                    break
                case 'top':
                    x -= width / 2 - mouseTrackLeft
                    y -= height + mouseTrackTop
                    break
                case 'bottom':
                    x -= width / 2 - mouseTrackLeft
                    y += mouseTrackTop
                    break
                default:
                    break
            }
            x = x < 0 ? 0 : x
            element.style.top = y + 'px'
            element.style.left = x + 'px'

            if (!mouseTrack) {
                element.style.pointerEvents = 'none'
            }

            element.classList.toggle('p-tooltip-active', true)
        } else {
            const collision = findCollisionPosition(position)
            element.style.padding = '0px'
            flipfitCollision(element, targetElement, my || collision?.my, at || collision?.at, (calculatedPosition) => {
                const { x: atX, y: atY } = calculatedPosition.at
                const { x: myX } = calculatedPosition.my
                const newPosition = at
                    ? atX !== 'center' && atX !== myX
                        ? atX
                        : atY
                    : collision?.axis && calculatedPosition.at[collision.axis]

                element.style.padding = ''

                element.classList.toggle(`p-tooltip-left`, newPosition === 'left')
                element.classList.toggle(`p-tooltip-right`, newPosition === 'right')
                element.classList.toggle(`p-tooltip-top`, newPosition === 'top')
                element.classList.toggle(`p-tooltip-bottom`, newPosition === 'bottom')
                element.classList.toggle(`p-tooltip-center`, newPosition === 'center')

                // setPositionState(newPosition);

                const style = getComputedStyle(element)

                if (position === 'left') element.style.left = parseFloat(style.left) - parseFloat(style.paddingLeft) * 2 + 'px'
                else if (position === 'top') element.style.top = parseFloat(style.top) - parseFloat(style.paddingTop) * 2 + 'px'

                element.classList.toggle('p-tooltip-active', true)
            })
        }
    }

    layout(actionOptions)

    return {
        update(actionOptions: TooltipLayoutActionOptions) {
            layout(actionOptions)
        },
        destroy() {
            element.removeEventListener('mouseover', mouseEnter)
            element.removeEventListener('mouseleave', mouseLeave)
        }
    }
}
