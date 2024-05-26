import { importCmpApiDoc } from './imports/importCmpApiDoc'
import { buildCmpContext, getScriptOptions } from './scripts.utils'

const options = getScriptOptions()
const context = buildCmpContext(options.cmpName)

importCmpApiDoc(context, options)
