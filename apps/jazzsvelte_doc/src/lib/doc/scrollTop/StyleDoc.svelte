<script lang="ts">
    import DocSimpleTable from '$lib/doc/common/DocSimpleTable.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'
    import type { ComponentDocProps } from '$lib/doc/common/doc.types'

    let { docSection }: ComponentDocProps = $props()
</script>

<DocSectionText docSection={{ id: 'style', label: 'Style' }}>
    <p>
        Following is the list of structural style classes, for theming classes visit <a href="/theming">theming</a> page.
    </p>
</DocSectionText>
<DocSimpleTable
    headers={['Name', 'Element']}
    rows={[
        ['p-scrolltop', 'Container element.'],
        ['p-scrolltop-sticky', 'Container element when attached to its parent.']
    ]}
/>
