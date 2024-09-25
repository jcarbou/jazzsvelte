<script lang="ts">
    import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection
</script>

<DocSectionText docSection={{ id: 'style', label: 'Style' }}>
    <p>
        Following is the list of structural style classes, for theming classes visit <a href="/theming">theming</a> page.
    </p>
</DocSectionText>
<DocSimpleTable
    headers={['Name', 'Element']}
    rows={[
        ['p-avatar', 'Container element.'],
        ['p-avatar-image', 'Container element in image mode.'],
        ['p-avatar-circle', 'Container element with a circle shape.'],
        ['p-avatar-text', 'Text of the Avatar.'],
        ['p-avatar-icon', 'Icon of the Avatar.'],
        ['p-avatar-lg', 'Container element with a large size.'],
        ['p-avatar-xl', 'Container element with an xlarge size.'],
        ['p-avatar-group', 'Container element of the group element.']
    ]}
/>
