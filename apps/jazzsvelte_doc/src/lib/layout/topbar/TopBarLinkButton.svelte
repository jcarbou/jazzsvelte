<script lang="ts">
    import { iconButtonClasses } from './TopBarUtils'

    interface Props {
        icon: string
        href: string
        ariaLabel: string
    }

    let { icon, href, ariaLabel }: Props = $props()
</script>

<a {href} target="_blank" rel="noopener noreferrer" class={iconButtonClasses} aria-label={ariaLabel}>
    <i class="pi text-700 pi-{icon}"></i>
</a>
