import { CmpApiDoc, CmpContext, ScriptOptions } from '../scripts.types'
import { generateCmpFile } from '../scripts.utils'

export function render(apiDoc: CmpApiDoc, { CmpName, cmpName }: CmpContext): string {
    return `export * from './${cmpName}.types'
export * from './${cmpName}.config'
export { default as ${CmpName} } from './${CmpName}.svelte'
`
}

export function generateCmpIndex(context: CmpContext, options: ScriptOptions) {
    generateCmpFile(context, 'indexPath', render, options)
}
