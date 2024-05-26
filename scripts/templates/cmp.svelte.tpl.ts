import { CmpApiDoc, CmpContext, ScriptOptions } from '../scripts.types'
import { eachValue, filterValues, upperFirst, omitValues, withValue, generateCmpFile } from '../scripts.utils'

export function render({ props, ptContext, meta, types, ptOptions }: CmpApiDoc, { CmpName, cmpName }: CmpContext): string {
    const { importApi, tooltip, icon } = meta

    return `<script lang="ts">
   import type {
       ${CmpName}PassThroughMethodOptions,
       ${CmpName}PassThroughOptions,
   ${eachValue(types, ({ name }) => `   ${name},`)}
   } from './${cmpName}.types'

   import type {
       JazzSvelteContext,
${eachValue(omitValues(importApi, ['SVG']), ({ name }) => `   HTML${name}Attributes,`)}
${meta.icon && `   IconComponent,`}
       CssStyle,
${icon ? '      ResolvedIconPT,' : ''}
        PassThroughOptions
   } from '@jazzsvelte/api'
${icon ? `   import type { TooltipOptions } from '@jazzsvelte/tooltip'` : ''}
    
   import { getContext } from 'svelte'
${tooltip && `   import { tooltip } from '@jazzsvelte/tooltip'`}
   import { resolveIconPT, resolvePT } from '@jazzsvelte/api'
${icon ? `   import { IconBuilder } from '@jazzsvelte/icons'` : ''}
   import { default${CmpName}Props as DEFAULT, global${CmpName}PT as globalPt } from './${cmpName}.config'

${eachValue(
    omitValues(props, ['class', 'style', 'tooltip', 'pt', 'ptOptions']),
    ({ name, codeType }) => `   export let ${name}: ${codeType} = DEFAULT.${name}`
)}
   export let pt: ${CmpName}PassThroughOptions | null = null
   export let ptOptions: PassThroughOptions | null = null
   export let style: CssStyle | null = DEFAULT.style
   let className: string | null = DEFAULT.class
   export { className as class }
${
    tooltip
        ? `   let tooltipContent: string | null = null
    export { tooltipContent as tooltip }`
        : ''
}

   export const displayName = '${CmpName}'

   $: ptContext = {
        props: $$props,
        context: { 
${eachValue(ptContext, ({ name }) => '      ' + name)}            
        },
        ptOptions,
        unstyled
    } satisfies ${CmpName}PassThroughMethodOptions & {
        ptOptions: PassThroughOptions | null
        unstyled: boolean
    }

${withValue(
    ptOptions,
    'root',
    ({ type }) =>
        `   // "root element"
    $: rootAttributes = resolvePT(
        {
            class: [
                'p-component',
                className,
                {
                    
                }
            ],
            style,
            'data-pc-name': '${cmpName}',
            'data-pc-section': 'root'
        },
        pt?.root,
        globalPt?.root,
        ptContext
    ) satisfies HTML${type}Attributes`
)}

${eachValue(
    filterValues(ptOptions, ({ type, name }) => type !== 'Icon' && name !== 'root'),
    ({ name, type }) =>
        `
    // "${name}" element
    $: ${name}Attributes = resolvePT(
        {
            class: [],
            'data-pc-section': '${name}'
        },
        pt?.${name},
        globalPt?.${name},
        ptContext
    ) satisfies HTML${type}Attributes
`
)}
${eachValue(
    filterValues(ptOptions, ({ type }) => type == 'Icon'),
    ({ name }) =>
        `
     // "${name}" element
    $: resolved${upperFirst(name)} = resolveIconPT(
        ${name},
        {
            class: []
        },
        pt?.${name},
        globalPt?.${name},
        ptContext
    ) satisfies ResolvedIconPT
`
)}

   let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
</script>

${withValue(
    ptOptions,
    'root',
    ({ type }) =>
        `<${type.toLocaleLowerCase()}
   {...rootAttributes}
   {...$$restProps}
${tooltip ? '   use:tooltip={{ tooltipContent, tooltipOptions, jazzSvelteContext }}' : ''}
>`
)}
${eachValue(
    filterValues(ptOptions, ({ type, name }) => type !== 'Icon' && name !== 'root'),
    ({ name, type }) => `<${type.toLocaleLowerCase()} {...${name}Attributes}></${type.toLocaleLowerCase()}>    `
)}
${eachValue(
    filterValues(ptOptions, ({ type }) => type == 'Icon'),
    ({ name }) => `   <IconBuilder resolvedIcon={resolved${upperFirst(name)}}/>`
)}
${withValue(ptOptions, 'root', ({ type }) => `   </${type.toLocaleLowerCase()}>`)}
`
}

export function generateCmpSvelte(context: CmpContext, options: ScriptOptions) {
    generateCmpFile(context, 'sveltePath', render, options)
}
