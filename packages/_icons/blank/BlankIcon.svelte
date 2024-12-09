<script lang="ts">
    import { getSvgProps } from '@jazzsvelte/icons'
    import type { SvgProps, IconProps } from '@jazzsvelte/icons'

    export const displayName = 'BlankIcon'

    let { label = null, spin = false, class: className = null, ..._restProps}: IconProps = $props()
    let svgProps: SvgProps = $derived(getSvgProps(label, spin, className))
</script>

<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps} {..._restProps}>
    <rect width="1" height="1" fill="currentColor" fillOpacity="0" />
</svg>

    
    
    
    