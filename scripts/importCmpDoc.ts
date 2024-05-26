import { importCmpDoc } from './imports/importCmpDoc'
import { importCmpDocPage } from './imports/importCmpDocPage'
import { buildCmpContext, getScriptOptions } from './scripts.utils'

const options = getScriptOptions()
const context = buildCmpContext(options.cmpName)

importCmpDoc(context, options)
importCmpDocPage(context, options)
