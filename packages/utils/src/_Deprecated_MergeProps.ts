/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Merges properties together taking an Array of props and merging into one single set of
 * properties. The options can contain a "classNameMergeFunction" which can be something
 * like Tailwind Merge for properly merging Tailwind classes.
 *
 * @param {object[]} props the array of object properties to merge
 * @param {*} options either empty or could contain a custom merge function like TailwindMerge
 * @returns the single properties value after merging
 */
export function mergeProps(
    props: object[],
    options: {
        classNameMergeFunction?: (a: string, b: string) => string
    } = {}
): object {
    if (!props) return {}
    const isFunction = (obj: any): boolean => typeof obj === 'function'
    const { classNameMergeFunction } = options
    const hasMergeFunction = isFunction(classNameMergeFunction)
    return props.reduce((merged: { [key: string]: any }, ps) => {
        if (!ps) return merged
        for (const key in ps) {
            const value = (ps as any)[key]
            if (key === 'style') {
                merged['style'] = { ...merged['style'], ...(ps as any)['style'] }
            } else if (key === 'className') {
                let newClassName = ''
                if (hasMergeFunction && classNameMergeFunction) {
                    newClassName = classNameMergeFunction(merged['className'], (ps as any)['className'])
                } else {
                    newClassName = [merged['className'], (ps as any)['className']].join(' ').trim()
                }
                merged['className'] = newClassName
            } else if (isFunction(value)) {
                const existingFn = merged[key]
                merged[key] = existingFn
                    ? (...args: any[]) => {
                          existingFn(...args)
                          value(...args)
                      }
                    : value
            } else {
                merged[key] = value
            }
        }
        return merged
    }, {})
}
