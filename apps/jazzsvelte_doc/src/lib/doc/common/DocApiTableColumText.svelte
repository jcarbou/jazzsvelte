<script lang="ts">
    interface Props {
        value: string
        deprecated?: string | undefined
    }

    let { value, deprecated = undefined }: Props = $props()
</script>

<span class="doc-option-description">{value}</span>
