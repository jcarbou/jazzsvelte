import fs from "fs"

const IMPORT_DOC_COMMON_REG_EXP = /import \{\s*(\w*)\s*\}.*@\/components\/doc\/common.*/gm
const IMPORT2_DOC_COMMON_REG_EXP = /import\s*(\w*)\s*.*@\/components\/doc\/common.*/gm
const IMPORT_CMP_REG_EXP = /import \{\s*(\w*)\s*\}.*@\/components\/lib\/(\w*)\/.*/gm

const CMP_DOC_MIGRATE = [
    [IMPORT_DOC_COMMON_REG_EXP, "    import $1 from '$lib/doc/common/$1.svelte'"],
    [IMPORT2_DOC_COMMON_REG_EXP, "    import $1 from '$lib/doc/common/$1.svelte'"],
    [IMPORT_CMP_REG_EXP, "    import $1 from '$lib/components/$2/$1.svelte'"],
    [/export function.*/gm, '</script>'],
    [/export.*const.*=>.*/gm, '</script>'],
    [/const.*=>.*/gm, '</script>'],
    [/className/gm, 'class'],
    [/\s*return\s*<DocComponent(.*)/gm, '<DocComponent$1'],
    [/\s*return.*/gm, ''],
    [/^}$/gm, ''],
    [/^};$/gm, ''],
    [/^ {4}\);$/gm, ''],
    [/^\s*<>$/gm, ''],
    [/^\s*<\/>$/gm, ''],
    [/export default .*/gm, ''],
    [/import Link from 'next\/link'.*/gm, ''],
    [/\s*<DocSectionText\s*\{...props\}\s*>\s*<\/DocSectionText>/gm, '\n<DocSectionText docSection={docSection} />'],
    [/\s*<DocSectionText\s*\{...props\}\s*\/>/gm, '\n<DocSectionText docSection={docSection} />'],
    [/\s*<DocSectionText\s*\{...props\}\s*>/gm, '\n<DocSectionText docSection={docSection}>'],
    [/\s*<DocSectionText\s*id="(\w*)"\s*label="(\w*)"\s*>/gm, 
    "\n<DocSectionText docSection={{id:'$1', label:'$2'}}>"],
    [/<Link\s*href="\/(\w*)"\s*>([\w\s]*)<\/Link>/gm, '<a href="/$1">$2</a>'],
    [/(<DocSectionCode.*) import /gm, '$1 toImport ']
]

function fixedJSON(badJSON) {
    return badJSON.replace(/:\s*"([^"]*)"/g, function(match, p1) {
		return ': "' + p1.replace(/:/g, '@colon@') + '"';
	}).replace(/:\s*'([^']*)'/g, function(match, p1) {
		return ': "' + p1.replace(/:/g, '@colon@') + '"';
	}).replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')
    .replace(/@colon@/g, ':')
}

function regexpPatch(content) {
    for(const rule of CMP_DOC_MIGRATE ) {
        content = content.replace(rule[0], rule[1])
    }
    return content
}

function lastPatch(content) {
    return `<script lang="ts">
`+ content
}

function cmpDocExportPatch(content) {
    return content.replace(/^<\/script>/gm, `    import type { DocSection } from '$lib/doc/common/doc.types'
    
    export let docSection: DocSection
</script>`)
}

function moveCode(content) {
    const hasCode = content.indexOf('const code = {') > 0
    const hasDocSectionText = content.indexOf('<DocSectionText ') > 0
    if (hasCode && hasDocSectionText) {
        content = content.replace(/^<\/script>/gm, '')
        content = content.replace(/^<DocSectionText/gm, `
</script>

<DocSectionText`)
    }
    return content
}

function styleToString(styleJsonString) {
    const style = JSON.parse(fixedJSON(styleJsonString))
    return Object.keys(style).reduce((acc, key) => (
        acc + key.split(/(?=[A-Z])/).join('-').toLowerCase() + ':' + style[key] + ';'
    ), '');
};

function jsonStyleToString(content) {
    return content.replace(/style=\{(\{.*\})\}/g, match => `style="${styleToString(match.substring(7,match.length-1))}"`);
}

function withFileContent(filePath,patchList) {
    let content = fs.readFileSync(filePath, {encoding: "utf-8"})
    for(const patch of patchList) {
        content = patch(content)
    }
    fs.writeFileSync(filePath, content)
}


const [cmd, migateFile, cmp] = process.argv
const newPage = `src/routes/${cmp}`
const newDoc = `src/lib/doc/${cmp}`

// Migrate page
const newPagePath = `${newPage}/page.svelte`
fs.cpSync(`_pr_pages/${cmp}`, newPage, {recursive: true})
fs.renameSync(`${newPage}/index.js`, newPagePath)
const importCmpDocRegExp = new RegExp(`import \\{\\s*(\\w*)\\s*\\}.*@\\/components\\/doc\\/${cmp}.*`, 'gm')
function importCmpDocPatch(content)  {
    return content.replace(importCmpDocRegExp,`    import $1 from '$lib/doc/${cmp}/$1.svelte'`)
}
withFileContent(newPagePath, [regexpPatch, importCmpDocPatch, jsonStyleToString, lastPatch])
fs.writeFileSync(`${newPage}/+page.ts` ,`import { dev } from '$app/environment';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;`)


// Migrate page components
function renameDocFiles(dirPath) {
    for(const fileName of fs.readdirSync(dirPath)) {
        const oldFilePath = `${dirPath}/${fileName}`
        if (fs.lstatSync(oldFilePath).isDirectory()) {
            renameDocFiles(oldFilePath)
            continue
        } 
        
        let newFileName = fileName.replace('doc.js', 'Doc.svelte')
        newFileName = newFileName.replace('.js', '.svelte')
        newFileName = newFileName.substring(0,1).toUpperCase()+newFileName.substring(1)
        const newFilePath = `${dirPath}/${newFileName}`

        console.log(`Rename ${oldFilePath} to ${newFilePath}`)

        fs.renameSync(oldFilePath,newFilePath)

        console.log(`Patch ${newFilePath}`)

        withFileContent(newFilePath, [regexpPatch, cmpDocExportPatch, moveCode, jsonStyleToString, lastPatch])      
    }
}
fs.rmSync(newDoc, { recursive: true, force: true })
fs.cpSync(`_pr_components/doc/${cmp}`, newDoc, {recursive: true})
renameDocFiles(newDoc)