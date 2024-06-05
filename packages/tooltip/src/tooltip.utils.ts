import { TooltipGetter } from './tooltip.types'

export function getTooltipContent<ITEM>(getTooltip?: TooltipGetter<ITEM>, item?: ITEM): string | null {
    if (!item || !getTooltip) return null
    if (typeof getTooltip === 'string') {
        const value = item[getTooltip as keyof ITEM]
        return !value ? null : '' + value
    }
    const getter = getTooltip as (item: ITEM) => string | undefined | null
    return getter(item) || null
}
