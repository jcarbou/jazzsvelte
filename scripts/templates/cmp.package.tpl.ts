import { CmpApiDoc, CmpContext, ScriptOptions } from '../scripts.types'
import { generateCmpFile } from '../scripts.utils'

export function render({ meta }: CmpApiDoc, { cmp_name }: CmpContext): string {
    const { icon, tooltip } = meta
    return `{
    "name": "@jazzsvelte/${cmp_name}",
    "version": "0.1.0",
    "description": "",
    "main": "src/index.ts",
    "sideEffects": false,
    "scripts": {
        "test": "vitest",
        "test:update": "vitest run -u"
    },
    "devDependencies": {
        "@jazzsvelte/api": "workspace:^0.1.0",
        "@jazzsvelte/test": "workspace:^0.1.0"${icon ? ',' : ''} 
        ${icon ? `"@jazzsvelte/icons": "workspace:^0.1.0"` : ''}${tooltip ? ',' : ''}
        ${tooltip ? `"@jazzsvelte/tooltip": "workspace:^0.1.0"` : ''}
    },
    "dependencies": {        
        "@jazzsvelte/object": "workspace:^0.1.0"       
    },
    "keywords": [],
    "author": "Jerome Carbou",
    "license": "ISC",
    "type": "module"
      }    
`
}

export function generateCmpPackage(context: CmpContext, options: ScriptOptions) {
    generateCmpFile(context, 'packagePath', render, options)
}
