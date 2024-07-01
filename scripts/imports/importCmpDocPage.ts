import { addScriptTsDeclaration, jsonStyleToString, prettierFormat, regexpPatch, withFileContent } from './imports.utils'
import { CmpContext, ScriptOptions } from '../scripts.types'
import { mkDir, copyFile, fileExist, writeText } from '../scripts.utils'

const FIX_FILENAME_CASE_ERRROR: { [key: string]: string } = {}

function fixImportCaseError(content: string): string {
    for (const id in FIX_FILENAME_CASE_ERRROR) {
        const fixRegExp = new RegExp(`import\\s*\\{\\s*${id}\\s*\\}.*@\\/components`, 'gmi')
        content = content.replace(fixRegExp, `import {${FIX_FILENAME_CASE_ERRROR[id]}} '@/components`)
        const fix2RegExp = new RegExp(`\\s*component\\s*:\\s*${id}\\s*`, 'gmi')
        content = content.replace(fix2RegExp, `            component: ${FIX_FILENAME_CASE_ERRROR[id]}`)
    }
    return content
}

function importCmpDocPatch(content: string, context: CmpContext): string {
    const { cmpname, cmpName } = context
    const importCmpDocThemingRegExp = new RegExp(
        `import \\{\\s*(\\w*)\\s*\\}.*@\\/components\\/doc\\/${cmpname}\\/(\\w*)\\/.*`,
        'gm'
    )
    const importCmpDocRegExp = new RegExp(`import \\{\\s*(\\w*)\\s*\\}.*@\\/components\\/doc\\/${cmpname}.*`, 'gm')
    content = content.replace(importCmpDocThemingRegExp, `    import $1 from '$lib/doc/${cmpName}/$2/$1.svelte'`)
    return content.replace(importCmpDocRegExp, `    import $1 from '$lib/doc/${cmpName}/$1.svelte'`)
}

function removeXXXDemo(content: string): string {
    content = content.replace(/const.*Demo.*=>.*/gm, '')
    return content
}

export function importCmpDocPage(context: CmpContext, options: ScriptOptions) {
    const { cmpDocPageSveltePath, cmpDocPagePath, cmpDocPageSvelteTsPath, prCmpDocPagePath, prCmpDocPageDirPath } = context
    const { test, override } = options
    let filePath = cmpDocPageSveltePath

    if (fileExist(cmpDocPageSveltePath) && !override) {
        console.log(`File ${cmpDocPageSveltePath} already generated ! Used override option to force new generation`)
        return
    }
    if (test) {
        filePath += '.test.' + filePath.split('.').slice(-1)
    }

    mkDir(prCmpDocPageDirPath)
    copyFile(prCmpDocPagePath, filePath)
    withFileContent(filePath, context, [
        removeXXXDemo, // fake for prettier
        fixImportCaseError,
        regexpPatch,
        importCmpDocPatch,
        jsonStyleToString,
        addScriptTsDeclaration
    ])
    writeText(
        cmpDocPageSvelteTsPath,
        `import { dev } from '$app/environment';

    // we don't need any JS on this page, though we'll load
    // it in dev so that we get hot module replacement
    export const csr = dev;

    // since there's no dynamic data here, we can prerender
    // it so that it gets served as a static asset in production
    export const prerender = true;`
    )
    console.log(`"${cmpDocPageSvelteTsPath}" generated !`)

    prettierFormat(cmpDocPagePath)
}
