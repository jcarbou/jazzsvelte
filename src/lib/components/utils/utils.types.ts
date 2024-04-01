/* eslint-disable @typescript-eslint/no-explicit-any */

import type { HTMLAttributes, HTMLButtonAttributes, SVGAttributes } from 'svelte/elements'

export type ClassNameEntry = null | undefined | string | number | string[] | { [key: string]: boolean }

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
export type HTMLSpanAttributes = HTMLAttributes<HTMLSpanElement>
export type HTMLSVGAttributes = SVGAttributes<SVGSVGElement> | HTMLAttributes<HTMLSpanElement | SVGSVGElement>

export type PassThroughHTMLButtonAttributes = PassThroughHTMLAttributes<HTMLButtonAttributes>
export type PassThroughHTMLSpanAttributes = PassThroughHTMLAttributes<HTMLSpanAttributes>
