import fs from 'fs'
const ICONS_PATH = 'packages\\_icons'

for (const iconDir of fs.readdirSync(ICONS_PATH)) {
    const packageJson = JSON.parse(fs.readFileSync(`${ICONS_PATH}/${iconDir}/package.json`, 'utf8'))
    const name = packageJson.description
    const svelte = `${ICONS_PATH}/${iconDir}/${name}.svelte`
    const content = fs.readFileSync(svelte, 'utf8')

    let newContent = `<script lang="ts">
    import { getSvgProps } from '@jazzsvelte/icons'
    import type { SvgProps, IconProps } from '@jazzsvelte/icons'

    export const displayName = '${name}'

    let { label = null, spin = false, class: className = null, ...restProps}: Props = $props()
    let svgProps: SvgProps = $derived(getSvgProps(label, spin, className))
</script>

${content.substring(content.indexOf('<svg'))}
    `

    fs.writeFileSync(svelte, newContent)
    
}

console.log("Done !")