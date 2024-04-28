import { isFunction, isObject, isString } from './ObjectUtils'
import type {
    IconComponent,
    PassThroughType,
    PassThroughTypeFunction,
    PassThroughMethodOptions,
    PtAttr,
    ResolvedIconPT,
    MainElementAttributes
} from './utils.types'
import JAZZ_SVELTE from '../api/JazzSvelte'
import { mergeCssClasses } from './ClassNames'
import { mergeCssStsyles } from './cssStyles'

type Options<T, M> = PassThroughType<T, M> | undefined

function ptToAttributes<ELT extends Element, M, PT_METHOD_PROPS>(
    options: Options<PtAttr<ELT>, M>,
    ptOptions?: PassThroughMethodOptions<PT_METHOD_PROPS> | null
): PtAttr<ELT> {
    let attributes: PtAttr<ELT> = {}

    if (options) {
        if (isFunction(options)) {
            const functionAttr = (options as PassThroughTypeFunction<PtAttr<ELT>, PassThroughMethodOptions<PT_METHOD_PROPS>>)(
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

export function resolvePT<ELT extends Element, M, PT_METHOD_PROPS>(
    elementAttributes: MainElementAttributes<ELT>,
    elementOptions: Options<PtAttr<ELT>, M>,
    globalOptions: Options<PtAttr<ELT>, M>,
    ptOptions: PassThroughMethodOptions<PT_METHOD_PROPS> | null,
    unstyled: boolean
): Omit<PtAttr<ELT>, 'style'> & { style?: string } {
    unstyled = unstyled || JAZZ_SVELTE.unstyled
    let elementStyle = elementAttributes.style
    const elementClasses = elementAttributes.class
    elementStyle = !elementStyle ? [] : Array.isArray(elementStyle) ? elementStyle : [elementStyle]

    const globalPtAttributes = ptToAttributes(globalOptions, ptOptions)
    const elementPtAttributes = ptToAttributes(elementOptions, ptOptions)
    const classes = mergeCssClasses([...(unstyled ? [] : elementClasses), elementPtAttributes.class, globalPtAttributes.class])
    const styles = mergeCssStsyles([...elementStyle, globalPtAttributes.style, elementPtAttributes.style])
    const attributes: Omit<PtAttr<ELT>, 'style'> & { style?: string } = {
        ...elementAttributes,
        ...globalPtAttributes,
        ...elementPtAttributes,
        class: undefined,
        style: undefined
    }

    if (classes) attributes.class = classes
    if (styles) attributes.style = styles

    return attributes
}

export function resolveIconPT<M, PT_METHOD_PROPS>(
    icon: string | IconComponent | null,
    elementAttributes: MainElementAttributes<HTMLSpanElement> | MainElementAttributes<SVGSVGElement>,
    iconElementOptions: Options<PtAttr<HTMLSpanElement>, M> | Options<PtAttr<SVGSVGElement>, M>,
    iconGlobalOptions: Options<PtAttr<HTMLSpanElement>, M> | Options<PtAttr<SVGSVGElement>, M>,
    ptOptions: PassThroughMethodOptions<PT_METHOD_PROPS> | null,
    unstyled: boolean
): ResolvedIconPT {
    if (!icon) {
        return {}
    }
    elementAttributes.class.push('p-icon')

    const isSpan = typeof icon === 'string'
    if (isSpan) {
        elementAttributes.class.push(icon)
        return {
            iconClass: icon,
            spanAttributes: resolvePT(
                elementAttributes as MainElementAttributes<HTMLSpanElement>,
                iconElementOptions as Options<PtAttr<HTMLSpanElement>, M>,
                iconGlobalOptions as Options<PtAttr<HTMLSpanElement>, M>,
                ptOptions,
                unstyled
            )
        }
    }
    return {
        iconComponent: icon,
        svgAttributes: resolvePT(
            elementAttributes as MainElementAttributes<SVGSVGElement>,
            iconElementOptions as Options<PtAttr<SVGSVGElement>, M>,
            iconGlobalOptions as Options<PtAttr<SVGSVGElement>, M>,
            ptOptions,
            unstyled
        )
    }
}
