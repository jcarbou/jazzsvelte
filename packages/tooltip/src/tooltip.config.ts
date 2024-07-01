import { TooltipPassThroughOptions } from './tooltip.types'

/**
 * Global Pass Through options (for all buttons)
 */
export let globalButtonPT: TooltipPassThroughOptions | null

/**
 * Set global Pass Through options (for all buttons)
 * @param options
 */
export function tooltypePT(options: TooltipPassThroughOptions) {
    globalButtonPT = options
}
