<script lang="ts">
    import DocSimpleTable from '../../common/DocSimpleTable.svelte'
    import DocSectionText from '../../common/DocSectionText.svelte'

    import type { ComponentDocProps } from '../../common/doc.types'

    let { docSection }: ComponentDocProps = $props()
</script>

<DocSectionText {docSection}>
    <p>List of class names used in the styled mode.</p>
</DocSectionText>
<DocSimpleTable
    headers={['Name', 'Element']}
    rows={[
        ['p-skeleton', 'Container element.'],
        ['p-skeleton-circle', 'Container element of a determinate progressbar.'],
        ['p-skeleton-none', 'Container element of an indeterminate progressbar.']
    ]}
/>
