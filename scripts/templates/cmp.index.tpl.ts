import { CmpApiDoc, CmpContext, ScriptOptions } from '../scripts.types'
import { generateCmpFile } from '../scripts.utils'

export function render(apiDoc: CmpApiDoc, { CmpName, cmpName }: CmpContext): string {
    return `import type { ApiDocData } from '@jazzsvelte/api'
import ${cmpName}Api from './${cmpName}.api.json'

export { default as ${CmpName} } from './${CmpName}.svelte'

export * from './${cmpName}.types'
export * from './${cmpName}.config'

export const ${cmpName}ApiData: ApiDocData = ${cmpName}Api
`
}

export function generateCmpIndex(context: CmpContext, options: ScriptOptions) {
    generateCmpFile(context, 'indexPath', render, options)
}
