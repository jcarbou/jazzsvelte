/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes, HTMLButtonAttributes as SvelteHTMLButtonAttributes } from 'svelte/elements'

export type ClassNameEntry = null | undefined | string | number | string[] | { [key: string]: boolean }

export type CssObject = { [key: string]: string | null | undefined }
export type CssStyle = string | CssObject | null

type HTMLAttr<ELT extends Element> = HTMLAttributes<ELT>
export type PtAttr<ELT extends Element> = Omit<HTMLAttr<ELT>, 'style'> & {
    style?: string | { [key: string]: string }
}

export type MainElementAttributes<ELT extends Element> = Omit<PtAttr<ELT>, 'style' | 'class'> & {
    style?: CssStyle | CssStyle[]
    class: ClassNameEntry[]
}

export type PassThroughMethodOptions<CP> = {
    props: CP
}

export type ResolvedIconPT = {
    iconClass?: string
    iconComponent?: IconComponent
    spanAttributes?: Omit<PtAttr<HTMLSpanElement>, 'style'> & { style?: string }
    svgAttributes?: Omit<PtAttr<SVGSVGElement>, 'style'> & { style?: string }
}

export type PassThroughTypeFunction<T, O> = (options?: O) => T | void
export type PassThroughType<T, O> = T | PassThroughTypeFunction<T, O> | string | null | undefined
export type PassThroughHTMLAttributes<T> = Omit<T, 'style'> & {
    style?: string | { [key: string]: string }
}

export interface PassThroughOptions {
    /**
     * Should the passthrough merge sections?
     */
    mergeSections?: boolean | undefined
    /**
     * Should the passthrough merge properties?
     */
    mergeProps?: boolean | undefined
    /**
     * Custom merge function such as twMerge for Tailwind merging.
     * @param className1 the first className to merge
     * @param className2 the second className to merge to className1
     * @returns the merged className
     */
    classNameMergeFunction?: (className1: string, className2: string) => string | undefined
}

/*export type HTMLButtonAttributes = HTMLAttributes<HTMLButtonElement>

*/
export type HTMLButtonAttributes = SvelteHTMLButtonAttributes
export type HTMLSpanAttributes = HTMLAttributes<HTMLSpanElement>
export type HTMLDivAttributes = HTMLAttributes<HTMLDivElement>
export type HTMLInputAttributes = HTMLAttributes<HTMLInputElement>
export type HTMLSVGAttributes = HTMLAttributes<SVGSVGElement>

export type HTMLSpanOrSvgAttributes = HTMLSpanAttributes | HTMLSVGAttributes
//export type HTMLSpanOrSvgAttributes = Common<HTMLSpanAttributes, HTMLSVGAttributes>
//export type SVGAttributes = SVGAttributes<SVGSVGElement>// | HTMLAttributes<HTMLSpanElement | SVGSVGElement>

export type PassThroughHTMLButtonAttributes = PassThroughHTMLAttributes<HTMLButtonAttributes>
export type PassThroughHTMLSpanAttributes = PassThroughHTMLAttributes<HTMLSpanAttributes>
export type PassThroughHTMLDivAttributes = PassThroughHTMLAttributes<HTMLDivAttributes>
export type PassThroughHTMLSvgAttributes = PassThroughHTMLAttributes<HTMLSVGAttributes>

export type IconAttributes = HTMLSVGAttributes & { label?: string | null; spin?: boolean }
export type IconComponent = typeof SvelteComponent<IconAttributes, any, any>
