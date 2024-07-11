import { CmpApiDoc, CmpContext, ScriptOptions } from '../scripts.types'
import { generateCmpFile } from '../scripts.utils'

export function render(apiDoc: CmpApiDoc, { CmpName, cmpName }: CmpContext): string {
    return `import type { ApiDocData } from '@jazzsvelte/api'
export * from './${cmpName}.types'
export * from './${cmpName}.config'
export { default as ${CmpName} } from './${CmpName}.svelte'
import ${cmpName}Api from './${cmpName}.api.json'
export const ${cmpName}ApiData: ApiDocData = ${cmpName}Api
`
}

export function generateCmpIndex(context: CmpContext, options: ScriptOptions) {
    generateCmpFile(context, 'indexPath', render, options)
}
