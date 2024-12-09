import fs from "fs"

const dirPath = 'packages/_icons'

// Migrate components
function migrate() {
    

    for(const fileDir of fs.readdirSync(dirPath)) {
        const fileDirPath = dirPath+"/"+fileDir
        
        if (!fs.lstatSync(fileDirPath).isDirectory()) {
            continue
        } 
        
        const filePath = fileDirPath+'/index.ts'        
        if (!fs.existsSync(filePath)) {
            continue
        }

        let content = fs.readFileSync(filePath, {encoding: "utf-8"})
        const name = /.*from '\.\/(.*)'/gm.exec(content)[1]
        
        const svelteFilePath = `${fileDirPath}/${name}`
        content = fs.readFileSync(svelteFilePath, {encoding: "utf-8"})
        content = content.replace('...restProps','..._restProps')
        content = content.replace('...$$restProps','..._restProps')
        content = content.replace('Props = $props()','IconProps = $props()')

        fs.writeFileSync(svelteFilePath, content)

        console.log(svelteFilePath+' updated !')
        


    }
}

migrate()

