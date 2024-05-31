import type { CssObject, CssStyle } from './pt.types'
import { toKebabCase } from '@jazzsvelte/object'

export function mergeCssStsyles(styles: (CssStyle | undefined)[]) {
    const cssObject = {}
    for (const style of styles) {
        if (!style) continue
        if (typeof style === 'object') {
            Object.assign(cssObject, cleanCssObject(style as CssObject))
        } else {
            Object.assign(cssObject, cssStringToCssObject(style as string))
        }
    }
    let cssString = ''
    for (const [key, value] of Object.entries(cssObject)) {
        cssString += `${key}:${value};`
    }
    return cssString
}

function cleanCssObject(style: CssObject): CssObject {
    const cleanStyle: { [key: string]: string } = {}
    for (const [key, value] of Object.entries(style)) {
        const newKey = toKebabCase(key.trim())
        if (value === null || value === undefined) {
            continue
        }
        const newValue = value.trim()
        if (newKey && newValue) {
            cleanStyle[newKey] = newValue
        }
    }
    return cleanStyle
}

function cssStringToCssObject(style: string): CssObject {
    const cssObject: CssObject = {}
    const properties = style.split(';')
    for (const property of properties) {
        const parts = property.split(':')
        if (parts.length == 2) {
            const key = parts[0].trim()
            const value = parts[1].trim()
            if (key && value) {
                cssObject[toKebabCase(key)] = value
            }
        }
    }
    return cssObject
}
