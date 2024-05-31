import fs from "fs"
import util from "util"
import child_process from 'child_process'
const exec = util.promisify(child_process.exec);

const dirPath = 'src/lib/components/icons'

// Migrate components
function migrate() {
    

    for(const fileDir of fs.readdirSync(dirPath)) {
        const fileDirPath = dirPath+"/"+fileDir
        
        if (!fs.lstatSync(fileDirPath).isDirectory()) {
            continue
        } 
        
        const filePath = fileDirPath+'/index.js'        
        if (!fs.existsSync(filePath)) {
            continue
        }

        let content = fs.readFileSync(filePath, {encoding: "utf-8"})
        const name = content.match(/(.*)\.displayName/gm)[0].split('.')[0]
        const newFilePath = `${fileDirPath}/${name}.svelte`

        let match = content.match(/<svg(\n|.)*?<\/svg>/gm)
        let svg = match[0]
        svg = svg.replace(/{\.\.\.pti}/gm,'{...svgProps} {...$$restProps}')
        svg = svg.replace(/ref={ref} /gm,'')

        const newContent = `<script lang="ts">
        import { getSvgProps } from '../icon.utils'
    
        export const displayName = '${name}'
    
        export let label: string | null = null
        export let spin: boolean = false
        let className: string | null = null
        export { className as class }
    
        $: svgProps = getSvgProps(label, spin, className)
    </script>
    
    ${svg}
    `

    fs.writeFileSync(newFilePath, newContent)

    console.log(name+' created !')


    }
}

async function format(path) {
    const { stdout, stderr } = await exec(`pnpx prettier --write '${path}/**/*.{svelte,ts,js}'`);
    console.log('stdout:', stdout)
    console.log('stderr:', stderr)
    //console.log(`prettier --check ${path} && eslint ${path}`);
}

migrate()

