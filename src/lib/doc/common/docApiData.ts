import type { Doc, DocWithChildren } from './doc.types'
import docs from './apidoc/apidoc.json'
import type { ApiDoc, ApiMainComponent } from './apidoc/apidoc.types'

type IsExcluded = (option: string, key: string) => boolean
type IsExcludedAll = (option: string) => boolean
type Context = {
    isExcluded: IsExcluded
    isExcludedAll: IsExcludedAll
    data: Doc[]
    name: string
}
type ComponentContext = Context & {
    main: ApiMainComponent
}
type SubComponentContext = ComponentContext & {
    componentName: string
}

const APIDoc: ApiDoc = docs

const capitalize = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || ''

function addToChildDoc(cmpContext: ComponentContext, childDoc: Doc[], componentName: string): void {
    const subCmpContext: SubComponentContext = { ...cmpContext, componentName }

    const eventsDoc = buildApiEvents(subCmpContext)
    const interfacesDoc = buildApiInterfaces(subCmpContext, false)
    const typesDoc = buildApiTypes(subCmpContext)

    eventsDoc && childDoc.push(eventsDoc)
    interfacesDoc && childDoc.push(interfacesDoc)
    typesDoc && childDoc.push(typesDoc)
}

export function buildApiDocs(apiDocNames: string[], exclude: { [key: string]: string } | null) {
    const data: Doc[] = []

    for (const name of apiDocNames) {
        buildApiDocItem({
            isExcluded: (option, key) => !!exclude?.[option]?.includes(key),
            isExcludedAll: (option) => exclude?.[option] === 'excludeAll',
            data,
            name
        })
    }
    return data
}

function buildApiDocItem(context: Context) {
    const { name, data } = context
    const splitedName = name.split('.')
    const modName = capitalize(splitedName[0])
    const main = APIDoc[modName.toLowerCase()]

    if (!main) return

    const cmpContext: ComponentContext = { ...context, main }

    if (splitedName.length === 3) {
        const type = splitedName[1]
        const selectedName = splitedName[2]

        if (type === 'functions' && main.functions) {
            const value = main.functions.values[selectedName]

            const functionDoc: DocWithChildren = {
                id: `api.${modName}`,
                label: modName,
                children: []
            }

            const [id, label] = [`api.${modName}.function`, 'Function']

            const values = { ...value }
            delete values.description

            functionDoc.children.push({
                id,
                label,
                docApiData: {
                    id,
                    allowLink: false,
                    name: modName,
                    data: [values],
                    description: '' + value.description
                }
            })

            const types = value.parameters?.map((p) => p.type)

            const subCmpContext: SubComponentContext = {
                ...cmpContext,
                isExcluded: (ref, key) => !types.includes(key),
                isExcludedAll: () => false,
                componentName: modName
            }

            const interfacesDoc = buildApiInterfaces(subCmpContext, true)
            interfacesDoc?.children?.length && functionDoc.children.push(interfacesDoc)

            data.push(functionDoc)
        }
    } else {
        const componentDocList = buildApiComponent(cmpContext)
        data.push(...componentDocList)

        const modelDocList = buildApiModel(cmpContext)
        data.push(...modelDocList)

        !main.components && !main.model && addToChildDoc(cmpContext, data, modName)
    }
}

function buildApiEvents(context: SubComponentContext): DocWithChildren | null {
    const { componentName, main, isExcluded, isExcludedAll } = context

    if (!main.events?.values || isExcludedAll('events')) return null

    const eventsDoc: DocWithChildren = {
        id: `api.${componentName}.events`,
        label: 'Events',
        description: main.events.description,
        children: []
    }

    Object.entries(main.events.values).forEach(([eventKey, eventValue]) => {
        const [id, label] = [`api.${componentName}.${eventKey}`, eventKey]

        if (isExcluded('events', eventKey)) return null

        eventsDoc.children.push({
            id,
            label,
            docApiData: {
                id,
                allowLink: false,
                name: componentName,
                data: eventValue.props,
                description: `${eventValue.description} See <i>${eventValue.relatedProp}</i>`
            }
        })
    })

    return eventsDoc
}

function buildApiTypes(context: SubComponentContext): DocWithChildren | null {
    const { componentName, main, isExcluded, isExcludedAll } = context

    if (!main.types?.values || isExcludedAll('types')) return null

    const typesDoc: DocWithChildren = {
        id: `api.${componentName}.types`,
        label: 'Types',
        description: main.types.description,
        children: []
    }

    Object.entries(main.types.values).forEach(([typeKey, typeValue]) => {
        const [id, label] = [`api.${componentName}.${typeKey}`, typeKey]

        if (isExcluded('types', typeKey)) return null

        typesDoc.children.push({
            id,
            label,
            docApiData: {
                id,
                allowLink: false,
                name: componentName,
                data: [typeValue],
                description: ''
            }
        })
    })

    return typesDoc
}

