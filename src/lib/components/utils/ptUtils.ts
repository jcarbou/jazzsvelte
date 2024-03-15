import type { HTMLAttributes } from 'svelte/elements'
import { isFunction, isObject } from './ObjectUtils'
import type { PassThroughType, PassThroughTypeFunction } from './utils.types'
import JAZZ_SVELTE from '../api/JazzSvelte'
import type { JazzSveltePTOptions } from '../api/JazzSvelte.types'

type HTMLAttr = HTMLAttributes<HTMLElement>

export type PassThroughMethodeOptions<CP> = {
    props: CP
}

type Options<T, M> = PassThroughType<T, M> | undefined

export function ptToAttributes<T extends HTMLAttr, M, CP>
(options: Options<T,M>, ptOptions: PassThroughMethodeOptions<CP>) {
    let attributes: T | null = null,
        classes = null,
        styles = null
    if (options) {
        if (isFunction(options)) {
            const functionAttr = (options as PassThroughTypeFunction<T, PassThroughMethodeOptions<CP>>)(ptOptions)
            if (functionAttr) {
                attributes = { ...functionAttr }
            }
        } else if (isObject(options)) {
            attributes = { ...(options as T) }
        }
        if (attributes?.class) {
            classes = attributes.class
            delete attributes.class
        }
        if (attributes?.style) {
            styles = attributes.style
            delete attributes.style
        }
    }
    return { attributes, classes, styles }
}
 export function ptAttributes<T extends HTMLAttr, M, CP>(
    options: Options<T,M>,
    globalOptions: Options<T,M>,
    ptOptions: PassThroughMethodeOptions<CP> ) {

    const ptGlobalAttributes = ptToAttributes(globalOptions, ptOptions)
    const ptAttributes = ptToAttributes(options, ptOptions)
    let attributes: T | null = null,
    classes,
    styles
    
    if (ptGlobalAttributes.attributes || ptAttributes.attributes) {
        attributes = {...ptGlobalAttributes.attributes, ...ptAttributes.attributes}
    }
    classes =  classes ? (ptAttributes.classes ? classes+" "+ptAttributes.classes :)

    return { attributes, classes, styles }    
}