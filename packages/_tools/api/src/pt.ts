import { isFunction, isObject, isString } from '@jazzsvelte/object'
import type {
    IconComponent,
    PassThroughType,
    PassThroughTypeFunction,
    PassThroughMethodOptions,
    PtAttr,
    ResolvedIconPT,
    MainElementAttributes,
    PassThroughOptions,
    CssStyle,
    ClassNameEntry,
    HTMLAnchorAttributes,
    HTMLButtonAttributes,
    HTMLSpanAttributes,
    HTMLDivAttributes,
    HTMLInputAttributes,
    HTMLLiAttributes,
    HTMLUlAttributes,
    HTMLSVGAttributes,
    HTMLImageAttributes,
    HTMLSVGCircleAttributes,
    HTMLIAttributes,
    HTMLElementAttributes,
    HTMLOlAttributes,
    PtContext,
    HTMLNavAttributes
} from './pt.types'
import { JAZZ_SVELTE } from './JazzSvelte'
import { mergeCssClasses } from './cssClasses'
import { mergeCssStyles } from './cssStyles'
import type { HTMLAttributes, SVGAttributes } from 'svelte/elements'

type Options<INNER_ATTR, FUNCTION_OPTIONS> = PassThroughType<INNER_ATTR, FUNCTION_OPTIONS> | undefined

