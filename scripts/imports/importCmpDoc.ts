import fs from 'fs'
import { CmpContext, ScriptOptions } from '../scripts.types'
import { copyDir, fileExist, renameFile, rmDir } from '../scripts.utils'
import { addScriptTsDeclaration, jsonStyleToString, prettierFormat, regexpPatch, withFileContent } from './imports.utils'

const CUSTOM_DOC_CMP = [{ _cmp: 'button', _fileName: 'LoadingDoc.svelte', _jsFileName: 'loadingdoc.js' }]

const FIX_FILENAME_CASE_ERRROR: { [key: string]: string } = {}

function addImport(content: string) {
    return (
        `import { importJS, importTS} from '../common/doc.utils'
` + content
    )
}

function docExportPatch(content: string) {
    return content.replace(
        /^<\/script>/gm,
        `    import type { DocSection } from '$lib/doc/common/doc.types'
    
    export let docSection: DocSection
</script>`
    )
}

function importCmpDocPatch(content: string, { CmpName }: CmpContext) {
    // const importCmpDocThemingRegExp = new RegExp(`import\\s*\\{\\s*${CmpName}\\s*\\}\\s*from.*`, 'gm')
    //content = content.replace(importCmpDocThemingRegExp, '')
    content = content.replace(/(.*)javascript:\s*`\s/gm, "$1javascript: `\n${importJS('" + CmpName + "')}")
    content = content.replace(/(.*)typescript:\s*`\s/gm, "$1typescript: `\n${importTS('" + CmpName + "')}")
    return content
}

function moveCode(content: string) {
    const hasCode = content.indexOf('const code = {') > 0
    const hasDocSectionText = content.indexOf('<DocSectionText ') > 0
    if (hasCode && hasDocSectionText) {
        content = content.replace(/^<\/script>/gm, '')
        content = content.replace(
            /^<DocSectionText/gm,
            `
</script>

<DocSectionText`
        )
    }
    return content
}

const DOC_TABLE_WRAPPER_START = /<div\s*class="doc-tablewrapper"\s*>/g
const DOC_TABLE_WRAPPER_TH = /\s*<th>(.*)<\/th>/g
const DOC_TABLE_WRAPPER_TD = /\s*<td>\s*(.*)\s*<\/td>/gm

function docTabelWrapper(content: string) {
    const lines = content.split('\n')
    let newContent = ''
    let migrating = false
    let cellMigratting = false
    const headers = []
    const rows = []
    let row = []
    let cell = []
    let tbody = false
    let migrated = false

    for (const line of lines) {
        if (!migrating) {
            if (DOC_TABLE_WRAPPER_START.test(line)) {
                migrating = true
                migrated = true
            } else {
                newContent += line + '\n'
            }
            continue
        }

        if (
            line.includes('<table') ||
            line.includes('</table') ||
            line.includes('<thead') ||
            line.includes('</thead') ||
            line.includes('<tbody') ||
            line.includes('</tbody') ||
            line.includes('<tr')
        ) {
            tbody = tbody || line.includes('<tbody')
            continue
        }

        if (line.includes('<th')) {
            headers.push(line.replace(DOC_TABLE_WRAPPER_TH, `'$1'`))
            continue
        }

        if (line.includes('<td') && line.includes('</td>')) {
            row.push(line.replace(DOC_TABLE_WRAPPER_TD, `'$1'`))
            continue
        }

        if (line.includes('<td')) {
            cellMigratting = true
            continue
        }

        if (line.includes('</td>')) {
            cellMigratting = false
            row.push("'" + cell.join('\n') + "'")
            cell = []
            continue
        }

        if (cellMigratting) {
            cell.push(line.trim())
            continue
        }

        if (cellMigratting) {
            cellMigratting = true
            continue
        }

        if (line.includes('</tr') && tbody) {
            rows.push(`[${row.join(',')}]`)
            row = []
            continue
        }

        if (line.includes('</div')) {
            migrating = false
            newContent += `<DocSimpleTable headers={[${headers.join(',')}]} rows={[\n   ${rows.join(',\n   ')}\n]}/>
`
            continue
        }
    }

    if (migrated) {
        newContent = "import DocSimpleTable from '../common/DocSimpleTable.svelte'\n" + newContent
    }

    return newContent
}

function renameDocFiles(dirPath: string, context: CmpContext) {
    const { cmpName } = context

    for (const fileName of fs.readdirSync(dirPath)) {
        // For custom migration (when automatic failed) ignore file (remove it)
        if (CUSTOM_DOC_CMP.find(({ _cmp, _jsFileName }) => _cmp === cmpName && _jsFileName === fileName)) {
            fs.rmSync(dirPath + '/' + fileName)
            continue
        }

        // Ignore previously migrated svelte files
        if (fileName.endsWith('svelte')) continue

        /// Migrate
        const oldFilePath = `${dirPath}/${fileName}`
        if (fs.lstatSync(oldFilePath).isDirectory()) {
            renameDocFiles(oldFilePath, context)
            continue
        }

        let newFileName = fileName.replace('doc.js', 'Doc.svelte')
        newFileName = newFileName.replace('.js', '.svelte')
        newFileName = newFileName.substring(0, 1).toUpperCase() + newFileName.substring(1)
        FIX_FILENAME_CASE_ERRROR[newFileName.toLowerCase().split('.')[0]] = newFileName.split('.')[0]
        const newFilePath = `${dirPath}/${newFileName}`

        const custom = CUSTOM_DOC_CMP.find(({ _cmp, _fileName }) => _cmp === cmpName && _fileName === newFileName)

        if (custom) {
            console.log(`Ignore custom doc ${cmpName} ${newFileName}`)
            continue
        }

        console.log(`Rename "${oldFilePath}" to "${newFilePath}"`)

        renameFile(oldFilePath, newFilePath)

        withFileContent(newFilePath, context, [
            regexpPatch, // Fake for prettier
            docExportPatch,
            moveCode,
            docTabelWrapper,
            jsonStyleToString,
            addImport,
            importCmpDocPatch,
            addScriptTsDeclaration
        ])

        console.log(`"${newFilePath}" generated !`)
    }
}

export function importCmpDoc(context: CmpContext, options: ScriptOptions) {
    const { cmpDocHomePath, prCmpApiDocPath } = context
    const { test, override } = options
    let dirPath = cmpDocHomePath

    if (fileExist(cmpDocHomePath) && !override) {
        console.log(`Directory ${cmpDocHomePath} already generated ! Used override option to force new generation`)
        return
    }
    if (test) {
        dirPath += '_test'
    }

    rmDir(dirPath)
    copyDir(prCmpApiDocPath, dirPath)
    renameDocFiles(dirPath, context)
    prettierFormat(dirPath)
}
