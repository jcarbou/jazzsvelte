<script lang="ts">
    import { iconButtonClasses } from './TopBarUtils';

    export let icon: string;
    export let href: string;
</script>

<a {href} target="_blank" rel="noopener noreferrer" class={iconButtonClasses}>
    <i class="pi text-700 pi-{icon}"></i>
</a>
