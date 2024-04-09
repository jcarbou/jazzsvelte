import { isFunction, isObject, isString } from './ObjectUtils'
import type { ClassNameEntry, PassThroughType, PassThroughTypeFunction } from './utils.types'
import JAZZ_SVELTE from '../api/JazzSvelte'
import { mergeCssClasses } from './ClassNames'
import type { PassThroughMethodOptions, PtAttr } from './ptUtils.types'
import { mergeCssStsyles, type CssStyle } from './cssStyles'

type Options<T, M> = PassThroughType<T, M> | undefined

function ptToAttributes<ELT extends HTMLElement, M, CP>(
    options: Options<PtAttr<ELT>, M>,
    ptOptions?: PassThroughMethodOptions<CP> | null
): PtAttr<ELT> {
    let attributes: PtAttr<ELT> = {}

    if (options) {
        if (isFunction(options)) {
            const functionAttr = (options as PassThroughTypeFunction<PtAttr<ELT>, PassThroughMethodOptions<CP>>)(
                ptOptions || undefined
            )
            if (functionAttr) {
                attributes = { ...functionAttr }
            }
        } else if (isObject(options)) {
            attributes = { ...(options as PtAttr<ELT>) }
        } else if (isString(options)) {
            // Ex: title: 'text-xl', // OR { class: 'text-xl' }
            attributes = { class: options as string } as PtAttr<ELT>
        }
    }
    return attributes
}

export function resolvePT<ELT extends HTMLElement, M, CP>(
    elementClasses: ClassNameEntry[],
    elementStyle: CssStyle | CssStyle[],
    elementOptions: Options<PtAttr<ELT>, M>,
    globalOptions: Options<PtAttr<ELT>, M>,
    ptOptions: PassThroughMethodOptions<CP> | null,
    unstyled: boolean
): Omit<PtAttr<ELT>, 'style'> & { style?: string } {
    unstyled = unstyled || JAZZ_SVELTE.unstyled
    elementStyle = !elementStyle ? [] : Array.isArray(elementStyle) ? elementStyle : [elementStyle]

    const globalPtAttributes = ptToAttributes(globalOptions, ptOptions)
    const elementPtAttributes = ptToAttributes(elementOptions, ptOptions)
    const classes = mergeCssClasses([...(unstyled ? [] : elementClasses), elementPtAttributes.class, globalPtAttributes.class])
    const styles = mergeCssStsyles([...elementStyle, globalPtAttributes.style, elementPtAttributes.style])
    const attributes: Omit<PtAttr<ELT>, 'style'> & { style?: string } = {
        ...globalPtAttributes,
        ...elementPtAttributes,
        class: undefined,
        style: undefined
    }

    if (classes) attributes.class = classes
    if (styles) attributes.style = styles

    return attributes
}
