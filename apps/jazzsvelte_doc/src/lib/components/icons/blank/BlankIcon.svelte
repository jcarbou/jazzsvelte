<script lang="ts">
    import { getSvgProps } from '../icon.utils'

    export const displayName = 'BlankIcon'

    export let label: string | null = null
    export let spin: boolean = false
    let className: string | null = null
    export { className as class }

    $: svgProps = getSvgProps(label, spin, className)
</script>

<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps} {...$$restProps}>
    <rect width="1" height="1" fill="currentColor" fillOpacity="0" />
</svg>
