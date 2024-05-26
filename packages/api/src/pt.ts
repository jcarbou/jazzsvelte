import { isFunction, isObject, isString } from '@jazzsvelte/object'
import type {
    IconComponent,
    PassThroughType,
    PassThroughTypeFunction,
    PassThroughMethodOptions,
    PtAttr,
    ResolvedIconPT,
    MainElementAttributes,
    PassThroughOptions
} from './pt.types'
import { JAZZ_SVELTE } from './JazzSvelte'
import { mergeCssClasses } from './cssClasses'
import { mergeCssStsyles } from './cssStyles'

type Options<T, M> = PassThroughType<T, M> | undefined

function ptToAttributes<ELT extends Element, M, PROPS, STATE, CTX>(
    options: Options<PtAttr<ELT>, M>,
    ptContext: {
        props: PROPS
        state?: STATE
        context?: CTX
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }
): PtAttr<ELT> {
    let attributes: PtAttr<ELT> = {}

    if (options) {
        if (isFunction(options)) {
            const { props, context } = ptContext
            const functionAttr = (options as PassThroughTypeFunction<PtAttr<ELT>, PassThroughMethodOptions<PROPS, STATE, CTX>>)({
                props,
                state,
                context
            })
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

export function resolvePT<ELT extends Element, M, PROPS, STATE, CTX>(
    elementAttributes: MainElementAttributes<ELT>,
    elementOptions: Options<PtAttr<ELT>, M>,
    globalOptions: Options<PtAttr<ELT>, M>,
    ptContext: {
        props: PROPS
        state?: STATE
        context?: CTX
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }
): Omit<PtAttr<ELT>, 'style'> & { style?: string } {
    const unstyled = ptContext.unstyled || JAZZ_SVELTE.unstyled
    let elementStyle = elementAttributes.style
    const elementClasses = elementAttributes.class
    elementStyle = !elementStyle ? [] : Array.isArray(elementStyle) ? elementStyle : [elementStyle]

    const globalPtAttributes = ptToAttributes(globalOptions, ptContext)
    const elementPtAttributes = ptToAttributes(elementOptions, ptContext)
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

export function resolveIconPT<M, PROPS, STATE, CTX>(
    icon: string | IconComponent | null,
    elementAttributes: MainElementAttributes<HTMLSpanElement> | MainElementAttributes<SVGSVGElement>,
    iconElementOptions: Options<PtAttr<HTMLSpanElement>, M> | Options<PtAttr<SVGSVGElement>, M>,
    iconGlobalOptions: Options<PtAttr<HTMLSpanElement>, M> | Options<PtAttr<SVGSVGElement>, M>,
    ptContext: {
        props: PROPS
        state?: STATE
        context?: CTX
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }
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
                ptContext
            )
        }
    }
    return {
        iconComponent: icon,
        svgAttributes: resolvePT(
            elementAttributes as MainElementAttributes<SVGSVGElement>,
            iconElementOptions as Options<PtAttr<SVGSVGElement>, M>,
            iconGlobalOptions as Options<PtAttr<SVGSVGElement>, M>,
            ptContext
        )
    }
}