function ptToAttributes<ELT extends Element, M, PROPS, STATE, CTX>(
    options: Options<PtAttr<ELT>, M>,
    ptContext: PtContext<PROPS, STATE, CTX>
): PtAttr<ELT> {
    let attributes: PtAttr<ELT> = {}

    if (options) {
        if (isFunction(options)) {
            const { props, context, state, parentPtContext } = ptContext
            const functionAttr = (options as PassThroughTypeFunction<PtAttr<ELT>, PassThroughMethodOptions<PROPS, STATE, CTX>>)({
                props,
                state,
                context,
                parentPtContext
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

type PtHTMLAttributes<ELT extends Element, ATTR extends HTMLAttributes<ELT>> = Omit<ATTR, 'style'> & {
    style?: string | { [key: string]: string }
}

type PtSVGLAttributes<ELT extends Element, ATTR extends SVGAttributes<ELT>> = Omit<ATTR, 'style'> & {
    style?: string | { [key: string]: string }
}

type PtOptions<ELT extends Element, ATTR extends HTMLAttributes<ELT>, FUNCTION_OPTIONS> = Options<
    PtHTMLAttributes<ELT, ATTR>,
    FUNCTION_OPTIONS
>

type PtSVGOptions<ELT extends Element, ATTR extends SVGAttributes<ELT>, FUNCTION_OPTIONS> = Options<
    PtSVGLAttributes<ELT, ATTR>,
    FUNCTION_OPTIONS
>

type CustomHTMLAttributes<ELT extends Element, ATTR extends HTMLAttributes<ELT>> = Omit<ATTR, 'style' | 'class'> & {
    style?: CssStyle | (CssStyle | undefined | null)[]
    class: ClassNameEntry[]
}

type CustomSVGAttributes<ELT extends Element, ATTR extends SVGAttributes<ELT>> = Omit<ATTR, 'style' | 'class'> & {
    style?: CssStyle | (CssStyle | undefined | null)[]
    class: ClassNameEntry[]
}

/**
 * Resolve "P"ass "T"rough configuration ans generate HTMLElementAttributes
 * @param elementAttributes - inner HTMLElementAttributes of component
 * @param elementOptions - pass trough HTMLElementAttributes of "pt" attributte
 * @param globalOptions - pass trough HTMLElementAttributes of global configuration
 * @param ptContext - context
 * @returns Resolved HTMLElementAttributes
 */
export function resolveElementPt<FUNCTION_OPTIONS, PROPS, STATE, CTX>(
    elementAttributes: CustomHTMLAttributes<HTMLElement, HTMLElementAttributes>,
    elementOptions: PtOptions<HTMLElement, HTMLElementAttributes, FUNCTION_OPTIONS>,
    globalOptions: PtOptions<HTMLElement, HTMLElementAttributes, FUNCTION_OPTIONS>,
    ptContext: PtContext<PROPS, STATE, CTX>
): HTMLElementAttributes {
    return resolvePT(elementAttributes, elementOptions, globalOptions, ptContext)
}

/**
 * Resolve "P"ass "T"rough configuration ans generate HTMLAnchorAttributes
 * @param elementAttributes - inner HTMLAnchorAttributes of component
 * @param elementOptions - pass trough HTMLAnchorAttributes of "pt" attributte
 * @param globalOptions - pass trough HTMLAnchorAttributes of global configuration
 * @param ptContext - context
 * @returns Resolved HTMLAnchorAttributes
 */
export function resolveAnchorPt<FUNCTION_OPTIONS, PROPS, STATE, CTX>(
    elementAttributes: CustomHTMLAttributes<HTMLAnchorElement, HTMLAnchorAttributes>,
    elementOptions: PtOptions<HTMLAnchorElement, HTMLAnchorAttributes, FUNCTION_OPTIONS>,
    globalOptions: PtOptions<HTMLAnchorElement, HTMLAnchorAttributes, FUNCTION_OPTIONS>,
    ptContext: PtContext<PROPS, STATE, CTX>
): HTMLAnchorAttributes {
    return resolvePT(elementAttributes, elementOptions, globalOptions, ptContext)
}

/**
 * Resolve "P"ass "T"rough configuration ans generate HTMLButtonAttributes
 * @param elementAttributes - inner HTMLButtonAttributes of component
 * @param elementOptions - pass trough HTMLButtonAttributes of "pt" attributte
 * @param globalOptions - pass trough HTMLButtonAttributes of global configuration
 * @param ptContext - context
 * @returns Resolved HTMLButtonAttributes
 */
export function resolveButtonPt<FUNCTION_OPTIONS, PROPS, STATE, CTX>(
    elementAttributes: CustomHTMLAttributes<HTMLButtonElement, HTMLButtonAttributes>,
    elementOptions: PtOptions<HTMLButtonElement, HTMLButtonAttributes, FUNCTION_OPTIONS>,
    globalOptions: PtOptions<HTMLButtonElement, HTMLButtonAttributes, FUNCTION_OPTIONS>,
    ptContext: PtContext<PROPS, STATE, CTX>
): HTMLButtonAttributes {
    return resolvePT(elementAttributes, elementOptions, globalOptions, ptContext)
}

/**
 * Resolve "P"ass "T"rough configuration ans generate HTMLSVGCircleAttributes
 * @param elementAttributes - inner HTMLSVGAttributes of component
 * @param elementOptions - pass trough HTMLSVGAttributes of "pt" attributte
 * @param globalOptions - pass trough HTMLSVGAttributes of global configuration
 * @param ptContext - context
 * @returns Resolved HTMLSVGAttributes
 */
export function resolveSVGCirclePt<FUNCTION_OPTIONS, PROPS, STATE, CTX>(
    elementAttributes: CustomSVGAttributes<SVGCircleElement, HTMLSVGCircleAttributes>,
    elementOptions: PtSVGOptions<SVGCircleElement, HTMLSVGCircleAttributes, FUNCTION_OPTIONS>,
    globalOptions: PtSVGOptions<SVGCircleElement, HTMLSVGCircleAttributes, FUNCTION_OPTIONS>,
    ptContext: PtContext<PROPS, STATE, CTX>
): HTMLSVGCircleAttributes {
    return resolvePT(elementAttributes, elementOptions, globalOptions, ptContext)
}

/**
 * Resolve "P"ass "T"rough configuration ans generate HTMLDivAttributes
 * @param elementAttributes - inner HTMLDivAttributes of component
 * @param elementOptions - pass trough HTMLDivAttributes of "pt" attributte
 * @param globalOptions - pass trough HTMLDivAttributes of global configuration
 * @param ptContext - context
 * @returns Resolved HTMLDivAttributes
 */
export function resolveDivPt<FUNCTION_OPTIONS, PROPS, STATE, CTX>(
    elementAttributes: CustomHTMLAttributes<HTMLDivElement, HTMLDivAttributes>,
    elementOptions: PtOptions<HTMLDivElement, HTMLDivAttributes, FUNCTION_OPTIONS>,
    globalOptions: PtOptions<HTMLDivElement, HTMLDivAttributes, FUNCTION_OPTIONS>,
    ptContext: PtContext<PROPS, STATE, CTX>
): HTMLDivAttributes {
    return resolvePT(elementAttributes, elementOptions, globalOptions, ptContext)
}

/**
 * Resolve "P"ass "T"rough configuration ans generate HTMLIAttributes
 * @param elementAttributes - inner HTMLIAttributes of component
 * @param elementOptions - pass trough HTMLIAttributes of "pt" attributte
 * @param globalOptions - pass trough HTMLIAttributes of global configuration
 * @param ptContext - context
 * @returns Resolved HTMLIAttributes
 */
export function resolveIPt<FUNCTION_OPTIONS, PROPS, STATE, CTX>(
    elementAttributes: CustomHTMLAttributes<HTMLElement, HTMLIAttributes>,
    elementOptions: PtOptions<HTMLElement, HTMLIAttributes, FUNCTION_OPTIONS>,
    globalOptions: PtOptions<HTMLElement, HTMLIAttributes, FUNCTION_OPTIONS>,
    ptContext: PtContext<PROPS, STATE, CTX>
): HTMLIAttributes {
    return resolvePT(elementAttributes, elementOptions, globalOptions, ptContext)
}

/**
 * Resolve "P"ass "T"rough configuration ans generate HTMLImageAttributes
 * @param elementAttributes - inner HTMLImageAttributes of component
 * @param elementOptions - pass trough HTMLImageAttributes of "pt" attributte
 * @param globalOptions - pass trough HTMLImageAttributes of global configuration
 * @param ptContext - context
 * @returns Resolved HTMLImageAttributes
 */
export function resolveImagePt<FUNCTION_OPTIONS, PROPS, STATE, CTX>(
    elementAttributes: CustomHTMLAttributes<HTMLImageElement, HTMLImageAttributes>,
    elementOptions: PtOptions<HTMLImageElement, HTMLImageAttributes, FUNCTION_OPTIONS>,
    globalOptions: PtOptions<HTMLImageElement, HTMLImageAttributes, FUNCTION_OPTIONS>,
    ptContext: PtContext<PROPS, STATE, CTX>
): HTMLImageAttributes {
    return resolvePT(elementAttributes, elementOptions, globalOptions, ptContext)
}

/**
 * Resolve "P"ass "T"rough configuration ans generate HTMLInputAttributes
 * @param elementAttributes - inner HTMLInputAttributes of component
 * @param elementOptions - pass trough HTMLInputAttributes of "pt" attributte
 * @param globalOptions - pass trough HTMLInputAttributes of global configuration
 * @param ptContext - context
 * @returns Resolved HTMLInputAttributes
 */
export function resolveInputPt<FUNCTION_OPTIONS, PROPS, STATE, CTX>(
    elementAttributes: CustomHTMLAttributes<HTMLInputElement, HTMLInputAttributes>,
    elementOptions: PtOptions<HTMLInputElement, HTMLInputAttributes, FUNCTION_OPTIONS>,
    globalOptions: PtOptions<HTMLInputElement, HTMLInputAttributes, FUNCTION_OPTIONS>,
    ptContext: PtContext<PROPS, STATE, CTX>
): HTMLInputAttributes {
    return resolvePT(elementAttributes, elementOptions, globalOptions, ptContext)
}

/**
 * Resolve "P"ass "T"rough configuration ans generate HTMLLiAttributes
 * @param elementAttributes - inner HTMLLiAttributes of component
 * @param elementOptions - pass trough HTMLLiAttributes of "pt" attributte
 * @param globalOptions - pass trough HTMLLiAttributes of global configuration
 * @param ptContext - context
 * @returns Resolved HTMLLiAttributes
 */
export function resolveLiPt<FUNCTION_OPTIONS, PROPS, STATE, CTX>(
    elementAttributes: CustomHTMLAttributes<HTMLLIElement, HTMLLiAttributes>,
    elementOptions: PtOptions<HTMLLIElement, HTMLLiAttributes, FUNCTION_OPTIONS>,
    globalOptions: PtOptions<HTMLLIElement, HTMLLiAttributes, FUNCTION_OPTIONS>,
    ptContext: PtContext<PROPS, STATE, CTX>
): HTMLLiAttributes {
    return resolvePT(elementAttributes, elementOptions, globalOptions, ptContext)
}

/**
 * Resolve "P"ass "T"rough configuration ans generate HTMLNavlAttributes
 * @param elementAttributes - inner HTMLNavAttributes of component
 * @param elementOptions - pass trough HTMLNavAttributes of "pt" attributte
 * @param globalOptions - pass trough HTMLNavlAttributes of global configuration
 * @param ptContext - context
 * @returns Resolved HTMLNavAttributes
 */
export function resolveNavPt<FUNCTION_OPTIONS, PROPS, STATE, CTX>(
    elementAttributes: CustomHTMLAttributes<HTMLElement, HTMLElementAttributes>,
    elementOptions: PtOptions<HTMLElement, HTMLElementAttributes, FUNCTION_OPTIONS>,
    globalOptions: PtOptions<HTMLElement, HTMLElementAttributes, FUNCTION_OPTIONS>,
    ptContext: PtContext<PROPS, STATE, CTX>
): HTMLNavAttributes {
    return resolvePT(elementAttributes, elementOptions, globalOptions, ptContext)
}

/**
 * Resolve "P"ass "T"rough configuration ans generate HTMLOlAttributes
 * @param elementAttributes - inner HTMLOlAttributes of component
 * @param elementOptions - pass trough HTMLOlAttributes of "pt" attributte
 * @param globalOptions - pass trough HTMLOlAttributes of global configuration
 * @param ptContext - context
 * @returns Resolved HTMLOlAttributes
 */
export function resolveOlPt<FUNCTION_OPTIONS, PROPS, STATE, CTX>(
    elementAttributes: CustomHTMLAttributes<HTMLOListElement, HTMLOlAttributes>,
    elementOptions: PtOptions<HTMLOListElement, HTMLOlAttributes, FUNCTION_OPTIONS>,
    globalOptions: PtOptions<HTMLOListElement, HTMLOlAttributes, FUNCTION_OPTIONS>,
    ptContext: PtContext<PROPS, STATE, CTX>
): HTMLOlAttributes {
    return resolvePT(elementAttributes, elementOptions, globalOptions, ptContext)
}

/**
 * Resolve "P"ass "T"rough configuration ans generate HTMLSpanAttributes
 * @param elementAttributes - inner HTMLSpanAttributes of component
 * @param elementOptions - pass trough HTMLSpanAttributes of "pt" attributte
 * @param globalOptions - pass trough HTMLSpanAttributes of global configuration
 * @param ptContext - context
 * @returns Resolved HTMLSpanAttributes
 */
export function resolveSpanPt<FUNCTION_OPTIONS, PROPS, STATE, CTX>(
    elementAttributes: CustomHTMLAttributes<HTMLSpanElement, HTMLSpanAttributes>,
    elementOptions: PtOptions<HTMLSpanElement, HTMLSpanAttributes, FUNCTION_OPTIONS>,
    globalOptions: PtOptions<HTMLSpanElement, HTMLSpanAttributes, FUNCTION_OPTIONS>,
    ptContext: PtContext<PROPS, STATE, CTX>
): HTMLSpanAttributes {
    return resolvePT(elementAttributes, elementOptions, globalOptions, ptContext)
}

/**
 * Resolve "P"ass "T"rough configuration ans generate HTMLSVGAttributes
 * @param elementAttributes - inner HTMLSVGAttributes of component
 * @param elementOptions - pass trough HTMLSVGAttributes of "pt" attributte
 * @param globalOptions - pass trough HTMLSVGAttributes of global configuration
 * @param ptContext - context
 * @returns Resolved HTMLSVGAttributes
 */
export function resolveSVGPt<FUNCTION_OPTIONS, PROPS, STATE, CTX>(
    elementAttributes: CustomSVGAttributes<SVGSVGElement, HTMLSVGAttributes>,
    elementOptions: PtSVGOptions<SVGSVGElement, HTMLSVGAttributes, FUNCTION_OPTIONS>,
    globalOptions: PtSVGOptions<SVGSVGElement, HTMLSVGAttributes, FUNCTION_OPTIONS>,
    ptContext: PtContext<PROPS, STATE, CTX>
): HTMLSVGAttributes {
    return resolvePT(elementAttributes, elementOptions, globalOptions, ptContext)
}

/**
 * Resolve "P"ass "T"rough configuration ans generate HTMLUlAttributes
 * @param elementAttributes - inner HTMLUlAttributes of component
 * @param elementOptions - pass trough HTMLUlAttributes of "pt" attributte
 * @param globalOptions - pass trough HTMLUlAttributes of global configuration
 * @param ptContext - context
 * @returns Resolved HTMLUlAttributes
 */
export function resolveUlPt<FUNCTION_OPTIONS, PROPS, STATE, CTX>(
    elementAttributes: CustomHTMLAttributes<HTMLUListElement, HTMLUlAttributes>,
    elementOptions: PtOptions<HTMLUListElement, HTMLUlAttributes, FUNCTION_OPTIONS>,
    globalOptions: PtOptions<HTMLUListElement, HTMLUlAttributes, FUNCTION_OPTIONS>,
    ptContext: PtContext<PROPS, STATE, CTX>
): HTMLUlAttributes {
    return resolvePT(elementAttributes, elementOptions, globalOptions, ptContext)
}

/**
 * Return unstyled state
 * @param props - component props or ptContext
 * @returns state
 */
export function isUnstyled<PROPS extends { unstyled?: boolean }>(props: PROPS) {
    return !!props.unstyled || JAZZ_SVELTE.unstyled
}

/**
 * Resolve "P"ass "T"rough configuration ans generate HTMLAttributes
 * @param elementAttributes - inner HTMLAttributes of component
 * @param elementOptions - pass trough HTMLAttributes of "pt" attributte
 * @param globalOptions - pass trough HTMLAttributes of global configuration
 * @param ptContext - context
 * @returns Resolved HTMLAttributes
 */
export function resolvePT<ELT extends Element, ATTR extends HTMLAttributes<ELT>, FUNCTION_OPTIONS, PROPS, STATE, CTX>(
    elementAttributes: CustomHTMLAttributes<ELT, ATTR>,
    elementOptions: PtOptions<ELT, ATTR, FUNCTION_OPTIONS>,
    globalOptions: PtOptions<ELT, ATTR, FUNCTION_OPTIONS>,
    ptContext: PtContext<PROPS, STATE, CTX>
): Omit<PtAttr<ELT>, 'style'> & { style?: string } {
    const unstyled = isUnstyled(ptContext)
    let elementStyle = elementAttributes.style
    const elementClasses = elementAttributes.class
    elementStyle = !elementStyle ? [] : Array.isArray(elementStyle) ? elementStyle : [elementStyle]

    const globalPtAttributes = ptToAttributes(globalOptions, ptContext)
    const elementPtAttributes = ptToAttributes(elementOptions, ptContext)
    const classes = mergeCssClasses([...(unstyled ? [] : elementClasses), elementPtAttributes.class, globalPtAttributes.class])
    const styles = mergeCssStyles([...elementStyle, globalPtAttributes.style, elementPtAttributes.style])
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
    ptContext: PtContext<PROPS, STATE, CTX>
): ResolvedIconPT {
    if (!icon) {
        return {}
    }
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
