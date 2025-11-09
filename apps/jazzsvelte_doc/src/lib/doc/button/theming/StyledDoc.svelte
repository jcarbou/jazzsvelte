<script lang="ts">
    import DocSectionText from '../../common/DocSectionText.svelte'
    import DocSimpleTable from '../../common/DocSimpleTable.svelte'
    import type { ComponentDocProps } from '../../common/doc.types'

    let { docSection }: ComponentDocProps = $props()
</script>

<DocSectionText {docSection}>
    <p>List of class names used in the styled mode.</p>
</DocSectionText>
<DocSimpleTable
    headers={['Name', 'Element']}
    rows={[
        ['p-button', 'Button element'],
        ['p-button-icon', 'Icon element'],
        ['p-button-text', 'Label element of the button']
    ]}
/>
