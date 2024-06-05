<script lang="ts">
    import { iconButtonClasses } from './TopBarUtils'
    export let icon: string
</script>

<button class={iconButtonClasses} on:click>
    <i class="pi text-700 pi-{icon}"></i>
</button>
