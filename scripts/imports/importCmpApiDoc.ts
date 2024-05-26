import { CmpContext, ScriptOptions } from '../scripts.types'
import { fileExist, mkDir, readJson, writeText } from '../scripts.utils'

export function importCmpApiDoc(context: CmpContext, options: ScriptOptions) {
    const { cmpname, CmpName, cmpSrcPath, apiPath, prApiDocPath } = context

    if (!fileExist(prApiDocPath)) {
        console.log(`File ${prApiDocPath} doen't exist !`)
        return
    }

    const apiDoc = readJson(prApiDocPath)
    const cmpApiDoc = apiDoc[cmpname]
    const newCmpApiDoc = cmpApiDoc.components[CmpName]
    let filePath = apiPath

    if (options.test) {
        filePath += '.test.' + apiPath.split('.').slice(-1)
    } else if (!options.override && fileExist(filePath)) {
        console.log(`File ${apiPath} already exists ! Generationg aborted (Use override option to force generation)`)
        return
    }

    newCmpApiDoc.props.values.forEach((item) => {
        const { type, optional } = item
        if (optional) {
            switch (type) {
                case 'string': {
                    item.type += ' | null'
                }
            }
            if (item.default === '') {
                item.default = 'null'
            }
        }
        if (item.type === 'CSSProperties') {
            item.type = 'string | CssObject | null'
        }
        if (item.type === 'ReactNode | Function') {
            item.type = 'typeof SvelteComponent | null'
        }
        if (item.name === 'ptOptions') {
            item.type = `${CmpName}PassThroughMethodOptions`
        }
        if (type.indexOf('IconType') === 0) {
            item.type = 'string | IconComponent' + (optional ? ' | null' : '')
        }
    })

    newCmpApiDoc.ptMethodOptions = cmpApiDoc.interfaces.values[`${CmpName}PassThroughMethodOptions`]
    newCmpApiDoc.ptMethodOptions.values = newCmpApiDoc.ptMethodOptions.props
    delete newCmpApiDoc.ptMethodOptions.props

    newCmpApiDoc.ptOptions = cmpApiDoc.interfaces.values[`${CmpName}PassThroughOptions`]
    newCmpApiDoc.ptOptions.values = newCmpApiDoc.ptOptions.props
    delete newCmpApiDoc.ptOptions.props
    newCmpApiDoc.ptOptions.values.forEach((item) => {
        if (item.name === 'icon' || item.name.includes('Icon')) {
            item.type = 'Icon'
            return
        }
        if (item.name.includes('Tooltip')) {
            item.type = 'Tooltip'
            return
        }
        //ButtonPassThroughType<HTMLButtonAttributes> => Button
        const type = item.type
        item.type = type.substring(type.indexOf('HTMLAttributes<HTML') + 19, type.indexOf('Element>>'))
    })
    newCmpApiDoc.meta = {
        RootType: newCmpApiDoc.ptOptions.values.find((item) => item.name === 'root').type,
        omitAttributes: "'style'",
        icon: !!newCmpApiDoc.props.values.find(({ type }) => type.includes('IconComponent')),
        tooltip: !!newCmpApiDoc.props.values.find(({ name }) => name.includes('Tooltip')),
        svelteComponent: !!newCmpApiDoc.props.values.find(({ type }) => type === 'typeof SvelteComponent | null')
    }

    newCmpApiDoc.types = {
        description: `Defines types used by properties of the ${CmpName} component.`,
        values: []
    }

    newCmpApiDoc.ptContext = cmpApiDoc.interfaces.values[`${CmpName}Context`]
    if (newCmpApiDoc.ptContext) {
        newCmpApiDoc.ptContext.values = newCmpApiDoc.ptContext.props
        delete newCmpApiDoc.ptContext.props
    }

    newCmpApiDoc.state = cmpApiDoc.interfaces.values[`${CmpName}State`]
    if (newCmpApiDoc.state) {
        newCmpApiDoc.state.values = newCmpApiDoc.state.props
        delete newCmpApiDoc.state.props
    }

    mkDir(cmpSrcPath)
    writeText(filePath, JSON.stringify(newCmpApiDoc, null, 2))

    console.log(`"${filePath}" generated !`)
}
