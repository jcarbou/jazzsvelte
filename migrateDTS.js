import fs from "fs"
import readline  from "readline"

const CMP_EXPORTS_MIGRATE = [
    [/^([^e].*)\?\s*:\s*(.*)\s*\|\s*undefined/gm, 'export let $1: $2 | null = null'],
    [/^([^e].*)\?\s*:\s*(.*)/gm, 'export let $1: $2 | null = null'],
    [/^([^e].*):\s*(.*)/gm, 'export let $1: $2'],
    [/^(export.*:.*boolean)\s*\|\s*null\s*=\s*null/gm, '$1 = false'],
    [/^export.*children.*/gm, ''],
]

function regexpPatch(content) {
    for(const rule of CMP_EXPORTS_MIGRATE ) {
        content = content.replace(rule[0], rule[1])
    }
    return content
}

const [cmd, migateFile, cmpName] = process.argv
const CmpName = cmpName.substring(0,1).toUpperCase()+cmpName.substring(1)
const typesFile = `src/lib/components/${cmpName}/${cmpName}.d.ts`

async function processLineByLine() {
    const lineReader = readline.createInterface({
        input: fs.createReadStream(typesFile),
        crlfDelay: Infinity
    })
    let content = ""
    let activated = false

    for await (const line of lineReader) {
        const  l = line.trim()
        if(l.indexOf(`export interface ${CmpName}Props`) === 0) {
            activated = true
            continue
        }
        if (!activated || !l || l.indexOf('/') === 0 || l.indexOf('*') === 0) {
            continue
        }
        if (l.indexOf('}') === 0) {
            activated = false
            continue
        }
        content += regexpPatch(l) + "\n"    
    }
    content += 'export let style: CssStyle = null\n'
    
    console.log(content)
    
}

processLineByLine();