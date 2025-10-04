import { importCmpDocList } from './imports/importCmpDocList'
import { importCmpDocPage } from './imports/importCmpDocPage'
import { buildCmpContext, getScriptOptions } from './scripts.utils'

const options = getScriptOptions()
const context = buildCmpContext(options.cmpName)

importCmpDocList(context, options)
importCmpDocPage(context, options)
