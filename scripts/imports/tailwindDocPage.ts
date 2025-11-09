import { prettierFormat } from './imports.utils'
import { CmpContext, ScriptOptions } from '../scripts.types'
import { mkDir, copyFile, cmpDocHomePath, fileExist, writeText, readText } from '../scripts.utils'

export function tailwindDocPage(context: CmpContext, options: ScriptOptions) {
    const { CmpName, cmpName, tailwindPTPath, tailwindRoutesPageSveltePath, tailwindRoutesPageTsPath, tailwindRoutesPath } =
        context
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

    let content = readText(`${cmpDocHomePath}/theming/TailwindDoc.svelte`)
    content = content.split('`')[1]
    content = content.split('\n').slice(2).join('\n')
    content = content.substring(0, content.lastIndexOf('})') + 2)

    writeText(
        tailwindPTPath,
        `import { classNames } from '@jazzsvelte/api'
import { ${cmpName}PT } from '@jazzsvelte/${cmpName}'

${cmpName}PT({
    ${content}
})`
    )
    console.log(`"${tailwindPTPath}" generated !`)

    prettierFormat(tailwindRoutesPath)
}
