import type { TooltipActionOptions, TooltipLayoutActionOptions } from './tooltip.types'
import { getOuterWidth, getOuterHeight, findCollisionPosition, flipfitCollision } from '../utils/DOM'
import Tooltip from './Tooltip.svelte'

export function tooltip(element: HTMLElement, actionOptions: TooltipActionOptions) {
    let tooltipComponent: Tooltip

    if (!actionOptions.content) return

    console.log('New tooltip action ' + actionOptions.content)

    function mouseOver(event: MouseEvent) {
        if (tooltipComponent) {
            tooltipComponent.$set({
                visible: true,
                x: event.pageX,
                y: event.pageY
            })
            return
        }
        tooltipComponent = new Tooltip({
            props: {
                targetElement: element,
                content: actionOptions.content,
                options: actionOptions.options,
                visible: true,
                x: event.pageX,
                y: event.pageY
            },
            target: document.body
        })
    }

    function mouseMove(event: MouseEvent) {
        if (!actionOptions.options?.mouseTrack) return

        tooltipComponent.$set({
            visible: true,
            x: event.pageX,
            y: event.pageY
        })
    }

    function mouseLeave() {
        console.log('leave')
        tooltipComponent.$set({
            visible: false
        })
    }

    element.addEventListener('mouseover', mouseOver)
    element.addEventListener('mouseleave', mouseLeave)
    element.addEventListener('mousemove', mouseMove)

    return {
        /*update(options: TooltipActionOptions) {
            tooltipComponent.$set({

            })
        },*/
        destroy() {
            tooltipComponent?.$destroy()
            element.removeEventListener('mouseover', mouseOver)
            element.removeEventListener('mouseleave', mouseLeave)
            element.removeEventListener('mousemove', mouseMove)
        }
    }
}

export function tooltipLayout(element: HTMLElement, actionOptions: TooltipLayoutActionOptions) {
    function layout({ x, y, targetElement, options }: TooltipLayoutActionOptions) {
        const width = getOuterWidth(element),
            height = getOuterHeight(element)
        const { my, at } = options ?? {}
        let { mouseTrack, mouseTrackTop, mouseTrackLeft, position } = options ?? {}

        if (x == null || y == null) {
            element.style.top = 'unset'
            element.style.left = 'unset'
            return
        }

        position = position || 'right'
        mouseTrack = !!mouseTrack
        mouseTrackLeft = mouseTrackLeft ?? 5
        mouseTrackTop = mouseTrackTop ?? 5

        if (mouseTrack || position === 'mouse') {
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
        }
    }
}
