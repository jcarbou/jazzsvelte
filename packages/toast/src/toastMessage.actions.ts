/**
 * Toast message
 * @param element
 * @param actionOptions
 * @returns
 */
export function toastMessage(element: HTMLElement, actionOptions: TooltipActionOptions): ActionReturn<TooltipActionOptions> {
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
            updteTooltipContent(actionOptions)
        }
    }
}
