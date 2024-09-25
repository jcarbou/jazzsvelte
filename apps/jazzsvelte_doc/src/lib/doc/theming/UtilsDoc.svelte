<script lang="ts">
    import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection
</script>

<DocSectionText {docSection}>
    <p>In addition to PrimeFlex, PrimeReact has a couple of css utility classes on its own as well.</p>
</DocSectionText>
<DocSimpleTable
    headers={['Name', 'Description']}
    rows={[
        ['p-component', 'Applies component theming such as font-family and font-size to an element.'],
        ['p-fluid', 'Applies 100% width to all descendant components.'],
        ['p-disabled', 'Applies an opacity to display as disabled.'],
        ['p-sr-only', 'Element becomes visually hidden however accessibility is still available.'],
        ['p-reset', 'Resets the browsers defaults.'],
        ['p-link', 'Renders a button as a link.'],
        ['p-error', 'Indicates an error text.'],
        ['p-invalid', 'Applies the invalid style to a text or a form field.'],
        ['p-text-secondary', 'Applies the text color of the theme with the secondary priority.']
    ]}
/>
