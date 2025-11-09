import { tailwindDocPage } from './imports/tailwindDocPage'
import { buildCmpContext, getScriptOptions } from './scripts.utils'

const options = getScriptOptions()
const context = buildCmpContext(options.cmpName)

tailwindDocPage(context, options)
