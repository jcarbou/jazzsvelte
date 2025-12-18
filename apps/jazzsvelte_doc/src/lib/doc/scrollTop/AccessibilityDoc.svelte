<script lang="ts">
    import DocSimpleTable from '../common/DocSimpleTable.svelte'
    import DocSectionText from '../common/DocSectionText.svelte'
    import type { ComponentDocProps } from '../common/doc.types'

    let { docSection }: ComponentDocProps = $props()
</script>

<DocSectionText docSection={{ id: 'accessibility', label: 'Accessibility' }}>
    <h3>Screen Reader</h3>
    <p>
        ScrollTop uses a button element with an <i>aria-label</i> that refers to the <i>aria.scrollTop</i> property of the
        <a href="/locale">locale</a> API by default, you may use your own aria roles and attributes as any valid attribute is passed
        to the button element implicitly.
    </p>

    <h3>Keyboard Support</h3>
    <DocSimpleTable
        headers={['Key', 'Function']}
        rows={[
            ['<i>enter</i>', 'Scrolls to top.'],
            ['<i>space</i>', 'Scrolls to top.']
        ]}
    />
</DocSectionText>
