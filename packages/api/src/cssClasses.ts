import type { ClassNameEntry } from './pt.types'

/**
 * Each argument is a class, a array of classes, or a map (key class / value boolean).
 * Generate a string concatenating all these classes, excluding classes of map if value of is false
 * @param args
 * @returns classes as HTML format
 */
export function mergeCssClasses(entries: ClassNameEntry[]) {
    if (entries) {
        const classes: string[] = []

        for (const classOrListOrMap of entries) {
            if (!classOrListOrMap) continue

            switch (typeof classOrListOrMap) {
                case 'string':
                case 'number':
                    classes.push('' + classOrListOrMap)
                    break
                case 'object': {
                    if (Array.isArray(classOrListOrMap)) {
                        for (const className of classOrListOrMap) {
                            !!className && classes.push(className)
                        }
                    } else {
                        for (const [className, toAdd] of Object.entries(classOrListOrMap)) {
                            !!toAdd && classes.push(className)
                        }
                    }
                }
            }
        }

        return classes.join(' ').trim()
    }

    return undefined
}