function buildApiInterfaces(context: SubComponentContext, addPropsAndCallBack: boolean): DocWithChildren | null {
    const { componentName, main, isExcluded, isExcludedAll } = context

    if (!main.interfaces?.values || isExcludedAll('interfaces')) return null

    const interfacesDoc: DocWithChildren = {
        id: `api.${componentName}.interfaces`,
        label: 'Interfaces',
        description: main.interfaces.description,
        children: []
    }

    Object.entries(main.interfaces.values).forEach(([interfaceKey, interfaceValue]) => {
        const [id, label] = [`api.${componentName}.${interfaceKey}`, interfaceKey]

        if (isExcluded('interfaces', interfaceKey)) return null

        const description =
            interfaceValue.description +
            ' ' +
            (interfaceValue.extendedTypes ? `Extends <i>${interfaceValue.extendedTypes}</i>.` : '')

        const childDoc: Doc = {
            id,
            label,
            docApiData: {
                id,
                allowLink: false,
                name: componentName,
                data: interfaceValue.props,
                description
            }
        }
        interfacesDoc.children.push(childDoc)

        if (addPropsAndCallBack) {
            const children: Doc[] = []

            if (interfaceValue?.props?.length) {
                children.push({
                    id: `${id}.props`,
                    label: 'Props',
                    docApiData: {
                        id: `${id}.props`,
                        allowLink: false,
                        data: interfaceValue.props
                    }
                })
            }

            if (interfaceValue?.callbacks?.length) {
                children.push({
                    id: `${id}.callbacks`,
                    label: 'Callbacks',
                    docApiData: {
                        id: `${id}.callbacks`,
                        allowLink: false,
                        data: interfaceValue.callbacks
                    }
                })
            }

            childDoc.children = children
        }
    })

    return interfacesDoc
}

function buildApiComponent(context: ComponentContext): DocWithChildren[] {
    const { main, name, isExcluded, isExcludedAll } = context

    if (!main.components) return []

    const docList: DocWithChildren[] = []

    Object.entries(main.components).forEach(([componentKey, componentValue]) => {
        const componentsDoc: DocWithChildren = {
            id: `api.${componentKey}`,
            label: componentKey,
            description: componentValue.description,
            children: []
        }

        if (componentValue?.props?.values?.length && !isExcludedAll('props')) {
            const [id, label] = [`api.${componentKey}.props`, 'Props']

            if (isExcluded('props', componentKey)) return

            componentsDoc.children.push({
                id,
                label,
                docApiData: {
                    id,
                    allowLink: false,
                    name: componentKey,
                    data: componentValue.props.values,
                    description: componentValue.props.description
                }
            })
        }

        if (componentValue.callbacks?.values?.length && !isExcludedAll('callbacks')) {
            const [id, label] = [`api.${componentKey}.callbacks`, 'Callbacks']

            if (isExcluded('callbacks', componentKey)) return

            componentsDoc.children.push({
                id,
                label,
                docApiData: {
                    id,
                    allowLink: false,
                    name: componentKey,
                    data: componentValue.callbacks.values,
                    description: componentValue.callbacks.description
                }
            })
        }

        if (componentValue.methods?.values?.length && !isExcludedAll('methods')) {
            const [id, label] = [`api.${componentKey}.methods`, 'Methods']

            if (isExcluded('methods', componentKey)) return

            componentsDoc.children.push({
                id,
                label,
                docApiData: {
                    id,
                    allowLink: false,
                    name: componentKey,
                    data: componentValue.methods.values,
                    description: componentValue.methods.description
                }
            })
        }

        if (componentKey.toLocaleLowerCase() === name.toLowerCase()) {
            addToChildDoc(context, componentsDoc.children, componentKey)
        }

        return docList.push(componentsDoc)
    })

    return docList
}

function buildApiModel(context: ComponentContext): DocWithChildren[] {
    const { main, name, isExcluded, isExcludedAll } = context

    if (!main.model) return []

    const docList: DocWithChildren[] = []

    Object.entries(main.model).forEach(([modelKey, modelValue]) => {
        const modelDoc: DocWithChildren = {
            id: `api.${modelKey}`,
            label: modelKey,
            description: modelValue.description,
            children: []
        }

        if (modelValue.props?.values?.length && !isExcludedAll('props')) {
            const [id, label] = [`api.${modelKey}.props`, 'Props']

            if (isExcluded('props', modelKey)) return

            modelDoc.children.push({
                id,
                label,
                docApiData: {
                    id,
                    allowLink: false,
                    name: modelKey,
                    data: modelValue.props.values,
                    description: modelValue.props.description
                }
            })
        }

        if (modelKey.toLocaleLowerCase() === name.toLowerCase()) {
            addToChildDoc(context, modelDoc.children, modelKey)
        }

        docList.push(modelDoc)
    })

    return docList
}
