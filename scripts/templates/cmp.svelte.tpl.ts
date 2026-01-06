import { CmpApiDoc, CmpContext, ScriptOptions } from '../scripts.types'
import { eachValue, filterValues, upperFirst, omitValues, withValue, generateCmpFile } from '../scripts.utils'

export function render({ props, ptContext, meta, callbacks, ptOptions }: CmpApiDoc, { CmpName, cmpName }: CmpContext): string {
    const { importApi, tooltip, icon } = meta

    return `<script lang="ts">
    import type { ${CmpName}Props, ${CmpName}PtContext } from './${cmpName}.types'
    import type {
       JazzSvelteContext,
${meta.icon ? `   IconComponent,` : ''}
${icon ? '      ResolvedIconPT,' : ''}
   } from '@jazzsvelte/api'
${icon ? `   import type { TooltipOptions } from '@jazzsvelte/tooltip'` : ''}
    
   import { getContext } from 'svelte'
${tooltip ? `   import { tooltip } from '@jazzsvelte/tooltip'` : ''}
   import { 
      resolveIconPT, 
      ${eachValue(omitValues(importApi, ['SVG']), ({ name }) => `   resolve${name}Pt,`)} 
    } from '@jazzsvelte/api'
${icon ? `   import { IconBuilder } from '@jazzsvelte/icons'` : ''}
   import { default${CmpName}Props as DEFAULT, global${CmpName}PT as globalPt } from './${cmpName}.config'

   let {
        children,
${eachValue(omitValues(props, ['class', 'style', 'tooltip', 'pt', 'ptOptions']), ({ name }) => `     ${name} = DEFAULT.${name},`)}
${eachValue(callbacks, ({ name }) => `     ${name} = null,`)}
      pt = null,
      ptOptions = null,
      class: className = DEFAULT.class,
      style = DEFAULT.style,
${
    tooltip
        ? `      tooltip: tooltipContent = null,
      tooltipOptions = undefined,`
        : ''
}
      ..._restProps
   }: ${CmpName}Props = $props()

   let _props: ${CmpName}Props = $derived({
${eachValue(omitValues(props, ['class', 'tooltip']), ({ name }) => `     ${name},`)}
${eachValue(callbacks, ({ name }) => `     ${name},`)}
      class: className,
${tooltip ? '      tooltip: tooltipContent,' : ''}
   })

   export const displayName = '${CmpName}'
   export function getElement(): HTMLDivElement {
        return rootEl
   }   

   let rootEl: HTMLDivElement

   let ptContext: ${CmpName}PtContext = $derived({
        props: { ...DEFAULT, ..._props, ..._restProps },
        context: { 
${eachValue(ptContext, ({ name }) => '      ' + name)}            
        },
        ptOptions,
        unstyled
   })

${withValue(
    ptOptions,
    'root',
    ({ type }) =>
        `   // "root element"
    let rootAttributes = $derived(
        resolve${type}Pt(
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
        )
    )`
)}

${eachValue(
    filterValues(ptOptions, ({ type, name }) => type !== 'Icon' && name !== 'root'),
    ({ name, type }) =>
        `
    // "${name}" element
    let ${name}Attributes = $derived(
        resolve${type}Pt(
            {
                class: [],
                'data-pc-section': '${name}'
            },
            pt?.${name},
            globalPt?.${name},
            ptContext
        )
    )`
)}
${eachValue(
    filterValues(ptOptions, ({ type }) => type == 'Icon'),
    ({ name }) =>
        `
     // "${name}" element
    let resolved${upperFirst(name)} = $derived(
        resolveIconPT(
            ${name},
            {
                class: []
            },
            pt?.${name},
            globalPt?.${name},
            ptContext
        )
    )
`
)}

   let jazzSvelteContext = getContext<JazzSvelteContext>('JAZZ_SVELTE')
</script>

${withValue(
    ptOptions,
    'root',
    ({ type }) =>
        `<${type.toLocaleLowerCase()}
   bind:this={rootEl}
   {...rootAttributes}
   {..._restProps}
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

<style>
</style>
`
}

export function generateCmpSvelte(context: CmpContext, options: ScriptOptions) {
    generateCmpFile(context, 'sveltePath', render, options)
}
