export type CmpApiDoc = {
    description: string
    meta: {
        omitAttributes: string
        tooltip?: boolean
        RootType: string
        importApi?: { values: { name: string }[] }
        icon?: boolean
        svelteComponent?: boolean
    }
    methods: {
        description: string
        values: []
    }
    types: {
        description: string
        values: { name: string; value: string }[]
    }
    props: {
        baseDescription: string
        description: string
        values: {
            name: string
            optional: boolean
            readonly: boolean
            type: string
            codeType: string
            default: string | boolean
            defaultImport?: string
            description: string
        }[]
    }
    ptContext: {
        description?: string
        values: { name: string; type: string; description: string }[]
    }
    ptOptions: {
        label: string
        description?: string
        values: { name: string; type: string; description: string }[]
    }
    ptMethodOptions: {
        description?: string
        values: { name: string; type: string }[]
    }
    state: {
        description?: string
        values: { name: string; type: string; description: string }[]
    }
    callbacks: {
        description: string
        values: []
    }
}

export type CmpContext = {
    cmpName: string
    CmpName: string
    cmpname: string
    cmp_name: string
    cmpHomePath: string
    cmpSrcPath: string
    packagePath: string
    tsConfigPath: string
    svelteConfigPath: string
    cmpPath: string
    apiPath: string
    typesPath: string
    configPath: string
    indexPath: string
    testPath: string
    sveltePath: string
    prApiDocPath: string
    prCmpApiDocPath: string
    prCmpDocPagePath: string
    prCmpDocPageDirPath: string
    cmpDocHomePath: string
    cmpDocHomeMainPath: string
    cmpDocRoutesPath: string
    cmpDocRoutesPageSveltePath: string
    cmpDocRoutesPageTsPath: string
}

export type ScriptOptions = { cmpName: string; test?: boolean; override?: boolean }
