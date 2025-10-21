/* eslint-disable no-prototype-builtins */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function equals(obj1: any, obj2: any, field: string): boolean {
    if (field && obj1 && typeof obj1 === 'object' && obj2 && typeof obj2 === 'object') {
        return deepEquals(resolveFieldData(obj1, field), resolveFieldData(obj2, field))
    }

    return deepEquals(obj1, obj2)
}

/**
 * Compares two JSON objects for deep equality recursively comparing both objects.
 * @param {*} a the first JSON object
 * @param {*} b the second JSON object
 * @returns true if equals, false it not
 */
export function deepEquals(a: any, b: any): boolean {
    if (a === b) return true

    if (a && b && typeof a == 'object' && typeof b == 'object') {
        const arrA = Array.isArray(a),
            arrB = Array.isArray(b)
        let i, length, key

        if (arrA && arrB) {
            length = a.length
            if (length !== b.length) return false
            for (i = length; i-- !== 0; ) if (!deepEquals(a[i], b[i])) return false

            return true
        }

        if (arrA !== arrB) return false

        const dateA = a instanceof Date,
            dateB = b instanceof Date

        if (dateA !== dateB) return false
        if (dateA && dateB) return a.getTime() === b.getTime()

        const regexpA = a instanceof RegExp,
            regexpB = b instanceof RegExp

        if (regexpA !== regexpB) return false
        if (regexpA && regexpB) return a.toString() === b.toString()

        const keys = Object.keys(a)

        length = keys.length

        if (length !== Object.keys(b).length) return false

        for (i = length; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false

        for (i = length; i-- !== 0; ) {
            key = keys[i]
            if (!deepEquals(a[key], b[key])) return false
        }

        return true
    }

    /*eslint no-self-compare: "off"*/
    return a !== a && b !== b
}

export function resolveFieldData(data: any, field: string | ((data: any) => string)): any {
    if (!data || !field) {
        // short circuit if there is nothing to resolve
        return null
    }

    try {
        const value = data[field as string]

        if (isNotEmpty(value)) return value
    } catch {
        // Performance optimization: https://github.com/primefaces/primereact/issues/4797
        // do nothing and continue to other methods to resolve field data
    }

    if (Object.keys(data).length) {
        if (isFunction(field)) {
            return (field as (data: any) => string)(data)
        } else if (isNotEmpty(data[field as string])) {
            return data[field as string]
        } else if ((field as string).indexOf('.') === -1) {
            return data[field as string]
        } else {
            const fields = (field as string).split('.')
            let value = data

            for (let i = 0, len = fields.length; i < len; ++i) {
                if (value == null) {
                    return null
                }

                value = value[fields[i]]
            }

            return value
        }
    }

    return null
}

export function findDiffKeys<ATTR>(obj1: ATTR, obj2?: ATTR): Partial<ATTR> {
    const result: Partial<ATTR> = {}

    if (!obj1 || !obj2) return result

    Object.keys(obj1)
        .filter((key) => !obj2.hasOwnProperty(key))
        .forEach((key: string) => {
            const attr = key as keyof ATTR
            result[attr] = obj1[attr]
        })
    return result
}

/**
 * Removes keys from a JSON object that start with a string such as "data" to get all "data-id" type properties.
 *
 * @param {any} obj the JSON object to reduce
 * @param {string[]} startsWiths the string(s) to check if the property starts with this key
 * @returns the JSON object containing only the key/values that match the startsWith string
 */
export function reduceKeys(obj: any, startsWiths: string[]): object {
    const result: any = {}

    if (!obj || !startsWiths || startsWiths.length === 0) {
        return result
    }

    Object.keys(obj)
        .filter((key) => startsWiths.some((value) => key.startsWith(value)))
        .forEach(function (key) {
            result[key] = obj[key]
            delete obj[key]
        })

    return result
}

/**
 * Iterate over object attributes calling "transfrom" function for each key/value entry
 *
 * @param obj the JSON object to reduce
 * @param transform - Transform function
 * @returns Array of transform return
 */
export function mapEnties<V, R>(obj?: { [key: string]: V }, transform?: (value: V, key: string) => R): R[] {
    if (!obj || !transform) {
        return []
    }

    const result = []
    for (const [key, value] of Object.entries(obj)) {
        result.push(transform(value, key))
    }

    return result
}

export function reorderArray(value: any, from: number, to: number): void {
    if (value && from !== to) {
        if (to >= value.length) {
            to %= value.length
            from %= value.length
        }

        value.splice(to, 0, value.splice(from, 1)[0])
    }
}

export function findIndexInList(value: any, list: any[], dataKey?: string): number {
    if (list) {
        return dataKey ? list.findIndex((item) => equals(item, value, dataKey)) : list.findIndex((item) => item === value)
    }

    return -1
}

/*export function getJSXElement(obj: any, ...params: any[]): any {
    return isFunction(obj) ? obj(...params) : obj
}*/

export function getItemValue(obj: any, ...params: any[]): any {
    return isFunction(obj) ? obj(...params) : obj
}

export function getProp(props: object, prop: string, defaultProps?: object): any {
    const value = props ? (props as any)[prop] : undefined

    return value === undefined ? (defaultProps as any)[prop] : value
}

export function getPropCaseInsensitive(props: object, prop: string, defaultProps?: object): any {
    const fkey = toFlatCase(prop)

    for (const key in props) {
        if (props.hasOwnProperty(key) && toFlatCase(key) === fkey) {
            return (props as any)[key]
        }
    }

    for (const key in defaultProps) {
        if (defaultProps.hasOwnProperty(key) && toFlatCase(key) === fkey) {
            return (defaultProps as any)[key]
        }
    }

    return undefined // Property not found
}

export function getMergedProps<ATTR>(props: ATTR, defaultProps?: ATTR): ATTR {
    return Object.assign({}, defaultProps, props)
}

export function getDiffProps<ATTR>(props: ATTR, defaultProps?: ATTR): Partial<ATTR> {
    return findDiffKeys(props, defaultProps)
}

export function getPropValue(obj: any, ...params: any[]): any {
    return isFunction(obj) ? obj(...params) : obj
}

export function getComponentProp(component: any, prop: string, defaultProps?: object): any {
    return isNotEmpty(component) ? getProp(component.props, prop, defaultProps) : undefined
}

export function getComponentProps(component: any, defaultProps?: object): object | undefined {
    return isNotEmpty(component) ? getMergedProps(component.props, defaultProps) : undefined
}

export function getComponentDiffProps(component: any, defaultProps?: object): object | undefined {
    return isNotEmpty(component) ? getDiffProps(component.props, defaultProps) : undefined
}

export function isValidChild(child: any, type: string): boolean {
    if (child) {
        let childType = getComponentProp(child, '__TYPE') || (child.type ? child.type.displayName : undefined)

        // for App Router in Next.js ^14,
        if (!childType && child?.type?._payload?.value) {
            childType = child.type._payload.value.find((v: any) => v === type)
        }

        const isValid = childType === type

        try {
            if (process.env.NODE_ENV !== 'production' && !isValid) {
                /*if (validTypes && validTypes.includes(childType)) {
                        return false
                    }
                    const messageTypes = validTypes ? validTypes : [type]

                    console.error(
                        `PrimeReact: Unexpected type; '${childType}'. Parent component expects a ${messageTypes.map((t) => `${t}`).join(' or ')} component or a component with the ${messageTypes
                            .map((t) => `__TYPE="${t}"`)
                            .join(' or ')} property as a child component.`
                    )*/
                return false
            }
        } catch (error) {
            // NOOP
        }

        return isValid
    }

    return false
}

export function getRefElement(ref: any): any {
    if (ref) {
        return typeof ref === 'object' && ref.hasOwnProperty('current') ? ref.current : ref
    }

    return null
}

export function combinedRefs(innerRef: any, forwardRef: any): void {
    if (innerRef && forwardRef) {
        if (typeof forwardRef === 'function') {
            forwardRef(innerRef.current)
        } else {
            forwardRef.current = innerRef.current
        }
    }
}

export function removeAccents(str: any): string {
    if (str && str.search(/[\xC0-\xFF]/g) > -1) {
        str = str
            .replace(/[\xC0-\xC5]/g, 'A')
            .replace(/[\xC6]/g, 'AE')
            .replace(/[\xC7]/g, 'C')
            .replace(/[\xC8-\xCB]/g, 'E')
            .replace(/[\xCC-\xCF]/g, 'I')
            .replace(/[\xD0]/g, 'D')
            .replace(/[\xD1]/g, 'N')
            .replace(/[\xD2-\xD6\xD8]/g, 'O')
            .replace(/[\xD9-\xDC]/g, 'U')
            .replace(/[\xDD]/g, 'Y')
            .replace(/[\xDE]/g, 'P')
            .replace(/[\xE0-\xE5]/g, 'a')
            .replace(/[\xE6]/g, 'ae')
            .replace(/[\xE7]/g, 'c')
            .replace(/[\xE8-\xEB]/g, 'e')
            .replace(/[\xEC-\xEF]/g, 'i')
            .replace(/[\xF1]/g, 'n')
            .replace(/[\xF2-\xF6\xF8]/g, 'o')
            .replace(/[\xF9-\xFC]/g, 'u')
            .replace(/[\xFE]/g, 'p')
            .replace(/[\xFD\xFF]/g, 'y')
    }

    return str
}

export function toFlatCase(str: string): string {
    // convert snake, kebab, camel and pascal cases to flat case
    return isNotEmpty(str) && isString(str) ? str.replace(/(-|_)/g, '').toLowerCase() : str
}

export function toCapitalCase(str: string): string {
    return isNotEmpty(str) && isString(str) ? str[0].toUpperCase() + str.slice(1) : str
}

export function toKebabCase(str: string, separator: string = '-') {
    return str.replace(/([a-z])([A-Z])/g, `$1${separator}$2`).toLowerCase()
}

export function trim(value: any): any {
    // trim only if the value is actually a string
    return isNotEmpty(value) && isString(value) ? value.trim() : value
}

export function isEmpty(value: any): boolean {
    return (
        value === null ||
        value === undefined ||
        value === '' ||
        (Array.isArray(value) && value.length === 0) ||
        (!(value instanceof Date) && typeof value === 'object' && Object.keys(value).length === 0)
    )
}

export function isNotEmpty(value: any): boolean {
    return !isEmpty(value)
}

export function isFunction(value: any): boolean {
    return !!(value && value.constructor && value.call && value.apply)
}

export function isObject(value: any): boolean {
    return value !== null && value instanceof Object && value.constructor === Object
}

export function isDate(value: any): boolean {
    return value !== null && value instanceof Date && value.constructor === Date
}

export function isArray(value: any): boolean {
    return value !== null && Array.isArray(value)
}

export function isString(value: any): boolean {
    return value !== null && typeof value === 'string'
}

export function isPrintableCharacter(char: string = ''): boolean {
    return isNotEmpty(char) && char.length === 1 && !!char.match(/\S| /)
}

export function isLetter(char: string): boolean {
    return /^[a-zA-Z\u00C0-\u017F]$/.test(char)
}

/**
 * Firefox-v103 does not currently support the "findLast" method.
 * It is stated that this method will be supported with Firefox-v104.
 * https://caniuse.com/mdn-javascript_builtins_array_findlast
 */
export function findLast(arr: any[], callback: () => any): any {
    let item

    if (isNotEmpty(arr)) {
        try {
            item = arr.findLast(callback)
        } catch {
            item = [...arr].reverse().find(callback)
        }
    }

    return item
}

export function sort(
    value1: any,
    value2: any,
    order: number = 1,
    comparator: (v1: any, v2: any) => number,
    nullSortOrder: number = 1
): number {
    const result = compare(value1, value2, comparator, order)
    let finalSortOrder = order

    // nullSortOrder == 1 means Excel like sort nulls at bottom
    if (isEmpty(value1) || isEmpty(value2)) {
        finalSortOrder = nullSortOrder === 1 ? order : nullSortOrder
    }

    return finalSortOrder * result
}

export function compare(value1: any, value2: any, comparator: (v1: any, v2: any) => number, order: number = 1) {
    let result = -1
    const emptyValue1 = isEmpty(value1)
    const emptyValue2 = isEmpty(value2)

    if (emptyValue1 && emptyValue2) result = 0
    else if (emptyValue1) result = order
    else if (emptyValue2) result = -order
    else if (typeof value1 === 'string' && typeof value2 === 'string') result = comparator(value1, value2)
    else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0

    return result
}

export function localeComparator(locale: string) {
    //performance gain using Int.Collator. It is not recommended to use localeCompare against large arrays.
    return new Intl.Collator(locale, { numeric: true }).compare
}

export function findChildrenByKey(data: any[], key: string): any[] {
    for (const item of data) {
        if (item.key === key) {
            return item.children || []
        } else if (item.children) {
            const result = findChildrenByKey(item.children, key)

            if (result.length > 0) {
                return result
            }
        }
    }

    return []
}

/**
 * This function takes mutates and object with a new value given
 * a specific field. This will handle deeply nested fields that
 * need to be modified or created.
 *
 * e.g:
 * data = {
 *  nested: {
 *      foo: "bar"
 *  }
 * }
 *
 * field = "nested.foo"
 * value = "baz"
 *
 * The function will mutate data to be
 * e.g:
 * data = {
 *  nested: {
 *      foo: "baz"
 *  }
 * }
 *
 * @param {object} data the object to be modified
 * @param {string} field the field in the object to replace
 * @param {any} value the value to have replaced in the field
 */
export function mutateFieldData(data: object, field: string, value: any): void {
    if (typeof data !== 'object' || typeof field !== 'string') {
        // short circuit if there is nothing to resolve
        return
    }

    const fields = field.split('.')
    let obj = data

    for (let i = 0, len = fields.length; i < len; ++i) {
        // Check if we are on the last field
        if (i + 1 - len === 0) {
            ;(obj as any)[fields[i]] = value
            break
        }

        if (!(obj as any)[fields[i]]) {
            ;(obj as any)[fields[i]] = {}
        }

        obj = (obj as any)[fields[i]]
    }
}
