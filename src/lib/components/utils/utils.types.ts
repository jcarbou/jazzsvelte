/* eslint-disable @typescript-eslint/no-explicit-any */

export type ClassNameEntry = null | string | number | string[] | { [key: string]: boolean }

export type PassThroughTypeFunction<T, O> = (options?: O) => T | void
export type PassThroughType<T, O> = T | PassThroughTypeFunction<T, O> | null | undefined

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
