import fs from "fs"
import util from "util"
import child_process from 'child_process'
const exec = util.promisify(child_process.exec);

const CUSTOM_PAGES = ['ripple']
const CUSTOM_DOC_CMP = [{_cmp: 'button', _fileName:'LoadingDoc.svelte', _jsFileName:'loadingdoc.js'}]

const FIX_FILENAME_CASE_ERRROR = {}

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
    [/ClassName/gm, 'Class'],
    [/><\/img>/gm, '/>'],
    [/onClick/gm, 'on:click'],
    [/\s*return\s*<DocComponent(.*)/gm, '\n</script>\n\n<DocComponent$1'],
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
    [/<Link\s*href="\/([\w\/#]*)"\s*>([\w\s]*)<\/Link>/gm, '<a href="/$1">$2</a>'],
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

function cmp_docExportPatch(content) {
    return content.replace(/^<\/script>/gm, `    import type { DocSection } from '$lib/doc/common/doc.types'
    
    export let docSection: DocSection
</script>`)
}

function page_fixImportCaseError (content) {
    for(const id in FIX_FILENAME_CASE_ERRROR) {
       const fixRegExp = new RegExp(`import\\s*\\{\\s*${id}\\s*\\}.*@\\/components`, 'gmi')
       content = content.replace(fixRegExp, `import {${FIX_FILENAME_CASE_ERRROR[id]}} '@/components`)
       const fix2RegExp = new RegExp(`\\s*component\\s*:\\s*${id}\\s*`, 'gmi')
       content = content.replace(fix2RegExp, `            component: ${FIX_FILENAME_CASE_ERRROR[id]}`)
    }
    return content
}

function page_importCmpDocPatch (content) {
    const importCmpDocThemingRegExp = new RegExp(`import \\{\\s*(\\w*)\\s*\\}.*@\\/components\\/doc\\/${cmp}\\/(\\w*)\\/.*`, 'gm')
    const importCmpDocRegExp = new RegExp(`import \\{\\s*(\\w*)\\s*\\}.*@\\/components\\/doc\\/${cmp}.*`, 'gm')
    content = content.replace(importCmpDocThemingRegExp,`    import $1 from '$lib/doc/${cmp}/$2/$1.svelte'`)
    return content.replace(importCmpDocRegExp,`    import $1 from '$lib/doc/${cmp}/$1.svelte'`)
}

function page_removeXXXDemo (content) {
    content = content.replace(/const.*Demo.*=>.*/gm, '')
    return content
}


function cmp_moveCode(content) {
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

const DOC_TABLE_WRAPPER_START = /<div\s*class="doc-tablewrapper"\s*>/g
const DOC_TABLE_WRAPPER_TH = /\s*<th>(.*)<\/th>/g
const DOC_TABLE_WRAPPER_TD = /\s*<td>(.*)<\/td>/g

function cmp_docTabelWrapper(content) {
    const lines = content.split('\n')
    let newContent = ''
    let migrating = false
    const headers = []
    const rows = []
    let row = []
    let tbody = false
    
    for(const line of lines) {
        if (!migrating) {
            if (DOC_TABLE_WRAPPER_START.test(line)) {                
                migrating = true
            } else {
                newContent += line + '\''
            }
            continue
        }

        if (
            line.includes('<table') || line.includes('</table') 
            || line.includes('<thead') || line.includes('</thead')
            || line.includes('<tbody') || line.includes('</tbody')
            || line.includes('<tr')
            ) {
                tbody = tbody || line.includes('<tbody')
                continue
        }

        if (line.includes('<th')) {
            headers.push(line.replace( DOC_TABLE_WRAPPER_TH, `'$1'`))
            continue
        }

        if (line.includes('<td')) {
            row.push(line.replace( DOC_TABLE_WRAPPER_TD, `'$1'`))
            continue
        }

        if (line.includes('</tr') && tbody) {
            rows.push(`[${row.join(',')}]`)
            row = []
            continue
        }

        if (line.includes('</div')) { 
            migrating  = false
            newContent += `<DocSimpleTable headers={[${headers.join(',')})]} rows={[\n   ${rows.join(',\n   ')}\n]}/>
`
            continue
        }
    }

    return newContent
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


async function format(path) {
    const { stdout, stderr } = await exec(`pnpx prettier --write '${path}/**/*.{svelte,ts,js}'`);
    console.log('stdout:', stdout)
    console.log('stderr:', stderr)
    //console.log(`prettier --check ${path} && eslint ${path}`);
}

const [cmd, migateFile, cmp] = process.argv
const newPage = `src/routes/${cmp}`
const newDoc = `src/lib/doc/${cmp}`

// Migrate components
function renameDocFiles(dirPath) {
    for(const fileName of fs.readdirSync(dirPath)) {

        // For custom migration (when automatic failed) ignore file (remove it)
        if (CUSTOM_DOC_CMP.find(({_cmp , _jsFileName}) => 
           _cmp === cmp &&  _jsFileName === fileName
        )) {
            fs.rmSync(dirPath+'/'+fileName)
            continue
        }

        // Ignore previously migrated svelte files
        if (fileName.endsWith('svelte')) continue

        /// Migrate
        const oldFilePath = `${dirPath}/${fileName}`
        if (fs.lstatSync(oldFilePath).isDirectory()) {
            renameDocFiles(oldFilePath)
            continue
        } 
        
        let newFileName = fileName.replace('doc.js', 'Doc.svelte')
        newFileName = newFileName.replace('.js', '.svelte')
        newFileName = newFileName.substring(0,1).toUpperCase()+newFileName.substring(1)
        FIX_FILENAME_CASE_ERRROR[newFileName.toLowerCase().split('.')[0]] = newFileName.split('.')[0]
        const newFilePath = `${dirPath}/${newFileName}`

        const custom = CUSTOM_DOC_CMP.find(({_cmp , _fileName}) => 
           _cmp === cmp &&  _fileName === newFileName
        )

        if (custom) {
            console.log(`Ignore custom doc ${cmp} ${newFileName}`)
            continue
        }

        console.log(`Rename ${oldFilePath} to ${newFilePath}`)

        fs.renameSync(oldFilePath,newFilePath)

        console.log(`Patch ${newFilePath}`)

        withFileContent(newFilePath, [
            regexpPatch, // Fake for prettier
            cmp_docExportPatch, 
            cmp_moveCode, 
            cmp_docTabelWrapper,
            jsonStyleToString, 
            lastPatch
        ])
    }
}
fs.rmSync(newDoc, { recursive: true, force: true })
fs.cpSync(`_pr_components/doc/${cmp}`, newDoc, {recursive: true})
renameDocFiles(newDoc)

// Migrate page
const newPagePath = `${newPage}/+page.svelte`
if (!CUSTOM_PAGES[cmp]) {
    fs.cpSync(`_pr_pages/${cmp}`, newPage, {recursive: true})
    fs.renameSync(`${newPage}/index.js`, newPagePath)
    withFileContent(newPagePath, [
        page_removeXXXDemo, // fake for prettier
        page_fixImportCaseError,
        regexpPatch,  
        page_importCmpDocPatch, 
        jsonStyleToString, 
        lastPatch
    ])
    fs.writeFileSync(`${newPage}/+page.ts` ,`import { dev } from '$app/environment';

    // we don't need any JS on this page, though we'll load
    // it in dev so that we get hot module replacement
    export const csr = dev;

    // since there's no dynamic data here, we can prerender
    // it so that it gets served as a static asset in production
    export const prerender = true;`)
}

format(newPage)
format(newDoc)