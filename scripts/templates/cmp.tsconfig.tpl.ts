import { CmpContext, ScriptOptions } from '../scripts.types'
import { generateCmpFile } from '../scripts.utils'

export function render(): string {
    return `{
   "extends": "../../tsconfig.base.json"
}`
}

export function generateCmpTsConfig(context: CmpContext, options: ScriptOptions) {
    generateCmpFile(context, 'tsConfigPath', render, options)
}
