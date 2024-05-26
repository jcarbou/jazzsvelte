import { CmpApiDoc, CmpContext, ScriptOptions } from '../scripts.types'
import { eachValue, generateCmpFile, ifValues } from '../scripts.utils'

export function render(
    { meta, props, types, ptMethodOptions, ptContext, ptOptions, state }: CmpApiDoc,
    { CmpName }: CmpContext
): string {
    const { importApi, tooltip, RootType, omitAttributes } = meta

    return `${tooltip ? `import type { TooltipOptions } from '@jazzsvelte/tooltip'` : ''}
${meta.svelteComponent ? `import type { SvelteComponent } from 'svelte'` : ''}
import type {
CssObject,
${eachValue(importApi, ({ name }) => `   HTML${name}Attributes,`)}
${meta.icon ? `   IconComponent,` : ''}
   PassThroughHTMLAttributes,
   PassThroughType
} from '@jazzsvelte/api'

${ifValues(
    types,
    () =>
        `/**
 * ${types.description}
 * @group types
 **/
${eachValue(types, ({ name, value }) => `export type ${name} = ${value}`)}`
)}

/**
 * ${props.baseDescription}
 * @group baseProperties
 */
export interface Base${CmpName}Props {
${eachValue(
    props,
    ({ name, optional, type, default: d, description }) =>
        `   /**
     * ${description}
     * @default  ${d || 'null'}
     */
    ${name}${optional ? '?' : ''}: ${type}
`
)}
}

/**
 * ${props.description}
 * @group properties
 */
export interface ${CmpName}Props extends Omit<HTML${RootType}Attributes, ${omitAttributes}>, Base${CmpName}Props {}

/**
 * @group ptType
 */
export declare type ${CmpName}PassThroughType<T> = PassThroughType<PassThroughHTMLAttributes<T>, ${CmpName}PassThroughMethodOptions>

${ifValues(
    ptMethodOptions,
    () =>
        `/**
 * Custom passthrough(pt) option method.
 * @group ptOptionMethod
 */
export interface ${CmpName}PassThroughMethodOptions {
${eachValue(ptMethodOptions, ({ name, type }) => `   ${name}: ${type}`)}
}`
)}

${ifValues(
    ptOptions,
    () =>
        `/**
 * Custom passthrough(pt) options.
 * @group ptOptions
 */
export interface ${CmpName}PassThroughOptions {
${eachValue(
    ptOptions,
    ({ description, name, type }) =>
        `   /**
     * ${description}
     */
${
    type === 'Icon'
        ? `   ${name}?: ${CmpName}PassThroughType<HTMLSpanAttributes> | ${CmpName}PassThroughType<HTMLSVGAttributes>`
        : `   ${name}?: ${CmpName}PassThroughType<HTML${type}Attributes>`
}`
)}
}`
)}

${ifValues(
    ptContext,
    () =>
        `/**
 * Defines current options in ${CmpName} component.
 * @group ptContextOption
 */
export interface ${CmpName}Context {
${eachValue(
    ptContext,
    ({ description, name, type }) =>
        `    /**
     * ${description}
     */
    ${name}: ${type}`
)}
}`
)}

${ifValues(
    state,
    () =>
        `/**
 * Defines current state of ${CmpName} component.
 * @group state
 */
export interface ${CmpName}State {
${eachValue(
    state,
    ({ description, name, type }) =>
        `    /**
     * ${description}
     */
    ${name}: ${type}`
)}
}`
)}

`
}

export function generateCmpTypes(context: CmpContext, options: ScriptOptions) {
    generateCmpFile(context, 'typesPath', render, options)
}
