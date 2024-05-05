<script lang="ts">
    import { importJS, importTS } from '../common/doc.utils'
    import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import DocSectionText from '$lib/doc/common/DocSectionText.svelte'

    import type { DocSection } from '$lib/doc/common/doc.types'

    export let docSection: DocSection
</script>

<DocSectionText docSection={{ id: 'accessibility', label: 'Accessibility' }}>
    <h3>Screen Reader</h3>
    <p>
        Toast component use <i>alert</i> role that implicitly defines <i>aria-live</i> as "assertive" and <i>aria-atomic</i> as "true".
    </p>

    <p>
        Close element is a <i>button</i> with an <i>aria-label</i> that refers to the <i>aria.close</i> property of the
        <a href="/locale">locale</a>
        API by default, you may use
        <i>closeButtonProps</i> to customize the element and override the default <i>aria-label</i>.
    </p>

    <h3>Close Button Keyboard Support</h3>
    <DocSimpleTable
        headers={['Key', 'Function']}
        rows={[
            ['<i>enter</i>', 'Closes the message.'],
            ['<i>space</i>', 'Closes the message.']
        ]}
    />
</DocSectionText>
