import { generateCmpConfig } from './templates/cmp.config.tpl'
import { generateCmpIndex } from './templates/cmp.index.tpl'
import { generateCmpPackage } from './templates/cmp.package.tpl'
import { generateCmpSvelteConfig } from './templates/cmp.svelte.config.tpl'
import { generateCmpSvelte } from './templates/cmp.svelte.tpl'
import { generateCmpTsConfig } from './templates/cmp.tsconfig.tpl'
import { generateCmpTypes } from './templates/cmp.types.tpl'
import { generateCmpTest } from './templates/cmp.test.tpl'
import { buildCmpContext, getScriptOptions, readJson, sortPropsByName, writeText } from './scripts.utils'

const options = getScriptOptions()

console.log(options.cmpName)

const context = buildCmpContext(options.cmpName)

generateCmpPackage(context, options)
generateCmpTsConfig(context, options)
generateCmpSvelteConfig(context, options)
generateCmpTypes(context, options)
generateCmpConfig(context, options)
generateCmpIndex(context, options)
generateCmpSvelte(context, options)
generateCmpTest(context, options)

const json = readJson(context.docPackagePath)
json.devDependencies[`@jazzsvelte/${context.cmp_name}`] = 'workspace:^0.1.0'
sortPropsByName(json, 'devDependencies')
writeText(context.docPackagePath, JSON.stringify(json, null, 2))
