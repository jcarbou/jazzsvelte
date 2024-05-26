import { CmpApiDoc, CmpContext, ScriptOptions } from '../scripts.types'
import { eachValue, filterValues, omitValues, generateCmpFile } from '../scripts.utils'

export function render({ props }: CmpApiDoc, { CmpName, cmpName }: CmpContext): string {
    return `import type { Base${CmpName}Props, ${CmpName}PassThroughOptions } from './${cmpName}.types'
${eachValue(
    filterValues(props, (p) => !!p.defaultImport),
    ({ defaultImport }) => `${defaultImport}`
)}

/**
 * Global Pass Through options (for all ${cmpName}s)
 */
export let global${CmpName}PT: ${CmpName}PassThroughOptions | null

/**
 * Set global Pass Through options (for all ${cmpName}s)
 * @param options
 */
export function ${cmpName}PT(options: ${CmpName}PassThroughOptions) {
    global${CmpName}PT = options
}

/**
 * Default ${cmpName}  props
 */
export const default${CmpName}Props: Omit<Required<Base${CmpName}Props>, 'pt' | 'ptOptions'> = {
${eachValue(omitValues(props, ['pt', 'ptOptions']), ({ name, default: d }) => `   ${name}: ${d},`)}
}

/**
 * Set global default props (for all ${cmpName}s)
 * @param options
 */
export function ${cmpName}DefaultProps(props: Partial<Omit<Base${CmpName}Props, 'pt' | 'ptOptions'>>) {
    Object.assign(default${CmpName}Props, props)
}

`
}

export function generateCmpConfig(context: CmpContext, options: ScriptOptions) {
    generateCmpFile(context, 'configPath', render, options)
}
