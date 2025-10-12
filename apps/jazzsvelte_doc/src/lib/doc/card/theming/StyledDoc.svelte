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
        ['p-card', 'Container element.'],
        ['p-card-title', 'Title element.'],
        ['p-card-subtitle', 'Subtitle element.'],
        ['p-card-content', 'Content of the card.'],
        ['p-card-footer', 'Footer of the card.']
    ]}
/>
