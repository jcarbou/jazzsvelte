import fs from 'fs'
import child_process from 'child_process'
import util from 'util'

const exec = util.promisify(child_process.exec)

import { readText, writeText } from '../scripts.utils'
import { CmpContext } from '../scripts.types'

const IMPORT_DOC_COMMON_REG_EXP = /import \{\s*(\w*)\s*\}.*@\/components\/doc\/common.*/gm
const IMPORT2_DOC_COMMON_REG_EXP = /import\s*(\w*)\s*.*@\/components\/doc\/common.*/gm
const IMPORT_CMP_REG_EXP = /import \{\s*(\w*)\s*\}.*@\/components\/lib\/(\w*)\/.*/gm

export const CMP_DOC_MIGRATE: [RegExp, string][] = [
    [
        IMPORT_DOC_COMMON_REG_EXP,
        `    import $1 from '$lib/doc/common/$1.svelte'
`
    ],
    [
        IMPORT2_DOC_COMMON_REG_EXP,
        `    import $1 from '$lib/doc/common/$1.svelte'
`
    ],
    [IMPORT_CMP_REG_EXP, "    import $1 from '$lib/components/$2/$1.svelte'"],
    [/export function.*/gm, '</script>'],
    [/export.*const.*=>.*/gm, '</script>'],
    // [/const.*=>.*/gm, '</script>'], // nor replace const showSuccess = () => {
    [/className/gm, 'class'],
    [/ClassName/gm, 'Class'],
    [/><\/img>/gm, '/>'],
    [/onClick/gm, 'on:click'],
    [/\s*return\s*<DocComponent(.*)/gm, '\n</script>\n\n<DocComponent$1'],
    [/\s*return\s*\(\s*<DocComponent(.*)/gm, '\n</script>\n\n<DocComponent$1'],
    [/\s*return.*/gm, ''],
    [/^}$/gm, ''],
    [/^};$/gm, ''],
    [/^\s*\)\s*$/gm, ''],
    [/^ {4}\);$/gm, ''],
    [/^\s*<>$/gm, ''],
    [/^\s*<\/>$/gm, ''],
    [/^\s*import\s*{\s*useRef\s*}\s*from\s*'react'\s*;/gm, ''],
    [/export default .*\s/gm, ''],
    [/import Link from 'next\/link'.*/gm, ''],
    [/import\s*\{\s*useState\s*\}\s*from\s*'react'.*/gm, ''],
    [/import\s*React.*\s*/gm, ''],
    [/(^\s*$\s)(\s*)import/gm, '$2import'], // Remove empty lines before import
    [/const\s*\[.*\]\s*=\s*useState.*/gm, ''],
    [/\s*<DocSectionText\s*\{...props\}\s*>\s*<\/DocSectionText>/gm, '\n<DocSectionText docSection={docSection} />'],
    [/\s*<DocSectionText\s*\{...props\}\s*\/>/gm, '\n<DocSectionText docSection={docSection} />'],
    [/\s*<DocSectionText\s*\{...props\}\s*>/gm, '\n<DocSectionText docSection={docSection}>'],
    [/\s*<DocSectionText\s*id="(\w*)"\s*label="(\w*)"\s*>/gm, "\n<DocSectionText docSection={{id:'$1', label:'$2'}}>"],
    [/<Link\s*href="\/([\w\/#]*)"\s*>([\w\s]*)<\/Link>/gm, '<a href="/$1">$2</a>'],
    [/(<DocSectionCode.*) import /gm, '$1 toImport ']
]

export function regexpPatch(content: string): string {
    for (const rule of CMP_DOC_MIGRATE) {
        content = content.replace(rule[0], rule[1])
    }
    return content
}

export function fixedJSON(badJSON: string): string {
    return badJSON
        .replace(/:\s*"([^"]*)"/g, function (match, p1) {
            return ': "' + p1.replace(/:/g, '@colon@') + '"'
        })
        .replace(/:\s*'([^']*)'/g, function (match, p1) {
            return ': "' + p1.replace(/:/g, '@colon@') + '"'
        })
        .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')
        .replace(/@colon@/g, ':')
}

export function addScriptTsDeclaration(content: string): string {
    return (
        `<script lang="ts">
` + content
    )
}

export function styleToString(styleJsonString: string): string {
    const style = JSON.parse(fixedJSON(styleJsonString))
    return Object.keys(style).reduce(
        (acc, key) =>
            acc +
            key
                .split(/(?=[A-Z])/)
                .join('-')
                .toLowerCase() +
            ':' +
            style[key] +
            ';',
        ''
    )
}

export function jsonStyleToString(content: string): string {
    return content.replace(/style=\{(\{.*\})\}/g, (match) => `style="${styleToString(match.substring(7, match.length - 1))}"`)
}

export function withFileContent(
    filePath: string,
    context: CmpContext,
    patchList: ((content: string, context: CmpContext) => string)[]
) {
    let content = readText(filePath)
    for (const patch of patchList) {
        content = patch(content, context)
    }
    writeText(filePath, content)
}

export async function prettierFormat(path: string) {
    const { stdout, stderr } = await exec(`pnpx prettier --write '${path}/**/*.{svelte,ts,js}'`)
    console.log('stdout:', stdout)
    console.log('stderr:', stderr)
    //console.log(`prettier --check ${path} && eslint ${path}`);
}
