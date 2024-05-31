import fs from "fs"
import util from "util"
import child_process from 'child_process'
const exec = util.promisify(child_process.exec);

const dirPath = 'packages/_icons'

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
        //const newFilePath = `${fileDirPath}/${name}.svelte`

        const packageContent = `{
            "name": "@jazzsvelte/${fileDir}_icon",
            "version": "0.1.0",
            "description": "${name}",
            "main": "/index.ts",
            "sideEffects": false,
            "scripts": {
              "test": "echo \\"Error: no test specified\\" && exit 1"
            },
            "dependencies": {
              "@jazzsvelte/icons": "workspace:*"
            },
            "keywords": [],
            "author": "",
            "license": "ISC"
          }`

        fs.writeFileSync(fileDirPath+'/package.json', packageContent)

        const indexContent = `export { default as ${name} } from './${name}.svelte'`

        fs.writeFileSync(fileDirPath+'/index.ts', indexContent)

        content = fs.readFileSync(`${fileDirPath}/${name}.svelte`, {encoding: "utf-8"})
        content = content.replace('../icon.utils','@jazzsvelte/icons')

        fs.writeFileSync(`${fileDirPath}/${name}.svelte`, content)

        fs.rmSync(fileDirPath+'/index.js')
        fs.rmSync(fileDirPath+'/index.d.ts')

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

