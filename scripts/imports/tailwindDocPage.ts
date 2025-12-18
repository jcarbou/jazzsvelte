import { prettierFormat } from './imports.utils'
import { CmpContext, ScriptOptions } from '../scripts.types'
import {
    mkDir,
    fileExist,
    writeText,
    readText,
    readJson,
    tagDoneMenuEntry,
    sortPropsByName,
    writeJson,
    pnpmInstall
} from '../scripts.utils'

export function tailwindDocPage(context: CmpContext, options: ScriptOptions) {
    const {
        CmpName,
        cmpName,
        cmpname,
        cmp_name,
        cmpDocHomePath,
        docIndexPath,
        tailwindMenuJsonPath,
        tailwindPackagePath,
        tailwindPTHomePath,
        tailwindMainLayoutPath,
        tailwindPTPath,
        tailwindRoutesPageSveltePath,
        tailwindRoutesPageTsPath,
        tailwindRoutesPath
    } = context
    const { test, override } = options

    if (fileExist(tailwindRoutesPath) && !override) {
        console.log(`File ${tailwindRoutesPath} already generated ! Used override option to force new generation`)
        return
    }

    mkDir(tailwindRoutesPath)
    writeText(
        tailwindRoutesPageTsPath,
        `import { dev } from '$app/environment'

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true
`
    )
    console.log(`"${tailwindRoutesPageTsPath}" generated !`)

    writeText(
        tailwindRoutesPageSveltePath,
        `<script lang="ts">
    import { ${CmpName}Doc } from '@jazzsvelte/doc'
</script>

<${CmpName}Doc />`
    )
    console.log(`"${tailwindRoutesPageSveltePath}" generated !`)

    const contentPath = `${cmpDocHomePath}/theming/TailwindDoc.svelte`
    let content = ''
    if (fileExist(contentPath)) {
        content = readText(contentPath)
        content = content.split('`')[1]
        const lines = content.split('\n')
        let startIndex = 2 + (!!lines[0].trim() ? 0 : 1)
        content = lines.slice(startIndex).join('\n')
        content = content.substring(0, content.lastIndexOf('}'))
        content = content.replaceAll('classs', 'classNames')
    } else {
        console.log(`File not exist ${contentPath}`)
    }

    writeText(
        tailwindPTPath,
        `import { classNames } from '@jazzsvelte/api'
import { ${cmpName}PT } from '@jazzsvelte/${cmp_name}'

${cmpName}PT({
    ${content}
})`
    )
    console.log(`"${tailwindPTPath}" generated !`)

    let indexContent = readText(docIndexPath)
    const exportLine = `export { default as ${CmpName}Doc } from './lib/doc/${cmpName}/${CmpName}Doc.svelte'`
    if (!indexContent.includes(exportLine)) {
        indexContent = exportLine + '\n' + indexContent
        writeText(docIndexPath, indexContent)
    }

    let layoutContent = readText(tailwindMainLayoutPath)
    const importLine = `    import '$lib/pt/${cmpName}.pt'`

    if (!layoutContent.includes(importLine)) {
        let lines = layoutContent.split('\n'),
            index = lines.indexOf('    // Import component PT')

        lines.splice(index + 1, 0, importLine)
        writeText(tailwindMainLayoutPath, lines.join('\n'))
    }

    tagDoneMenuEntry(tailwindMenuJsonPath, cmpname)

    const tailwindPakageJson = readJson(tailwindPackagePath)
    let { devDependencies } = tailwindPakageJson

    if (!devDependencies[`@jazzsvelte/${cmp_name}`]) {
        devDependencies[`@jazzsvelte/${cmp_name}`] = 'workspace:^0.1.0'
        sortPropsByName(tailwindPakageJson, 'devDependencies')
        writeJson(tailwindPackagePath, tailwindPakageJson)
    }

    pnpmInstall()
    prettierFormat(tailwindRoutesPath)
    prettierFormat(tailwindPTHomePath)
}
