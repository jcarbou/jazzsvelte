import fs from 'fs'
import { CmpApiDoc, CmpContext, ScriptOptions } from './scripts.types'

export function toKebabCase(str: string) {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
}

export function buildCmpContext(name: string): CmpContext {
    const start = name.substring(0, 1),
        end = name.substring(1),
        CmpName = start.toUpperCase() + end,
        cmpName = start.toLocaleLowerCase() + end,
        cmpname = start.toLocaleLowerCase() + end.toLocaleLowerCase(),
        cmp_name = toKebabCase(cmpName),
        cmpHomePath = `./packages/${cmp_name}`,
        docHomePath = './apps/jazzsvelte_doc/src',
        cmpDocHomePath = `${docHomePath}/lib/doc/${cmpName}`,
        cmpDocPagePath = `${docHomePath}/routes/${cmpname}`,
        cmpDocPageSveltePath = `${cmpDocPagePath}/+page.svelte`,
        cmpDocPageSvelteTsPath = `${cmpDocPagePath}/+page.ts`,
        cmpSrcPath = `${cmpHomePath}/src`,
        packagePath = `${cmpHomePath}/package.json`,
        tsConfigPath = `${cmpHomePath}/tsconfig.json`,
        svelteConfigPath = `${cmpHomePath}/svelte.config.js`,
        cmpPath = `${cmpSrcPath}/${CmpName}.svelte`,
        apiPath = `${cmpSrcPath}/${cmpName}.api.json`,
        typesPath = `${cmpSrcPath}/${cmpName}.types.ts`,
        configPath = `${cmpSrcPath}/${cmpName}.config.ts`,
        testPath = `${cmpSrcPath}/${cmpName}.spec.js`,
        indexPath = `${cmpSrcPath}/index.ts`,
        sveltePath = `${cmpSrcPath}/${CmpName}.svelte`,
        prPath = '../primereact',
        prApiDocPath = `${prPath}/components/doc/common/apidoc/index.json`,
        prCmpApiDocPath = `${prPath}/components/doc/${cmpName}`,
        prCmpDocPageDirPath = `${prPath}/pages/${cmpname}`,
        prCmpDocPagePath = `${prCmpDocPageDirPath}/index.js`

    return {
        CmpName,
        cmpName,
        cmpname,
        cmp_name,
        cmpHomePath,
        cmpDocHomePath,
        cmpDocPagePath,
        cmpSrcPath,
        packagePath,
        svelteConfigPath,
        tsConfigPath,
        cmpPath,
        testPath,
        typesPath,
        apiPath,
        configPath,
        indexPath,
        sveltePath,
        prApiDocPath,
        prCmpDocPageDirPath,
        prCmpDocPagePath,
        prCmpApiDocPath,
        cmpDocPageSveltePath,
        cmpDocPageSvelteTsPath
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function readJson(path: string): any {
    return JSON.parse(fs.readFileSync(path, 'utf8'))
}

export function readText(path: string): string {
    return fs.readFileSync(path, 'utf8')
}

export function writeText(path: string, content: string) {
    fs.writeFileSync(path, content)
}

export function fileExist(path: string) {
    return fs.existsSync(path)
}

export function rmDir(path: string) {
    fs.rmSync(path, { recursive: true, force: true })
}

export function mkDir(path: string) {
    fs.mkdirSync(path, { recursive: true })
}

export function copyFile(from: string, to: string) {
    fs.cpSync(from, to)
}

export function copyDir(from: string, to: string) {
    fs.cpSync(from, to, { recursive: true })
}

export function renameFile(from: string, to: string) {
    fs.renameSync(from, to)
}

export function readApiDoc(apiPath: string): CmpApiDoc {
    const apiDoc: CmpApiDoc = readJson(apiPath)

    apiDoc.meta.tooltip = !!apiDoc.props.values.find((value) => value.name === 'tooltip')
    apiDoc.meta.icon = !!apiDoc.props.values.find((value) => value.type.includes('IconComponent'))
    apiDoc.meta.importApi = {
        values: Array.from(
            apiDoc.ptOptions.values.reduce<Set<string>>((set, value) => {
                if (value.type === 'Icon') {
                    set.add('SVG')
                    set.add('Span')
                } else {
                    set.add(value.type)
                }
                return set
            }, new Set())
        ).map((type) => ({ name: type }))
    }

    return apiDoc
}

export function getScriptOptions(): ScriptOptions {
    return {
        cmpName: process.argv[2],
        test: process.argv.includes('-test') || process.argv.includes('-t'),
        override: process.argv.includes('-override') || process.argv.includes('-o')
    }
}

export function generateCmpFile(
    context: CmpContext,
    path: keyof CmpContext,
    render: (apiDoc: CmpApiDoc, cmpContext: CmpContext) => string,
    options: ScriptOptions
) {
    const { apiPath } = context
    let filePath = context[path]

    if (options.test) {
        filePath += '.test.' + context[path].split('.').slice(-1)
    } else if (!options.override && fileExist(filePath)) {
        console.log(`File ${context[path]} already exists ! Generation aborted (Use override option to force generation)`)
        return
    }

    console.log(`Generate ${filePath}`)

    const apiDoc: CmpApiDoc = readApiDoc(apiPath)
    const content = render(apiDoc, context)

    writeText(filePath, content)

    console.log(`"${filePath}" generated !`)
}

export function eachValue<VALUE>(parent: { values: VALUE[] } | undefined, render: (value: VALUE) => string) {
    return parent?.values?.map(render).join('\n') || ''
}

export function filterValues<VALUE>(
    parent: { values: VALUE[] } | undefined,
    filterFn: (value: VALUE) => boolean
): { values: VALUE[] } | undefined {
    if (!parent?.values?.length) return undefined
    const copy = { ...parent }
    copy.values = copy.values.filter(filterFn)
    return copy
}

export function omitValues<VALUE extends { name: string }>(
    parent: { values: VALUE[] } | undefined,
    values: string[]
): { values: VALUE[] } | undefined {
    return filterValues(parent, (v) => !values.includes(v.name))
}

export function withValue<VALUE extends { name: string }>(
    parent: { values: VALUE[] } | undefined,
    name: string,
    render: (value: VALUE) => string
): string {
    if (!parent?.values?.length) return ''
    const value = parent.values.find((v) => v.name === name)
    return value ? render(value) : ''
}

export function ifValues<VALUE>(parent: { values: VALUE[] } | undefined, render: () => string): string {
    return parent?.values?.length ? render() : ''
}

export function upperFirst(s: string): string {
    const start = s.substring(0, 1),
        end = s.substring(1)
    return start.toUpperCase() + end
}
