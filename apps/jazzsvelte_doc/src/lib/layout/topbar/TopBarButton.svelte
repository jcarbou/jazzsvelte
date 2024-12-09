<script lang="ts">
    import { iconButtonClasses } from './TopBarUtils'

    interface Props {
        icon: string
        ariaLabel: string
        onclick: () => void
    }

    let { icon, onclick, ariaLabel }: Props = $props()
</script>

<button class={iconButtonClasses} {onclick} aria-label={ariaLabel}>
    <i class="pi text-700 pi-{icon}"></i>
</button>
