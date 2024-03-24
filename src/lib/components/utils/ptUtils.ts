import { isFunction, isObject, isString } from './ObjectUtils'
import type { ClassNameEntry, PassThroughType, PassThroughTypeFunction } from './utils.types'
import JAZZ_SVELTE from '../api/JazzSvelte'
import { mergeCssClasses } from './ClassNames'
import type { PassThroughMethodOptions, PtHTMLAttr } from './ptUtils.types'
import { mergeCssStsyles, type CssStyle } from './cssStyles'

type Options<T, M> = PassThroughType<T, M> | undefined

function ptToAttributes<T extends PtHTMLAttr, M, CP>(options: Options<T, M>, ptOptions?: PassThroughMethodOptions<CP> | null): T {
    let attributes: T = {} as T

    if (options) {
        if (isFunction(options)) {
            const functionAttr = (options as PassThroughTypeFunction<T, PassThroughMethodOptions<CP>>)(ptOptions || undefined)
            if (functionAttr) {
                attributes = { ...functionAttr }
            }
        } else if (isObject(options)) {
            attributes = { ...(options as T) }
        } else if (isString(options)) {
            // Ex: title: 'text-xl', // OR { class: 'text-xl' }
            attributes = { class: options as string } as T
        }
    }
    return attributes
}

export function resolvePT<T extends PtHTMLAttr, M, CP>(
    elementClasses: ClassNameEntry[],
    elementStyle: CssStyle,
    elementOptions: Options<T, M>,
    globalOptions: Options<T, M>,
    ptOptions: PassThroughMethodOptions<CP> | null,
    unstyled: boolean
): Omit<T, 'style'> & { style?: string } {
    unstyled = unstyled || JAZZ_SVELTE.unstyled

    const globalPtAttributes = ptToAttributes(globalOptions, ptOptions)
    const elementPtAttributes = ptToAttributes(elementOptions, ptOptions)
    const classes = mergeCssClasses([...(unstyled ? [] : elementClasses), elementPtAttributes.class, globalPtAttributes.class])
    const styles = mergeCssStsyles([elementStyle, globalPtAttributes.style, elementPtAttributes.style])
    const attributes: T = { ...globalPtAttributes, ...elementPtAttributes }

    if (classes) attributes.class = classes
    if (styles) attributes.style = styles

    return attributes
}
