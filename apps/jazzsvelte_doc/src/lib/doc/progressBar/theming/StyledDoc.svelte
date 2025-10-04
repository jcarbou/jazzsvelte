<script lang="ts">
    import DocSimpleTable from '$lib/doc/common/DocSimpleTable.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()
</script>

<DocSectionText {docSection}>
    <p>List of class names used in the styled mode.</p>
</DocSectionText>
<DocSimpleTable
    headers={['Name', 'Element']}
    rows={[
        ['p-progressbar', 'Container element.'],
        ['p-progressbar-determinate', 'Container element of a determinate progressbar.'],
        ['p-progressbar-indeterminate', 'Container element of an indeterminate progressbar.'],
        ['p-progressbar-value', 'Element whose width changes according to value.'],
        ['p-progressbar-label', 'Label element that displays the current value.']
    ]}
/>
